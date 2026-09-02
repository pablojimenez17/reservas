const db = require('../config/database');

// GET /api/public/negocio
exports.getPublicTenantInfo = async (req, res, next) => {
  try {
    const tenant = req.tenant; // Resuelto por el middleware resolvePublicTenant

    // Cargar servicios activos del tenant
    const servQuery = await db.query('SELECT * FROM servicios WHERE tenant_id = $1', [tenant.id]);
    const servicios = servQuery.rows.filter(s => s.activo);

    // Cargar profesionales activos
    const profQuery = await db.query('SELECT * FROM profesionales WHERE tenant_id = $1', [tenant.id]);
    const profesionales = profQuery.rows.filter(p => p.activo);

    // Cargar horarios
    const horQuery = await db.query('SELECT * FROM horarios WHERE tenant_id = $1', [tenant.id]);

    res.json({
      success: true,
      data: {
        tenant: {
          id: tenant.id,
          nombre: tenant.nombre,
          slug: tenant.slug,
          logo_url: tenant.logo_url,
          descripcion: tenant.descripcion,
          telefono: tenant.telefono,
          direccion: tenant.direccion,
          categoria: tenant.categoria,
          color_primario: tenant.color_primario
        },
        servicios,
        profesionales,
        horarios: horQuery.rows
      }
    });
  } catch (error) {
    next(error);
  }
};
