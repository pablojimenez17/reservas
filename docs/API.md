# 📡 Especificación de la API ReservaHub (REST)

Base URL: `http://localhost:5000` (o `https://api.reservahub.com`)

---

## 1. Cabeceras Globales
- **Rutas Públicas (Cliente):**
  `X-Tenant-Id: <slug_o_uuid>` (ej. `marcos`)
- **Rutas Privadas (Admin):**
  `Authorization: Bearer <jwt_token>`

---

## 2. Endpoints de Autenticación (`/auth`)

### `POST /auth/login`
Inicia sesión del propietario y devuelve el JWT con `tenant_id`.
```json
// Request Body
{
  "email": "marcos@barberiamarcos.com",
  "password": "admin123"
}

// Response (200 OK)
{
  "success": true,
  "token": "eyJhbGciOi...",
  "tenant": {
    "id": "11111111-1111-1111-1111-111111111111",
    "nombre": "Barbería Marcos",
    "slug": "marcos",
    "email": "marcos@barberiamarcos.com"
  }
}
```

### `POST /auth/register`
Onboarding de un nuevo negocio en el SaaS.
```json
// Request Body
{
  "nombre": "Estudio Tatuaje Gràcia",
  "slug": "tatuajegracia",
  "email": "contacto@tatuajegracia.com",
  "password": "miPasswordSegura",
  "telefono": "+34 655 444 333",
  "categoria": "estudio",
  "color_primario": "#ef4444"
}
```

---

## 3. Endpoints Públicos (`/api/public`)
*Requiere cabecera `X-Tenant-Id`*

### `GET /api/public/negocio`
Devuelve el catálogo de servicios activos, equipo y horarios del negocio.

### `GET /api/public/disponibilidad`
Calcula en tiempo real los slots libres para una fecha y servicio.
- Parámetros: `fecha=YYYY-MM-DD`, `servicio_id=UUID`, `profesional_id=UUID|cualquiera`.
```json
// Response (200 OK)
{
  "success": true,
  "data": {
    "cerrado": false,
    "fecha": "2026-10-15",
    "horario_apertura": "10:00",
    "horario_cierre": "20:30",
    "slots": [
      { "hora": "10:00", "disponible": true },
      { "hora": "10:30", "disponible": false },
      { "hora": "11:00", "disponible": true }
    ]
  }
}
```

### `POST /api/public/reservas`
Crea una reserva online sin necesidad de login.
```json
// Request Body
{
  "cliente_nombre": "Carlos Sánchez",
  "cliente_telefono": "+34 600 123 456",
  "cliente_email": "carlos@gmail.com",
  "servicio_id": "11111111-s111-1111-1111-111111111111",
  "profesional_id": "11111111-a111-1111-1111-111111111111",
  "fecha": "2026-10-15",
  "hora": "11:00",
  "duracion_minutos": 45,
  "notas": "Corte clásico"
}
```

### `POST /api/public/cancelar`
Cancela una cita mediante su token seguro.
```json
// Request Body
{
  "token": "canc_j6xe9fwqc7"
}
```

---

## 4. Endpoints Privados de Administración (`/api/reservas`, `/api/stats`)
*Requiere `Authorization: Bearer <token>`*

### `GET /api/reservas`
Lista las reservas pertenecientes al negocio del admin logueado.
Filtros opcionales: `?fecha=YYYY-MM-DD`, `?estado=confirmada|cancelada`.

### `POST /api/reservas`
Crea una reserva manual (ej. cita telefónica).

### `PATCH /api/reservas/:id/cancelar`
Cancela una reserva desde el panel administrativo.

### `GET /api/stats`
Devuelve el resumen de métricas clave (citas hoy, ingresos estimados, total reservas).
