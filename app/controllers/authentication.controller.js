// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import db from "../SQL/db";

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../SQL/db");
const multer = require("multer");


// Configuracion de dotenv
dotenv.config();

// Configuracion de multer para manejo de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("dni_registro")

// REGISTRO
async function register(req, res) {
    // const { nombre, email, contrasena1 } = req.body;

    // if (!email || !contrasena1) {
    //     return res.status(400).json({ status: "Error", message: "Los campos están incompletos" });
    // }

    // const sqlCheck = "SELECT * FROM usuarios WHERE email = ?";
    // db.get(sqlCheck, [email], async (err, usuario) => {
    //     if (usuario) {
    //         return res.status(400).json({ status: "Error", message: "Este usuario ya existe" });
    //     }

    //     const salt = await bcryptjs.genSalt(3);
    //     const hashPassword = await bcryptjs.hash(contrasena1, salt);

    //     const sqlInsert = "INSERT INTO usuarios (nombre, email, contrasena1) VALUES (?, ?, ?)";
    //     db.run(sqlInsert, [nombre, email, hashPassword], function (err) {
    //         if (err) {
    //             return res.status(500).json({ status: "Error", message: "Error al registrar el usuario" });
    //         }
    //         res.status(201).json({ status: "ok", message: `Usuario ${nombre} agregado`, redirect: "/" });
    //     });
    // });

    // Usar multer para manejar el archivo
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ status: "Error", message: "Error al subir el archivo" });
        const { nombre, apellido, telefono, sexo, mail, clave, claveDos } = req.body;
        const dni = req.file ? req.file.buffer : null;

        // Verificar que todos los campos estan completos
        if (!nombre || !apellido || !telefono || !sexo || !dni || !mail || !clave || !claveDos) {
            return res.status(400).json({ status: "Error", message: "Todos los campos son obligatorios" });
        }

        // Verificar que las contraseñas coincidan
        if (clave !== claveDos) {
            return res.status(400).json({ status: "Error", message: "Las contraseñas no coinciden" });
        }

        // Verificar si el usuario ya existe
        const sqlCheck = "SELECT * FROM registro WHERE mail_registro = ?";
        db.get(sqlCheck, [mail], async (err, usuario) => {
            if (usuario) {
                return res.status(400).json({ status: "Error", message: "Este usuario ya existe" });
            }

            // Hashear la contraseña
            const salt = await bcryptjs.genSalt(3);
            const hashedPassword = await bcryptjs.hash(clave, salt);

            // Insertar el nuevo usuario en la base de datos
            const sqlInsert = `INSERT INTO registro 
                                   (nombre_registro, apellido_registro, telefono, sexo_registro, dni_registro, mail_registro, clave_registro, claveDos_registro)
                                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            db.run(sqlInsert, [nombre, apellido, telefono, sexo, dni, mail, hashedPassword, hashedPassword], function (err) {
                if (err) {
                    return res.status(500).json({ status: "Error", message: "Error al registrar el usuario" });
                }

                // Confirmación de registro exitoso sin envío de correo
                res.status(201).json({ status: "ok", message: `Usuario ${nombre} registrado exitosamente`, redirect: "/" });
            });
        });
    });
}

//-------------------------------------------//
// LOGIN
async function login(req, res) {
    const { email, contrasena1 } = req.body;

    if (!email || !contrasena1) {
        return res.status(400).json({ status: "Error", message: "Los campos están incompletos" });
    }

    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.get(sql, [email], async (err, usuario) => {
        if (err || !usuario) {
            return res.status(400).json({ status: "Error", message: "Error durante el login" });
        }

        const loginCorrecto = await bcryptjs.compare(contrasena1, usuario.contrasena1);
        if (!loginCorrecto) {
            return res.status(400).send({ status: "Error", message: "Error durante el login" });
        }

        const token = jwt.sign(
            { email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,
            path: "/"
        });
        res.json({ status: "ok", message: "Usuario logueado", redirect: "/admin" });
    });
}


const methods = {
    login,
    register
};

module.exports = methods;