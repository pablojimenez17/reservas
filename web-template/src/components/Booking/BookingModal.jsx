import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Check, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { PasoProfesional } from './PasoProfesional';
import { PasoHorario } from './PasoHorario';
import { ConfirmacionTicket } from './ConfirmacionTicket';
import { apiService } from '../../services/api';

export const BookingModal = ({
  isOpen,
  onClose,
  tenantInfo,
  profesionales,
  profesionalInicial,
  isEmbedded = false
}) => {
  const [paso, setPaso] = useState(1);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicioDeseado: '' // El cliente especifica libremente aquí el servicio en vez de elegirlo de un catálogo rígido
  });

  const [reservaConfirmada, setReservaConfirmada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Inicializar profesional si se pasó uno preseleccionado
  useEffect(() => {
    if (profesionalInicial) {
      setProfesionalSeleccionado(profesionalInicial);
      setPaso(2); // Saltar directamente a la fecha si ya eligió profesional
    } else {
      setProfesionalSeleccionado(null);
      setPaso(1);
    }
  }, [profesionalInicial, isOpen]);

  if (!isOpen) return null;

  const handleConfirmar = async (e) => {
    e.preventDefault();
    if (!datosCliente.nombre.trim() || !datosCliente.telefono.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        cliente_nombre: datosCliente.nombre,
        cliente_telefono: datosCliente.telefono,
        cliente_email: datosCliente.email,
        profesional_id: profesionalSeleccionado?.id === 'cualquiera' ? undefined : profesionalSeleccionado?.id,
        fecha: fechaSeleccionada,
        hora: horaSeleccionada,
        duracion_minutos: 45,
        notas: datosCliente.servicioDeseado || 'Servicio estándar' // Guardamos aquí el servicio especificado por el usuario
      };

      const res = await apiService.crearReservaPublica(payload);
      setReservaConfirmada(res.data.reserva);
      setPaso(4); // Pantalla de confirmación
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || 'No se ha podido confirmar la cita. Por favor prueba con otra franja.');
    }
  };

  const handleReset = () => {
    setPaso(1);
    setProfesionalSeleccionado(null);
    setHoraSeleccionada(null);
    setDatosCliente({ nombre: '', telefono: '', email: '', servicioDeseado: '' });
    setReservaConfirmada(null);
    setError(null);
  };

  return (
    <div style={isEmbedded ? { padding: '1rem', width: '100%', height: '100%' } : {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div className="glass-card animate-fade-in" style={{
        width: '100%',
        maxWidth: paso === 4 ? '680px' : '750px',
        maxHeight: isEmbedded ? '100%' : '90vh',
        overflowY: 'auto',
        padding: isEmbedded ? '1.5rem 1rem' : '2.5rem 2rem',
        position: 'relative'
      }}>
        
        {/* Botón Cerrar */}
        {!isEmbedded && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={18} />
          </button>
        )}

        {/* Barra de Progreso del Modal (Pasos 1 a 3) */}
        {paso < 4 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Paso {paso} de 3
            </span>
            <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: paso === 1 ? '33%' : paso === 2 ? '66%' : '100%',
                background: 'var(--primary)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}

        {/* PASO 1: Elegir Especialista */}
        {paso === 1 && (
          <PasoProfesional
            profesionales={profesionales}
            profesionalSeleccionado={profesionalSeleccionado}
            onSelectProfesional={setProfesionalSeleccionado}
            onAtras={onClose}
            onSiguiente={() => setPaso(2)}
          />
        )}

        {/* PASO 2: Elegir Fecha y Franja Horaria */}
        {paso === 2 && (
          <PasoHorario
            servicioSeleccionado={{ duracion_minutos: 45 }}
            profesionalSeleccionado={profesionalSeleccionado}
            fechaSeleccionada={fechaSeleccionada}
            onSelectFecha={setFechaSeleccionada}
            horaSeleccionada={horaSeleccionada}
            onSelectHora={setHoraSeleccionada}
            onAtras={() => setPaso(1)}
            onSiguiente={() => setPaso(3)}
          />
        )}

        {/* PASO 3: Tus Datos y Qué Servicio Necesitas */}
        {paso === 3 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>
                Tus Datos y Servicio
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Indícanos tu contacto y qué te gustaría hacerte durante tu cita.
              </p>
            </div>

            <form onSubmit={handleConfirmar}>
              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem'
                }}>
                  {error}
                </div>
              )}

              {/* Resumen de fecha y barbero elegido */}
              <div style={{
                background: 'var(--bg-surface)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    {profesionalSeleccionado?.nombre || 'Cualquier especialista'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{fechaSeleccionada}</span>
                  <Clock size={16} color="var(--primary)" style={{ marginLeft: '0.5rem' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700 }}>
                    {horaSeleccionada} h
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="Ej. Carlos Ramos"
                    value={datosCliente.nombre}
                    onChange={(e) => setDatosCliente({ ...datosCliente, nombre: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Teléfono Móvil (para recordatorio) *
                  </label>
                  <input
                    type="tel"
                    required
                    className="input-field"
                    placeholder="+34 600 000 000"
                    value={datosCliente.telefono}
                    onChange={(e) => setDatosCliente({ ...datosCliente, telefono: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Email (opcional, para justificante)
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="carlos@email.com"
                  value={datosCliente.email}
                  onChange={(e) => setDatosCliente({ ...datosCliente, email: e.target.value })}
                />
              </div>

              {/* CAMPO ESTRELLA: Especificar el servicio libremente en notas */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.35rem' }}>
                  ✂️ ¿Qué servicio o arreglo necesitas? (Especifícalo en tus notas)
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  required
                  placeholder="Ej: Corte clásico degradado con tijera arriba y arreglo de barba con toalla caliente..."
                  value={datosCliente.servicioDeseado}
                  onChange={(e) => setDatosCliente({ ...datosCliente, servicioDeseado: e.target.value })}
                  style={{ fontSize: '0.95rem', lineHeight: 1.5 }}
                />
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  Escribe libremente todo lo que quieras que tu especialista prepare para tu cita.
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button type="button" className="btn-secondary" onClick={() => setPaso(2)} disabled={loading}>
                  Atrás
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading || !datosCliente.nombre.trim() || !datosCliente.telefono.trim()}
                  style={{ minWidth: '180px' }}
                >
                  {loading ? 'Confirmando...' : 'Confirmar Cita Ahora'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PASO 4: Confirmación con Ticket Imprimible y Enlace a Calendar */}
        {paso === 4 && (
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
