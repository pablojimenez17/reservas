-- ==========================================================
-- RESERVAHUB - TEST SEED DATA
-- Datos de prueba para 3 negocios de Barcelona:
-- 1. Barbería Marcos (Gràcia) -> marcos.es
-- 2. Clínica García (Eixample) -> garcia.es
-- 3. Taller/Fisio Pepe (Poblenou) -> pepe.es
-- Password para todos los admins: admin123
-- ==========================================================

-- 1. TENANTS
INSERT INTO tenants (id, nombre, slug, email_admin, password_hash, dominio_custom, logo_url, descripcion, telefono, direccion, categoria, color_primario, plan)
VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  'Barbería Marcos',
  'marcos',
  'marcos@barberiamarcos.com',
  'admin123_test_hash', -- admin123
  'marcos.es',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
  'Especialistas en cortes clásicos, degradados modernos y arreglo de barba artesanal en el corazón de Gràcia.',
  '+34 932 18 44 20',
  'Carrer del Torrent de l''Olla 84, Gràcia, Barcelona',
  'barberia',
  '#f59e0b',
  'pro'
),
(
  '22222222-2222-2222-2222-222222222222',
  'Clínica Dental García',
  'garcia',
  'recepcion@clinicagarcia.es',
  'admin123_test_hash', -- admin123
  'garcia.es',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=200&h=200&fit=crop',
  'Salud bucodental avanzada, estética dental, ortodoncia invisible e implantes de alta precisión.',
  '+34 934 51 09 88',
  'Rambla de Catalunya 112, Eixample, Barcelona',
  'clinica',
  '#0d9488',
  'pro'
),
(
  '33333333-3333-3333-3333-333333333333',
  'Fisio & Rendimiento Pepe',
  'pepe',
  'pepe@fisiopepe.com',
  'admin123_test_hash', -- admin123
  'pepe.es',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=200&fit=crop',
  'Fisioterapia deportiva, rehabilitación funcional, punción seca y osteopatía para deportistas y vida activa.',
  '+34 933 09 67 11',
  'Carrer de Pallars 178, Poblenou, Barcelona',
  'fisioterapia',
  '#2563eb',
  'pro'
)
ON CONFLICT (id) DO NOTHING;

-- 2. PROFESIONALES (Barbería Marcos)
INSERT INTO profesionales (id, tenant_id, nombre, email, telefono, especialidad, avatar_url, activo)
VALUES
('11111111-a111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Marcos Vidal', 'marcos@barberiamarcos.com', '+34 600111222', 'Master Barber & Estilo Clásico', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', true),
('11111111-b111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Álex Romero', 'alex@barberiamarcos.com', '+34 600333444', 'Fade Master & Coloración', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', true),
-- Profesionales (Clínica García)
('22222222-a222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Dra. Laura García', 'laura@clinicagarcia.es', '+34 611222333', 'Odontología General & Estética', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face', true),
('22222222-b222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Dr. Carlos Mendoza', 'carlos@clinicagarcia.es', '+34 611444555', 'Implantología & Cirugía Oral', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face', true),
-- Profesionales (Fisio Pepe)
('33333333-a333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Pepe Salgado', 'pepe@fisiopepe.com', '+34 622333444', 'Fisioterapeuta Deportivo', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', true)
ON CONFLICT (id) DO NOTHING;

-- 3. SERVICIOS (Barbería Marcos)
INSERT INTO servicios (id, tenant_id, nombre, descripcion, duracion_minutos, precio, activo)
VALUES
('11111111-s111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Corte de Cabello Clásico / Fade', 'Lavado tonificante, corte personalizado con tijera o máquina y peinado final.', 45, 22.00, true),
('11111111-s222-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Ritual de Barba Tradicional', 'Arreglo con toalla caliente, aceites esenciales, perfilado a navaja y bálsamo.', 30, 16.00, true),
('11111111-s333-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Combo Completo (Corte + Barba)', 'La experiencia integral de cuidado masculino. Corte completo y ritual de barba.', 60, 34.00, true),
-- Servicios (Clínica García)
('22222222-s111-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Revisión General + Limpieza Dental', 'Diagnóstico digitalizado con radiografía panorámica y limpieza con ultrasonidos.', 45, 50.00, true),
('22222222-s222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Valoración Ortodoncia Invisible', 'Escaneo 3D intraoral con simulación de sonrisa y plan de tratamiento.', 30, 0.00, true),
('22222222-s333-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Blanqueamiento Dental LED', 'Tratamiento en clínica con luz fría para aclarar de 3 a 5 tonos en una sesión.', 60, 180.00, true),
-- Servicios (Fisio Pepe)
('33333333-s111-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Sesión Fisioterapia Deportiva', 'Terapia manual, descarga muscular y readaptación de sobrecargas.', 50, 45.00, true),
('33333333-s222-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Punción Seca & Neuromodulación', 'Tratamiento invasivo para puntos gatillo y dolor miofascial crónico.', 40, 50.00, true)
ON CONFLICT (id) DO NOTHING;

-- 4. HORARIOS SEMANALES (Lunes a Sábado para Barbería Marcos)
INSERT INTO horarios (tenant_id, dia_semana, hora_apertura, hora_cierre, cerrado)
VALUES
('11111111-1111-1111-1111-111111111111', 1, '10:00:00', '20:30:00', false), -- Lunes
('11111111-1111-1111-1111-111111111111', 2, '10:00:00', '20:30:00', false), -- Martes
('11111111-1111-1111-1111-111111111111', 3, '10:00:00', '20:30:00', false), -- Miércoles
('11111111-1111-1111-1111-111111111111', 4, '10:00:00', '20:30:00', false), -- Jueves
('11111111-1111-1111-1111-111111111111', 5, '10:00:00', '20:30:00', false), -- Viernes
('11111111-1111-1111-1111-111111111111', 6, '09:30:00', '19:00:00', false), -- Sábado
('11111111-1111-1111-1111-111111111111', 0, '10:00:00', '14:00:00', true),  -- Domingo cerrado

-- Clínica García (Lunes a Viernes)
('22222222-2222-2222-2222-222222222222', 1, '09:00:00', '20:00:00', false),
('22222222-2222-2222-2222-222222222222', 2, '09:00:00', '20:00:00', false),
('22222222-2222-2222-2222-222222222222', 3, '09:00:00', '20:00:00', false),
('22222222-2222-2222-2222-222222222222', 4, '09:00:00', '20:00:00', false),
('22222222-2222-2222-2222-222222222222', 5, '09:00:00', '18:00:00', false),
('22222222-2222-2222-2222-222222222222', 6, '09:00:00', '14:00:00', true),
('22222222-2222-2222-2222-222222222222', 0, '09:00:00', '14:00:00', true),

-- Fisio Pepe (Lunes a Viernes)
('33333333-3333-3333-3333-333333333333', 1, '08:30:00', '21:00:00', false),
('33333333-3333-3333-3333-333333333333', 2, '08:30:00', '21:00:00', false),
('33333333-3333-3333-3333-333333333333', 3, '08:30:00', '21:00:00', false),
('33333333-3333-3333-3333-333333333333', 4, '08:30:00', '21:00:00', false),
('33333333-3333-3333-3333-333333333333', 5, '08:30:00', '20:00:00', false),
('33333333-3333-3333-3333-333333333333', 6, '09:00:00', '14:00:00', false),
('33333333-3333-3333-3333-333333333333', 0, '09:00:00', '14:00:00', true)
ON CONFLICT (tenant_id, dia_semana) DO NOTHING;

-- 5. RESERVAS DE EJEMPLO (Para Barbería Marcos hoy y próximos días)
INSERT INTO reservas (
  tenant_id, cliente_nombre, cliente_email, cliente_telefono,
  profesional_id, servicio_id, fecha, hora, duracion_minutos,
  estado, origen, token_cancelacion
)
VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Jordi Casals',
  'jordi.casals@gmail.com',
  '+34 655443322',
  '11111111-a111-1111-1111-111111111111',
  '11111111-s111-1111-1111-111111111111',
  CURRENT_DATE,
  '11:00:00',
  45,
  'confirmada',
  'web_cliente',
  'canc_tok_demo_001'
),
(
  '11111111-1111-1111-1111-111111111111',
  'Marc Puig',
  'marc.puig@outlook.com',
  '+34 677889900',
  '11111111-a111-1111-1111-111111111111',
  '11111111-s333-1111-1111-111111111111',
  CURRENT_DATE,
  '12:30:00',
  60,
  'confirmada',
  'admin_manual',
  'canc_tok_demo_002'
)
ON CONFLICT (tenant_id, profesional_id, fecha, hora) DO NOTHING;
