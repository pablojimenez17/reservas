import React from 'react';
import { Clock, Check } from 'lucide-react';

export const PasoServicios = ({ servicios, servicioSeleccionado, onSelectServicio, onSiguiente }) => {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>1. Selecciona tu Servicio</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Elige el tratamiento o servicio que deseas reservar.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {servicios.map((serv) => {
          const isSelected = servicioSeleccionado?.id === serv.id;

          return (
            <div
              key={serv.id}
              onClick={() => onSelectServicio(serv)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'rgba(var(--primary-rgb), 0.08)' : 'var(--bg-surface)',
                border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 20px var(--primary-glow)' : 'none'
              }}
            >
              <div style={{ flex: 1, paddingRight: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                    {serv.nombre}
                  </h3>
                  <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Clock size={11} /> {serv.duracion_minutos} min
                  </span>
                </div>
                {serv.descripcion && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                    {serv.descripcion}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                    {Number(serv.precio) === 0 ? 'Gratis' : `${serv.precio}€`}
                  </span>
                </div>

                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: isSelected ? 'var(--primary)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0c0f17'
                }}>
                  {isSelected && <Check size={16} strokeWidth={3} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="btn-primary"
          disabled={!servicioSeleccionado}
          onClick={onSiguiente}
          style={{ minWidth: '160px' }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
