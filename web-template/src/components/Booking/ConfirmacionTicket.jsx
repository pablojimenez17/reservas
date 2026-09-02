import React from 'react';
import { CheckCircle2, Calendar, Clock, User, MapPin, Printer, RotateCcw } from 'lucide-react';

export const ConfirmacionTicket = ({ reserva, tenantInfo, onNuevaReserva }) => {
  const nombreNegocio = tenantInfo?.nombre || 'ReservaHub';
  const direccion = tenantInfo?.direccion || 'Centro Oficial';

  // Generar enlace dinámico para Google Calendar
  const generarGoogleCalendarUrl = () => {
    if (!reserva) return '#';
    const fechaLimpia = reserva.fecha.replace(/-/g, '');
    const horaInicioLimpia = reserva.hora.substring(0, 5).replace(':', '') + '00';
    
    // Sumar duración en minutos para hora fin aproximada
    const [h, m] = reserva.hora.split(':').map(Number);
    const duracion = Number(reserva.duracion_minutos) || 45;
    const finDate = new Date(2026, 0, 1, h, m + duracion);
    const finH = String(finDate.getHours()).padStart(2, '0');
    const finM = String(finDate.getMinutes()).padStart(2, '0');
    const horaFinLimpia = `${finH}${finM}00`;

    const title = encodeURIComponent(`Cita en ${nombreNegocio}`);
    const details = encodeURIComponent(`Cita confirmada para ${reserva.cliente_nombre}. Código de reserva: ${reserva.id}`);
    const location = encodeURIComponent(direccion);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fechaLimpia}T${horaInicioLimpia}/${fechaLimpia}T${horaFinLimpia}&details=${details}&location=${location}`;
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      
      {/* Icono de éxito */}
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: 'rgba(16, 185, 129, 0.15)',
        border: '2px solid rgba(16, 185, 129, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
        color: '#10b981'
      }}>
        <CheckCircle2 size={42} strokeWidth={2.5} />
      </div>

      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
        ¡Reserva Confirmada!
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Hemos enviado los detalles y recordatorio de tu cita a tu teléfono / email.
      </p>

      {/* Ticket / Tarjeta Imprimible */}
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '2rem',
        textAlign: 'left',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Barra de color de marca */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'var(--primary)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>{nombreNegocio}</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
              <MapPin size={13} /> {direccion}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>LOCALIZADOR</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>
              {reserva?.id?.substring(0, 12).toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>CLIENTE</span>
            <strong style={{ color: 'var(--text-main)' }}>{reserva?.cliente_nombre}</strong>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{reserva?.cliente_telefono}</div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>FECHA Y HORA</span>
            <strong style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={14} /> {reserva?.fecha}
            </strong>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={14} /> {reserva?.hora?.substring(0, 5)} h
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ¿Necesitas cancelar o modificar tu cita? Guarda este enlace seguro: <br/>
          <code style={{ color: 'var(--primary)', wordBreak: 'break-all' }}>
            Token: {reserva?.token_cancelacion}
          </code>
        </div>
      </div>

      {/* Acciones */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <a
          href={generarGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ textDecoration: 'none' }}
        >
          <Calendar size={16} /> Añadir a Google Calendar
        </a>
        <button className="btn-secondary" onClick={() => window.print()}>
          <Printer size={16} /> Imprimir Cita
        </button>
        <button className="btn-secondary" onClick={onNuevaReserva}>
          <RotateCcw size={16} /> Nueva Reserva
        </button>
      </div>

    </div>
  );
};
