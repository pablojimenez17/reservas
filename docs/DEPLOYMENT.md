# 🚀 Guía de Despliegue en Producción

Cómo desplegar la arquitectura completa de ReservaHub en la nube.

---

## 1. Backend Centralizado (Render / Railway / Docker)

### Opción A: Despliegue con Docker Compose
En cualquier VPS (Hetzner, DigitalOcean, OVH):
```bash
# 1. Clonar el repositorio
git clone <tu-repo>
cd reserva-hub

# 2. Levantar Postgres y la API
docker-compose up -d --build

# 3. Comprobar logs
docker-compose logs -f api
```

### Opción B: Railway / Render (Sin gestión de servidores)
1. Conecta tu repositorio de GitHub a **Render** o **Railway**.
2. Crea un servicio **PostgreSQL** administrado.
3. Crea un servicio **Web Service** apuntando al directorio `api-backend/`:
   - Build Command: `npm ci`
   - Start Command: `node src/index.js`
   - Variables de entorno:
     - `PORT=5000`
     - `DATABASE_URL=<tu_url_postgres>`
     - `JWT_SECRET=<clave_segura_aleatoria>`
     - `CORS_ORIGIN=*`

---

## 2. Base de Datos (PostgreSQL en Supabase o Neon)
Si prefieres una base de datos PostgreSQL Serverless gratuita y potente:
1. Crea un proyecto en [Supabase](https://supabase.com) o [Neon](https://neon.tech).
2. Ve al SQL Editor y pega el contenido de `database/schema.sql`.
3. Pega el contenido de `database/seeds/test_data.sql` para tener los datos de prueba.
4. Copia la cadena de conexión `DATABASE_URL` y colócala en tu backend.

---

## 3. Webs de Clientes (Vercel)
Para cada cliente (`marcos.es`, `garcia.es`, etc.):
1. Importa el proyecto en [Vercel](https://vercel.com).
2. Root Directory: `web-template`
3. Variables de entorno:
   - `VITE_API_URL=https://api.reservahub.com`
   - `VITE_TENANT_ID=marcos`
   - `VITE_BUSINESS_NAME="Barbería Marcos"`
   - `VITE_THEME=marcos`
4. Añade su dominio personalizado en Settings > Domains.
