import React, { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';

export const SaaSNavbar = ({ onIrAPlayground, onIrAContacto }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLinkClick = (hash) => {
    setMenuAbierto(false);
    if (hash === '#playground' && onIrAPlayground) {
      onIrAPlayground();
    } else if (hash === '#contacto' && onIrAContacto) {
      onIrAContacto();
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="glass-header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        
        {/* Logotipo Técnico Stitch */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
          onClick={() => { setMenuAbierto(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: 'var(--primary)',
            color: 'var(--on-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: '13px',
            letterSpacing: '0.05em'
          }}>
            TC
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--primary)' }}>
            TuCita<span style={{ color: 'var(--secondary)' }}>.io</span>
          </span>
        </div>

        {/* Enlaces de Navegación Desktop */}
        <nav className="nav-links-desktop" style={{ alignItems: 'center', gap: '1.75rem' }}>
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

        {/* Botón CTA Desktop */}
        <div className="nav-links-desktop">
          <button
            onClick={onIrAContacto}
            className="btn-stitch-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.9rem', fontSize: '11px' }}
          >
            <MessageCircle size={14} /> Contactar
          </button>
        </div>

        {/* Botón Menú Hamburguesa para Móviles */}
        <div className="nav-hamburger-mobile">
          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
            style={{
              background: 'var(--surface-container-high)',
              border: '1px solid var(--outline-variant)',
              borderRadius: '6px',
              padding: '6px',
              color: 'var(--primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {menuAbierto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Menú Desplegable Móvil */}
      {menuAbierto && (
        <div 
          className="animate-fade-in"
          style={{
            background: 'var(--surface-container-lowest)',
            borderBottom: '2px solid var(--secondary)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            padding: '1.25rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <button
            type="button"
            onClick={() => handleLinkClick('#propuesta')}
            style={{ textAlign: 'left', background: 'transparent', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, padding: '0.4rem 0', cursor: 'pointer' }}
          >
            ● Cómo Funciona
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('#playground')}
            style={{ textAlign: 'left', background: 'transparent', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 700, padding: '0.4rem 0', cursor: 'pointer' }}
          >
            ● Probar Demo Sandbox
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('#telefono')}
            style={{ textAlign: 'left', background: 'transparent', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, padding: '0.4rem 0', cursor: 'pointer' }}
          >
            ● Atención Telefónica
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('#precios')}
            style={{ textAlign: 'left', background: 'transparent', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, padding: '0.4rem 0', cursor: 'pointer' }}
          >
            ● Precios y Paquetes
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('#faq')}
            style={{ textAlign: 'left', background: 'transparent', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, padding: '0.4rem 0', cursor: 'pointer' }}
          >
            ● Preguntas Frecuentes (FAQ)
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('#contacto')}
            className="btn-stitch-primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <MessageCircle size={16} /> Contactar por WhatsApp
          </button>
        </div>
      )}
    </header>
  );
};
