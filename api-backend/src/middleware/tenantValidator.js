const db = require('../config/database');

/**
 * Middleware para endpoints públicos (ej: widget y web de reservas de clientes)
 * Resuelve el tenant por cabecera X-Tenant-Id, X-Tenant-Slug o query param.
 */
const resolvePublicTenant = async (req, res, next) => {
  try {
    const tenantIdentifier = 
      req.headers['x-tenant-id'] || 
      req.headers['x-tenant-slug'] || 
      req.query.tenant_id || 
      req.query.tenant_slug;

    if (!tenantIdentifier) {
      return res.status(400).json({
        success: false,
        error: 'Identificador de negocio no proporcionado. Debe incluir la cabecera X-Tenant-Id o parámetro tenant_id.'
      });
    }

    // Buscar tenant en BD o mock
    const tenantQuery = await db.query(
      'SELECT id, nombre, slug, email_admin, logo_url, descripcion, telefono, direccion, categoria, color_primario, estado FROM tenants WHERE id = $1 OR slug = $1 OR dominio_custom = $1',
      [tenantIdentifier]
    );

    if (!tenantQuery.rows || tenantQuery.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: `Negocio no encontrado para el identificador: ${tenantIdentifier}`
      });
    }

    const tenant = tenantQuery.rows[0];

    if (tenant.estado !== 'activo') {
      return res.status(403).json({
        success: false,
        error: 'Este negocio se encuentra temporalmente inactivo.'
      });
    }

    req.tenant_id = tenant.id;
    req.tenant = tenant;

    next();
  } catch (error) {
    console.error('Error resolviendo tenant público:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno verificando la cuenta del negocio.'
    });
  }
};

module.exports = {
  resolvePublicTenant
};
