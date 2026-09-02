const db = require('../config/database');

/**
 * Convierte 'HH:MM:SS' o 'HH:MM' a minutos desde las 00:00
 */
function timeToMinutes(timeStr) {
  const parts = timeStr.split(':').map(Number);
  return parts[0] * 60 + parts[1];
}

/**
 * Convierte minutos a 'HH:MM'
 */
function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const minutes = (totalMinutes % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Calcula los slots libres de un negocio para una fecha y servicio determinados
 */
async function calcularDisponibilidad({ tenantId, fecha, servicioId, profesionalId }) {
  // 1. Obtener día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
  // Formato fecha: 'YYYY-MM-DD'
  const dateObj = new Date(fecha + 'T00:00:00');
  const diaSemana = dateObj.getDay();

  // 2. Obtener horarios del negocio para este día
  const horariosRes = await db.query(
    'SELECT * FROM horarios WHERE tenant_id = $1',
    [tenantId]
  );
  const horarioDia = horariosRes.rows.find(h => h.dia_semana === diaSemana);

  if (!horarioDia || horarioDia.cerrado) {
    return {
      cerrado: true,
      mensaje: 'El negocio está cerrado en este día de la semana.',
      slots: []
    };
  }

  // 3. Obtener datos del servicio para saber duración
  let duracionMinutos = 45;
  if (servicioId) {
    const servRes = await db.query('SELECT * FROM servicios WHERE tenant_id = $1', [tenantId]);
    const serv = servRes.rows.find(s => s.id === servicioId);
    if (serv) {
      duracionMinutos = Number(serv.duracion_minutos) || 45;
    }
  }

  // 4. Obtener profesionales disponibles para este negocio
  const profRes = await db.query('SELECT * FROM profesionales WHERE tenant_id = $1', [tenantId]);
  let profesionalesActivos = profRes.rows.filter(p => p.activo);

  if (profesionalId && profesionalId !== 'cualquiera') {
    profesionalesActivos = profesionalesActivos.filter(p => p.id === profesionalId);
    if (profesionalesActivos.length === 0) {
      return {
        cerrado: false,
        mensaje: 'El profesional seleccionado no está disponible.',
        slots: []
      };
    }
  }

  // 5. Obtener reservas confirmadas existentes para ese día
  const resQuery = await db.query(
    'SELECT * FROM reservas WHERE tenant_id = $1',
    [tenantId]
  );
  const reservasDelDia = resQuery.rows.filter(r => 
    r.fecha === fecha && r.estado !== 'cancelada'
  );

  // 6. Generar franjas horarias
  const inicioMin = timeToMinutes(horarioDia.hora_apertura);
  const finMin = timeToMinutes(horarioDia.hora_cierre);
  const stepMin = duracionMinutos > 30 ? 30 : 30; // Granularidad de 30 mins para citas

  const slots = [];

  for (let m = inicioMin; m + duracionMinutos <= finMin; m += stepMin) {
    const slotHora = minutesToTime(m);
    const slotFinMin = m + duracionMinutos;

    // Buscar si hay al menos un profesional libre en este slot
    let libreParaProf = null;

    for (const prof of profesionalesActivos) {
      // Verificar si este profesional tiene solapamiento
      const tieneReserva = reservasDelDia.some(res => {
        if (res.profesional_id !== prof.id) return false;
        const resInicioMin = timeToMinutes(res.hora);
        const resFinMin = resInicioMin + (Number(res.duracion_minutos) || 45);

        // Comprobación de solapamiento de intervalos
        return (m < resFinMin && slotFinMin > resInicioMin);
      });

      if (!tieneReserva) {
        libreParaProf = prof;
        break; // Encontramos un profesional libre para este slot
      }
    }

    slots.push({
      hora: slotHora,
      disponible: libreParaProf !== null,
      profesional_sugerido_id: libreParaProf ? libreParaProf.id : null,
      profesional_sugerido_nombre: libreParaProf ? libreParaProf.nombre : null
    });
  }

  return {
    cerrado: false,
    fecha,
    horario_apertura: horarioDia.hora_apertura.substring(0, 5),
    horario_cierre: horarioDia.hora_cierre.substring(0, 5),
    duracion_minutos: duracionMinutos,
    total_slots: slots.length,
    slots_disponibles: slots.filter(s => s.disponible).length,
    slots
  };
}

module.exports = {
  calcularDisponibilidad
};
