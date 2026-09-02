import React from 'react';
import { Award, Users, HeartHandshake, ShieldCheck } from 'lucide-react';

export const QuienesSomos = ({ tenantInfo }) => {
  const nombre = tenantInfo?.nombre || 'Nosotros';

  return (
    <section id="quienes-somos" style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Columna de Texto */}
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Nuestra Esencia</span>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '1.25rem', color: 'var(--text-main)', lineHeight: 1.2 }}>
              Pasión por el detalle, respeto por la tradición.
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              En <strong>{nombre}</strong> combinamos técnicas artesanales con las últimas tendencias de cuidado profesional. Creemos en un trato cercano, personalizado y honesto, donde cada cliente recibe el tiempo y la dedicación que se merece.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Sin prisas y sin masificaciones: cuando reservas tu cita, el sillón y nuestro especialista están reservados exclusivamente para ti.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)' }}>
                  <Award size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>Experiencia</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Años perfeccionando nuestro oficio.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)' }}>
                  <HeartHandshake size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>Trato Exclusivo</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Atención 1 a 1 de principio a fin.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Visual / Imagen */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}>
              <img
                src={tenantInfo?.logo_url || "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&fit=crop"}
                alt="Ambiente del local"
                style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Tarjeta flotante de experiencia */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)'
            }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)', display: 'block', lineHeight: 1 }}>
                +10 Años
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cuidando a la comunidad local</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
