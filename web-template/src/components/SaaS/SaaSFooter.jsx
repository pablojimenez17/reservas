import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const SaaSFooter = () => {
  return (
    <footer style={{
      width: '100%',
      background: 'var(--surface-container)',
      color: 'var(--on-surface-variant)',
      padding: '4rem 1.5rem 2.5rem',
      borderTop: '1px solid var(--outline-variant)'
    }}>
      <div className="container" style={{ maxWidth: '1050px' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* Logo y Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '5px',
                background: 'var(--primary)',
                color: 'var(--on-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: '12px'
              }}>
                TC
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--primary)' }}>
                TuCita<span style={{ color: 'var(--secondary)' }}>.io</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--on-surface-variant)', margin: 0 }}>
              Infraestructura centralizada de reservas online y gestión de turnos para negocios locales.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.75rem' }}>
              Plataforma
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <a href="#propuesta" style={{ color: 'var(--on-surface-variant)', textDecoration: 'none' }}>Arquitectura</a>
              <a href="#playground" style={{ color: 'var(--on-surface-variant)', textDecoration: 'none' }}>Demo Sandbox</a>
              <a href="#telefono" style={{ color: 'var(--on-surface-variant)', textDecoration: 'none' }}>Gestión de Llamadas</a>
              <a href="#precios" style={{ color: 'var(--on-surface-variant)', textDecoration: 'none' }}>Modelo de Negocio</a>
            </div>
          </div>

          {/* Contacto Directo */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.75rem' }}>
              Contacto Directo
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <a href="https://wa.me/34629370327?text=Hola,%20he%20visto%20la%20demo%20de%20TuCita.io%20y%20me%20gustar%C3%ADa%20informaci%C3%B3n%20para%20mi%20negocio." target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600 }}>WhatsApp Directo</a>
              <a href="mailto:pablojipri@gmail.com?subject=Interes%20en%20TuCita.io" style={{ color: 'var(--on-surface-variant)', textDecoration: 'none' }}>Enviar Correo</a>
              <span style={{ color: 'var(--on-surface-variant)' }}>Barcelona, España</span>
            </div>
          </div>

        </div>

        {/* Barra inferior y Firma explícita solicitada */}
        <div style={{
          borderTop: '1px solid var(--outline-variant)',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>
              © {new Date().getFullYear()} TUCITA.IO · TODOS LOS DERECHOS RESERVADOS
            </span>
            <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>
              <span>Gestión de Citas Online</span>
              <span>Sincronización en Tiempo Real</span>
            </div>
          </div>

          {/* FIRMA AL FINAL DE TODO SOLICITADA POR EL USUARIO */}
          <div style={{
            marginTop: '1.5rem',
            padding: '0.85rem 2rem',
            borderRadius: '9999px',
            background: 'var(--surface-container-highest)',
            border: '1px solid var(--outline-variant)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', color: 'var(--on-surface-variant)', letterSpacing: '0.05em' }}>
              Designed & Built with precision
            </span>
            <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--primary)', letterSpacing: '-0.01em' }}>
              by Pablo Jimenez Prieto
            </strong>
          </div>

        </div>

      </div>
    </footer>
  );
};
