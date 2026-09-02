const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { validateTenant } = require('../middleware/auth');

router.use(validateTenant);

router.get('/', adminController.getProfesionales);
router.post('/', adminController.crearProfesional);

module.exports = router;
