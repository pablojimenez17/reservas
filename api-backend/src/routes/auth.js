const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateTenant } = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', validateTenant, authController.me);

module.exports = router;
