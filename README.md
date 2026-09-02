# ⚡ TuCita.io — Plataforma SaaS de Reservas y Gestión de Citas Online

> **Motor de reservas centralizado y landing page llave en mano para negocios locales.**  
> Diseñado especialmente para peluquerías, barberías, clínicas de fisioterapia/salud, centros de estética y restaurantes.

---

## 🌟 Características Principales

- **🎮 Sandbox Interactivo Multivertical (Live Demo):**
  - **Barbería Moderna:** Gestión de turnos por profesional (*Paquito, Marcos, Álex*) y servicios de corte/barba.
  - **Clínica & Fisio Salud:** Especialistas deportivos, osteopatía y citas con descripción del dolor.
  - **Centro Belleza & Uñas Glow:** Manicura rusa, nail art, pestañas y agenda por estilista.
  - **Restaurante Asador & Brasa El Olivo:** 
    - Selección de comensales (*2, 4, 6, 8 personas*).
    - Horarios de comidas (*13:30 a 15:30 h*) y cenas (*20:30 a 23:00 h*).
    - **Mesas agrupadas por franja horaria** en el panel de sala.
    - **Pop-up modal interactivo** al hacer clic en cualquier hora con el desglose exacto de mesas libres y ocupadas por capacidad.
    - Configuración dinámica de aforo y número de mesas de 2, 4 y 6 personas por el propietario.

- **⏰ Horarios 100% Personalizados por Día:**
  - Selector individual para los 7 días de la semana (*Lunes a Domingo*).
  - Posibilidad de añadir cualquier hora específica (*ej: 15:30 o 21:15*) o eliminar franjas una a una.
  - Marcado rápido de días cerrados o carga de horarios estándar de mañana y tarde.

- **📞 Atención Telefónica al Segundo:**
  - ¿Un cliente llama por teléfono? Con el botón **`+ Cita / Mesa Telefónica`** revisas huecos y confirmas la reserva en pantalla en menos de 10 segundos.

- **💎 Diseño Stitch Ultra-Premium:**
  - Paleta HSL Tailwind-free con colores tailoreados, modo claro nítido, fuentes *Geist*, *Inter* y *JetBrains Mono*.
  - Logotipo oficial **`TC`** en badge negro redondeado con favicon vectorial.

- **💬 Canales de Contacto Directo:**
  - Botón flotante discreto de WhatsApp.
  - Enlace directo `mailto` para enviar propuestas sin fricción.
  - Protección de privacidad: ningún número personal ni email visible en texto plano en la web.

- **❓ Sección de Preguntas Frecuentes (FAQ):**
  - Acordeón interactivo resolviendo dudas de permanencia, funcionamiento sin web, aforo de hostelería y pruebas gratuitas.

- **🏷️ 4 Paquetes Claros y Transparentes:**
  1. **Servicio Básico (29€/mes):** Motor de reservas sin límites y panel de gestión.
  2. **Servicio Prioritario (49€/mes):** Soporte prioritario con nosotros y configuración de festivos/personal incluida.
  3. **Web Template (299€ + 29€/mes):** Tu web profesional lista en 48-72h + Motor de reservas.
  4. **Web a Medida (599€ + 49€/mes):** Diseño web exclusivo 100% personalizado + Soporte prioritario.

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Iniciar la API Backend
```bash
cd api-backend
npm install
npm run dev
```
La API estará disponible en `http://localhost:5000` con fallback automático en memoria o conexión a PostgreSQL.

Para ejecutar los tests automatizados:
```bash
npm test
```

### 2. Iniciar la Web Frontend
En otra terminal:
```bash
cd web-template
npm install
npm run dev
```
Abre en tu navegador: `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```
SaaSReservas/
├── api-backend/              # API Centralizada Multitenant (Node.js, Express, JWT)
│   ├── src/
│   │   ├── config/           # Base de datos (PostgreSQL + In-Memory Fallback)
│   │   ├── controllers/      # Reservas, Disponibilidad, Auth, Admin
│   │   ├── middleware/       # validateTenant & resolvePublicTenant
│   │   ├── routes/           # Endpoints públicos y de administración
│   │   └── services/         # Algoritmo de cálculo de slots y prevención de solapamientos
│   └── test/                 # Tests unitarios y de integración con node:test
├── web-template/             # Frontend React + Vite con Stitch Design System
│   ├── public/
│   │   └── favicon.svg       # Favicon oficial con isotipo TC
│   ├── src/
│   │   ├── components/
│   │   │   ├── SaaS/         # Landing SaaS: Hero, Playground, Pricing, FAQ, Contacto, Footer
│   │   │   └── Booking/      # Motor de reservas embebido y modal de cliente
│   │   ├── styles/           # Variables CSS, tokens de diseño y tipografías
│   │   └── App.jsx           # Aplicación principal
│   └── vite.config.js
├── database/                 # Schema PostgreSQL 15+ y Seeds
│   ├── schema.sql            # Tablas, constraints ACID anti doble-reserva
│   └── seeds/test_data.sql   # Semillas para barberías, clínicas y restaurantes
└── docs/                     # Documentación arquitectónica y comercial
```

---

## 👨‍💻 Autor

Diseñado y desarrollado con precisión por **Pablo Jimenez Prieto**.  
© 2026 **TuCita.io** — Todos los derechos reservados.
