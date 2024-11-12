// Importar la conexión de la base de datos
const db = require("../SQL/db");

// Obtener todos los tipos
const allTipos = (req, res) => {
    const sql = `SELECT id_tipo, nombre_tipo FROM tipo`;
    db.all(sql, [], (error, rows) => {
        if (error) return res.status(500).json({ error: "Error al obtener tipos" });
        res.json(rows);
    });
};

// Actualizar un tipo
const updateTipo = (req, res) => {
    const { id } = req.params;
    const { nombre_tipo } = req.body;
    const sql = "UPDATE tipo SET nombre_tipo = ? WHERE id_tipo = ?";
    db.run(sql, [nombre_tipo, id], function (error) {
        if (error) return res.status(500).json({ error: "Error al actualizar tipo" });
        if (this.changes === 0) return res.status(404).json({ error: "Tipo no encontrado" });
        res.json({ id_tipo: id, nombre_tipo });
    });
};

// Eliminar un tipo
const destroyTipo = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM tipo WHERE id_tipo = ?";
    db.run(sql, [id], function (error) {
        if (error) return res.status(500).json({ error: "Error al eliminar tipo" });
        if (this.changes === 0) return res.status(404).json({ error: "Tipo no encontrado" });
        res.json({ message: "Tipo eliminado" });
    });
};

// Exportar las funciones
module.exports = {
    allTipos,
    updateTipo,
    destroyTipo,
};


