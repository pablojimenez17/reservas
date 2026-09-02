# 📊 ReservaHub: Pitch Ejecutivo & Modelo de Negocio

> **"El backend centralizado que usamos nosotros, con webs personalizadas que parecen de cada negocio."**

---

## 1. El Problema Real de los Negocios Locales
- **2.3 Millones de peluquerías, barberías, clínicas y gimnasios en Europa** siguen gestionando sus reservas mediante WhatsApp, llamadas telefónicas o libretas de papel.
- **Pérdida de clientes:** Clientes que llaman fuera de horario o no reciben confirmación y se van a la competencia.
- **Soluciones existentes defectuosas:**
  - *Calendly*: Muy genérico, orientado a videollamadas corporativas, no a negocios locales con múltiples empleados y catálogo de precios.
  - *Mindbody / Treatwell*: Comisiones abusivas por reserva (hasta 20%), obligan al cliente a usar su marketplace y se quedan con tus clientes.

---

## 2. Nuestra Solución (Arquitectura Hub & Spoke)

Ofrecemos a los negocios locales lo mejor de dos mundos:
1. **Su propia web personalizada (`marcos.es`)**: Diseño exclusivo con su marca, colores y logotipo. El cliente siente que reserva directamente con su negocio de confianza, sin registros complicados ni contraseñas.
2. **Nuestra API Centralizada (`api.reservahub.com`)**: Toda la lógica compleja (prevención de doble booking, cálculo de disponibilidad en tiempo real, notificaciones SMS/email, panel de administración con JWT) corre en un único servidor multitenante mantenido por nosotros.

```
TÚ MANTIENES:                          ELLOS TIENEN:
─────────────────────────────────────────────────────────────────
┌─────────────────────────┐
│  API Backend Central    │     marcos.es        garcia.es       pepe.es
│  (ReservaHub Core)      │    (Web Custom)    (Web Custom)    (Web Custom)
│                         │     Barbería         Clínica         Fisio
│ - PostgreSQL            │        │                │               │
│ - Express.js            │        └────────────────┼───────────────┘
│ - JWT & Tenant Isolation│                         │
│ - Motor Disponibilidad  │                 Consumen TU API
│ - SMS / Email Dispatch  │                 (Segregación ACID)
└─────────────────────────┘
```

---

## 3. Modelo de Negocio de Alto Margen

Ofrecemos dos modalidades de captación:

### Opción A: Web Custom Premium
- **5.000€ setup inicial (One-time):** Diseño exclusivo, adaptaciones a medida, onboarding presencial.
- **29€/mes (Recurrente):** Mantenimiento de API, base de datos, panel admin y notificaciones.

### Opción B: Web Template (Escalable y Rápida)
- **999€ setup inicial (One-time):** Clonación de la plantilla con cambio de colores, logotipo y catálogo de servicios en < 30 minutos.
- **29€/mes (Recurrente):** Acceso a la API y panel de control.

### Estructura de Costes y Margen:
- Coste marginal de base de datos por cliente: **~0.50€/mes**
- Coste de emails/SMS transaccionales: **~0.10€/mes**
- **Margen Bruto Recurrente: 91%** (26,40€ de beneficio neto mensual por cada cliente activo).

### Proyecciones Financieras:
| Clientes Activos | Ingreso Recurrente Mensual (MRR) | Ingreso Recurrente Anual (ARR) | Venta Inicial One-Time (media 1.500€) |
| :--- | :--- | :--- | :--- |
| **10** (Fase Piloto) | 290 €/mes | 3.480 €/año | 15.000 € |
| **50** (Barcelona) | 1.450 €/mes | 17.400 €/año | 75.000 € |
| **200** (Catalunya) | 5.800 €/mes | 69.600 €/año | 300.000 € |
| **1.000** (España) | 29.000 €/mes | 348.000 €/año | 1.500.000 € |

---

## 4. Métricas Clave (KPIs)
- **CAC (Customer Acquisition Cost):** ~180€ (Venta directa puerta a puerta en comercios locales).
- **LTV (Lifetime Value):** ~2.500€ - 3.500€ (Churn rate esperado < 4% gracias a que la web se convierte en el canal central del negocio).
- **LTV / CAC:** **> 15x** (Excelente ratio de viabilidad SaaS).
