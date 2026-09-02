/**
 * ReservaHub - Universal Booking Widget
 * Permite integrar el sistema de reservas en CUALQUIER web existente (WordPress, Webflow, Wix, HTML, etc.)
 * Uso: <script src="http://localhost:5000/widget.js" data-tenant="marcos"></script>
 */
(function() {
  // Obtener el script actual para leer el data-tenant
  const currentScript = document.currentScript || document.querySelector('script[data-tenant]');
  const tenantSlug = currentScript?.getAttribute('data-tenant') || 'marcos';
  const apiUrl = currentScript?.getAttribute('data-api-url') || 'http://localhost:5000';
  const frontendUrl = currentScript?.getAttribute('data-frontend-url') || 'http://localhost:3000';

  // 1. Inyectar estilos del botón flotante y modal
  const style = document.createElement('style');
  style.textContent = `
    .reservahub-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(6px);
      z-index: 999999;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .reservahub-modal-overlay.active {
      display: flex;
      opacity: 1;
    }
    .reservahub-modal-container {
      width: 95%;
      max-width: 620px;
      height: 85vh;
      max-height: 720px;
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      position: relative;
    }
    .reservahub-close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: all 0.2s;
    }
    .reservahub-close-btn:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    .reservahub-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .reservahub-floating-btn {
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: #0c0f17;
      font-weight: 700;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 14px 22px;
      border-radius: 50px;
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
      border: none;
      cursor: pointer;
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .reservahub-floating-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px rgba(245, 158, 11, 0.55);
    }
  `;
  document.head.appendChild(style);

  // 2. Crear el overlay y contenedor del modal
  const overlay = document.createElement('div');
  overlay.className = 'reservahub-modal-overlay';
  overlay.id = 'reservahub-modal';
  
  const container = document.createElement('div');
  container.className = 'reservahub-modal-container';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'reservahub-close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => overlay.classList.remove('active');

  const iframe = document.createElement('iframe');
  iframe.className = 'reservahub-iframe';
  iframe.src = `${frontendUrl}/?demo=${tenantSlug}&widget=true`;

  container.appendChild(closeBtn);
  container.appendChild(iframe);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  // Cerrar al pulsar fuera
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  };

  // Función pública para abrir el modal
  window.abrirReservaHub = function() {
    overlay.classList.add('active');
  };

  // 3. Vincular cualquier botón existente en la web con data-reservahub="open" o clase .btn-reservar
  document.addEventListener('click', function(e) {
    if (
      e.target.closest('[data-reservahub="open"]') || 
      e.target.closest('.reservahub-btn') || 
      e.target.closest('#reservar-ahora-btn')
    ) {
      e.preventDefault();
      window.abrirReservaHub();
    }
  });

  // 4. Si el script no tiene data-no-floating="true", añadir botón flotante automático
  if (!currentScript?.hasAttribute('data-no-floating')) {
    const floatingBtn = document.createElement('button');
    floatingBtn.className = 'reservahub-floating-btn';
    floatingBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      Reservar Cita
    `;
    floatingBtn.onclick = window.abrirReservaHub;
    document.body.appendChild(floatingBtn);
  }

  console.log(`✅ [ReservaHub] Widget de reservas cargado con éxito para tenant: "${tenantSlug}".`);
})();
