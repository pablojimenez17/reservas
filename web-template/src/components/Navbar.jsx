import React from 'react';
import { Calendar, Lock, LogOut, MapPin, Phone } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

export const Navbar = ({ 
  tenantInfo, 
  currentView, 
  setCurrentView, 
  onAbrirReserva,
  onOpenLogin, 
  isAuthenticated, 
  adminUser, 
  onLogout 
}) => {
  const nombre = tenantInfo?.nombre || businessConfig.businessName;
  const direccion = tenantInfo?.direccion || businessConfig.address;
  const telefono = tenantInfo?.telefono || businessConfig.phone;
  const logoUrl = tenantInfo?.logo_url;

  return (
    <header className="glass-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Logo y Nombre del Negocio */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', cursor: 'pointer' }}
          onClick={() => setCurrentView('landing')}
        >
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={nombre} 
              style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
            />
          ) : (
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0c0f17',
              fontWeight: 800,
              fontSize: '1.25rem'
            }}>
              {nombre.charAt(0)}
            </div>
          )}

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>{nombre}</h1>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Verificado</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={12} /> {direccion.split(',')[0]}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Phone size={12} /> {telefono}
              </span>
            </div>
          </div>
        </div>

        {/* Enlaces de Navegación de la Web del Negocio */}
        {currentView !== 'admin' && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#quienes-somos" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
              Quiénes Somos
            </a>
            <a href="#que-hacemos" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
              Qué Hacemos
            </a>
            <a href="#equipo" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
              Equipo
            </a>
            <a href="#contacto" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
              Contacto
            </a>
          </nav>
        )}

        {/* Acciones de Navegación y Acceso Propietario */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {currentView === 'admin' ? (
            <button 
              className="btn-secondary" 
              onClick={() => setCurrentView('landing')}
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              <Calendar size={16} /> Ver Web Pública
            </button>
          ) : (
            <button 
              className="btn-primary" 
              onClick={() => onAbrirReserva(null)}
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem' }}
            >
              <Calendar size={16} strokeWidth={2.5} /> Reservar Ahora
            </button>
          )}

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {currentView !== 'admin' && (
                <button 
                  className="btn-outline-primary"
                  onClick={() => setCurrentView('admin')}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  <Lock size={15} /> Panel Propietario
                </button>
              )}
              <button 
                className="btn-secondary"
                onClick={onLogout}
                title="Cerrar Sesión"
                style={{ padding: '0.5rem 0.75rem' }}
              >
                <LogOut size={16} color="#ef4444" />
              </button>
            </div>
          ) : (
            <button 
              className="btn-secondary"
              onClick={onOpenLogin}
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              title="Acceso Propietario / Empleados"
            >
              <Lock size={15} /> /admin
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
