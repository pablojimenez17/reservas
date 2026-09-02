import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';

export const SaaSNavbar = ({ onIrAPlayground, onIrAContacto }) => {
  return (
    <header className="glass-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Logotipo Técnico Stitch */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '6px',
            background: 'var(--primary)',
            color: 'var(--on-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: '14px',
            letterSpacing: '0.05em'
          }}>
            TC
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--primary)' }}>
            TuCita<span style={{ color: 'var(--secondary)' }}>.io</span>
          </span>
        </div>

        {/* Enlaces de Navegación */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a 
            href="#propuesta" 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: 'var(--on-surface-variant)', 
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Cómo Funciona
          </a>
          <a 
            href="#playground" 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: 'var(--secondary)', 
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Demo Sandbox
          </a>
          <a 
            href="#telefono" 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: 'var(--on-surface-variant)', 
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Llamadas
          </a>
          <a 
            href="#precios" 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: 'var(--on-surface-variant)', 
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Modelo
          </a>
          <a 
            href="#faq" 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: 'var(--on-surface-variant)', 
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            FAQ
          </a>
          <a 
            href="#contacto" 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: 'var(--on-surface-variant)', 
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Contacto
          </a>
        </nav>

        {/* Botón CTA Directo Contacto WhatsApp */}
        <div>
          <button
            onClick={onIrAContacto}
            className="btn-stitch-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <MessageCircle size={15} /> Contactar
          </button>
        </div>

      </div>
    </header>
  );
};
