const db = require('../config/database');
const notificacionesService = require('../services/notificacionesService');

// GET /api/reservas (Admin)
exports.getReservas = async (req, res, next) => {
  try {
    // req.tenant_id proviene del JWT validado
    const queryRes = await db.query(
      'SELECT * FROM reservas WHERE tenant_id = $1',
      [req.tenant_id]
    );

    let reservas = queryRes.rows;

    // Filtros opcionales por query param (fecha, estado, profesional)
    if (req.query.fecha) {
      reservas = reservas.filter(r => r.fecha === req.query.fecha);
    }
    if (req.query.estado) {
      reservas = reservas.filter(r => r.estado === req.query.estado);
    }
    if (req.query.profesional_id) {
      reservas = reservas.filter(r => r.profesional_id === req.query.profesional_id);
    }

    res.json({
      success: true,
      count: reservas.length,
      data: reservas
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/reservas (Admin manual) y POST /api/public/reservas (Cliente online)
exports.crearReserva = async (req, res, next) => {
  try {
    const tenantId = req.tenant_id;
    const {
      cliente_nombre,
      cliente_email,
      cliente_telefono,
      profesional_id,
      servicio_id,
      fecha,
      hora,
      notas,
      duracion_minutos,
      origen
    } = req.body;

    if (!cliente_nombre || !cliente_telefono || !fecha || !hora) {
      return res.status(400).json({
        success: false,
        error: 'Campos requeridos faltantes: nombre, teléfono, fecha y hora.'
      });
    }

    // Resolver servicio: si no se pasa, tomar el primero activo o crear id genérico
    let assignedServiceId = servicio_id;
    if (!assignedServiceId) {
      const servs = await db.query('SELECT * FROM servicios WHERE tenant_id = $1', [tenantId]);
      const primerServ = servs.rows.find(s => s.activo);
      assignedServiceId = primerServ ? primerServ.id : 'serv-general';
    }

    // Si profesional_id no se envió o es 'cualquiera', asignar el primer profesional activo
    let assignedProfId = profesional_id;
    if (!assignedProfId || assignedProfId === 'cualquiera') {
      const profs = await db.query('SELECT * FROM profesionales WHERE tenant_id = $1', [tenantId]);
      const activo = profs.rows.find(p => p.activo);
      if (!activo) {
        return res.status(400).json({
          success: false,
          error: 'No hay profesionales activos en este negocio.'
        });
      }
      assignedProfId = activo.id;
    }

    // Insertar reserva (con prevención ACID de doble booking)
    const duracion = Number(duracion_minutos) || 45;
    const origenReserva = origen || (req.user_id ? 'admin_manual' : 'web_cliente');

    const result = await db.query(
      `INSERT INTO reservas (
        tenant_id, cliente_nombre, cliente_email, cliente_telefono,
        profesional_id, servicio_id, fecha, hora, duracion_minutos,
        estado, origen, notas
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        tenantId,
        cliente_nombre,
        cliente_email || '',
        cliente_telefono,
        assignedProfId,
        assignedServiceId,
        fecha,
        hora.length === 5 ? `${hora}:00` : hora,
        duracion,
        'confirmada',
        origenReserva,
        notas || ''
      ]
    );

    const nuevaReserva = result.rows[0];

    // Obtener info del tenant para la notificación
    const tenantData = await db.query('SELECT * FROM tenants WHERE id = $1', [tenantId]);
    const tenant = tenantData.rows[0];

    // Disparar notificación automática (asíncrona)
    notificacionesService.enviarConfirmacionReserva(nuevaReserva, tenant).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Reserva confirmada con éxito.',
      reserva: nuevaReserva
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/reservas/:id/cancelar (Admin)
exports.cancelarReserva = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `UPDATE reservas SET estado = 'cancelada', updated_at = NOW() WHERE id = $1 AND tenant_id = $2 RETURNING *`,
      [id, req.tenant_id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        error: 'Reserva no encontrada o no pertenece a su negocio.'
      });
    }

    res.json({
      success: true,
      message: 'Reserva cancelada correctamente.',
      reserva: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/public/cancelar-token (Cliente que cancela desde enlace con token)
exports.cancelarPorToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, error: 'Token de cancelación requerido.' });
    }

    const mockDb = db.getMockData();
    const reserva = mockDb.reservas.find(r => r.token_cancelacion === token);

    if (!reserva) {
      return res.status(404).json({ success: false, error: 'Token de cancelación inválido o expirado.' });
    }

    reserva.estado = 'cancelada';

    res.json({
      success: true,
      message: 'Tu cita ha sido cancelada correctamente.',
      reserva
    });
  } catch (error) {
    next(error);
  }
};
