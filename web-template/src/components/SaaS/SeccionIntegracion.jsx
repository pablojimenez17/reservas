import React, { useState } from 'react';
import { Code, Copy, Check, ExternalLink, Terminal } from 'lucide-react';

export const SeccionIntegracion = () => {
  const [copiado, setCopiado] = useState(false);

  const snippet = `<script src="http://localhost:5000/widget.js" data-tenant="marcos"></script>`;

  const handleCopiar = () => {
    navigator.clipboard.writeText(snippet);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <section id="integracion" style={{ padding: '5.5rem 1.5rem', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          background: 'rgba(56, 189, 248, 0.12)',
          color: '#38bdf8',
          fontSize: '0.8rem',
          fontWeight: 700,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <Code size={14} /> Integración Plug & Play
        </div>

        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Añade el botón de reserva a cualquier web existente en 30 segundos
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto 2.5rem' }}>
          ¿Tu cliente ya tiene una web hecha en WordPress, Webflow o Wix? No hay que reprogramar nada. Solo añade esta línea de código:
        </p>

        {/* Bloque de Código con estilo terminal */}
        <div style={{
          background: '#090d16',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
          textAlign: 'left',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: '#131a29',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <Terminal size={14} /> HTML / WordPress / Webflow / Wix
            </div>
            <button
              onClick={handleCopiar}
              className="btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            >
              {copiado ? <Check size={14} color="#10b981" /> : <Copy size={14} />} {copiado ? '¡Copiado!' : 'Copiar Código'}
            </button>
          </div>

          <pre style={{
            padding: '1.5rem',
            margin: 0,
            fontSize: '0.95rem',
            color: '#38bdf8',
            fontFamily: 'monospace',
            overflowX: 'auto',
            lineHeight: 1.5
          }}>
{`<!-- 1. Pega este script antes del cierre de </body> -->
<script src="http://localhost:5000/widget.js" data-tenant="TU_NEGOCIO"></script>

<!-- 2. Vincula cualquier botón existente con data-reservahub="open" -->
<button data-reservahub="open" class="tu-boton-actual">
  Pedir Cita Online
</button>`}
          </pre>
        </div>

        {/* Botón para ver demo externa */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="/ejemplo-web-existente.html"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ExternalLink size={16} color="var(--primary)" /> Ver Ejemplo de Web Externa Funcionando
          </a>
        </div>

      </div>
    </section>
  );
};
