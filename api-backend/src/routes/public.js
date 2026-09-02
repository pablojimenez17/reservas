const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
const reservaController = require('../controllers/reservaController');
const disponibilidadController = require('../controllers/disponibilidadController');
const { resolvePublicTenant } = require('../middleware/tenantValidator');

// Rutas públicas que resuelven el tenant por cabecera X-Tenant-Id / X-Tenant-Slug
router.use(resolvePublicTenant);

router.get('/negocio', publicController.getPublicTenantInfo);
router.get('/disponibilidad', disponibilidadController.getDisponibilidad);
router.post('/reservas', reservaController.crearReserva);
router.post('/cancelar', reservaController.cancelarPorToken);

module.exports = router;
