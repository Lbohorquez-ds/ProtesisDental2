const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

let db = new sqlite3.Database('./database.db');

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
    db.all("SELECT * FROM productos", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Ruta para agregar productos
app.post('/api/productos', (req, res) => {
    const { name, type, price, specialist } = req.body;
    const sql = `INSERT INTO productos (nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, type, price, specialist], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Ruta para eliminar productos
app.delete('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM productos WHERE id_producto = ?", id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedID: id });
    });
});

// Ruta para actualizar productos
app.put('/api/productos/:id', (req, res) => {
    const { name, type, price } = req.body;
    const id = req.params.id;
    const sql = `UPDATE productos SET nombre_producto = ?, id_tipo = ?, precio_producto = ? WHERE id_producto = ?`;
    db.run(sql, [name, type, price, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ updatedID: id });
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});