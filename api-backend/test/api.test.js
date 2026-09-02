const test = require('node:test');
const assert = require('node:assert');

// Configuración de entorno antes de importar la app
process.env.PORT = 5001;
process.env.JWT_SECRET = 'test_jwt_secret_key';

const { app, server } = require('../src/index');

test('API Tests Suite', async (t) => {
  const baseUrl = 'http://localhost:5001';

  await t.test('1. GET /health responde con estado online', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'online');
  });

  await t.test('2. GET /api/public/negocio con X-Tenant-Id: marcos devuelve servicios y datos', async () => {
    const res = await fetch(`${baseUrl}/api/public/negocio`, {
      headers: {
        'X-Tenant-Id': 'marcos'
      }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data.tenant.slug, 'marcos');
    assert.ok(data.data.servicios.length > 0, 'Debe devolver servicios');
    assert.ok(data.data.profesionales.length > 0, 'Debe devolver profesionales');
  });

  await t.test('3. POST /auth/login devuelve JWT con tenant_id', async () => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'marcos@barberiamarcos.com',
        password: 'admin123'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token, 'Debe devolver un JWT');
    assert.strictEqual(data.tenant.slug, 'marcos');
  });

  await t.test('4. POST /api/public/reservas crea reserva y previene doble reserva', async () => {
    const testDate = '2026-10-15';
    const testHour = '16:00';

    // Primera reserva: debe crearse con éxito
    const res1 = await fetch(`${baseUrl}/api/public/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Id': 'marcos'
      },
      body: JSON.stringify({
        cliente_nombre: 'Prueba Automatizada',
        cliente_telefono: '+34 600000000',
        cliente_email: 'test@example.com',
        profesional_id: '11111111-a111-1111-1111-111111111111',
        servicio_id: '11111111-s111-1111-1111-111111111111',
        fecha: testDate,
        hora: testHour,
        duracion_minutos: 45
      })
    });
    assert.strictEqual(res1.status, 201);
    const data1 = await res1.json();
    assert.strictEqual(data1.success, true);
    assert.ok(data1.reserva.token_cancelacion);

    // Segunda reserva en el mismo slot exacto para el mismo profesional: DEBE RECHAZARSE (409 Conflict)
    const res2 = await fetch(`${baseUrl}/api/public/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Id': 'marcos'
      },
      body: JSON.stringify({
        cliente_nombre: 'Cliente Duplicado',
        cliente_telefono: '+34 699999999',
        cliente_email: 'dup@example.com',
        profesional_id: '11111111-a111-1111-1111-111111111111',
        servicio_id: '11111111-s111-1111-1111-111111111111',
        fecha: testDate,
        hora: testHour,
        duracion_minutos: 45
      })
    });
    assert.strictEqual(res2.status, 409);
    const data2 = await res2.json();
    assert.strictEqual(data2.code, 'SLOT_ALREADY_BOOKED');
  });

  // Cerrar servidor al terminar las pruebas
  server.close();
});
