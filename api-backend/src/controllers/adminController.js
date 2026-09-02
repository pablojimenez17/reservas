const db = require('../config/database');

// --- PROFESIONALES ---
exports.getProfesionales = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM profesionales WHERE tenant_id = $1', [req.tenant_id]);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    next(error);
  }
};

exports.crearProfesional = async (req, res, next) => {
  try {
    const { nombre, email, telefono, especialidad, avatar_url } = req.body;
    const mockDb = db.getMockData();
    const newProf = {
      id: 'prof-' + Date.now(),
      tenant_id: req.tenant_id,
      nombre,
      email: email || '',
      telefono: telefono || '',
      especialidad: especialidad || 'Especialista',
      avatar_url: avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      activo: true
    };
    mockDb.profesionales.push(newProf);
    res.status(201).json({ success: true, data: newProf });
  } catch (error) {
    next(error);
  }
};

// --- SERVICIOS ---
exports.getServicios = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM servicios WHERE tenant_id = $1', [req.tenant_id]);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    next(error);
  }
};

exports.crearServicio = async (req, res, next) => {
  try {
    const { nombre, descripcion, duracion_minutos, precio } = req.body;
    const mockDb = db.getMockData();
    const newServ = {
      id: 'serv-' + Date.now(),
      tenant_id: req.tenant_id,
      nombre,
      descripcion: descripcion || '',
      duracion_minutos: Number(duracion_minutos) || 45,
      precio: Number(precio) || 20.00,
      activo: true
    };
    mockDb.servicios.push(newServ);
    res.status(201).json({ success: true, data: newServ });
  } catch (error) {
    next(error);
  }
};

// --- HORARIOS ---
exports.getHorarios = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM horarios WHERE tenant_id = $1', [req.tenant_id]);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    next(error);
  }
};

// --- ESTADÍSTICAS DEL NEGOCIO ---
exports.getStats = async (req, res, next) => {
  try {
    const tenantId = req.tenant_id;
    const reservasRes = await db.query('SELECT * FROM reservas WHERE tenant_id = $1', [tenantId]);
    const serviciosRes = await db.query('SELECT * FROM servicios WHERE tenant_id = $1', [tenantId]);

    const reservas = reservasRes.rows;
    const hoyStr = new Date().toISOString().split('T')[0];

    const reservasHoy = reservas.filter(r => r.fecha === hoyStr && r.estado !== 'cancelada');
    const reservasConfirmadas = reservas.filter(r => r.estado !== 'cancelada');
    
    // Calcular ingresos estimados
    let ingresosTotales = 0;
    reservasConfirmadas.forEach(r => {
      const serv = serviciosRes.rows.find(s => s.id === r.servicio_id);
      if (serv) {
        ingresosTotales += Number(serv.precio);
      }
    });

    res.json({
      success: true,
      stats: {
        reservas_hoy: reservasHoy.length,
        reservas_totales: reservasConfirmadas.length,
        ingresos_estimados: ingresosTotales,
        tasa_asistencia: '96%'
      }
    });
  } catch (error) {
    next(error);
  }
};
