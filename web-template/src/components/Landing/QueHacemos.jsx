import React from 'react';
import { Scissors, Sparkles, Clock, Calendar, ArrowRight } from 'lucide-react';

export const QueHacemos = ({ servicios, onAbrirReserva }) => {
  return (
    <section id="que-hacemos" style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Nuestras Especialidades</span>
          <h2 style={{ fontSize: '2.4rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            ¿Qué Hacemos?
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Estos son algunos de nuestros tratamientos y servicios habituales. Al reservar, solo dinos en las notas qué te apetece hacerte.
          </p>
        </div>

        {/* Grilla de Servicios Informativa */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {servicios.map((serv) => (
            <div
              key={serv.id}
              className="glass-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
                    {serv.nombre}
                  </h3>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                    {Number(serv.precio) === 0 ? 'Gratis' : `${serv.precio}€`}
                  </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {serv.descripcion}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={13} /> {serv.duracion_minutos} min aprox.
                </span>
                <button
                  className="btn-outline-primary"
                  onClick={() => onAbrirReserva(null)}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                >
                  Pedir Cita <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Explicativo de Reserva Flexible */}
        <div style={{
          background: 'rgba(var(--primary-rgb), 0.08)',
          border: '1px solid rgba(var(--primary-rgb), 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: '0 0 0.25rem' }}>
              ¿Tienes una petición especial o servicio combinado?
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              No te preocupes por catálogos rígidos: elige hora y escribe en las notas lo que necesitas.
            </p>
          </div>

          <button
            onClick={() => onAbrirReserva(null)}
            className="btn-primary"
            style={{ padding: '0.75rem 1.5rem' }}
          >
            <Calendar size={18} /> Reservar Ahora
          </button>
        </div>

      </div>
    </section>
  );
};
