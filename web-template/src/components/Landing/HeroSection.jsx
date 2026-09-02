import React from 'react';
import { Calendar, Star, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { businessConfig } from '../../config/businessConfig';

export const HeroSection = ({ tenantInfo, onAbrirReserva }) => {
  const nombre = tenantInfo?.nombre || businessConfig.businessName;
  const descripcion = tenantInfo?.descripcion || 'Tu espacio de confianza para el cuidado profesional en Barcelona.';

  return (
    <section style={{
      position: 'relative',
      padding: '5rem 1.5rem 4rem',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-color)'
    }}>
      {/* Luz ambiental de fondo */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '350px',
        background: 'radial-gradient(ellipse, var(--primary-glow) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '840px' }}>
        
        {/* Badge de confianza */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.4rem 0.9rem',
          borderRadius: '9999px',
          background: 'rgba(var(--primary-rgb), 0.12)',
          border: '1px solid rgba(var(--primary-rgb), 0.3)',
          color: 'var(--primary)',
          fontSize: '0.82rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={14} /> Sistema Oficial de Reservas Online · Sin Registro
        </div>

        {/* Título Principal */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          lineHeight: 1.1,
          marginBottom: '1.25rem',
          color: 'var(--text-main)',
          fontFamily: 'var(--font-heading)'
        }}>
          Bienvenido a <span style={{ color: 'var(--primary)' }}>{nombre}</span>
        </h1>

        {/* Subtítulo / Descripción */}
        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          maxWidth: '680px',
          margin: '0 auto 2.5rem'
        }}>
          {descripcion}
        </p>

        {/* Botones de Acción */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <button
            onClick={() => onAbrirReserva(null)}
            className="btn-primary"
            style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', boxShadow: '0 8px 25px var(--primary-glow)' }}
          >
            <Calendar size={20} strokeWidth={2.5} /> Reservar Cita Ahora
          </button>

          <a
            href="#quienes-somos"
            className="btn-secondary"
            style={{ padding: '0.9rem 1.75rem', textDecoration: 'none' }}
          >
            Conócenos Más
          </a>
        </div>

        {/* Puntos destacados / Garantías */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          padding: '1.5rem',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <div style={{ color: '#f59e0b', display: 'flex' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>4.9/5 en Google Reviews</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Clock size={16} color="var(--primary)" />
            <span>Confirmación Inmediata</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} color="var(--primary)" />
            <span>Sin Esperas ni Colas</span>
          </div>
        </div>

      </div>
    </section>
  );
};
