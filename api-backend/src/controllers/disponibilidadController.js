const { calcularDisponibilidad } = require('../services/disponibilidadService');

// GET /api/disponibilidad (Público o Admin)
exports.getDisponibilidad = async (req, res, next) => {
  try {
    const tenantId = req.tenant_id;
    const { fecha, servicio_id, profesional_id } = req.query;

    if (!fecha) {
      return res.status(400).json({
        success: false,
        error: 'El parámetro de fecha (YYYY-MM-DD) es obligatorio.'
      });
    }

    const resultado = await calcularDisponibilidad({
      tenantId,
      fecha,
      servicioId: servicio_id,
      profesionalId: profesional_id
    });

    res.json({
      success: true,
      data: resultado
    });
  } catch (error) {
    next(error);
  }
};
