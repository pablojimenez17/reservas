import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const faqs = [
  {
    pregunta: '¿Tengo algún tipo de compromiso o permanencia?',
    respuesta: 'Cero permanencia. El servicio funciona mes a mes. Puedes pausar o cancelar tu suscripción cuando quieras avisándome por WhatsApp o correo sin penalizaciones ni letras pequeñas.'
  },
  {
    pregunta: 'Si ya tengo web o solo uso Instagram y Google Maps, ¿cómo reservan mis clientes?',
    respuesta: 'Te entregamos tu enlace directo personalizado. Puedes colocarlo en el botón "Reservar" de tu perfil de Instagram, en la ficha de tu negocio en Google Maps o enviarlo por WhatsApp. Tus clientes reservan en 3 clics sin instalarse ninguna app.'
  },
  {
    pregunta: '¿Puedo probar el sistema con mi propio negocio antes de pagar nada?',
    respuesta: 'Sí. Escríbeme por WhatsApp y te creo un acceso de prueba con tu logotipo, tus profesionales/mesas y tus servicios reales para que compruebes cómo funciona antes de tomar cualquier decisión.'
  },
  {
    pregunta: 'Para restaurantes: ¿Cómo gestiona el sistema las mesas y el aforo?',
    respuesta: 'Tú defines cuántas mesas tienes de 2, 4, 6 o más personas. Cuando un cliente reserva para 4 comensales, el motor bloquea una mesa de 4 en ese turno. Si se llenan todas las mesas de ese tamaño, el sistema no permite doblar mesas evitando la sobreocupación.'
  },
  {
    pregunta: '¿Qué pasa si tengo que cambiar horarios por vacaciones, festivos o contratar a alguien?',
    respuesta: 'Desde tu panel de propietario puedes activar o desactivar días, cambiar franjas y dar de alta empleados en 2 clics. Además, con el soporte prioritario, basta con que nos escribas por WhatsApp y te lo dejamos configurado en minutos.'
  }
];

export const SaaSFAQ = ({ onIrAContacto }) => {
  const [abiertos, setAbiertos] = useState({ 0: true });

  const toggleFaq = (index) => {
    setAbiertos(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="faq" style={{ padding: '5rem 1.5rem', borderTop: '1px solid var(--outline-variant)' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        
        {/* Cabecera FAQ */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '4px 14px',
            borderRadius: '9999px',
            background: 'var(--surface-container-high)',
            border: '1px solid var(--outline-variant)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}>
            <HelpCircle size={13} /> Preguntas Frecuentes
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--primary)', letterSpacing: '-0.02em', margin: '0 0 0.5rem', fontFamily: 'var(--font-heading)' }}>
            Respuestas claras a tus dudas
          </h2>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '1rem', margin: 0 }}>
            Todo lo que necesitas saber antes de poner en marcha tu sistema de reservas.
          </p>
        </div>

        {/* Acordeón de FAQs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqs.map((faq, index) => {
            const estaAbierto = !!abiertos[index];

            return (
              <div
                key={index}
                style={{
                  background: 'var(--surface-container-lowest)',
                  border: `1px solid ${estaAbierto ? 'var(--secondary)' : 'var(--outline-variant)'}`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                  boxShadow: estaAbierto ? '0 4px 12px rgba(70, 72, 212, 0.04)' : 'none'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '1rem'
                  }}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>
                    {faq.pregunta}
                  </span>
                  <div style={{ color: 'var(--secondary)', flexShrink: 0 }}>
                    {estaAbierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {estaAbierto && (
                  <div style={{
                    padding: '0 1.5rem 1.35rem',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    color: 'var(--on-surface-variant)',
                    borderTop: '1px solid var(--outline-variant)',
                    paddingTop: '1rem'
                  }}>
                    {faq.respuesta}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bloque CTA inferior FAQ */}
        <div style={{
          marginTop: '2.5rem',
          textAlign: 'center',
          background: 'var(--surface-container-high)',
          border: '1px solid var(--outline-variant)',
          borderRadius: '10px',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ fontSize: '1rem', color: 'var(--primary)', display: 'block' }}>
              ¿Tienes otra pregunta sobre tu negocio en particular?
            </strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
              Escríbeme directamente y lo resolvemos en 5 minutos.
            </span>
          </div>

          <button
            type="button"
            onClick={onIrAContacto}
            className="btn-stitch-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1rem', fontSize: '12px' }}
          >
            <MessageCircle size={14} /> Preguntar por WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
};
