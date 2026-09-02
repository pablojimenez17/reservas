import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useDisponibilidad = (fecha, servicioId, profesionalId) => {
  const [slots, setSlots] = useState([]);
  const [cerrado, setCerrado] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fecha) {
      setSlots([]);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    apiService.getDisponibilidad(fecha, servicioId, profesionalId)
      .then(res => {
        if (!isMounted) return;
        const data = res.data.data;
        setCerrado(data.cerrado || false);
        setMensaje(data.mensaje || '');
        setSlots(data.slots || []);
        setLoading(false);
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err.response?.data?.error || 'Error consultando disponibilidad');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fecha, servicioId, profesionalId]);

  return { slots, cerrado, mensaje, loading, error };
};
