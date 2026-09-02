import React, { useState } from 'react';
import { X, PhoneCall, Calendar, Clock, User, AlertCircle } from 'lucide-react';

export const NuevaReservaManualModal = ({
  isOpen,
  onClose,
  servicios,
  profesionales,
  onCrearReserva
}) => {
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    cliente_telefono: '',
    cliente_email: '',
    servicio_id: servicios[0]?.id || '',
    profesional_id: profesionales[0]?.id || '',
    fecha: new Date().toISOString().split('T')[0],
    hora: '10:00',
    notas: 'Reserva manual / Telefónica'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const serv = servicios.find(s => s.id === formData.servicio_id);
    const payload = {
      ...formData,
      duracion_minutos: serv ? serv.duracion_minutos : 45,
      origen: 'admin_manual'
    };

    const res = await onCrearReserva(payload);
    setLoading(false);

    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Error al crear la cita');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '520px', padding: '2rem', position: 'relative' }}>
        
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(var(--primary-rgb), 0.15)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <PhoneCall size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-main)' }}>Nueva Cita Manual</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Agrega citas telefónicas o presenciales al instante</p>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1rem',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Nombre del Cliente *
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="Nombre y apellido"
                value={formData.cliente_nombre}
                onChange={(e) => setFormData({ ...formData, cliente_nombre: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Teléfono Móvil *
              </label>
              <input
                type="tel"
                required
                className="input-field"
                placeholder="+34 600 000 000"
                value={formData.cliente_telefono}
                onChange={(e) => setFormData({ ...formData, cliente_telefono: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Servicio
              </label>
              <select
                className="input-field"
                value={formData.servicio_id}
                onChange={(e) => setFormData({ ...formData, servicio_id: e.target.value })}
              >
                {servicios.map(s => (
                  <option key={s.id} value={s.id} style={{ background: '#131a29' }}>
                    {s.nombre} ({s.precio}€)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Profesional
              </label>
              <select
                className="input-field"
                value={formData.profesional_id}
                onChange={(e) => setFormData({ ...formData, profesional_id: e.target.value })}
              >
                {profesionales.map(p => (
                  <option key={p.id} value={p.id} style={{ background: '#131a29' }}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Fecha
              </label>
              <input
                type="date"
                required
                className="input-field"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Hora
              </label>
              <input
                type="time"
                required
                className="input-field"
                value={formData.hora}
                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Notas Internas
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.notas}
              onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Cita'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
