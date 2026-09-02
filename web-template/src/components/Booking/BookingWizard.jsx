import React, { useState } from 'react';
import { PasoServicios } from './PasoServicios';
import { PasoProfesional } from './PasoProfesional';
import { PasoHorario } from './PasoHorario';
import { PasoDatos } from './PasoDatos';
import { ConfirmacionTicket } from './ConfirmacionTicket';
import { apiService } from '../../services/api';
import { Check } from 'lucide-react';

export const BookingWizard = ({ tenantInfo, servicios, profesionales }) => {
  const [pasoActual, setPasoActual] = useState(1);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  
  const [reservaConfirmada, setReservaConfirmada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirmarReserva = async (datosCliente) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        cliente_nombre: datosCliente.nombre,
        cliente_telefono: datosCliente.telefono,
        cliente_email: datosCliente.email,
        notas: datosCliente.notas,
        servicio_id: servicioSeleccionado.id,
        profesional_id: profesionalSeleccionado.id === 'cualquiera' ? undefined : profesionalSeleccionado.id,
        fecha: fechaSeleccionada,
        hora: horaSeleccionada,
        duracion_minutos: servicioSeleccionado.duracion_minutos
      };

      const res = await apiService.crearReservaPublica(payload);
      setReservaConfirmada(res.data.reserva);
      setPasoActual(5);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || 'Error al confirmar la reserva. Por favor prueba con otra franja.');
    }
  };

  const handleReset = () => {
    setPasoActual(1);
    setServicioSeleccionado(null);
    setProfesionalSeleccionado(null);
    setHoraSeleccionada(null);
    setReservaConfirmada(null);
    setError(null);
  };

  const steps = [
    { num: 1, label: 'Servicio' },
    { num: 2, label: 'Especialista' },
    { num: 3, label: 'Fecha y Hora' },
    { num: 4, label: 'Tus Datos' }
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '900px' }}>
      
      {/* Indicador de Pasos (solo si no ha terminado) */}
      {pasoActual < 5 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            {/* Barra conectora */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              right: '5%',
              height: '2px',
              background: 'rgba(255,255,255,0.1)',
              zIndex: 1,
              transform: 'translateY(-50%)'
            }} />

            {steps.map((s) => {
              const isCompleted = pasoActual > s.num;
              const isCurrent = pasoActual === s.num;

              return (
                <div key={s.num} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: isCompleted ? 'var(--primary)' : isCurrent ? 'var(--bg-main)' : 'var(--bg-surface)',
                    border: `2px solid ${isCompleted || isCurrent ? 'var(--primary)' : 'var(--border-color)'}`,
                    color: isCompleted ? '#0c0f17' : isCurrent ? 'var(--primary)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    boxShadow: isCurrent ? '0 0 15px var(--primary-glow)' : 'none'
                  }}>
                    {isCompleted ? <Check size={18} strokeWidth={3} /> : s.num}
                  </div>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? 'var(--primary)' : 'var(--text-muted)'
                  }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Contenedor Principal Glassmorphism */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        {pasoActual === 1 && (
          <PasoServicios
            servicios={servicios}
            servicioSeleccionado={servicioSeleccionado}
            onSelectServicio={setServicioSeleccionado}
            onSiguiente={() => setPasoActual(2)}
          />
        )}

        {pasoActual === 2 && (
          <PasoProfesional
            profesionales={profesionales}
            profesionalSeleccionado={profesionalSeleccionado}
            onSelectProfesional={setProfesionalSeleccionado}
            onAtras={() => setPasoActual(1)}
            onSiguiente={() => setPasoActual(3)}
          />
        )}

        {pasoActual === 3 && (
          <PasoHorario
            servicioSeleccionado={servicioSeleccionado}
            profesionalSeleccionado={profesionalSeleccionado}
            fechaSeleccionada={fechaSeleccionada}
            onSelectFecha={setFechaSeleccionada}
            horaSeleccionada={horaSeleccionada}
            onSelectHora={setHoraSeleccionada}
            onAtras={() => setPasoActual(2)}
            onSiguiente={() => setPasoActual(4)}
          />
        )}

        {pasoActual === 4 && (
          <PasoDatos
            servicioSeleccionado={servicioSeleccionado}
            profesionalSeleccionado={profesionalSeleccionado}
            fechaSeleccionada={fechaSeleccionada}
            horaSeleccionada={horaSeleccionada}
            onConfirmarReserva={handleConfirmarReserva}
            onAtras={() => setPasoActual(3)}
            loading={loading}
            error={error}
          />
        )}

        {pasoActual === 5 && (
          <ConfirmacionTicket
            reserva={reservaConfirmada}
            tenantInfo={tenantInfo}
            onNuevaReserva={handleReset}
          />
        )}
      </div>

    </div>
  );
};
