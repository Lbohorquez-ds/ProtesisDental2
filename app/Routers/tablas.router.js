const express = require("express");
const router = express.Router();

const controller = require("../controllers/tabla.controller");
const tipoController = require("../controllers/tabla2.controller");
const especialistaController = require("../controllers/tabla3.controller");

// Rutas para el CRUD de productos
router.get('/', controller.allProductos);
router.get('/:id_producto', controller.showProducto);
router.post('/', controller.storeProducto);
router.put('/:id_producto', controller.updateProducto);
router.delete('/:id_producto', controller.destroyProducto);

// Rutas para Tipos
router.get('/tipos', tipoController.allTipos);
router.put('/tipos/:id', tipoController.updateTipo);
router.delete('/tipos/:id', tipoController.destroyTipo);

// Rutas para Especialistas
router.get('/especialistas', especialistaController.allEspecialistas);
router.put('/especialistas/:id', especialistaController.updateEspecialista);
router.delete('/especialistas/:id', especialistaController.destroyEspecialista);

module.exports = router;