--
-- Archivo generado con SQLiteStudio v3.4.4 el s�b. oct. 26 21:10:37 2024
--
-- Codificaci�n de texto usada: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Tabla: productos

CREATE TABLE IF NOT EXISTS productos 
(
    id_producto INTEGER NOT NULL,
    nombre_producto TEXT NOT NULL, 
    id_tipo INTEGER NOT NULL REFERENCES tipo (id_tipo), 
    precio_producto NUMERIC NOT NULL, 
    id_especialista INTEGER REFERENCES especialista (id_especialista), 
    PRIMARY KEY (id_producto AUTOINCREMENT)
);

INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (1, 'Bracket Metalico', 1, 762, 1);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (2, 'Bracket Zafiro', 1, 271, 1);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (3, 'Bracket Ceramico', 1, 681, 2);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (4, 'Lingual', 1, 882, 2);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (5, 'Invisible Tipo A', 2, 579, 2);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (6, 'Invisible Tipo B', 2, 36, 2);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (7, 'Invisible Tipo C', 2, 842, 2);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (8, 'Invisible Tipo D', 2, 229, 3);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (9, 'Porcelana', 3, 758, 3);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (10, 'Composite', 3, 32, 3);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (11, 'Completa Superior', 4, 220, 4);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (12, 'Completa Inferior', 4, 107, 4);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (13, 'Incisivo Central Inferior', 5, 224, 4);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (14, 'Incisivo Central Superior', 5, 254, 4);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (15, 'Incisivo Lateral Inferior', 5, 869, 5);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (16, 'Incisivo Lateral Superior', 5, 6, 5);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (17, 'Canino Superior', 5, 817, 5);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (18, 'Canino Inferior', 5, 814, 5);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (19, 'Premolar Superior', 5, 977, 5);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (20, 'Premolar Inferior', 5, 117, 2);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (21, 'Molar Superior', 5, 418, 1);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (22, 'Molar Inferior', 5, 473, 4);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (23, 'Producto A', 1, 100, 1);
INSERT INTO productos (id_producto, nombre_producto, id_tipo, precio_producto, id_especialista) VALUES (24, 'Producto B', 2, 150, 2);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

-- Lista de todos los productos

SELECT * FROM 'productos'



-- Tabla: especialista
CREATE TABLE IF NOT EXISTS especialista 
(
    id_especialista INTEGER NOT NULL, 
    nombre_especialista TEXT NOT NULL, 
    apellido_especialista TEXT NOT NULL, 
    PRIMARY KEY (id_especialista AUTOINCREMENT)
);

INSERT INTO especialista (id_especialista, nombre_especialista, apellido_especialista) VALUES (1, 'Andrea', 'Salguero');
INSERT INTO especialista (id_especialista, nombre_especialista, apellido_especialista) VALUES (2, 'Licia', 'Castillo');
INSERT INTO especialista (id_especialista, nombre_especialista, apellido_especialista) VALUES (3, 'Lucia ', 'Montero');
INSERT INTO especialista (id_especialista, nombre_especialista, apellido_especialista) VALUES (4, 'Juana ', 'Cabral');
INSERT INTO especialista (id_especialista, nombre_especialista, apellido_especialista) VALUES (5, 'Emanuel', 'Pena');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

-- Tabla: tipo

CREATE TABLE IF NOT EXISTS tipo 
(
    id_tipo INTEGER PRIMARY KEY, 
    nombre_tipo TEXT NOT NULL
);

INSERT INTO tipo (id_tipo, nombre_tipo) VALUES (1, 'Ortodoncia');
INSERT INTO tipo (id_tipo, nombre_tipo) VALUES (2, 'Alineadores Invisibles');
INSERT INTO tipo (id_tipo, nombre_tipo) VALUES (3, 'Carillas Dentales');
INSERT INTO tipo (id_tipo, nombre_tipo) VALUES (4, 'Protesis Completa');
INSERT INTO tipo (id_tipo, nombre_tipo) VALUES (5, 'Implante Dental');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

-- Tabla: Empleado

CREATE TABLE IF NOT EXISTS empleado (
    id_empleado     INTEGER NOT NULL,
    nombre_empleado TEXT    NOT NULL,
    mail_empleado   TEXT    NOT NULL,
    clave_empleado  TEXT    NOT NULL,
    PRIMARY KEY (
        id_empleado AUTOINCREMENT
    )
);

INSERT INTO empleado (id_empleado, nombre_empleado, mail_empleado, clave_empleado, id_registro) VALUES (1, 'Justina', 'justinasaez@dentart.com', 123456789, 1234);
INSERT INTO empleado (id_empleado, nombre_empleado, mail_empleado, clave_empleado, id_registro) VALUES (2, 'Carlos', 'carlosbergara@dentart.com', 123456789, 1234);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

-- Tabla: Registro

CREATE TABLE registro (
    id_registro INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_registro   TEXT    NOT NULL,
    apellido_registro TEXT    NOT NULL,
    telefono          NUMERIC NOT NULL,
    sexo_registro     TEXT,
    dni_registro      BLOB,
    mail_registro     TEXT UNIQUE,
    clave_registro    TEXT,
    claveDos_registro TEXT,
);

INSERT INTO registro ( id_registro, nombre_registro, apellido_registro, telefono, sexo_registro, dni_registro, mail_registro, clave_registro, claveDos_registro) VALUES (1, 'Ana', 'Lopez', 1160279646, 'Femenino', , 'analopez@gmail.com', 123456789, 123456789);  
INSERT INTO registro ( id_registro, nombre_registro, apellido_registro, telefono, sexo_registro, dni_registro, mail_registro, clave_registro, claveDos_registro) VALUES (2, 'Javier', 'Brambilla', 1166422194, 'Masculino', , 'javierbrambilla@gmail.com', 123456789,	123456789);  
INSERT INTO registro ( id_registro, nombre_registro, apellido_registro, telefono, sexo_registro, dni_registro, mail_registro, clave_registro, claveDos_registro) VALUES (3, 'Johana', 'Delima',	1132154565,	'Femenino', , 'joanadelima@gmail.com', 123456789,	123456789);  
INSERT INTO registro ( id_registro, nombre_registro, apellido_registro, telefono, sexo_registro, dni_registro, mail_registro, clave_registro, claveDos_registro) VALUES (4, 'Myriam', 'Grow', 1145458667, 'Femenino', ,	'myriamgrow@gmail.com',	123456789, 123456789);  

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;