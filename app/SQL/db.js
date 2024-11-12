const sqlite3 = require("sqlite3").verbose();

//Conexion con la base de datos
const db = new sqlite3.Database('./app/SQL/dentart.db', (error) => {
    if (error) {
        return console.error("Error al conectar con la base de datos:", error.message);
    }
    console.log("Conectado a la base de datos dentart.db.");
});

   
//Exportar del modulo la funcion connection
module.exports = db;