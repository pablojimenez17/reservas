const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación y segregación multitenant para Administradores
 * Extrae el JWT del header Authorization, valida la firma y asigna:
 * req.tenant_id
 * req.user_id
 */
const validateTenant = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No autorizado: Token de autenticación ausente o formato incorrecto.'
      });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'dev_jwt_secret_tucita';
    const decoded = jwt.verify(token, secret);

    if (!decoded.tenant_id) {
      return res.status(403).json({
        success: false,
        error: 'Token inválido: No contiene identificador de tenant.'
      });
    }

    req.tenant_id = decoded.tenant_id;
    req.user_id = decoded.user_id;
    req.user_email = decoded.email;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Token inválido o sesión expirada. Inicie sesión nuevamente.'
    });
  }
};

module.exports = {
  validateTenant
};
