import React, { useState } from 'react';
import { ShieldCheck, Calendar, Clock, User, CheckCircle2 } from 'lucide-react';

export const PasoDatos = ({
  servicioSeleccionado,
  profesionalSeleccionado,
  fechaSeleccionada,
  horaSeleccionada,
  onConfirmarReserva,
  onAtras,
  loading,
  error
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    notas: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.telefono.trim()) return;

    onConfirmarReserva(formData);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>4. Tus Datos de Contacto</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Solo necesitamos tu nombre y teléfono para confirmar tu cita. ¡Sin contraseñas!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Formulario de Datos */}
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1rem',
              fontSize: '0.85rem'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Nombre y Apellidos *
            </label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="Ej. Laura Vidal"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Teléfono Móvil (para recordatorio SMS) *
            </label>
            <input
              type="tel"
              required
              className="input-field"
              placeholder="+34 600 000 000"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Email (opcional, para recibir tu justificante)
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Notas o peticiones especiales
            </label>
            <textarea
              className="input-field"
              rows={2}
              placeholder="Ej: Si es posible con degradado medio, o primera vez en el centro..."
              value={formData.notas}
              onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <ShieldCheck size={16} color="var(--primary)" />
            Tus datos están protegidos y solo se utilizarán para la gestión de tu cita.
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" className="btn-secondary" onClick={onAtras} disabled={loading}>
              Atrás
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading || !formData.nombre.trim() || !formData.telefono.trim()}
              style={{ minWidth: '180px' }}
            >
              {loading ? 'Confirmando...' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>

        {/* Resumen Lateral */}
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            Resumen de tu Cita
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>SERVICIO</span>
              <strong style={{ color: 'var(--text-main)', fontSize: '1rem' }}>{servicioSeleccionado?.nombre}</strong>
              <div style={{ color: 'var(--primary)', fontWeight: 700, marginTop: '0.2rem' }}>
                {Number(servicioSeleccionado?.precio) === 0 ? 'Gratis' : `${servicioSeleccionado?.precio}€`}
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>ESPECIALISTA</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)' }}>
                <User size={15} color="var(--primary)" /> {profesionalSeleccionado?.nombre}
              </span>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>FECHA Y HORA</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontWeight: 600 }}>
                <Calendar size={15} color="var(--primary)" /> {fechaSeleccionada}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '0.25rem' }}>
                <Clock size={15} color="var(--primary)" /> {horaSeleccionada} h ({servicioSeleccionado?.duracion_minutos} min)
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
