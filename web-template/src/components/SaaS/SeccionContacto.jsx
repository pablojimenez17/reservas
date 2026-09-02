import React from 'react';
import { MessageCircle, Mail, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const SeccionContacto = () => {
  return (
    <section id="contacto" style={{ padding: '5.5rem 1.5rem 5rem', borderTop: '1px solid var(--outline-variant)' }}>
      <div className="container" style={{ maxWidth: '950px', textAlign: 'center' }}>
        
        {/* Badge Stitch */}
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
          marginBottom: '1rem'
        }}>
          <Sparkles size={13} /> Puesta en Marcha & Contacto Directo
        </div>

        <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--primary)', letterSpacing: '-0.02em', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
          ¿Quieres solo el sistema de reservas o que te monte la web completa?
        </h2>

        <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto 3rem', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
          Escríbeme por WhatsApp o Email. Me cuentas qué negocio tienes (peluquería, clínica, fisioterapia, estética, restaurante...), te preparo el acceso o diseño y despliego tu web completa llave en mano.
        </p>

        {/* Tarjetas de Contacto: WhatsApp & Email */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', textAlign: 'left', marginBottom: '3rem' }}>
          
          {/* Tarjeta WhatsApp */}
          <div style={{
            background: 'var(--surface-container-lowest)',
            border: '2px solid var(--secondary)',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(70, 72, 212, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', margin: 0, fontFamily: 'var(--font-heading)' }}>WhatsApp Directo</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--on-tertiary-container)', fontWeight: 700 }}>● Respuesta Rápida</span>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Hablamos al momento por chat. Nos explicas cómo trabajas y te preparamos la configuración exacta para tu equipo.
              </p>
            </div>

            <a
              href="https://wa.me/34629370327?text=Hola,%20he%20visto%20la%20demo%20de%20TuCita.io%20y%20quiero%20el%20sistema%20de%20reservas%20para%20mi%20negocio."
              target="_blank"
              rel="noreferrer"
              className="btn-stitch-secondary"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
            >
              <MessageCircle size={16} /> Abrir WhatsApp Directo
            </a>
          </div>

          {/* Tarjeta Email */}
          <div style={{
            background: 'var(--surface-container-lowest)',
            border: '1px solid var(--outline-variant)',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--surface-container-high)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', margin: 0, fontFamily: 'var(--font-heading)' }}>Correo Electrónico</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--on-surface-variant)', fontWeight: 600 }}>Propuesta Detallada</span>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Escríbenos con los detalles de tu negocio y te respondemos de inmediato con la propuesta personalizada.
              </p>
            </div>

            <a
              href="mailto:pablojipri@gmail.com?subject=Interes%20en%20TuCita.io%20para%20mi%20negocio&body=Hola,%20tengo%20un%20negocio%20y%20me%20gustaria%20saber%20mas%20sobre%20el%20sistema%20de%20reservas."
              className="btn-stitch-primary"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
            >
              <Mail size={16} /> Enviar Mail
            </a>
          </div>

        </div>

        {/* Resumen de Compromiso */}
        <div style={{
          background: 'var(--surface-container-high)',
          border: '1px solid var(--outline-variant)',
          borderRadius: '10px',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          textTransform: 'uppercase',
          color: 'var(--on-surface)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} color="var(--on-tertiary-container)" /> Solo el servicio (desde 29€/mes)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} color="var(--on-tertiary-container)" /> O web completa llave en mano
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} color="var(--on-tertiary-container)" /> Puesta en marcha en 48-72h
          </span>
        </div>

      </div>
    </section>
  );
};
