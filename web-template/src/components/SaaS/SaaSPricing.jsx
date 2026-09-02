import React from 'react';
import { Check, TrendingUp, Sparkles, MessageCircle } from 'lucide-react';

export const SaaSPricing = ({ onIrAContacto }) => {
  return (
    <section id="precios" style={{ padding: '5rem 1.5rem', borderTop: '1px solid var(--outline-variant)' }}>
      <div className="container" style={{ maxWidth: '1150px' }}>
        
        {/* Cabecera del Modelo de Negocio */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--primary)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', margin: 0 }}>
              Modelo de Negocio
            </h2>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '1rem', marginTop: '0.35rem' }}>
              Elige solo el servicio para tu web/redes, o encarga tu web completa llave en mano.
            </p>
          </div>

          <div style={{
            background: 'rgba(0, 150, 104, 0.1)',
            color: 'var(--on-tertiary-container)',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: '1px solid rgba(0, 150, 104, 0.3)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            textTransform: 'uppercase',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <TrendingUp size={15} /> 4 Opciones Transparentes
          </div>
        </div>

        {/* 4 Paquetes: 2 de Solo Servicio + 2 de Web */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.25rem',
          alignItems: 'stretch'
        }}>
          
          {/* 1. Solo Servicio Normal */}
          <div style={{
            background: 'var(--surface-container)',
            padding: '1.75rem',
            borderRadius: '12px',
            border: '1px solid var(--outline-variant)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
                <span className="badge" style={{ background: 'var(--surface-container-high)', color: 'var(--on-surface-variant)', marginBottom: '0.5rem', fontSize: '10px' }}>
                  Solo Servicio
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)', margin: '0 0 0.2rem' }}>
                  Servicio Básico
                </h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.8rem', margin: 0, minHeight: '36px' }}>
                  Para negocios que ya tienen web o lo usan por Instagram/WhatsApp.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--on-surface-variant)', fontSize: '13px' }}>
                  <span>Web</span>
                  <span>Ya tienes web</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontSize: '16px', fontWeight: 800 }}>
                  <span>Cuota</span>
                  <span>29€/mes</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--primary)" /> Reservas online sin límite (dentro de tu horario)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--primary)" /> Enlace directo para tus clientes
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--primary)" /> Agenda individual para cada profesional
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--primary)" /> Apuntar llamadas en local en 3 clics
                </li>
              </ul>
            </div>

            <button onClick={onIrAContacto} className="btn-stitch-outline" style={{ marginTop: '1.75rem', width: '100%', fontSize: '11px', padding: '0.65rem 0.5rem' }}>
              Pedir Solo Servicio (29€)
            </button>
          </div>

          {/* 2. Servicio Prioritario */}
          <div style={{
            background: 'var(--surface-container)',
            padding: '1.75rem',
            borderRadius: '12px',
            border: '1px solid var(--outline-variant)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
                <span className="badge badge-secondary" style={{ marginBottom: '0.5rem', fontSize: '10px' }}>
                  Soporte VIP
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)', margin: '0 0 0.2rem' }}>
                  Servicio Prioritario
                </h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.8rem', margin: 0, minHeight: '36px' }}>
                  Solo el sistema pero con soporte directo preferente para cualquier duda.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--on-surface-variant)', fontSize: '13px' }}>
                  <span>Web</span>
                  <span>Ya tienes web</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--secondary)', fontSize: '16px', fontWeight: 800 }}>
                  <span>Cuota</span>
                  <span>49€/mes</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--secondary)" /> Todo lo del Servicio Básico
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--secondary)" /> <strong>Soporte prioritario con nosotros</strong>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--secondary)" /> Configuramos festivos, vacaciones o personal por ti
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--secondary)" /> Respuesta preferente por chat
                </li>
              </ul>
            </div>

            <button onClick={onIrAContacto} className="btn-stitch-outline" style={{ marginTop: '1.75rem', width: '100%', fontSize: '11px', padding: '0.65rem 0.5rem' }}>
              Pedir Prioritario (49€)
            </button>
          </div>

          {/* 3. Web Template (Pack Web Lite) */}
          <div style={{
            background: 'var(--surface-container)',
            padding: '1.75rem',
            borderRadius: '12px',
            border: '1px solid var(--outline-variant)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
                <span className="badge" style={{ background: 'var(--surface-container-high)', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '10px' }}>
                  Web + Servicio
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)', margin: '0 0 0.2rem' }}>
                  Web Template
                </h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.8rem', margin: 0, minHeight: '36px' }}>
                  Puesta en marcha rápida con plantilla probada y motor de citas.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontSize: '14px', fontWeight: 700 }}>
                  <span>Web + Setup</span>
                  <span>299€</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--secondary)', fontSize: '14px', fontWeight: 700 }}>
                  <span>Servicio</span>
                  <span>29€/mes</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--primary)" /> Web optimizada lista en 48-72h
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--primary)" /> Adaptada con tus colores y fotos
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--primary)" /> Sistema de reservas integrado
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--primary)" /> Agenda individual para cada profesional
                </li>
              </ul>
            </div>

            <button onClick={onIrAContacto} className="btn-stitch-outline" style={{ marginTop: '1.75rem', width: '100%', fontSize: '11px', padding: '0.65rem 0.5rem' }}>
              Elegir Web Lite (299€)
            </button>
          </div>

          {/* 4. Web a Medida (Pack Web Premium) */}
          <div style={{
            background: 'var(--surface-container-lowest)',
            padding: '1.75rem',
            borderRadius: '12px',
            border: '2px solid var(--secondary)',
            boxShadow: 'var(--shadow-elevated)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{
              position: 'absolute',
              top: '-11px',
              right: '16px',
              background: 'var(--secondary)',
              color: 'var(--on-secondary)',
              padding: '2px 10px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}>
              Más Completo
            </div>

            <div>
              <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
                <span className="badge badge-secondary" style={{ marginBottom: '0.5rem', fontSize: '10px' }}>
                  Web a Medida + VIP
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)', margin: '0 0 0.2rem' }}>
                  Web a Medida
                </h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.8rem', margin: 0, minHeight: '36px' }}>
                  Diseño único a medida con dominio y soporte prioritario incluido.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontSize: '14px', fontWeight: 700 }}>
                  <span>Web Custom</span>
                  <span>599€</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--secondary)', fontSize: '14px', fontWeight: 700 }}>
                  <span>Servicio + VIP</span>
                  <span>+49€/mes</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--secondary)" /> Diseño web exclusivo 100% a medida
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--secondary)" /> Dominio propio (.es / .com)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--secondary)" /> Motor de reservas sin límites
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={15} color="var(--secondary)" /> <strong>Soporte prioritario con nosotros</strong>
                </li>
              </ul>
            </div>

            <button onClick={onIrAContacto} className="btn-stitch-secondary" style={{ marginTop: '1.75rem', width: '100%', fontSize: '11px', padding: '0.65rem 0.5rem' }}>
              Elegir Web Premium (599€)
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
