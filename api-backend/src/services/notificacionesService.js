/**
 * Servicio simulador de notificaciones (Email SendGrid + SMS Twilio)
 */
async function enviarConfirmacionReserva(reserva, tenant) {
  console.log(`\n📨 [SIMULADOR EMAIL/SMS - NOTIFICACIÓN ENVIADA]`);
  console.log(`──────────────────────────────────────────`);
  console.log(`Para: ${reserva.cliente_nombre} <${reserva.cliente_email || reserva.cliente_telefono}>`);
  console.log(`Negocio: ${tenant ? tenant.nombre : 'ReservaHub'}`);
  console.log(`Cita: ${reserva.fecha} a las ${reserva.hora.substring(0, 5)} h`);
  console.log(`Token Cancelación: ${reserva.token_cancelacion}`);
  console.log(`Mensaje: "¡Hola ${reserva.cliente_nombre}! Tu cita en ${tenant?.nombre || 'nuestro centro'} ha sido confirmada con éxito."`);
  console.log(`──────────────────────────────────────────\n`);

  return {
    email_enviado: true,
    sms_enviado: Boolean(reserva.cliente_telefono)
  };
}

module.exports = {
  enviarConfirmacionReserva
};
