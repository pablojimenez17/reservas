const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const reservasRoutes = require('./routes/reservas');
const disponibilidadRoutes = require('./routes/disponibilidad');
const profesionalesRoutes = require('./routes/profesionales');
const serviciosRoutes = require('./routes/servicios');
const horariosRoutes = require('./routes/horarios');
const statsRoutes = require('./routes/stats');
const publicRoutes = require('./routes/public');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración CORS flexible para arquitectura Hub & Spoke
const corsOptions = {
  origin: '*', // Permite llamadas desde marcos.es, garcia.es, pepe.es, vercel y desarrollo local
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-Id', 'X-Tenant-Slug']
};

const path = require('path');
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

// Ruta de comprobación de salud y estado del SaaS
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    servicio: 'ReservaHub Centralized Multi-tenant API',
    version: '1.0.0',
    database: db.isPgConnected() ? 'PostgreSQL (Producción)' : 'In-Memory Fast Adapter (Desarrollo)',
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use('/auth', authRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/disponibilidad', disponibilidadRoutes);
app.use('/api/profesionales', profesionalesRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/horarios', horariosRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/public', publicRoutes);

// Manejador centralizado de errores
app.use(errorHandler);

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`\n========================================================`);
  console.log(`🚀 ReservaHub API Centralizada lista en http://localhost:${PORT}`);
  console.log(`📦 Modo de Datos: ${db.isPgConnected() ? 'PostgreSQL' : 'Fallback En Memoria con datos semilla'}`);
  console.log(`🏢 Negocios de prueba disponibles: marcos, garcia, pepe`);
  console.log(`========================================================\n`);
});

module.exports = { app, server };
