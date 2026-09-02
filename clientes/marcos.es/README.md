# Barbería Marcos (marcos.es)

Instancia frontend personalizada para **Barbería Marcos** en Gràcia, Barcelona.

## Características:
- **Tema Visual**: Ámbar vintage y negro carbón (`data-theme="marcos"`).
- **Consumo de API**: `http://localhost:5000` (o `https://api.reservahub.com`).
- **Tenant ID**: `marcos`
- **Credenciales Admin Demo**: `marcos@barberiamarcos.com` / `admin123`.

## Despliegue en Vercel:
Configura en Vercel las variables del archivo `.env`:
```bash
VITE_API_URL=https://api.reservahub.com
VITE_TENANT_ID=marcos
VITE_BUSINESS_NAME="Barbería Marcos"
VITE_THEME=marcos
VITE_PHONE="+34 932 18 44 20"
VITE_ADDRESS="Carrer del Torrent de l'Olla 84, Gràcia, Barcelona"
```
Asigna el dominio custom `marcos.es` en la configuración DNS de Vercel.
