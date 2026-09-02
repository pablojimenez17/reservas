import React from 'react';
import { PhoneCall, CheckCircle2, XCircle, Zap } from 'lucide-react';

export const SeccionTelefono = ({ onIrAPlayground }) => {
  return (
    <section id="telefono" style={{ padding: '5rem 1.5rem', borderTop: '1px solid var(--outline-variant)' }}>
      <div className="container" style={{ maxWidth: '1050px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Columna Mensaje */}
          <div>
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
              color: 'var(--on-surface)',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              <PhoneCall size={13} color="var(--secondary)" /> Tu Teléfono de Toda la Vida
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--primary)', lineHeight: 1.15, marginBottom: '1.25rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
              Tú puedes seguir teniendo tu número de teléfono de siempre.
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>
              No obligues a tus clientes a cambiar de hábitos si les gusta llamar. Cuando te entre una llamada, tienes el panel delante: en 2 segundos ves qué huecos libres tienes y le transmites la hora al cliente al instante.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="var(--on-tertiary-container)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--primary)', fontSize: '0.95rem' }}>Transmitir huecos libres al segundo</strong>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                    "Tengo a las 11:30 con Paquito o a las 16:00 con Álex". Sin buscar agendas de papel ni tachar nombres con bolígrafo.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="var(--on-tertiary-container)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--primary)', fontSize: '0.95rem' }}>Apuntar citas en 3 clics</strong>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                    Escribes el nombre, el teléfono y lo que te ha pedido en las notas. La cita queda blindada para todo el equipo.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="var(--on-tertiary-container)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--primary)', fontSize: '0.95rem' }}>Control total del propietario (empleados, citas y horarios)</strong>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                    Desde tu lado de administrador puedes agregar o quitar empleados, cancelar o meter reservas y personalizar tus días y horas de apertura a tu gusto.
                  </p>
                </div>
              </div>
            </div>

            <button onClick={onIrAPlayground} className="btn-stitch-primary">
              <Zap size={14} /> Probar en el Sandbox
            </button>
          </div>

          {/* Columna Comparativa Stitch */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Antes */}
            <div style={{
              background: 'var(--surface-container-high)',
              border: '1px solid var(--outline-variant)',
              borderRadius: '10px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ba1a1a', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.65rem' }}>
                <XCircle size={15} /> Libreta de Papel / WhatsApp
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                <li>Tachar horas con boli y perder notas de lo que quería cada uno.</li>
                <li>Llamadas desatendidas mientras estás cortando el pelo o atendiendo a un paciente.</li>
                <li>Riesgo constante de doblar citas con el mismo profesional.</li>
              </ul>
            </div>

            {/* Con ReservaHub */}
            <div style={{
              background: 'var(--surface-container-lowest)',
              border: '2px solid var(--secondary)',
              borderRadius: '10px',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--secondary)', fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.75rem' }}>
                <CheckCircle2 size={16} /> Con TuCita.io
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--primary)', lineHeight: 1.7 }}>
                <li><strong>Calendario limpio:</strong> Huecos libres identificados al segundo.</li>
                <li><strong>Citas online automáticas:</strong> Quien quiera reservar a las 23:00 h lo hace sin llamarte.</li>
                <li><strong>Sincronización total:</strong> Cada empleado ve qué clientes tiene ese día.</li>
                <li><strong>Panel de Propietario:</strong> Añade o quita empleados, cancela citas y personaliza días y horas a tu gusto.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
