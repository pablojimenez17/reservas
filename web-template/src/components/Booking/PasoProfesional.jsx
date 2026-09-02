import React from 'react';
import { UserCheck, Users, Check } from 'lucide-react';

export const PasoProfesional = ({ profesionales, profesionalSeleccionado, onSelectProfesional, onAtras, onSiguiente }) => {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>2. Elige a tu Especialista</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Puedes elegir un profesional concreto o seleccionar el primer especialista disponible.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        
        {/* Opción 'Cualquiera disponible' */}
        <div
          onClick={() => onSelectProfesional({ id: 'cualquiera', nombre: 'Cualquier profesional disponible' })}
          style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            background: profesionalSeleccionado?.id === 'cualquiera' ? 'rgba(var(--primary-rgb), 0.08)' : 'var(--bg-surface)',
            border: `2px solid ${profesionalSeleccionado?.id === 'cualquiera' ? 'var(--primary)' : 'var(--border-color)'}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <Users size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>Cualquier especialista</h4>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mayor disponibilidad horaria</p>
          </div>
          {profesionalSeleccionado?.id === 'cualquiera' && (
            <Check size={20} color="var(--primary)" />
          )}
        </div>

        {/* Lista de Profesionales individuales */}
        {profesionales.map((prof) => {
          const isSelected = profesionalSeleccionado?.id === prof.id;

          return (
            <div
              key={prof.id}
              onClick={() => onSelectProfesional(prof)}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'rgba(var(--primary-rgb), 0.08)' : 'var(--bg-surface)',
                border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.2s ease'
              }}
            >
              <img
                src={prof.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'}
                alt={prof.nombre}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)'
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>{prof.nombre}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{prof.especialidad}</p>
              </div>
              {isSelected && <Check size={20} color="var(--primary)" />}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn-secondary" onClick={onAtras}>
          Atrás
        </button>
        <button
          className="btn-primary"
          disabled={!profesionalSeleccionado}
          onClick={onSiguiente}
          style={{ minWidth: '160px' }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
