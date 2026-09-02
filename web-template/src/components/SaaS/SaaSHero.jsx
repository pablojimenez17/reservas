import React from 'react';
import { Database, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

export const SaaSHero = ({ onIrAPlayground, onIrAContacto }) => {
  return (
    <>
      {/* Hero Section Stitch */}
      <section style={{ padding: '4.5rem 1.5rem 3.5rem', textAlign: 'center', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          
          {/* Badge Técnico Stitch */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '4px 16px',
            borderRadius: '9999px',
            background: 'var(--surface-container-high)',
            border: '1px solid var(--outline-variant)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            textTransform: 'uppercase',
            color: 'var(--on-surface-variant)',
            marginBottom: '1.75rem'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--tertiary-fixed-dim)', display: 'inline-block' }} />
            <span>TuCita.io · Sistema Inteligente de Citas y Reservas</span>
          </div>

          {/* Título Principal */}
          <h1 style={{
            fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
            lineHeight: 1.12,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--primary)',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-heading)'
          }}>
            El motor de reservas para tu negocio, con una web a tu medida.
          </h1>

          {/* Subtítulo */}
          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: 'var(--on-surface-variant)',
            maxWidth: '680px',
            margin: '0 auto 2.25rem',
            fontFamily: 'var(--font-body)'
          }}>
            Todo tu negocio organizado sin complicaciones: reservas online automáticas, control de turnos para tu equipo o mesas para restaurantes, y atención telefónica al segundo.
          </p>

          {/* Botones de Acción */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={onIrAPlayground}
              className="btn-stitch-secondary"
            >
              Probar Demo Sandbox ↓
            </button>

            <a
              href="https://wa.me/34629370327?text=Hola,%20he%20visto%20la%20demo%20de%20TuCita.io%20y%20me%20gustar%C3%ADa%20informaci%C3%B3n%20para%20mi%20negocio."
              target="_blank"
              rel="noreferrer"
              className="btn-stitch-outline"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <MessageCircle size={15} /> Hablar por WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* Diagrama de Funcionamiento Simplificado (Sin jerga técnica) */}
      <section id="propuesta" style={{ padding: '2rem 1.5rem 4rem' }}>
        <div className="container" style={{ maxWidth: '1050px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
              Tu web propia + Tu motor de gestión privado
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--on-surface-variant)', margin: '0.25rem 0 0' }}>
              Una solución robusta y sencilla que se adapta exactamente al día a día de tu local.
            </p>
          </div>

          <div style={{
            background: 'var(--surface-container-lowest)',
            padding: '2.25rem',
            borderRadius: '16px',
            border: '1px solid var(--outline-variant)',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            
            {/* Columna Izquierda: Motor de Reservas */}
            <div style={{
              background: 'var(--primary)',
              color: 'var(--on-primary)',
              padding: '1.75rem',
              borderRadius: '12px',
              flex: '1 1 300px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <Database size={18} color="var(--tertiary-fixed-dim)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                  Motor de Reservas Central
                </span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={14} color="var(--tertiary-fixed-dim)" /> Cero errores: nadie puede duplicar citas
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={14} color="var(--tertiary-fixed-dim)" /> Disponibilidad calculada según tu horario
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={14} color="var(--tertiary-fixed-dim)" /> Tus clientes pueden reservar a cualquier hora (para tu horario de apertura)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={14} color="var(--tertiary-fixed-dim)" /> Datos de clientes 100% seguros y privados
                </li>
              </ul>
            </div>

            {/* Centro: Flechas y Conectores */}
            <div style={{ flex: '0 1 80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--secondary)',
                fontWeight: 700,
                textTransform: 'uppercase',
                textAlign: 'center',
                background: 'rgba(70, 72, 212, 0.08)',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(70, 72, 212, 0.2)'
              }}>
                TIEMPO REAL
              </div>
            </div>

            {/* Columna Derecha: Clientes / Webs */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              
              <div style={{
                background: 'var(--surface-container-high)',
                padding: '0.85rem 1.25rem',
                borderRadius: '10px',
                border: '1px solid var(--outline-variant)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '28px', height: '28px', background: '#f3f4f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, border: '1px solid var(--outline-variant)' }}>
                    M
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>
                    marcos.es (Barbería)
                  </span>
                </div>
                <span className="badge badge-secondary" style={{ fontSize: '10px' }}>Web Activa</span>
              </div>

              <div style={{
                background: 'var(--surface-container-high)',
                padding: '0.85rem 1.25rem',
                borderRadius: '10px',
                border: '1px solid var(--outline-variant)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '28px', height: '28px', background: '#1e293b', color: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800 }}>
                    G
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>
                    garcia.es (Clínica)
                  </span>
                </div>
                <span className="badge badge-secondary" style={{ fontSize: '10px' }}>Web Activa</span>
              </div>

              <div style={{
                background: 'var(--surface-container-high)',
                padding: '0.85rem 1.25rem',
                borderRadius: '10px',
                border: '1px solid var(--outline-variant)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '28px', height: '28px', background: '#ef4444', color: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800 }}>
                    P
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>
                    pepe.es (Fisio)
                  </span>
                </div>
                <span className="badge badge-secondary" style={{ fontSize: '10px' }}>Web Activa</span>
              </div>

              <div style={{
                background: 'var(--surface-container-high)',
                padding: '0.85rem 1.25rem',
                borderRadius: '10px',
                border: '1px solid var(--outline-variant)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '28px', height: '28px', background: '#009668', color: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800 }}>
                    O
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>
                    elolivo.es (Restaurante)
                  </span>
                </div>
                <span className="badge badge-secondary" style={{ fontSize: '10px' }}>Sala y Mesas</span>
              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};
