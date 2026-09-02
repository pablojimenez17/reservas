const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const { validateTenant } = require('../middleware/auth');

// Todas las operaciones de /api/reservas están protegidas con validateTenant (requieren JWT de admin)
router.use(validateTenant);

router.get('/', reservaController.getReservas);
router.post('/', reservaController.crearReserva); // Reserva manual por admin
router.patch('/:id/cancelar', reservaController.cancelarReserva);

module.exports = router;
