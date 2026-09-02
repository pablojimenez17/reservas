import React from 'react';
import { MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';
import { businessConfig } from '../../config/businessConfig';

export const ContactoHorarios = ({ tenantInfo, onAbrirReserva }) => {
  const nombre = tenantInfo?.nombre || businessConfig.businessName;
  const direccion = tenantInfo?.direccion || businessConfig.address;
  const telefono = tenantInfo?.telefono || businessConfig.phone;
  const email = tenantInfo?.email_admin || 'contacto@negocio.es';

  const diasSemana = [
    { dia: 'Lunes', horario: '10:00 - 20:30' },
    { dia: 'Martes', horario: '10:00 - 20:30' },
    { dia: 'Miércoles', horario: '10:00 - 20:30' },
    { dia: 'Jueves', horario: '10:00 - 20:30' },
    { dia: 'Viernes', horario: '10:00 - 20:30' },
    { dia: 'Sábado', horario: '09:30 - 19:00' },
    { dia: 'Domingo', horario: 'Cerrado', cerrado: true }
  ];

  return (
    <section id="contacto" style={{ padding: '5rem 1.5rem', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Ubicación y Horarios</span>
          <h2 style={{ fontSize: '2.4rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Ven a Visitarnos
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Estamos en una ubicación céntrica y de fácil acceso. Si prefieres reservar con antelación, elige tu hora online.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          
          {/* Información de Contacto */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
              Datos de Contacto
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>Dirección</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{direccion}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>Teléfono</strong>
                  <a href={`tel:${telefono}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}>
                    {telefono}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>Email</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{email}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onAbrirReserva(null)}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <Calendar size={18} /> Reservar Cita en {nombre}
            </button>
          </div>

          {/* Tabla de Horarios */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--primary)" /> Horario de Atención
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {diasSemana.map((d) => (
                <div
                  key={d.dia}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.9rem'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{d.dia}</span>
                  <span style={{
                    color: d.cerrado ? '#ef4444' : 'var(--text-muted)',
                    fontWeight: d.cerrado ? 700 : 500
                  }}>
                    {d.horario}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
