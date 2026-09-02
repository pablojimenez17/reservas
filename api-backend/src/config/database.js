const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

let pool = null;
let isPgConnected = false;

// Mock database in memory para pruebas sin docker/postgres
const mockDb = {
  tenants: [
    {
      id: '11111111-1111-1111-1111-111111111111',
      nombre: 'Barbería Marcos',
      slug: 'marcos',
      email_admin: 'marcos@barberiamarcos.com',
      password_hash: 'mock_admin123_hash', // admin123
      dominio_custom: 'marcos.es',
      logo_url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
      descripcion: 'Especialistas en cortes clásicos, degradados modernos y arreglo de barba artesanal en el corazón de Gràcia.',
      telefono: '+34 932 18 44 20',
      direccion: "Carrer del Torrent de l'Olla 84, Gràcia, Barcelona",
      categoria: 'barberia',
      color_primario: '#f59e0b',
      plan: 'pro',
      estado: 'activo'
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      nombre: 'Clínica Dental García',
      slug: 'garcia',
      email_admin: 'recepcion@clinicagarcia.es',
      password_hash: 'mock_admin123_hash', // admin123
      dominio_custom: 'garcia.es',
      logo_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=200&h=200&fit=crop',
      descripcion: 'Salud bucodental avanzada, estética dental, ortodoncia invisible e implantes de alta precisión.',
      telefono: '+34 934 51 09 88',
      direccion: 'Rambla de Catalunya 112, Eixample, Barcelona',
      categoria: 'clinica',
      color_primario: '#0d9488',
      plan: 'pro',
      estado: 'activo'
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      nombre: 'Fisio & Rendimiento Pepe',
      slug: 'pepe',
      email_admin: 'pepe@fisiopepe.com',
      password_hash: 'mock_admin123_hash', // admin123
      dominio_custom: 'pepe.es',
      logo_url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=200&fit=crop',
      descripcion: 'Fisioterapia deportiva, rehabilitación funcional, punción seca y osteopatía para deportistas y vida activa.',
      telefono: '+34 933 09 67 11',
      direccion: 'Carrer de Pallars 178, Poblenou, Barcelona',
      categoria: 'fisioterapia',
      color_primario: '#2563eb',
      plan: 'pro',
      estado: 'activo'
    }
  ],
  profesionales: [
    {
      id: '11111111-a111-1111-1111-111111111111',
      tenant_id: '11111111-1111-1111-1111-111111111111',
      nombre: 'Marcos Vidal',
      email: 'marcos@barberiamarcos.com',
      telefono: '+34 600111222',
      especialidad: 'Master Barber & Estilo Clásico',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      activo: true
    },
    {
      id: '11111111-b111-1111-1111-111111111111',
      tenant_id: '11111111-1111-1111-1111-111111111111',
      nombre: 'Álex Romero',
      email: 'alex@barberiamarcos.com',
      telefono: '+34 600333444',
      especialidad: 'Fade Master & Coloración',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      activo: true
    },
    {
      id: '22222222-a222-2222-2222-222222222222',
      tenant_id: '22222222-2222-2222-2222-222222222222',
      nombre: 'Dra. Laura García',
      email: 'laura@clinicagarcia.es',
      telefono: '+34 611222333',
      especialidad: 'Odontología General & Estética',
      avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      activo: true
    },
    {
      id: '33333333-a333-3333-3333-333333333333',
      tenant_id: '33333333-3333-3333-3333-333333333333',
      nombre: 'Pepe Salgado',
      email: 'pepe@fisiopepe.com',
      telefono: '+34 622333444',
      especialidad: 'Fisioterapeuta Deportivo',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      activo: true
    }
  ],
  servicios: [
    {
      id: '11111111-s111-1111-1111-111111111111',
      tenant_id: '11111111-1111-1111-1111-111111111111',
      nombre: 'Corte de Cabello Clásico / Fade',
      descripcion: 'Lavado tonificante, corte personalizado con tijera o máquina y peinado final.',
      duracion_minutos: 45,
      precio: 22.00,
      activo: true
    },
    {
      id: '11111111-s222-1111-1111-111111111111',
      tenant_id: '11111111-1111-1111-1111-111111111111',
      nombre: 'Ritual de Barba Tradicional',
      descripcion: 'Arreglo con toalla caliente, aceites esenciales, perfilado a navaja y bálsamo.',
      duracion_minutos: 30,
      precio: 16.00,
      activo: true
    },
    {
      id: '11111111-s333-1111-1111-111111111111',
      tenant_id: '11111111-1111-1111-1111-111111111111',
      nombre: 'Combo Completo (Corte + Barba)',
      descripcion: 'La experiencia integral de cuidado masculino. Corte completo y ritual de barba.',
      duracion_minutos: 60,
      precio: 34.00,
      activo: true
    },
    {
      id: '22222222-s111-2222-2222-222222222222',
      tenant_id: '22222222-2222-2222-2222-222222222222',
      nombre: 'Revisión General + Limpieza Dental',
      descripcion: 'Diagnóstico digitalizado con radiografía panorámica y limpieza con ultrasonidos.',
      duracion_minutos: 45,
      precio: 50.00,
      activo: true
    },
    {
      id: '33333333-s111-3333-3333-333333333333',
      tenant_id: '33333333-3333-3333-3333-333333333333',
      nombre: 'Sesión Fisioterapia Deportiva',
      descripcion: 'Terapia manual, descarga muscular y readaptación de sobrecargas.',
      duracion_minutos: 50,
      precio: 45.00,
      activo: true
    }
  ],
  horarios: [
    // Lunes a Sabado para marcos
    { tenant_id: '11111111-1111-1111-1111-111111111111', dia_semana: 1, hora_apertura: '10:00:00', hora_cierre: '20:30:00', cerrado: false },
    { tenant_id: '11111111-1111-1111-1111-111111111111', dia_semana: 2, hora_apertura: '10:00:00', hora_cierre: '20:30:00', cerrado: false },
    { tenant_id: '11111111-1111-1111-1111-111111111111', dia_semana: 3, hora_apertura: '10:00:00', hora_cierre: '20:30:00', cerrado: false },
    { tenant_id: '11111111-1111-1111-1111-111111111111', dia_semana: 4, hora_apertura: '10:00:00', hora_cierre: '20:30:00', cerrado: false },
    { tenant_id: '11111111-1111-1111-1111-111111111111', dia_semana: 5, hora_apertura: '10:00:00', hora_cierre: '20:30:00', cerrado: false },
    { tenant_id: '11111111-1111-1111-1111-111111111111', dia_semana: 6, hora_apertura: '09:30:00', hora_cierre: '19:00:00', cerrado: false },
    { tenant_id: '11111111-1111-1111-1111-111111111111', dia_semana: 0, hora_apertura: '10:00:00', hora_cierre: '14:00:00', cerrado: true },
    // Clinica garcia
    { tenant_id: '22222222-2222-2222-2222-222222222222', dia_semana: 1, hora_apertura: '09:00:00', hora_cierre: '20:00:00', cerrado: false },
    { tenant_id: '22222222-2222-2222-2222-222222222222', dia_semana: 2, hora_apertura: '09:00:00', hora_cierre: '20:00:00', cerrado: false },
    { tenant_id: '22222222-2222-2222-2222-222222222222', dia_semana: 3, hora_apertura: '09:00:00', hora_cierre: '20:00:00', cerrado: false },
    { tenant_id: '22222222-2222-2222-2222-222222222222', dia_semana: 4, hora_apertura: '09:00:00', hora_cierre: '20:00:00', cerrado: false },
    { tenant_id: '22222222-2222-2222-2222-222222222222', dia_semana: 5, hora_apertura: '09:00:00', hora_cierre: '18:00:00', cerrado: false },
    { tenant_id: '22222222-2222-2222-2222-222222222222', dia_semana: 6, hora_apertura: '09:00:00', hora_cierre: '14:00:00', cerrado: true },
    { tenant_id: '22222222-2222-2222-2222-222222222222', dia_semana: 0, hora_apertura: '09:00:00', hora_cierre: '14:00:00', cerrado: true },
    // Fisio pepe
    { tenant_id: '33333333-3333-3333-3333-333333333333', dia_semana: 1, hora_apertura: '08:30:00', hora_cierre: '21:00:00', cerrado: false },
    { tenant_id: '33333333-3333-3333-3333-333333333333', dia_semana: 2, hora_apertura: '08:30:00', hora_cierre: '21:00:00', cerrado: false },
    { tenant_id: '33333333-3333-3333-3333-333333333333', dia_semana: 3, hora_apertura: '08:30:00', hora_cierre: '21:00:00', cerrado: false },
    { tenant_id: '33333333-3333-3333-3333-333333333333', dia_semana: 4, hora_apertura: '08:30:00', hora_cierre: '21:00:00', cerrado: false },
    { tenant_id: '33333333-3333-3333-3333-333333333333', dia_semana: 5, hora_apertura: '08:30:00', hora_cierre: '20:00:00', cerrado: false },
    { tenant_id: '33333333-3333-3333-3333-333333333333', dia_semana: 6, hora_apertura: '09:00:00', hora_cierre: '14:00:00', cerrado: false },
    { tenant_id: '33333333-3333-3333-3333-333333333333', dia_semana: 0, hora_apertura: '09:00:00', hora_cierre: '14:00:00', cerrado: true }
  ],
  reservas: [
    {
      id: 'res-demo-001',
      tenant_id: '11111111-1111-1111-1111-111111111111',
      cliente_nombre: 'Jordi Casals',
      cliente_email: 'jordi.casals@gmail.com',
      cliente_telefono: '+34 655443322',
      profesional_id: '11111111-a111-1111-1111-111111111111',
      servicio_id: '11111111-s111-1111-1111-111111111111',
      fecha: new Date().toISOString().split('T')[0],
      hora: '11:00:00',
      duracion_minutos: 45,
      estado: 'confirmada',
      origen: 'web_cliente',
      token_cancelacion: 'canc_tok_demo_001',
      created_at: new Date()
    },
    {
      id: 'res-demo-002',
      tenant_id: '11111111-1111-1111-1111-111111111111',
      cliente_nombre: 'Marc Puig',
      cliente_email: 'marc.puig@outlook.com',
      cliente_telefono: '+34 677889900',
      profesional_id: '11111111-a111-1111-1111-111111111111',
      servicio_id: '11111111-s333-1111-1111-111111111111',
      fecha: new Date().toISOString().split('T')[0],
      hora: '12:30:00',
      duracion_minutos: 60,
      estado: 'confirmada',
      origen: 'admin_manual',
      token_cancelacion: 'canc_tok_demo_002',
      created_at: new Date()
    }
  ],
  clientes: [],
  notificaciones: []
};

// Intenta inicializar conexión real a Postgres
async function initDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.log('ℹ️ DATABASE_URL no configurada. Usando adaptador de datos en memoria.');
    return;
  }

  try {
    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 2000
    });

    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    isPgConnected = true;
    console.log('✅ Conexión exitosa a PostgreSQL');
  } catch (err) {
    console.log(`ℹ️ PostgreSQL no disponible (${err.message}). Activando modo local en memoria ultra-rápido.`);
    isPgConnected = false;
    pool = null;
  }
}

initDb();

// Adaptador de consultas compatible con PostgreSQL y fallback
const db = {
  isPgConnected: () => isPgConnected,
  getMockData: () => mockDb,

  async query(text, params = []) {
    if (isPgConnected && pool) {
      return pool.query(text, params);
    }

    // Emulador de queries estándar para desarrollo inmediato
    const sql = text.trim();
    const sqlUpper = sql.toUpperCase();

    // 1. SELECT FROM tenants
    if (sqlUpper.includes('FROM TENANTS')) {
      if (params.length > 0) {
        const val = params[0];
        const match = mockDb.tenants.filter(t => 
          t.id === val || t.slug === val || t.email_admin === val || t.dominio_custom === val
        );
        return { rows: match };
      }
      return { rows: [...mockDb.tenants] };
    }

    // 2. SELECT FROM servicios
    if (sqlUpper.includes('FROM SERVICIOS')) {
      let result = [...mockDb.servicios];
      if (params.length > 0) {
        const tenantId = params[0];
        result = result.filter(s => s.tenant_id === tenantId && s.activo);
      }
      return { rows: result };
    }

    // 3. SELECT FROM profesionales
    if (sqlUpper.includes('FROM PROFESIONALES')) {
      let result = [...mockDb.profesionales];
      if (params.length > 0) {
        const tenantId = params[0];
        result = result.filter(p => p.tenant_id === tenantId && p.activo);
      }
      return { rows: result };
    }

    // 4. SELECT FROM horarios
    if (sqlUpper.includes('FROM HORARIOS')) {
      let result = [...mockDb.horarios];
      if (params.length > 0) {
        const tenantId = params[0];
        result = result.filter(h => h.tenant_id === tenantId);
      }
      return { rows: result };
    }

    // 5. SELECT FROM reservas
    if (sqlUpper.startsWith('SELECT') && sqlUpper.includes('FROM RESERVAS')) {
      let result = [...mockDb.reservas];
      if (params.length > 0) {
        const tenantId = params[0];
        result = result.filter(r => r.tenant_id === tenantId);
      }
      // Enriquecer con nombre de profesional y servicio
      result = result.map(r => {
        const prof = mockDb.profesionales.find(p => p.id === r.profesional_id);
        const serv = mockDb.servicios.find(s => s.id === r.servicio_id);
        return {
          ...r,
          profesional_nombre: prof ? prof.nombre : 'Especialista',
          servicio_nombre: serv ? serv.nombre : 'Servicio',
          servicio_precio: serv ? serv.precio : 0
        };
      });
      // Ordenar por fecha y hora descendente
      result.sort((a, b) => `${b.fecha} ${b.hora}`.localeCompare(`${a.fecha} ${a.hora}`));
      return { rows: result };
    }

    // 6. INSERT INTO reservas
    if (sqlUpper.startsWith('INSERT INTO RESERVAS')) {
      const newRes = {
        id: 'res-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        tenant_id: params[0],
        cliente_nombre: params[1],
        cliente_email: params[2],
        cliente_telefono: params[3],
        profesional_id: params[4],
        servicio_id: params[5],
        fecha: params[6],
        hora: params[7],
        duracion_minutos: params[8] || 45,
        estado: params[9] || 'confirmada',
        origen: params[10] || 'web_cliente',
        notas: params[11] || '',
        token_cancelacion: 'canc_' + Math.random().toString(36).substring(2, 12),
        created_at: new Date()
      };

      // Comprobar colisión anti doble booking
      const duplicate = mockDb.reservas.find(r => 
        r.tenant_id === newRes.tenant_id &&
        r.profesional_id === newRes.profesional_id &&
        r.fecha === newRes.fecha &&
        r.hora.substring(0, 5) === newRes.hora.substring(0, 5) &&
        r.estado !== 'cancelada'
      );

      if (duplicate) {
        const err = new Error('El profesional ya tiene una reserva confirmada en este horario.');
        err.code = '23505'; // Postgres unique violation
        throw err;
      }

      mockDb.reservas.push(newRes);
      return { rows: [newRes] };
    }

    // 7. CANCELAR / UPDATE RESERVAS
    if (sqlUpper.startsWith('UPDATE RESERVAS')) {
      const id = params[1] || params[0];
      const res = mockDb.reservas.find(r => r.id === id);
      if (res) {
        if (sqlUpper.includes("ESTADO = 'CANCELADA'")) res.estado = 'cancelada';
        return { rows: [res] };
      }
      return { rows: [] };
    }

    return { rows: [] };
  }
};

module.exports = db;
