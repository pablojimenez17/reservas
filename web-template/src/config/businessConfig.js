/**
 * Configuración específica del cliente inyectada vía .env
 * con selector dinámico para demostraciones locales
 */

const getUrlParam = (param) => {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

const demoParam = getUrlParam('demo') || (typeof window !== 'undefined' ? localStorage.getItem('demo_tenant') : null);

const tenantPresets = {
  marcos: {
    tenantId: 'marcos',
    businessName: 'Barbería Marcos',
    theme: 'marcos',
    phone: '+34 932 18 44 20',
    address: "Carrer del Torrent de l'Olla 84, Gràcia, Barcelona"
  },
  garcia: {
    tenantId: 'garcia',
    businessName: 'Clínica Dental García',
    theme: 'garcia',
    phone: '+34 934 51 09 88',
    address: 'Rambla de Catalunya 112, Eixample, Barcelona'
  },
  pepe: {
    tenantId: 'pepe',
    businessName: 'Fisio & Rendimiento Pepe',
    theme: 'pepe',
    phone: '+34 933 09 67 11',
    address: 'Carrer de Pallars 178, Poblenou, Barcelona'
  }
};

const activePreset = tenantPresets[demoParam] || tenantPresets.marcos;

export const businessConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  tenantId: import.meta.env.VITE_TENANT_ID || activePreset.tenantId,
  businessName: import.meta.env.VITE_BUSINESS_NAME || activePreset.businessName,
  theme: import.meta.env.VITE_THEME || activePreset.theme,
  phone: import.meta.env.VITE_PHONE || activePreset.phone,
  address: import.meta.env.VITE_ADDRESS || activePreset.address
};
