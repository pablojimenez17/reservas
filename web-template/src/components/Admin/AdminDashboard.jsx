import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Phone,
  FileText,
  Filter,
  Users,
  LayoutGrid,
  List,
  Code,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { NuevaReservaManualModal } from './NuevaReservaManualModal';

export const AdminDashboard = ({
  tenantInfo,
  adminUser,
  reservas,
  stats,
  servicios,
  profesionales,
  onCancelarReserva,
  onCrearReservaManual,
  onRecargar,
  loading
}) => {
  const [modalManualAbierto, setModalManualAbierto] = useState(false);
  const [profesionalFiltro, setProfesionalFiltro] = useState('todos'); // 'todos' o ID del profesional
  const [fechaFiltro, setFechaFiltro] = useState(() => new Date().toISOString().split('T')[0]);
  const [vistaModo, setVistaModo] = useState('agenda'); // 'agenda' | 'tabla'
  const [modalCodigoAbierto, setModalCodigoAbierto] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Filtrar reservas por fecha y profesional
  const reservasFiltradas = reservas.filter(r => {
    const coincideFecha = !fechaFiltro || r.fecha === fechaFiltro;
    const coincideProf = profesionalFiltro === 'todos' || r.profesional_id === profesionalFiltro;
    return coincideFecha && coincideProf;
  });

  // Horas del día para la vista de agenda horaria (09:00 a 20:30)
  const horasJornada = [
    '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  // Profesional activo seleccionado para el título
  const profesionalActivoObj = profesionales.find(p => p.id === profesionalFiltro);

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      
      {/* Encabezado del Panel */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', margin: 0 }}>
              Panel de Control · {tenantInfo?.nombre}
            </h2>
            <span className="badge badge-primary">SaaS Pro</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Agenda centralizada y turnos de trabajo por profesional
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary" 
            onClick={() => setModalCodigoAbierto(true)}
            style={{ padding: '0.65rem 1rem', borderColor: 'var(--primary)' }}
          >
            <Code size={16} color="var(--primary)" /> 🔌 Integrar en mi Web
          </button>
          <button 
            className="btn-secondary" 
            onClick={onRecargar} 
            disabled={loading}
            style={{ padding: '0.65rem 1rem' }}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refrescar
          </button>
          <button 
            className="btn-primary"
            onClick={() => setModalManualAbierto(true)}
            style={{ padding: '0.65rem 1.25rem' }}
          >
            <Plus size={18} strokeWidth={2.5} /> Nueva Cita Manual
          </button>
        </div>
      </div>

      {/* PESTAÑAS DE FILTRO POR PROFESIONAL (Paquito, María, Álex...) */}
      <div style={{
        background: 'var(--bg-surface)',
        padding: '0.75rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, padding: '0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Filter size={14} /> Profesional:
        </span>

        {/* Opción Todos */}
        <button
          onClick={() => setProfesionalFiltro('todos')}
          style={{
            padding: '0.5rem 1.1rem',
            borderRadius: 'var(--radius-md)',
            background: profesionalFiltro === 'todos' ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
            color: profesionalFiltro === 'todos' ? '#0c0f17' : 'var(--text-main)',
            border: `1px solid ${profesionalFiltro === 'todos' ? 'var(--primary)' : 'var(--border-color)'}`,
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            flexShrink: 0,
            transition: 'all 0.15s ease'
          }}
        >
          <Users size={15} /> Todos el equipo
        </button>

        {/* Cada Profesional individual */}
        {profesionales.map((prof) => {
          const isSelected = profesionalFiltro === prof.id;
          const citasProfHoy = reservas.filter(r => r.profesional_id === prof.id && r.fecha === fechaFiltro && r.estado !== 'cancelada').length;

          return (
            <button
              key={prof.id}
              onClick={() => setProfesionalFiltro(prof.id)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                color: isSelected ? '#0c0f17' : 'var(--text-main)',
                border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}
            >
              <img
                src={prof.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&fit=crop&crop=face'}
                alt={prof.nombre}
                style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }}
              />
              {prof.nombre}
              <span style={{
                background: isSelected ? '#0c0f17' : 'rgba(255,255,255,0.1)',
                color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                borderRadius: '9999px',
                padding: '0.1rem 0.45rem',
                fontSize: '0.7rem'
              }}>
                {citasProfHoy}
              </span>
            </button>
          );
        })}
      </div>

      {/* Barra de Filtro de Fecha y Conmutador de Vista */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CalendarIcon size={16} color="var(--primary)" /> Ver Día:
          </label>
          <input
            type="date"
            className="input-field"
            style={{ width: 'auto', padding: '0.45rem 0.85rem', fontWeight: 600 }}
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
          />
          <button
            className="btn-secondary"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
            onClick={() => setFechaFiltro(new Date().toISOString().split('T')[0])}
          >
            Hoy
          </button>
        </div>

        {/* Conmutador de Vista: Agenda por Horas vs Tabla */}
        <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setVistaModo('agenda')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: vistaModo === 'agenda' ? 'rgba(var(--primary-rgb), 0.2)' : 'transparent',
              color: vistaModo === 'agenda' ? 'var(--primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            <LayoutGrid size={14} /> Agenda Horaria
          </button>
          <button
            onClick={() => setVistaModo('tabla')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: vistaModo === 'tabla' ? 'rgba(var(--primary-rgb), 0.2)' : 'transparent',
              color: vistaModo === 'tabla' ? 'var(--primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            <List size={14} /> Vista Tabla
          </button>
        </div>
      </div>

      {/* VISTA 1: AGENDA HORARIA HORA POR HORA (Para que cada peluquero vea a quién tiene a cada hora) */}
      {vistaModo === 'agenda' ? (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: '0 0 0.25rem' }}>
              Agenda de Trabajo · {fechaFiltro}
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Mostrando turnos para: <strong>{profesionalActivoObj ? profesionalActivoObj.nombre : 'Todo el equipo'}</strong> ({reservasFiltradas.filter(r => r.estado !== 'cancelada').length} citas confirmadas)
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {horasJornada.map((horaSlot) => {
              // Buscar reservas para esta franja
              const reservasEnHora = reservasFiltradas.filter(r => r.hora?.substring(0, 5) === horaSlot && r.estado !== 'cancelada');

              if (reservasEnHora.length === 0) {
                return (
                  <div
                    key={horaSlot}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.015)',
                      border: '1px dashed rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <div style={{ width: '70px', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                      {horaSlot}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
                      Disponible / Sin cita asignada
                    </span>
                  </div>
                );
              }

              return (
                <div key={horaSlot} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {reservasEnHora.map((res) => (
                    <div
                      key={res.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(var(--primary-rgb), 0.07)',
                        border: '1px solid rgba(var(--primary-rgb), 0.3)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                      }}
                    >
                      {/* Columna Hora */}
                      <div style={{ width: '80px', flexShrink: 0 }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)', display: 'block' }}>
                          {horaSlot}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {res.duracion_minutos || 45} min
                        </span>
                      </div>

                      {/* Columna Datos del Cliente y Profesional Asignado */}
                      <div style={{ flex: 1, padding: '0 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>
                            {res.cliente_nombre}
                          </strong>
                          <a
                            href={`tel:${res.cliente_telefono}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.8rem',
                              color: 'var(--text-muted)',
                              textDecoration: 'none',
                              background: 'rgba(255,255,255,0.05)',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px'
                            }}
                          >
                            <Phone size={12} /> {res.cliente_telefono}
                          </a>
                          <span className="badge" style={{
                            background: 'rgba(56, 189, 248, 0.12)',
                            color: '#38bdf8',
                            fontSize: '0.7rem'
                          }}>
                            {res.profesional_nombre}
                          </span>
                        </div>

                        {/* NOTAS / SERVICIO ESPECIFICADO LIBREMENTE */}
                        <div style={{
                          background: 'rgba(15, 23, 42, 0.6)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.6rem 0.85rem',
                          fontSize: '0.88rem',
                          color: 'var(--text-main)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.45rem'
                        }}>
                          <FileText size={15} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                              Servicio solicitado por el cliente:
                            </span>
                            <span style={{ fontWeight: 500 }}>
                              {res.notas || res.servicio_nombre || 'Servicio estándar'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <button
                          className="btn-secondary"
                          onClick={() => onCancelarReserva(res.id)}
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', color: '#ef4444' }}
                          title="Cancelar cita"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VISTA 2: TABLA TRADICIONAL */
        <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <th style={{ padding: '0.75rem 1rem' }}>HORA</th>
                <th style={{ padding: '0.75rem 1rem' }}>CLIENTE</th>
                <th style={{ padding: '0.75rem 1rem' }}>ESPECIALISTA</th>
                <th style={{ padding: '0.75rem 1rem' }}>SERVICIO / NOTAS DEL CLIENTE</th>
                <th style={{ padding: '0.75rem 1rem' }}>ESTADO</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {reservasFiltradas.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {r.hora?.substring(0, 5)} h
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{r.cliente_nombre}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.cliente_telefono}</div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-main)' }}>
                    {r.profesional_nombre}
                  </td>
                  <td style={{ padding: '1rem', maxWidth: '280px' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                      {r.notas || r.servicio_nombre || 'Servicio estándar'}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {r.estado === 'cancelada' ? (
                      <span className="badge badge-danger">Cancelada</span>
                    ) : (
                      <span className="badge badge-success">Confirmada</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    {r.estado !== 'cancelada' && (
                      <button
                        className="btn-secondary"
                        onClick={() => onCancelarReserva(r.id)}
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', color: '#ef4444' }}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Creación Manual */}
      <NuevaReservaManualModal
        isOpen={modalManualAbierto}
        onClose={() => setModalManualAbierto(false)}
        servicios={servicios}
        profesionales={profesionales}
        onCrearReserva={onCrearReservaManual}
      />

      {/* Modal de Código de Integración para Web Existente */}
      {modalCodigoAbierto && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem'
        }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '680px', padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: '0 0 0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code color="var(--primary)" /> Integrar ReservaHub en tu Web
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Añade este sistema de reservas a cualquier web existente (WordPress, Webflow, Wix o HTML)
                </p>
              </div>
              <button
                onClick={() => setModalCodigoAbierto(false)}
                className="btn-secondary"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              >
                Cerrar
              </button>
            </div>

            {/* Snippet de 1 línea */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                1. Código del Widget Universal (Pégalo antes de &lt;/body&gt; en tu web):
              </label>
              <div style={{ position: 'relative' }}>
                <pre style={{
                  background: '#090d16',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  fontSize: '0.85rem',
                  color: '#38bdf8',
                  overflowX: 'auto',
                  fontFamily: 'monospace'
                }}>
{`<script 
  src="http://localhost:5000/widget.js" 
  data-tenant="${tenantInfo?.slug || 'marcos'}">
</script>`}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`<script src="http://localhost:5000/widget.js" data-tenant="${tenantInfo?.slug || 'marcos'}"></script>`);
                    setCopiado(true);
                    setTimeout(() => setCopiado(false), 2000);
                  }}
                  className="btn-secondary"
                  style={{ position: 'absolute', top: '10px', right: '10px', padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                >
                  {copiado ? <Check size={14} color="#10b981" /> : <Copy size={14} />} {copiado ? 'Copiado' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Botón en la web */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                2. Vincula cualquier botón existente en tu web:
              </label>
              <pre style={{
                background: '#090d16',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                fontSize: '0.85rem',
                color: '#f59e0b',
                overflowX: 'auto',
                fontFamily: 'monospace'
              }}>
{`<!-- Solo añade data-reservahub="open" a tu botón existente -->
<button data-reservahub="open" class="mi-boton-actual">
  Reservar Ahora
</button>`}
              </pre>
            </div>

            {/* Enlace Directo */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem'
            }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                3. Enlace directo para Instagram Bio o WhatsApp:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  readOnly
                  className="input-field"
                  value={`http://localhost:3000/?demo=${tenantInfo?.slug || 'marcos'}`}
                  style={{ fontSize: '0.85rem', color: 'var(--primary)' }}
                />
                <a
                  href={`http://localhost:3000/?demo=${tenantInfo?.slug || 'marcos'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
