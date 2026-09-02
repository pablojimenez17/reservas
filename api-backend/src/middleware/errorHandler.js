const errorHandler = (err, req, res, next) => {
  console.error('⚠️ [Error Handler]:', err.message || err);

  // Manejo de error de violación de unicidad (Doble Booking)
  if (err.code === '23505' || err.message.includes('ya tiene una reserva')) {
    return res.status(409).json({
      success: false,
      code: 'SLOT_ALREADY_BOOKED',
      error: 'El horario seleccionado ya no está disponible. Por favor elija otra franja horaria.'
    });
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Error interno del servidor en ReservaHub API'
  });
};

module.exports = errorHandler;
