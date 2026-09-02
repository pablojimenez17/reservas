# ⚡ Workflow: Alta de Nuevo Cliente en 5 Minutos

Cómo entregar una web custom + acceso a la API a un nuevo cliente (ejemplo: *Peluquería Carmen* en Poblenou).

---

## Paso 1: Registrar el negocio en la base de datos (1 min)
Envía una petición al endpoint de registro o ejecútalo en la base de datos:
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Peluquería Carmen",
    "slug": "carmen",
    "email": "carmen@peluqueria.es",
    "password": "PasswordPropietaria123",
    "telefono": "+34 931 22 33 44",
    "categoria": "peluqueria",
    "color_primario": "#ec4899"
  }'
```

---

## Paso 2: Crear la instancia del cliente (1 min)
Copia la plantilla `web-template` o crea una nueva carpeta en `clientes/`:
```bash
mkdir clientes/carmen.es
cp -r web-template/* clientes/carmen.es/
```

---

## Paso 3: Configurar variables y marca (1 min)
Edita `clientes/carmen.es/.env`:
```bash
VITE_API_URL=https://api.reservahub.com
VITE_TENANT_ID=carmen
VITE_BUSINESS_NAME="Peluquería Carmen"
VITE_THEME=carmen
VITE_PHONE="+34 931 22 33 44"
VITE_ADDRESS="Carrer de Ramon Turró 55, Poblenou, Barcelona"
```

Añade su color en `clientes/carmen.es/src/styles/theme.css`:
```css
[data-theme='carmen'] {
  --primary: #ec4899;
  --primary-hover: #db2777;
  --primary-rgb: 236, 72, 153;
  --primary-glow: rgba(236, 72, 153, 0.3);
}
```

---

## Paso 4: Desplegar en Vercel (1 min)
```bash
cd clientes/carmen.es
vercel --prod
```
O enlaza el repositorio Git a Vercel con las variables de entorno configuradas.

---

## Paso 5: Asignar Dominio Custom y Entregar (1 min)
1. En el registrador del cliente (ej. DonDominio, GoDaddy), apunta el dominio `carmen.es` (CNAME `cname.vercel-dns.com`).
2. Entrégale al cliente sus credenciales:
   - **URL Web Cliente:** `https://carmen.es`
   - **Acceso Administrador:** `https://carmen.es` (botón "Acceso Propietario" en la barra de navegación)
   - **Email:** `carmen@peluqueria.es`
   - **Contraseña inicial:** `PasswordPropietaria123`
3. Factura el setup (999€ - 5.000€) y programa la suscripción recurrente de 29€/mes en Stripe.
