// Importaciones de las dependencias
// import express from "express";
// import path from 'path';
// import { fileURLToPath } from "url";
//Fix para _dirname
//const __dirname = path.dirname(fileURLToPath(import.meta.url));
// //Autorizacion
// import { methods as authorization } from "./controllers/authentication.controller.js";
//Autentificacion
//import { methods as authentication } from "./controllers/authentication.controller.js";
console.log("Cargando dependencias...");

//require("dotenv").config();

const express = require("express");
const path = require("path");
console.log("Dependencias cargadas con éxito.");

//Configuración del servidor
const app = express();

//Middleware de Express
console.log("Configurando middleware...");
app.use(express.json());
app.use(express.static(path.join(__dirname, "app")));
console.log("Middleware configurado.");

//Configuracion de rutas
console.log("Configurando rutas...");
const authRoutes = require("./app/Routers/auth.router");
console.log("Configurando 2");
const productosRoutes = require("./app/Routers/tablas.router");

console.log("Configurando 3");
//Rutas para autenticacion (registro e inicio de sesion)
app.use("/api", authRoutes);
//Rutas de productos
console.log("Configurando 4");
app.use("/api/productos", productosRoutes); 
console.log("Rutas configurado.");

//app.set("port", 3000);

//Muestra servidor corriendo
//app.listen(app.get("port"), () => {
//console.log("Servidor corriendo en el puerto", app.get("port"));
//});

//Configuración del servidor
app.use(express.static(__dirname + "/app/Css"));
app.use(express.static(__dirname + "/app/Js"));
app.use(express.static(__dirname + "/app/Imagenes"));
app.use(express.json());

//Rutas
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "app/Html/Index.html")));
app.get("/Acerca", (req, res) => res.sendFile(path.join(__dirname, "app/Html/Acerca.html")));
app.get("/Contacto", (req, res) => res.sendFile(path.join(__dirname, "app/Html/Contacto.html")));
app.get("/NuestrosProductos", (req, res) => res.sendFile(path.join(__dirname, "app/Html/NuestrosClientes.html")));
app.get("/Registrese", (req, res) => res.sendFile(path.join(__dirname, "app/Html/Registrese.html")));
app.get("/Sucursales", (req, res) => res.sendFile(path.join(__dirname, "app/Html/Sucursales.html")));
app.get("/InicioSesionCliente", (req, res) => res.sendFile(path.join(__dirname, "app/Html/InicioSesionCliente.html")));
app.get("/InicioSesionEmpleado", (req, res) => res.sendFile(path.join(__dirname, "app/Html/InicioSesionEmpleado.html")));
app.get("/Lista", (req, res) => res.sendFile(path.join(__dirname, "app/Html/Lista.html")));
app.get("/ListaMostrarCliente", (req, res) => res.sendFile(path.join(__dirname, "app/Html/ListaMostrarCliente.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "app/Html/admin/admin.html")));

  // app.get("/", (req, res) => res.sendFile(__dirname + "app/Html/Index.html"));
  // app.get("/Acerca", (req, res) => res.sendFile(__dirname + "app/Html/Acerca.html"));
  // app.get("/Contacto", (req, res) => res.sendFile(__dirname + "app/Html/Contacto.html"));
  // app.get("/NuestrosProductos", (req, res) => res.sendFile(__dirname + "app/Html/NuestrosClientes.html"));
  // app.get("/Registrese", (req, res) => res.sendFile(__dirname + "app/Html/Registrese.html"));
  // app.get("/Sucursales", (req, res) => res.sendFile(__dirname + "app/Html/Sucursales.html"));
  // app.get("/InicioSesionCliente", (req, res) => res.sendFile(__dirname + "app/Html/InicioSesionCliente.html"));
  // app.get("/Lista", (req, res) => res.sendFile(__dirname + "app/Html/Lista.html"));
  // app.get("/ListaMostrarCliente", (req, res) => res.sendFile(__dirname + "app/Html/ListaMostrarCliente.html"));
  // app.get("/admin", (req, res) => res.sendFile(__dirname + "app/Html/admin/admin.html"));

  // // Importación de rutas para autenticación
  // app.post("/api/login", authentication.login);
  // app.post("/api/register", authentication.register);

//iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});


