// Importar la conexión de la base de datos
const db = require("../SQL/db");

// Obtener todos los productos
const allProductos = (req, res) => {
    const nombre = req.query.nombre || '';
    const sql = `
        SELECT p.id_producto, p.nombre_producto, p.precio_producto, p.id_tipo, p.id_especialista, 
               t.nombre_tipo, e.nombre_especialista
        FROM productos p
        JOIN tipo t ON p.id_tipo = t.id_tipo
        JOIN especialista e ON p.id_especialista = e.id_especialista
        WHERE p.nombre_producto LIKE ?
    `;
    db.all(sql, [`%${nombre}%`], (error, rows) => {
        if (error) return res.status(500).json({ error: "Error al obtener productos" });
        res.json(rows);
    });
};

// Obtener un producto específico
const showProducto = (req, res) => {
    const { id_producto } = req.params;
    const sql = "SELECT * FROM productos WHERE id_producto = ?";
    db.get(sql, [id_producto], (error, row) => {
        if (error) return res.status(500).json({ error: "Error al obtener producto" });
        if (!row) return res.status(404).json({ error: "Producto no encontrado" });
        res.json(row);
    });
};

// Crear un nuevo producto - POST
const storeProducto = (req, res) => {
    const { nombre_producto, precio_producto, id_tipo, id_especialista } = req.body;
    const sql = "INSERT INTO productos (nombre_producto, precio_producto, id_tipo, id_especialista) VALUES (?, ?, ?, ?)";
    db.run(sql, [nombre_producto, precio_producto, id_tipo, id_especialista], function (error) {
        if (error) return res.status(500).json({ error: "Error al agregar producto" });
        res.status(201).json({ id: this.lastID, nombre_producto, precio_producto });
    });
};

// Modificar un producto - PUT
const updateProducto = (req, res) => {
    const { id_producto } = req.params;
    const { nombre_producto, precio_producto, id_tipo, id_especialista } = req.body;
    const sql = "UPDATE productos SET nombre_producto = ?, precio_producto = ?, id_tipo = ?, id_especialista = ? WHERE id_producto = ?";
    db.run(sql, [nombre_producto, precio_producto, id_tipo, id_especialista, id_producto], function (error) {
        if (error) return res.status(500).json({ error: "Error al actualizar producto" });
        if (this.changes === 0) return res.status(404).json({ error: "Producto no encontrado" });
        res.json({ id_producto, nombre_producto, precio_producto });
    });
};

// Eliminar un producto - DELETE
const destroyProducto = (req, res) => {
    const { id_producto } = req.params;
    const sql = "DELETE FROM productos WHERE id_producto = ?";
    db.run(sql, [id_producto], function (error) {
        if (error) return res.status(500).json({ error: "Error al eliminar producto" });
        if (this.changes === 0) return res.status(404).json({ error: "Producto no encontrado" });
        res.json({ message: "Producto eliminado" });
    });
};

// Exportar las funciones
module.exports = {
    allProductos,
    showProducto,
    storeProducto,
    updateProducto,
    destroyProducto
};
