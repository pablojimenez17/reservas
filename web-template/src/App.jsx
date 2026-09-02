import React, { useState, useEffect } from 'react';
import { SaaSNavbar } from './components/SaaS/SaaSNavbar';
import { SaaSHero } from './components/SaaS/SaaSHero';
import { SaaSPlayground } from './components/SaaS/SaaSPlayground';
import { SeccionTelefono } from './components/SaaS/SeccionTelefono';
import { SaaSPricing } from './components/SaaS/SaaSPricing';
import { SaaSFAQ } from './components/SaaS/SaaSFAQ';
import { SeccionContacto } from './components/SaaS/SeccionContacto';
import { SaaSFooter } from './components/SaaS/SaaSFooter';
import { WhatsAppFloat } from './components/SaaS/WhatsAppFloat';
import { BookingModal } from './components/Booking/BookingModal';
import { apiService } from './services/api';

export function App() {
  const isWidgetMode = typeof window !== 'undefined' && window.location.search.includes('widget=true');

  const [tenantInfo, setTenantInfo] = useState(null);
  const [profesionales, setProfesionales] = useState([]);

  useEffect(() => {
    if (isWidgetMode) {
      apiService.getNegocioInfo()
        .then(res => {
          setTenantInfo(res.data.data.tenant);
          setProfesionales(res.data.data.profesionales || []);
        })
        .catch(console.error);
    }
  }, [isWidgetMode]);

  // Si estamos en modo widget dentro de un iframe de una web externa, renderizar solo el booking
  if (isWidgetMode) {
    return (
      <div style={{ minHeight: '100vh', background: 'transparent', padding: '0.5rem' }}>
        <BookingModal
          isOpen={true}
          onClose={() => {}}
          tenantInfo={tenantInfo}
          profesionales={profesionales}
          isEmbedded={true}
        />
      </div>
    );
  }

  const handleScrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContacto = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Navbar Oficial Stitch */}
      <SaaSNavbar 
        onIrAPlayground={handleScrollToPlayground} 
        onIrAContacto={handleScrollToContacto} 
      />

      {/* Contenido de la Landing Page del SaaS */}
      <main style={{ flex: 1 }}>
        {/* 1. Hero Principal y Diagrama */}
        <SaaSHero 
          onIrAPlayground={handleScrollToPlayground} 
          onIrAContacto={handleScrollToContacto} 
        />

        {/* 2. Sandbox / Playground Interactivo en Vivo (4 sectores incl. Restaurantes) */}
        <SaaSPlayground />

        {/* 3. Sección: Sigue con tu número de teléfono de siempre */}
        <SeccionTelefono onIrAPlayground={handleScrollToPlayground} />

        {/* 4. Modelo de Negocio (4 Paquetes Claros) */}
        <SaaSPricing onIrAContacto={handleScrollToContacto} />

        {/* 5. Preguntas Frecuentes (FAQ) */}
        <SaaSFAQ onIrAContacto={handleScrollToContacto} />

        {/* 6. Contacto Directo WhatsApp / Email */}
        <SeccionContacto />
      </main>

      {/* Footer Oficial con la firma "by Pablo Jimenez Prieto" */}
      <SaaSFooter />

      {/* Botón Flotante Discreto de WhatsApp */}
      <WhatsAppFloat />

    </div>
  );
}

export default App;
