import axios from 'axios';
import { businessConfig } from '../config/businessConfig';

// Cliente HTTP configurado para consumir la API centralizada
export const apiClient = axios.create({
  baseURL: businessConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-Tenant-Id': businessConfig.tenantId
  }
});

// Interceptor que inyecta automáticamente el JWT de admin si existe
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(`reservahub_token_${businessConfig.tenantId}`);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Métodos del API
export const apiService = {
  // Públicos (web de cliente)
  getNegocioInfo: () => apiClient.get('/api/public/negocio'),
  getDisponibilidad: (fecha, servicioId, profesionalId) => 
    apiClient.get('/api/public/disponibilidad', {
      params: { fecha, servicio_id: servicioId, profesional_id: profesionalId }
    }),
  crearReservaPublica: (datosReserva) => apiClient.post('/api/public/reservas', datosReserva),
  cancelarPorToken: (token) => apiClient.post('/api/public/cancelar', { token }),

  // Auth
  loginAdmin: (email, password) => apiClient.post('/auth/login', { email, password }),

  // Privados (panel admin)
  getReservasAdmin: (params = {}) => apiClient.get('/api/reservas', { params }),
  crearReservaManual: (datos) => apiClient.post('/api/reservas', datos),
  cancelarReservaAdmin: (id) => apiClient.patch(`/api/reservas/${id}/cancelar`),
  getStatsAdmin: () => apiClient.get('/api/stats')
};
