import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

export const Footer = ({ tenantInfo, onOpenLogin, isAuthenticated, currentView, setCurrentView }) => {
  const nombre = tenantInfo?.nombre || businessConfig.businessName;

  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '2.5rem 1.5rem',
      marginTop: 'auto',
      background: 'rgba(12, 15, 23, 0.95)',
      fontSize: '0.85rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{nombre}</strong>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Todos los derechos reservados · Sistema de Reservas Online
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <ShieldCheck size={14} color="var(--primary)" /> Powered by <strong>ReservaHub SaaS</strong>
          </span>

          {!isAuthenticated && currentView !== 'admin' && (
            <button
              onClick={onOpenLogin}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '0.8rem'
              }}
            >
              Zona Propietario
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
