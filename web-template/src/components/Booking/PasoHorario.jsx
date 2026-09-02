import React, { useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { useDisponibilidad } from '../../hooks/useDisponibilidad';

export const PasoHorario = ({
  servicioSeleccionado,
  profesionalSeleccionado,
  fechaSeleccionada,
  onSelectFecha,
  horaSeleccionada,
  onSelectHora,
  onAtras,
  onSiguiente
}) => {
  // Próximos 10 días disponibles para selección rápida
  const proximosDias = useMemo(() => {
    const dias = [];
    const hoy = new Date();
    const nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const nombresMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    for (let i = 0; i < 10; i++) {
      const d = new Date();
      d.setDate(hoy.getDate() + i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const fechaStr = `${yyyy}-${mm}-${dd}`;

      dias.push({
        fechaStr,
        diaSemana: nombresDias[d.getDay()],
        diaNumero: d.getDate(),
        mes: nombresMeses[d.getMonth()]
      });
    }
    return dias;
  }, []);

  const { slots, cerrado, mensaje, loading, error } = useDisponibilidad(
    fechaSeleccionada,
    servicioSeleccionado?.id,
    profesionalSeleccionado?.id
  );

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>3. Fecha y Hora de tu Cita</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Selecciona un día en el calendario y la hora disponible que mejor te encaje.
        </p>
      </div>

      {/* Barra de Selección de Días */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
          Días Disponibles
        </label>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem'
        }}>
          {proximosDias.map((d) => {
            const isSelected = fechaSeleccionada === d.fechaStr;
            return (
              <button
                key={d.fechaStr}
                onClick={() => {
                  onSelectFecha(d.fechaStr);
                  onSelectHora(null); // Reset hora al cambiar de día
                }}
                style={{
                  minWidth: '75px',
                  padding: '0.75rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--primary)' : 'var(--bg-surface)',
                  color: isSelected ? '#0c0f17' : 'var(--text-main)',
                  border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.8 }}>{d.diaSemana}</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{d.diaNumero}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{d.mes}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grilla de Franjas Horarias */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} color="var(--primary)" /> Horas Disponibles ({fechaSeleccionada})
          </span>
          {loading && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calculando disponibilidad...</span>
          )}
        </div>

        {cerrado ? (
          <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <AlertCircle size={32} color="#f59e0b" style={{ margin: '0 auto 0.5rem' }} />
            <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>Negocio cerrado en esta fecha</p>
            <p style={{ fontSize: '0.85rem' }}>{mensaje || 'Por favor elige otro día de apertura habitual.'}</p>
          </div>
        ) : slots.length === 0 && !loading ? (
          <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>No hay franjas horarias libres para los criterios seleccionados.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))',
            gap: '0.65rem'
          }}>
            {slots.map((s) => {
              const isSelected = horaSeleccionada === s.hora;

              return (
                <button
                  key={s.hora}
                  disabled={!s.disponible}
                  onClick={() => onSelectHora(s.hora)}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected 
                      ? 'var(--primary)' 
                      : s.disponible 
                        ? 'rgba(255, 255, 255, 0.04)' 
                        : 'rgba(255, 255, 255, 0.01)',
                    color: isSelected 
                      ? '#0c0f17' 
                      : s.disponible 
                        ? 'var(--text-main)' 
                        : 'rgba(255, 255, 255, 0.2)',
                    border: `1px solid ${isSelected ? 'var(--primary)' : s.disponible ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}`,
                    cursor: s.disponible ? 'pointer' : 'not-allowed',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading)',
                    textDecoration: s.disponible ? 'none' : 'line-through',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {s.hora}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn-secondary" onClick={onAtras}>
          Atrás
        </button>
        <button
          className="btn-primary"
          disabled={!horaSeleccionada || cerrado}
          onClick={onSiguiente}
          style={{ minWidth: '160px' }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
