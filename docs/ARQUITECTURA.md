# 🏗️ Arquitectura del Sistema ReservaHub

ReservaHub utiliza el patrón arquitectónico **Hub & Spoke** con separación física entre el backend centralizado y los frontends personalizados de cada cliente.

---

## 1. Diagrama de la Arquitectura

```
                        CLIENTES FINALES (Móvil / Web)
                                      │
              ┌───────────────────────┼──────────────────────┐
              ▼                       ▼                      ▼
        marcos.es                 garcia.es               pepe.es
   (Vercel / Next / Vite)   (Vercel / Next / Vite)  (Vercel / Next / Vite)
      [Tema Barbería]           [Tema Clínico]         [Tema Fisioterapia]
              │                       │                      │
              │ Headers:              │ Headers:             │ Headers:
              │ X-Tenant-Id: marcos   │ X-Tenant-Id: garcia  │ X-Tenant-Id: pepe
              │                       │                      │
              └───────────────────────┼──────────────────────┘
                                      ▼
                        ┌───────────────────────────┐
                        │   API GATEWAY / EXPRESS   │
                        │    (api.reservahub.com)   │
                        └─────────────┬─────────────┘
                                      │
              ┌───────────────────────┴───────────────────────┐
              ▼                                               ▼
     RUTAS PÚBLICAS                                     RUTAS PRIVADAS (ADMIN)
  resolvePublicTenant                                    validateTenant (JWT)
  - GET /api/public/negocio                              - GET /api/reservas
  - GET /api/public/disponibilidad                       - POST /api/reservas (manual)
  - POST /api/public/reservas                            - PATCH /api/reservas/:id/cancelar
  - POST /api/public/cancelar                            - GET /api/stats
              │                                               │
              └───────────────────────┬───────────────────────┘
                                      ▼
                        ┌───────────────────────────┐
                        │      PostgreSQL 15+       │
                        │  Aislamiento por tenant_id│
                        │  Restricción UNIQUE ACID  │
                        └───────────────────────────┘
```

---

## 2. Segregación de Datos y Seguridad Multitenant

### A. Autenticación de Propietarios (Panel Admin)
1. El propietario accede a su panel e introduce credenciales en `/auth/login`.
2. El servidor valida la contraseña (bcrypt) y firma un token JWT:
   ```json
   {
     "tenant_id": "11111111-1111-1111-1111-111111111111",
     "user_id": "...",
     "email": "marcos@barberiamarcos.com",
     "slug": "marcos"
   }
   ```
3. El middleware `validateTenant` extrae `req.tenant_id = decoded.tenant_id`.
4. **Garantía:** Toda consulta a la base de datos incluye obligatoriamente `WHERE tenant_id = req.tenant_id`. Ningún propietario puede ver ni modificar reservas de otro negocio.

### B. Reservas Online de Clientes (Sin Login)
1. El cliente entra a `marcos.es` y elige servicio y hora.
2. El cliente HTTP envía la cabecera `X-Tenant-Id: marcos`.
3. El middleware `resolvePublicTenant` verifica que el negocio existe y está activo, inyectando `req.tenant_id = tenant.id`.
4. La reserva se guarda asociada a ese negocio y emite un `token_cancelacion` único para que el cliente pueda cancelar si lo necesita sin requerir usuario ni contraseña.

---

## 3. Prevención de Doble Reserva (Garantía ACID)

Para evitar que dos clientes reserven la misma hora con el mismo profesional simultáneamente:

1. **A Nivel de Base de Datos:**
   Constraint única de PostgreSQL:
   ```sql
   CONSTRAINT uq_profesional_horario UNIQUE(tenant_id, profesional_id, fecha, hora)
   ```
2. **A Nivel de Código:**
   El middleware de error captura el error `23505` y devuelve código HTTP `409 Conflict` con código de error amigable:
   ```json
   {
     "success": false,
     "code": "SLOT_ALREADY_BOOKED",
     "error": "El horario seleccionado ya no está disponible. Por favor elija otra franja horaria."
   }
   ```
