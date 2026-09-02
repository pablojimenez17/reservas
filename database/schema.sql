-- ==========================================================
-- RESERVAHUB - DATABASE SCHEMA (PostgreSQL 15+)
-- Multi-tenant SaaS booking platform
-- ==========================================================

-- Extensión para generar UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Tenants (Negocios / Clientes del SaaS)
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL, -- ej: "marcos", "garcia", "pepe"
  email_admin VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  dominio_custom VARCHAR(255), -- ej: "marcos.es"
  logo_url TEXT,
  descripcion TEXT,
  telefono VARCHAR(20),
  direccion TEXT,
  categoria VARCHAR(100) DEFAULT 'general', -- barberia, clinica, taller, etc.
  color_primario VARCHAR(50) DEFAULT '#f59e0b',
  plan VARCHAR(50) DEFAULT 'pro', -- free, pro, premium
  estado VARCHAR(50) DEFAULT 'activo', -- activo, cancelado, suspendido
  fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_ultimo_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Profesionales del negocio
CREATE TABLE IF NOT EXISTS profesionales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefono VARCHAR(20),
  especialidad VARCHAR(255),
  avatar_url TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Catálogo de Servicios
CREATE TABLE IF NOT EXISTS servicios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  duracion_minutos INT NOT NULL, -- 30, 45, 60, 90
  precio DECIMAL(10, 2) NOT NULL,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Horarios de atención del negocio
CREATE TABLE IF NOT EXISTS horarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  dia_semana INT NOT NULL, -- 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  hora_apertura TIME NOT NULL, -- ej: '09:00:00'
  hora_cierre TIME NOT NULL,   -- ej: '20:00:00'
  cerrado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tenant_id, dia_semana)
);

-- 5. Reservas (Transacciones con aislamiento ACID)
CREATE TABLE IF NOT EXISTS reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  cliente_nombre VARCHAR(255) NOT NULL,
  cliente_email VARCHAR(255),
  cliente_telefono VARCHAR(20) NOT NULL,
  profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE RESTRICT,
  servicio_id UUID NOT NULL REFERENCES servicios(id) ON DELETE RESTRICT,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  duracion_minutos INT NOT NULL,
  estado VARCHAR(50) DEFAULT 'confirmada', -- confirmada, cancelada, completada, no_asistio
  origen VARCHAR(50) DEFAULT 'web_cliente', -- web_cliente, admin_manual, telefono
  notas TEXT,
  token_cancelacion VARCHAR(255) UNIQUE NOT NULL, -- Token seguro para cancelar sin login
  envio_email BOOLEAN DEFAULT false,
  envio_sms BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- REGLA CRÍTICA: Previene doble reserva para el mismo profesional en el mismo horario
  CONSTRAINT uq_profesional_horario UNIQUE(tenant_id, profesional_id, fecha, hora)
);

-- 6. Clientes (Directorio CRM)
CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  total_reservas INT DEFAULT 1,
  ultima_reserva DATE,
  cliente_frecuente BOOLEAN DEFAULT false,
  notas_internas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tenant_id, telefono)
);

-- 7. Historial de Notificaciones
CREATE TABLE IF NOT EXISTS notificaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  reserva_id UUID NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
  tipo VARCHAR(50) NOT NULL, -- email, sms, whatsapp
  destinatario VARCHAR(255) NOT NULL,
  contenido TEXT NOT NULL,
  enviado BOOLEAN DEFAULT false,
  fecha_envio TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Facturas y Suscripciones del SaaS
CREATE TABLE IF NOT EXISTS facturas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  mes DATE NOT NULL,
  monto DECIMAL(10, 2) NOT NULL, -- 29.00
  concepto VARCHAR(255) DEFAULT 'Cuota mensual ReservaHub API',
  pagado BOOLEAN DEFAULT true,
  fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================
-- ÍNDICES DE ALTO RENDIMIENTO
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_reservas_tenant ON reservas(tenant_id);
CREATE INDEX IF NOT EXISTS idx_reservas_fecha_tenant ON reservas(tenant_id, fecha);
CREATE INDEX IF NOT EXISTS idx_reservas_profesional ON reservas(tenant_id, profesional_id, fecha);
CREATE INDEX IF NOT EXISTS idx_profesionales_tenant ON profesionales(tenant_id);
CREATE INDEX IF NOT EXISTS idx_servicios_tenant ON servicios(tenant_id);
CREATE INDEX IF NOT EXISTS idx_horarios_tenant ON horarios(tenant_id);
CREATE INDEX IF NOT EXISTS idx_clientes_tenant_tel ON clientes(tenant_id, telefono);
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
