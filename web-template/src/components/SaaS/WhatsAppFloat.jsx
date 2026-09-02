import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloat = () => {
  const [cerrado, setCerrado] = useState(false);

  if (cerrado) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        maxWidth: 'calc(100vw - 32px)',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      <a
        href="https://wa.me/34629370327?text=Hola,%20he%20visto%20la%20demo%20de%20TuCita.io%20y%20me%20gustar%C3%ADa%20informaci%C3%B3n%20para%20mi%20negocio."
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: 'none',
          background: '#25D366',
          color: '#fff',
          padding: '0.65rem 1.15rem',
          borderRadius: '9999px',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.02em',
          border: '1.5px solid rgba(255,255,255,0.4)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <MessageCircle size={18} />
        <span>Habla con nosotros</span>
      </a>

      <button
        type="button"
        onClick={() => setCerrado(true)}
        title="Ocultar"
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'var(--surface-container-high)',
          border: '1px solid var(--outline-variant)',
          color: 'var(--on-surface-variant)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <X size={12} />
      </button>
    </div>
  );
};
