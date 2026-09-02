import React from 'react';
import { User, Calendar, CheckCircle2 } from 'lucide-react';

export const EquipoSection = ({ profesionales, onAbrirReserva }) => {
  return (
    <section id="equipo" style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Especialistas</span>
          <h2 style={{ fontSize: '2.4rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Nuestro Equipo
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Profesionales comprometidos con tu imagen y bienestar. Puedes elegir directamente con quién atenderte.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {profesionales.map((prof) => (
            <div
              key={prof.id}
              className="glass-card"
              style={{
                padding: '2rem 1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <img
                  src={prof.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face'}
                  alt={prof.nombre}
                  style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--primary)',
                    boxShadow: '0 0 20px var(--primary-glow)'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '5px',
                  right: '5px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#10b981',
                  border: '2px solid var(--bg-main)'
                }} title="Disponible para reservas" />
              </div>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                {prof.nombre}
              </h3>
              <p style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                {prof.especialidad}
              </p>

              <button
                className="btn-outline-primary"
                onClick={() => onAbrirReserva(prof)}
                style={{ width: '100%', padding: '0.65rem 1rem' }}
              >
                <Calendar size={15} /> Reservar con {prof.nombre.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
