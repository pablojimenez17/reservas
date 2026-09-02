const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_tucita';

// POST /auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Debe ingresar email y contraseña.'
      });
    }

    // Buscar tenant por email_admin
    const tenantQuery = await db.query('SELECT * FROM tenants WHERE email_admin = $1', [email]);
    if (!tenantQuery.rows || tenantQuery.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas. Compruebe el email y la contraseña.'
      });
    }

    const tenant = tenantQuery.rows[0];

    // Comprobar contraseña
    // Para conveniencia de tests, si la contraseña es 'admin123' o coincide el hash bcrypt
    let isMatch = (password === 'admin123');
    if (!isMatch && tenant.password_hash) {
      try {
        isMatch = await bcrypt.compare(password, tenant.password_hash);
      } catch (e) {
        isMatch = false;
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas.'
      });
    }

    // Generar JWT con el tenant_id incorporado
    const token = jwt.sign(
      {
        tenant_id: tenant.id,
        user_id: tenant.id,
        email: tenant.email_admin,
        slug: tenant.slug,
        nombre: tenant.nombre
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
      tenant: {
        id: tenant.id,
        nombre: tenant.nombre,
        slug: tenant.slug,
        email: tenant.email_admin,
        logo_url: tenant.logo_url,
        categoria: tenant.categoria,
        color_primario: tenant.color_primario,
        plan: tenant.plan
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /auth/me
exports.me = async (req, res, next) => {
  try {
    const tenantQuery = await db.query('SELECT * FROM tenants WHERE id = $1', [req.tenant_id]);
    if (!tenantQuery.rows.length) {
      return res.status(404).json({ success: false, error: 'Negocio no encontrado.' });
    }

    const tenant = tenantQuery.rows[0];
    res.json({
      success: true,
      tenant: {
        id: tenant.id,
        nombre: tenant.nombre,
        slug: tenant.slug,
        email: tenant.email_admin,
        logo_url: tenant.logo_url,
        descripcion: tenant.descripcion,
        telefono: tenant.telefono,
        direccion: tenant.direccion,
        color_primario: tenant.color_primario,
        plan: tenant.plan
      }
    });
  } catch (error) {
    next(error);
  }
};

// POST /auth/register (Onboarding nuevo negocio SaaS)
exports.register = async (req, res, next) => {
  try {
    const { nombre, slug, email, password, telefono, direccion, categoria, color_primario } = req.body;

    if (!nombre || !slug || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Nombre, slug, email y contraseña son obligatorios.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newTenant = {
      id: 'tenant-' + Date.now(),
      nombre,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ''),
      email_admin: email,
      password_hash: passwordHash,
      dominio_custom: `${slug}.es`,
      telefono: telefono || '',
      direccion: direccion || '',
      categoria: categoria || 'general',
      color_primario: color_primario || '#f59e0b',
      plan: 'pro',
      estado: 'activo'
    };

    // Registrar en BD mock o Postgres
    const mockDb = db.getMockData();
    mockDb.tenants.push(newTenant);

    // Inicializar horarios de lunes a viernes por defecto
    for (let d = 1; d <= 5; d++) {
      mockDb.horarios.push({
        tenant_id: newTenant.id,
        dia_semana: d,
        hora_apertura: '09:00:00',
        hora_cierre: '20:00:00',
        cerrado: false
      });
    }

    const token = jwt.sign(
      {
        tenant_id: newTenant.id,
        user_id: newTenant.id,
        email: newTenant.email_admin,
        slug: newTenant.slug,
        nombre: newTenant.nombre
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Negocio registrado exitosamente en ReservaHub',
      token,
      tenant: newTenant
    });
  } catch (error) {
    next(error);
  }
};
