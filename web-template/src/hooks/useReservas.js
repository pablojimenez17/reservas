import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';

export const useReservas = (isAuthenticated) => {
  const [reservas, setReservas] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarReservas = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const [resReservas, resStats] = await Promise.all([
        apiService.getReservasAdmin(),
        apiService.getStatsAdmin()
      ]);
      setReservas(resReservas.data.data || []);
      setStats(resStats.data.stats || null);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar reservas');
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    cargarReservas();
  }, [cargarReservas]);

  const cancelarReserva = async (id) => {
    try {
      await apiService.cancelarReservaAdmin(id);
      await cargarReservas();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Error al cancelar' };
    }
  };

  const crearReservaManual = async (datos) => {
    try {
      const res = await apiService.crearReservaManual(datos);
      await cargarReservas();
      return { success: true, reserva: res.data.reserva };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Error al crear reserva' };
    }
  };

  return {
    reservas,
    stats,
    loading,
    error,
    recargar: cargarReservas,
    cancelarReserva,
    crearReservaManual
  };
};
