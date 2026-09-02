const express = require('express');
const router = express.Router();
const disponibilidadController = require('../controllers/disponibilidadController');
const { validateTenant } = require('../middleware/auth');
const { resolvePublicTenant } = require('../middleware/tenantValidator');

// Permite consulta tanto si viene autenticado (admin) como si viene con cabecera de cliente público
router.get('/', (req, res, next) => {
  if (req.headers.authorization) {
    return validateTenant(req, res, () => disponibilidadController.getDisponibilidad(req, res, next));
  }
  return resolvePublicTenant(req, res, () => disponibilidadController.getDisponibilidad(req, res, next));
});

module.exports = router;
