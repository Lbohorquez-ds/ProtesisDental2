// Importar la conexión de la base de datos
const db = require("../SQL/db");

// Obtener todos los especialistas
const allEspecialistas = (req, res) => {
    const sql = `SELECT id_especialista, nombre_especialista FROM especialista`;
    db.all(sql, [], (error, rows) => {
        if (error) return res.status(500).json({ error: "Error al obtener especialistas" });
        res.json(rows);
    });
};

// Actualizar un especialista
const updateEspecialista = (req, res) => {
    const { id } = req.params;
    const { nombre_especialista } = req.body;
    const sql = "UPDATE especialista SET nombre_especialista = ? WHERE id_especialista = ?";
    db.run(sql, [nombre_especialista, id], function (error) {
        if (error) return res.status(500).json({ error: "Error al actualizar especialista" });
        if (this.changes === 0) return res.status(404).json({ error: "Especialista no encontrado" });
        res.json({ id_especialista: id, nombre_especialista });
    });
};

// Eliminar un especialista
const destroyEspecialista = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM especialista WHERE id_especialista = ?";
    db.run(sql, [id], function (error) {
        if (error) return res.status(500).json({ error: "Error al eliminar especialista" });
        if (this.changes === 0) return res.status(404).json({ error: "Especialista no encontrado" });
        res.json({ message: "Especialista eliminado" });
    });
};


// Exportar las funciones
module.exports = {
    allEspecialistas,
    updateEspecialista,
    destroyEspecialista,
};


