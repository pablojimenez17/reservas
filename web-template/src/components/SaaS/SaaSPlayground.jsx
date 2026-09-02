import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Calendar, 
  Clock, 
  User, 
  PhoneCall, 
  CheckCircle2, 
  FileText, 
  Scissors, 
  Stethoscope, 
  Sparkle, 
  Info,
  Settings,
  Trash2,
  Plus,
  X,
  Users,
  Check,
  Utensils,
  LayoutGrid,
  Search
} from 'lucide-react';

const diasDemoCinco = [
  { id: 'd1', claveSemana: 'mie', fecha: '2 Sep', dia: 'Hoy (Mié 2)', etiqueta: 'Hoy' },
  { id: 'd2', claveSemana: 'jue', fecha: '3 Sep', dia: 'Jueves 3', etiqueta: 'Mañana' },
  { id: 'd3', claveSemana: 'vie', fecha: '4 Sep', dia: 'Viernes 4', etiqueta: 'Viernes' },
  { id: 'd4', claveSemana: 'sab', fecha: '5 Sep', dia: 'Sábado 5', etiqueta: 'Sábado' },
  { id: 'd5', claveSemana: 'lun', fecha: '7 Sep', dia: 'Lunes 7', etiqueta: 'Lunes' }
];

const nombresDiasCompletos = {
  lun: 'Lunes',
  mar: 'Martes',
  mie: 'Miércoles',
  jue: 'Jueves',
  vie: 'Viernes',
  sab: 'Sábado',
  dom: 'Domingo'
};

const horarioEstandar = {
  lun: ['16:00', '17:00', '18:00', '19:00', '20:00'], // Lunes: Solo de tarde
  mar: ['09:30', '10:30', '11:30', '12:30', '16:00', '17:00', '18:00', '19:00', '20:00'],
  mie: ['09:30', '10:30', '11:30', '12:30', '16:00', '17:00', '18:00', '19:00', '20:00'],
  jue: ['09:30', '10:30', '11:30', '12:30', '16:00', '17:00', '18:00', '19:00', '20:00'],
  vie: ['09:30', '10:30', '11:30', '12:30', '16:00', '17:00', '18:00', '19:00', '20:00'],
  sab: ['09:30', '10:30', '11:30', '12:30', '13:30'], // Sábado: Solo de mañana
  dom: [] // Domingo cerrado
};

const horarioRestaurante = {
  lun: ['20:30', '21:00', '21:30', '22:00', '22:30'], // Lunes: Solo cenas
  mar: ['13:30', '14:00', '14:30', '15:00', '20:30', '21:00', '21:30', '22:00', '22:30'],
  mie: ['13:30', '14:00', '14:30', '15:00', '20:30', '21:00', '21:30', '22:00', '22:30'],
  jue: ['13:30', '14:00', '14:30', '15:00', '20:30', '21:00', '21:30', '22:00', '22:30'],
  vie: ['13:30', '14:00', '14:30', '15:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'],
  sab: ['13:30', '14:00', '14:30', '15:00', '15:30'], // Sábado: Solo comidas
  dom: [] // Domingo cerrado
};

const negociosDemo = {
  barberia: {
    nombre: 'Barbería Moderna',
    etiquetaCorta: 'Barbería',
    tipo: 'citas',
    icono: Scissors,
    profesionales: [
      { id: 'p1', nombre: 'Paquito Gómez', rol: 'Master Fade & Barbas', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&crop=face' },
      { id: 'p2', nombre: 'Marcos Vidal', rol: 'Cortes Clásicos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&crop=face' },
      { id: 'p3', nombre: 'Álex Romero', rol: 'Coloración & Textura', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&crop=face' }
    ],
    reservasIniciales: [
      { id: 'r1', diaId: 'd1', hora: '10:30', cliente: 'Carlos Ruiz', telefono: '+34 611 222 333', profesionalId: 'p1', profNombre: 'Paquito Gómez', notas: 'Degradado medio a navaja y arreglo de barba' },
      { id: 'r2', diaId: 'd1', hora: '17:00', cliente: 'Marc Soler', telefono: '+34 644 555 666', profesionalId: 'p2', profNombre: 'Marcos Vidal', notas: 'Corte clásico con tijera arriba y peinado' },
      { id: 'r3', diaId: 'd4', hora: '10:30', cliente: 'David Navarro', telefono: '+34 655 888 111', profesionalId: 'p1', profNombre: 'Paquito Gómez', notas: 'Corte antes del fin de semana' },
      { id: 'r4', diaId: 'd5', hora: '18:00', cliente: 'Roberto Gil', telefono: '+34 622 777 444', profesionalId: 'p3', profNombre: 'Álex Romero', notas: 'Matiz y peinado' }
    ],
    clienteFormDefault: {
      profId: 'p1',
      diaId: 'd1',
      hora: '11:30',
      nombre: 'David Morales',
      telefono: '+34 688 777 666',
      notas: 'Corte degradado bajo y perfilado de barba con toalla caliente'
    },
    formTelefonoDefault: {
      cliente: '',
      telefono: '',
      diaId: 'd1',
      hora: '16:00',
      profId: 'p1',
      notas: 'Corte a tijera y afeitado clásico'
    }
  },
  fisioterapia: {
    nombre: 'Clínica & Fisio Salud',
    etiquetaCorta: 'Clínica & Fisio',
    tipo: 'citas',
    icono: Stethoscope,
    profesionales: [
      { id: 'f1', nombre: 'Dra. Laura García', rol: 'Fisioterapeuta Deportiva', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&fit=crop&crop=face' },
      { id: 'f2', nombre: 'Pepe Salgado', rol: 'Osteopatía y Readaptación', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&fit=crop&crop=face' }
    ],
    reservasIniciales: [
      { id: 'r5', diaId: 'd1', hora: '09:30', cliente: 'Elena Torres', telefono: '+34 677 888 999', profesionalId: 'f1', profNombre: 'Dra. Laura García', notas: 'Sobrecarga en gemelo y tendinitis rotuliana' },
      { id: 'r6', diaId: 'd4', hora: '11:30', cliente: 'Jorge Maza', telefono: '+34 633 444 555', profesionalId: 'f2', profNombre: 'Pepe Salgado', notas: 'Revisión lumbar sábado mañana' }
    ],
    clienteFormDefault: {
      profId: 'f1',
      diaId: 'd1',
      hora: '11:30',
      nombre: 'Carlos Méndez',
      telefono: '+34 677 333 444',
      notas: 'Tratamiento para sobrecarga lumbar y dolor muscular en espalda'
    },
    formTelefonoDefault: {
      cliente: '',
      telefono: '',
      diaId: 'd1',
      hora: '11:30',
      profId: 'f1',
      notas: 'Sesión de fisioterapia y descarga deportiva'
    }
  },
  estetica: {
    nombre: 'Centro Belleza & Uñas Glow',
    etiquetaCorta: 'Centro Belleza',
    tipo: 'citas',
    icono: Sparkle,
    profesionales: [
      { id: 'e1', nombre: 'María Santos', rol: 'Nail Art & Manicura Rusa', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop&crop=face' },
      { id: 'e2', nombre: 'Sofía Romero', rol: 'Lifting de Pestañas & Cejas', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&fit=crop&crop=face' }
    ],
    reservasIniciales: [
      { id: 'r7', diaId: 'd1', hora: '12:30', cliente: 'Nuria Pons', telefono: '+34 633 111 222', profesionalId: 'e1', profNombre: 'María Santos', notas: 'Uñas semipermanentes con diseño en dos uñas' },
      { id: 'r8', diaId: 'd5', hora: '17:00', cliente: 'Beatriz Luque', telefono: '+34 611 999 888', profesionalId: 'e2', profNombre: 'Sofía Romero', notas: 'Lifting de pestañas lunes tarde' }
    ],
    clienteFormDefault: {
      profId: 'e1',
      diaId: 'd1',
      hora: '17:00',
      nombre: 'Paula Sánchez',
      telefono: '+34 655 444 888',
      notas: 'Manicura semipermanente completa y diseño de cejas'
    },
    formTelefonoDefault: {
      cliente: '',
      telefono: '',
      diaId: 'd1',
      hora: '17:00',
      profId: 'e1',
      notas: 'Lifting de pestañas y manicura express'
    }
  },
  restaurante: {
    nombre: 'Restaurante Asador & Brasa El Olivo',
    etiquetaCorta: 'Restaurante Asador',
    tipo: 'restaurante',
    icono: Utensils,
    mesasConfigInicial: [
      { id: 'm2', capacidad: 2, cantidad: 4, nombre: 'Mesas de 2 personas' },
      { id: 'm4', capacidad: 4, cantidad: 6, nombre: 'Mesas de 4 personas' },
      { id: 'm6', capacidad: 6, cantidad: 2, nombre: 'Mesas de 6 personas' }
    ],
    reservasIniciales: [
      { id: 'res1', diaId: 'd1', hora: '14:30', comensales: 4, cliente: 'Familia Martínez', telefono: '+34 600 111 222', notas: '1 trona para niño, mesa cerca de la ventana' },
      { id: 'res2', diaId: 'd1', hora: '14:30', comensales: 2, cliente: 'Carlos y Elena', telefono: '+34 688 222 333', notas: 'Mesa en terraza al sol' },
      { id: 'res3', diaId: 'd1', hora: '21:30', comensales: 2, cliente: 'Sergio y Alba', telefono: '+34 655 999 888', notas: 'Cena de aniversario en rincón tranquilo' },
      { id: 'res4', diaId: 'd1', hora: '21:30', comensales: 4, cliente: 'Comida Empresa', telefono: '+34 633 444 777', notas: 'Factura con CIF' },
      { id: 'res5', diaId: 'd4', hora: '14:00', comensales: 6, cliente: 'Comida de Amigos', telefono: '+34 622 333 444', notas: 'Mesa amplia para 6 personas, menú chuletón' },
      { id: 'res6', diaId: 'd5', hora: '21:00', comensales: 4, cliente: 'Reunión Trabajo', telefono: '+34 644 111 555', notas: 'Mesa interior' }
    ],
    clienteFormDefault: {
      comensales: 4,
      diaId: 'd1',
      hora: '14:00',
      nombre: 'Laura Benítez',
      telefono: '+34 677 222 111',
      notas: 'Mesa en salón interior, una persona celíaca'
    },
    formTelefonoDefault: {
      cliente: '',
      telefono: '',
      diaId: 'd1',
      hora: '14:30',
      comensales: 2,
      notas: 'Llamada telefónica: reserva mesa para 2 comensales'
    }
  }
};

export const SaaSPlayground = () => {
  const [verticalActiva, setVerticalActiva] = useState('barberia');
  const [modoVista, setModoVista] = useState('cliente'); // 'cliente' | 'agenda' | 'propietario'
  const [filtroProfAgenda, setFiltroProfAgenda] = useState('todos');
  const [diaActivoAgenda, setDiaActivoAgenda] = useState('d1');

  // Profesionales para citas
  const [profesionalesSandbox, setProfesionalesSandbox] = useState(negociosDemo.barberia.profesionales);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ nombre: '', rol: '' });

  // Mesas para restaurante
  const [mesasRestaurante, setMesasRestaurante] = useState(negociosDemo.restaurante.mesasConfigInicial);
  const [nuevaMesa, setNuevaMesa] = useState({ capacidad: 4, cantidad: 2, nombre: '' });

  // Pop up de mesas libres por hora
  const [popupMesasHora, setPopupMesasHora] = useState(null); // string hora | null

  // Reservas activas
  const [reservasSandbox, setReservasSandbox] = useState(negociosDemo.barberia.reservasIniciales);

  // Horarios personalizados por día
  const [horariosPorDia, setHorariosPorDia] = useState(horarioEstandar);
  const [diaParaEditarHorario, setDiaParaEditarHorario] = useState('lun');
  const [horaNuevaInput, setHoraNuevaInput] = useState('');

  // Formularios
  const [clienteForm, setClienteForm] = useState(negociosDemo.barberia.clienteFormDefault);
  const [reservaCreadaFeedback, setReservaCreadaFeedback] = useState(false);
  const [modalTelefono, setModalTelefono] = useState(false);
  const [formTelefono, setFormTelefono] = useState(negociosDemo.barberia.formTelefonoDefault);

  const negocioActual = negociosDemo[verticalActiva];
  const esRestaurante = negocioActual.tipo === 'restaurante';

  const getHorasDeDia = (claveSemana) => {
    return horariosPorDia[claveSemana] || [];
  };

  const diaSeleccionadoCliente = diasDemoCinco.find(d => d.id === clienteForm.diaId) || diasDemoCinco[0];
  const horasDisponiblesCliente = getHorasDeDia(diaSeleccionadoCliente.claveSemana);

  const diaSeleccionadoAgenda = diasDemoCinco.find(d => d.id === diaActivoAgenda) || diasDemoCinco[0];
  const horasAgenda = getHorasDeDia(diaSeleccionadoAgenda.claveSemana);

  const handleCambiarVertical = (clave) => {
    setVerticalActiva(clave);
    const target = negociosDemo[clave];
    if (target.tipo === 'citas') {
      setProfesionalesSandbox(target.profesionales);
      setHorariosPorDia(horarioEstandar);
    } else {
      setMesasRestaurante(target.mesasConfigInicial);
      setHorariosPorDia(horarioRestaurante);
    }
    setReservasSandbox(target.reservasIniciales);
    setClienteForm(target.clienteFormDefault);
    setFormTelefono(target.formTelefonoDefault);
    setFiltroProfAgenda('todos');
    setDiaActivoAgenda('d1');
    setPopupMesasHora(null);
    setReservaCreadaFeedback(false);
  };

  // Crear reserva cliente
  const handleCrearReservaCliente = (e) => {
    e.preventDefault();

    let nueva;
    if (esRestaurante) {
      nueva = {
        id: 'res-' + Date.now(),
        diaId: clienteForm.diaId,
        hora: clienteForm.hora,
        comensales: clienteForm.comensales,
        cliente: clienteForm.nombre,
        telefono: clienteForm.telefono,
        notas: clienteForm.notas
      };
    } else {
      const prof = profesionalesSandbox.find(p => p.id === clienteForm.profId) || profesionalesSandbox[0];
      nueva = {
        id: 'r-' + Date.now(),
        diaId: clienteForm.diaId,
        hora: clienteForm.hora,
        cliente: clienteForm.nombre,
        telefono: clienteForm.telefono,
        profesionalId: prof.id,
        profNombre: prof.nombre,
        notas: clienteForm.notas
      };
    }

    setReservasSandbox([nueva, ...reservasSandbox]);
    setDiaActivoAgenda(clienteForm.diaId);
    setReservaCreadaFeedback(true);
  };

  // Guardar cita telefónica
  const handleGuardarCitaTelefonica = (e) => {
    e.preventDefault();

    let nueva;
    if (esRestaurante) {
      nueva = {
        id: 'tel-' + Date.now(),
        diaId: formTelefono.diaId,
        hora: formTelefono.hora,
        comensales: formTelefono.comensales,
        cliente: formTelefono.cliente,
        telefono: formTelefono.telefono,
        notas: formTelefono.notas
      };
    } else {
      const prof = profesionalesSandbox.find(p => p.id === formTelefono.profId) || profesionalesSandbox[0];
      nueva = {
        id: 'tel-' + Date.now(),
        diaId: formTelefono.diaId,
        hora: formTelefono.hora,
        cliente: formTelefono.cliente,
        telefono: formTelefono.telefono,
        profesionalId: prof.id,
        profNombre: prof.nombre,
        notas: formTelefono.notas
      };
    }

    setReservasSandbox([nueva, ...reservasSandbox]);
    setDiaActivoAgenda(formTelefono.diaId);
    setModalTelefono(false);
    setModoVista('agenda');
    setFormTelefono(negocioActual.formTelefonoDefault);
  };

  const handleEliminarReserva = (id) => {
    setReservasSandbox(reservasSandbox.filter(r => r.id !== id));
  };

  // Empleados
  const handleAgregarEmpleado = (e) => {
    e.preventDefault();
    if (!nuevoEmpleado.nombre) return;
    const nuevo = {
      id: 'emp-' + Date.now(),
      nombre: nuevoEmpleado.nombre,
      rol: nuevoEmpleado.rol || 'Especialista',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&fit=crop&crop=face'
    };
    setProfesionalesSandbox([...profesionalesSandbox, nuevo]);
    setNuevoEmpleado({ nombre: '', rol: '' });
  };

  const handleEliminarEmpleado = (id) => {
    if (profesionalesSandbox.length <= 1) return;
    setProfesionalesSandbox(profesionalesSandbox.filter(p => p.id !== id));
  };

  // Mesas para restaurante
  const handleCambiarCantidadMesas = (id, delta) => {
    setMesasRestaurante(mesasRestaurante.map(m => {
      if (m.id === id) {
        const nuevaCantidad = Math.max(0, m.cantidad + delta);
        return { ...m, cantidad: nuevaCantidad };
      }
      return m;
    }));
  };

  const handleAgregarTipoMesa = (e) => {
    e.preventDefault();
    const cap = parseInt(nuevaMesa.capacidad, 10) || 4;
    const cant = parseInt(nuevaMesa.cantidad, 10) || 1;
    const nuevo = {
      id: 'm-' + Date.now(),
      capacidad: cap,
      cantidad: cant,
      nombre: nuevaMesa.nombre || `Mesas de ${cap} personas`
    };
    setMesasRestaurante([...mesasRestaurante, nuevo]);
    setNuevaMesa({ capacidad: 4, cantidad: 2, nombre: '' });
  };

  // Horario por día
  const handleEliminarHoraDeDia = (claveDia, hora) => {
    setHorariosPorDia({
      ...horariosPorDia,
      [claveDia]: (horariosPorDia[claveDia] || []).filter(h => h !== hora)
    });
  };

  const handleAgregarHoraADia = (e) => {
    e.preventDefault();
    if (!horaNuevaInput) return;
    const actual = horariosPorDia[diaParaEditarHorario] || [];
    if (actual.includes(horaNuevaInput)) return;
    const nuevas = [...actual, horaNuevaInput].sort();
    setHorariosPorDia({
      ...horariosPorDia,
      [diaParaEditarHorario]: nuevas
    });
    setHoraNuevaInput('');
  };

  const handleCerrarDia = (claveDia) => {
    setHorariosPorDia({
      ...horariosPorDia,
      [claveDia]: []
    });
  };

  const handleCargarHorarioMananaTarde = (claveDia) => {
    setHorariosPorDia({
      ...horariosPorDia,
      [claveDia]: ['09:30', '10:30', '11:30', '12:30', '16:00', '17:00', '18:00', '19:00', '20:00']
    });
  };

  const reservasFiltradas = reservasSandbox.filter(r => {
    const coincideDia = r.diaId === diaActivoAgenda;
    if (esRestaurante) return coincideDia;
    const coincideProf = filtroProfAgenda === 'todos' || r.profesionalId === filtroProfAgenda;
    return coincideDia && coincideProf;
  });

  const aforoTotalRestaurante = mesasRestaurante.reduce((acc, m) => acc + (m.capacidad * m.cantidad), 0);
  const totalMesasRestaurante = mesasRestaurante.reduce((acc, m) => acc + m.cantidad, 0);

  // Calcular mesas libres y ocupadas en una hora concreta para el modal pop-up
  const calcularEstadoMesasEnHora = (hora, diaId) => {
    const reservasEnHora = reservasSandbox.filter(r => r.diaId === diaId && r.hora === hora);

    return mesasRestaurante.map(tipoMesa => {
      const ocupadas = reservasEnHora.filter(r => {
        if (tipoMesa.capacidad === 2) return r.comensales <= 2;
        if (tipoMesa.capacidad === 4) return r.comensales > 2 && r.comensales <= 4;
        return r.comensales > 4;
      }).length;

      const libres = Math.max(0, tipoMesa.cantidad - ocupadas);

      return {
        ...tipoMesa,
        ocupadas,
        libres
      };
    });
  };

  return (
    <section id="playground" style={{ padding: '4.5rem 1.5rem 5.5rem', borderTop: '1px solid var(--outline-variant)' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        
        {/* Encabezado del Sandbox estilo Stitch */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '4px 14px',
            borderRadius: '9999px',
            background: 'var(--surface-container-high)',
            border: '1px solid var(--outline-variant)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={13} /> DEMO
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--primary)', letterSpacing: '-0.02em', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            Prueba cómo interactúan clientes y equipo
          </h2>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '1rem', maxWidth: '780px', margin: '0 auto' }}>
            Explora 4 sectores. En restaurantes, <strong>las mesas de la misma hora salen agrupadas</strong> y puedes <strong>clicar en cualquier hora para abrir un pop-up</strong> con el desglose exacto de mesas libres y comensales.
          </p>
        </div>

        {/* SELECTOR DE 4 VERTICALES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.45rem', marginBottom: '1.5rem', maxWidth: '820px', margin: '0 auto 1.5rem' }}>
          {Object.entries(negociosDemo).map(([clave, datos]) => {
            const isSelected = verticalActiva === clave;
            const Icono = datos.icono;

            return (
              <button
                key={clave}
                onClick={() => handleCambiarVertical(clave)}
                style={{
                  padding: '0.6rem 0.75rem',
                  borderRadius: '6px',
                  background: isSelected ? 'var(--primary)' : 'var(--surface-container-lowest)',
                  color: isSelected ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                  border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--outline-variant)'}`,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease',
                  textAlign: 'center'
                }}
              >
                <Icono size={14} /> {datos.etiquetaCorta || datos.nombre}
              </button>
            );
          })}

          <button
            onClick={() => handleCambiarVertical(verticalActiva)}
            className="btn-stitch-outline"
            style={{ padding: '0.6rem 0.75rem', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            title="Reiniciar datos de muestra"
          >
            <RotateCcw size={13} /> Resetear
          </button>
        </div>

        {/* VENTANA SANDBOX */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          border: '1px solid var(--outline-variant)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden'
        }}>
          
          {/* Barra de Título */}
          <div style={{
            background: 'var(--surface-container-high)',
            padding: '0.65rem 0.85rem',
            borderBottom: '1px solid var(--outline-variant)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c6c6cd' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c6c6cd' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c6c6cd' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                TuCita.io · {negocioActual.etiquetaCorta || negocioActual.nombre}
              </span>
            </div>

            {/* CONMUTADOR DE 3 MODOS EN MOBILE-FIRST */}
            <div style={{ display: 'flex', background: 'var(--surface-container-highest)', padding: '2px', borderRadius: '6px', border: '1px solid var(--outline-variant)', width: 'auto', flexWrap: 'wrap', gap: '2px' }}>
              <button
                onClick={() => setModoVista('cliente')}
                style={{
                  padding: '0.35rem 0.6rem',
                  borderRadius: '4px',
                  border: 'none',
                  background: modoVista === 'cliente' ? 'var(--secondary)' : 'transparent',
                  color: modoVista === 'cliente' ? '#fff' : 'var(--on-surface-variant)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <User size={12} /> 1. Cliente
              </button>

              <button
                onClick={() => setModoVista('agenda')}
                style={{
                  padding: '0.35rem 0.6rem',
                  borderRadius: '4px',
                  border: 'none',
                  background: modoVista === 'agenda' ? 'var(--secondary)' : 'transparent',
                  color: modoVista === 'agenda' ? '#fff' : 'var(--on-surface-variant)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Calendar size={12} /> 2. {esRestaurante ? 'Mesas' : 'Agenda'} ({reservasSandbox.length})
              </button>

              <button
                onClick={() => setModoVista('propietario')}
                style={{
                  padding: '0.35rem 0.6rem',
                  borderRadius: '4px',
                  border: 'none',
                  background: modoVista === 'propietario' ? 'var(--secondary)' : 'transparent',
                  color: modoVista === 'propietario' ? '#fff' : 'var(--on-surface-variant)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Settings size={12} /> 3. Ajustes
              </button>
            </div>
          </div>

          {/* CUERPO DEL PLAYGROUND */}
          <div style={{ padding: 'clamp(0.85rem, 3vw, 1.75rem)' }}>
            
            {/* 1. PANTALLA CLIENTE */}
            {modoVista === 'cliente' && (
              <div className="animate-fade-in" style={{ maxWidth: '640px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <span className="badge badge-secondary" style={{ marginBottom: '0.35rem' }}>
                    {esRestaurante ? 'Reserva de Mesa Online' : 'Vista del Cliente Final'}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)', margin: '0 0 0.25rem' }}>
                    {esRestaurante ? 'Reserva tu mesa en el restaurante' : 'Reserva tu cita en segundos'}
                  </h3>
                  <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', margin: 0 }}>
                    {esRestaurante 
                      ? 'Elige cuántos comensales sois, el día (próximos 5 días) y la hora de comida o cena.'
                      : 'Elige con quién, qué día (próximos 5 días) y describe qué necesitas.'}
                  </p>
                </div>

                {reservaCreadaFeedback ? (
                  <div style={{
                    background: 'var(--surface-container-high)',
                    border: '1px solid var(--tertiary-fixed-dim)',
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center'
                  }}>
                    <CheckCircle2 size={40} color="var(--on-tertiary-container)" style={{ margin: '0 auto 0.75rem' }} />
                    <h4 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)', margin: '0 0 0.35rem' }}>
                      ¡Reserva confirmada con éxito!
                    </h4>
                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                      {esRestaurante 
                        ? `Mesa reservada para ${clienteForm.nombre} (${clienteForm.comensales} comensales) el ${diaSeleccionadoCliente.dia} a las ${clienteForm.hora} h.`
                        : `Cita reservada para ${clienteForm.nombre} el ${diaSeleccionadoCliente.dia} a las ${clienteForm.hora} h.`}
                    </p>
                    <button
                      onClick={() => setModoVista('agenda')}
                      className="btn-stitch-secondary"
                    >
                      Ver en el Panel de Sala y Agenda →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCrearReservaCliente} style={{ background: 'var(--surface-container-low)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--outline-variant)' }}>
                    
                    {/* PASO 1: COMENSALES O ESPECIALISTA */}
                    {esRestaurante ? (
                      <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '0.4rem' }}>
                          1. ¿Cuántos comensales sois?
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {[2, 4, 6, 8].map(num => {
                            const isSel = clienteForm.comensales === num;
                            return (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setClienteForm({ ...clienteForm, comensales: num })}
                                style={{
                                  padding: '0.6rem 1.25rem',
                                  borderRadius: '6px',
                                  border: `1.5px solid ${isSel ? 'var(--secondary)' : 'var(--outline-variant)'}`,
                                  background: isSel ? 'var(--secondary)' : 'var(--surface-container-lowest)',
                                  color: isSel ? '#fff' : 'var(--primary)',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '13px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.4rem'
                                }}
                              >
                                <Utensils size={14} /> {num} Personas
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '0.4rem' }}>
                          1. Especialista:
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.5rem' }}>
                          {profesionalesSandbox.map(p => {
                            const isSel = clienteForm.profId === p.id;
                            return (
                              <div
                                key={p.id}
                                onClick={() => setClienteForm({ ...clienteForm, profId: p.id })}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  padding: '0.65rem',
                                  borderRadius: '6px',
                                  background: isSel ? 'var(--surface-container-lowest)' : 'transparent',
                                  border: `1.5px solid ${isSel ? 'var(--secondary)' : 'var(--outline-variant)'}`,
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <img src={p.avatar} alt={p.nombre} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>{p.nombre}</div>
                                  <div style={{ fontSize: '0.7rem', color: 'var(--on-surface-variant)' }}>{p.rol}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* PASO 2: SELECTOR DE LOS 5 DÍAS */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--on-surface)' }}>
                          2. Elige el Día (Próximos 5 días):
                        </label>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--secondary)', fontWeight: 600 }}>
                          Horario específico por día
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))', gap: '0.4rem' }}>
                        {diasDemoCinco.map(d => {
                          const isSel = clienteForm.diaId === d.id;
                          const horasDelDia = getHorasDeDia(d.claveSemana);
                          const estaAbierto = horasDelDia.length > 0;

                          return (
                            <button
                              type="button"
                              key={d.id}
                              disabled={!estaAbierto}
                              onClick={() => {
                                setClienteForm({ 
                                  ...clienteForm, 
                                  diaId: d.id,
                                  hora: horasDelDia.includes(clienteForm.hora) ? clienteForm.hora : (horasDelDia[0] || '14:00')
                                });
                              }}
                              style={{
                                padding: '0.6rem 0.4rem',
                                borderRadius: '6px',
                                border: `1.5px solid ${isSel ? 'var(--secondary)' : 'var(--outline-variant)'}`,
                                background: isSel ? 'var(--secondary)' : (estaAbierto ? 'var(--surface-container-lowest)' : 'var(--surface-container-high)'),
                                color: isSel ? '#fff' : (estaAbierto ? 'var(--primary)' : 'var(--outline)'),
                                cursor: estaAbierto ? 'pointer' : 'not-allowed',
                                textAlign: 'center',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800 }}>
                                {d.dia}
                              </div>
                              <div style={{ fontSize: '9px', marginTop: '2px', opacity: isSel ? 0.95 : 0.75 }}>
                                {estaAbierto ? `${horasDelDia.length} franjas` : 'Cerrado'}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* PASO 3: HORAS PERSONALIZADAS */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--on-surface)' }}>
                          3. Hora disponible para {diaSeleccionadoCliente.dia}:
                        </label>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--on-tertiary-container)', fontWeight: 600 }}>
                          {horasDisponiblesCliente[0] ? `De ${horasDisponiblesCliente[0]} a ${horasDisponiblesCliente[horasDisponiblesCliente.length - 1]} h` : 'Cerrado'}
                        </span>
                      </div>

                      {horasDisponiblesCliente.length === 0 ? (
                        <div style={{ padding: '0.75rem', background: 'var(--surface-container-high)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--outline)' }}>
                          No hay horas configuradas para este día. Elige otro día de la semana.
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          {horasDisponiblesCliente.map(h => (
                            <button
                              type="button"
                              key={h}
                              onClick={() => setClienteForm({ ...clienteForm, hora: h })}
                              style={{
                                padding: '0.45rem 0.85rem',
                                borderRadius: '4px',
                                background: clienteForm.hora === h ? 'var(--secondary)' : 'var(--surface-container-lowest)',
                                color: clienteForm.hora === h ? '#fff' : 'var(--on-surface)',
                                border: `1px solid ${clienteForm.hora === h ? 'var(--secondary)' : 'var(--outline-variant)'}`,
                                fontFamily: 'var(--font-mono)',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              {h} h
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* PASO 4: DATOS */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          Nombre *
                        </label>
                        <input
                          type="text"
                          required
                          className="input-field"
                          value={clienteForm.nombre}
                          onChange={(e) => setClienteForm({ ...clienteForm, nombre: e.target.value })}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          Teléfono *
                        </label>
                        <input
                          type="text"
                          required
                          className="input-field"
                          value={clienteForm.telefono}
                          onChange={(e) => setClienteForm({ ...clienteForm, telefono: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* PASO 5: NOTAS */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.35rem' }}>
                        {esRestaurante ? '🍴 Notas para sala/cocina (Alergias, trona, terraza...)' : '✍️ ¿Qué servicio o arreglo necesitas? (Especificado en notas)'}
                      </label>
                      <input
                        type="text"
                        required
                        className="input-field"
                        value={clienteForm.notas}
                        onChange={(e) => setClienteForm({ ...clienteForm, notas: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={horasDisponiblesCliente.length === 0}
                      className="btn-stitch-primary"
                      style={{ width: '100%', padding: '0.85rem' }}
                    >
                      {esRestaurante ? `Confirmar Mesa para ${clienteForm.comensales} Personas` : 'Confirmar Cita Online'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* 2. PANTALLA AGENDA Y SALA (CON MESAS AGRUPADAS Y POPUP POR HORA) */}
            {modoVista === 'agenda' && (
              <div className="animate-fade-in">
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)', margin: '0 0 0.25rem' }}>
                      {esRestaurante ? 'Ocupación de Sala y Control de Mesas' : 'Agenda Diaria y Control de Citas'}
                    </h3>
                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.85rem', margin: 0 }}>
                      {esRestaurante
                        ? `Las mesas de la misma hora salen agrupadas. Haz clic en el botón de cualquier hora para ver el pop-up de mesas libres.`
                        : 'Explora la agenda día por día, cancela citas o añade llamadas telefónicas en 2 clics.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setModalTelefono(true)}
                    className="btn-stitch-secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <PhoneCall size={14} /> + {esRestaurante ? 'Mesa Telefónica' : 'Cita Telefónica'}
                  </button>
                </div>

                {/* SELECTOR DE LOS 5 DÍAS EN LA AGENDA */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  overflowX: 'auto',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem',
                  borderBottom: '1px solid var(--outline-variant)'
                }}>
                  {diasDemoCinco.map(d => {
                    const isSel = diaActivoAgenda === d.id;
                    const citasEnEsteDia = reservasSandbox.filter(r => r.diaId === d.id);
                    const horasDelDia = getHorasDeDia(d.claveSemana);
                    const estaAbierto = horasDelDia.length > 0;

                    return (
                      <button
                        key={d.id}
                        onClick={() => setDiaActivoAgenda(d.id)}
                        style={{
                          padding: '0.5rem 0.85rem',
                          borderRadius: '6px',
                          border: `1.5px solid ${isSel ? 'var(--secondary)' : 'var(--outline-variant)'}`,
                          background: isSel ? 'var(--secondary)' : 'var(--surface-container-high)',
                          color: isSel ? '#fff' : 'var(--primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          minWidth: '130px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>
                          {d.dia}
                        </div>
                        <div style={{ fontSize: '10px', opacity: isSel ? 0.9 : 0.75 }}>
                          {citasEnEsteDia.length} {esRestaurante ? 'mesas' : 'citas'} · {estaAbierto ? `${horasDelDia.length} franjas` : 'Cerrado'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* SI NO ES RESTAURANTE: FILTROS DE PERSONAL */}
                {!esRestaurante && (
                  <div style={{
                    background: 'var(--surface-container-high)',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: '1px solid var(--outline-variant)',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    overflowX: 'auto'
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--on-surface-variant)', fontWeight: 600, padding: '0 0.5rem' }}>
                      Personal:
                    </span>

                    <button
                      onClick={() => setFiltroProfAgenda('todos')}
                      style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: '4px',
                        background: filtroProfAgenda === 'todos' ? 'var(--primary)' : 'var(--surface-container-lowest)',
                        color: filtroProfAgenda === 'todos' ? '#fff' : 'var(--on-surface)',
                        border: '1px solid var(--outline-variant)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Todos ({reservasSandbox.filter(r => r.diaId === diaActivoAgenda).length})
                    </button>

                    {profesionalesSandbox.map(p => {
                      const isSel = filtroProfAgenda === p.id;
                      const conteo = reservasSandbox.filter(r => r.diaId === diaActivoAgenda && r.profesionalId === p.id).length;

                      return (
                        <button
                          key={p.id}
                          onClick={() => setFiltroProfAgenda(p.id)}
                          style={{
                            padding: '0.35rem 0.8rem',
                            borderRadius: '4px',
                            background: isSel ? 'var(--primary)' : 'var(--surface-container-lowest)',
                            color: isSel ? '#fff' : 'var(--on-surface)',
                            border: '1px solid var(--outline-variant)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          <img src={p.avatar} alt={p.nombre} style={{ width: '16px', height: '16px', borderRadius: '50%' }} />
                          {p.nombre} ({conteo})
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* HORARIO CON MESAS AGRUPADAS POR HORA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {horasAgenda.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface-container-high)', borderRadius: '8px', color: 'var(--outline)' }}>
                      El negocio no abre en este día. Selecciona otro día arriba o añade horas en el Panel de Propietario.
                    </div>
                  ) : (
                    horasAgenda.map(hora => {
                      const citasEnHora = reservasFiltradas.filter(r => r.hora === hora);
                      const totalComensalesHora = citasEnHora.reduce((acc, c) => acc + (c.comensales || 0), 0);

                      // Si NO hay reservas en esta hora:
                      if (citasEnHora.length === 0) {
                        return (
                          <div
                            key={hora}
                            onClick={esRestaurante ? () => setPopupMesasHora(hora) : undefined}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.75rem 1.25rem',
                              borderRadius: '8px',
                              background: 'var(--surface-container-low)',
                              border: '1px dashed var(--outline-variant)',
                              cursor: esRestaurante ? 'pointer' : 'default',
                              flexWrap: 'wrap',
                              gap: '0.5rem',
                              transition: 'background 0.15s ease'
                            }}
                            title={esRestaurante ? `Clic para ver mesas libres a las ${hora} h` : undefined}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <span style={{ width: '65px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>
                                {hora}
                              </span>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--on-tertiary-container)', fontWeight: 600 }}>
                                ● {esRestaurante ? 'Mesas Libres Disponibles (0 reservas · Clic para ver desglose)' : 'Hueco Libre Disponible'}
                              </span>
                            </div>

                            {esRestaurante && (
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setPopupMesasHora(hora); }}
                                className="btn-stitch-outline"
                                style={{ padding: '0.3rem 0.75rem', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                              >
                                <Search size={12} /> Ver Mesas Libres a las {hora} h
                              </button>
                            )}
                          </div>
                        );
                      }

                      // SI HAY RESERVAS: AGRUPADAS EN UN CONTENEDOR COMÚN DE ESA HORA
                      return (
                        <div
                          key={hora}
                          style={{
                            background: 'var(--surface-container-lowest)',
                            border: '1.5px solid var(--secondary)',
                            borderRadius: '10px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                            overflow: 'hidden'
                          }}
                        >
                          {/* CABECERA AGRUPADA DE LA HORA */}
                          <div 
                            onClick={esRestaurante ? () => setPopupMesasHora(hora) : undefined}
                            style={{
                              background: 'var(--surface-container-high)',
                              padding: '0.65rem 1.25rem',
                              borderBottom: '1px solid var(--outline-variant)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: esRestaurante ? 'pointer' : 'default',
                              flexWrap: 'wrap',
                              gap: '0.5rem',
                              transition: 'background 0.15s ease'
                            }}
                            title={esRestaurante ? `Clic para ver mesas libres a las ${hora} h` : undefined}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--secondary)', fontFamily: 'var(--font-mono)' }}>
                                ⏰ {hora} h
                              </span>

                              {esRestaurante ? (
                                <span className="badge badge-secondary" style={{ fontSize: '11px', padding: '3px 8px' }}>
                                  {citasEnHora.length} {citasEnHora.length === 1 ? 'mesa ocupada' : 'mesas ocupadas'} · {totalComensalesHora} comensales
                                </span>
                              ) : (
                                <span className="badge badge-secondary" style={{ fontSize: '11px', padding: '3px 8px' }}>
                                  {citasEnHora.length} {citasEnHora.length === 1 ? 'cita programada' : 'citas programadas'}
                                </span>
                              )}
                            </div>

                            {esRestaurante && (
                              <button
                                type="button"
                                onClick={() => setPopupMesasHora(hora)}
                                className="btn-stitch-primary"
                                style={{ padding: '0.35rem 0.85rem', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                              >
                                <Search size={12} /> Ver Mesas Libres a las {hora} h
                              </button>
                            )}
                          </div>

                          {/* LISTA DE MESAS O CITAS AGRUPADAS DENTRO DE LA MISMA HORA */}
                          <div style={{ padding: '0.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {citasEnHora.map((cita, index) => (
                              <div
                                key={cita.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '0.75rem 1rem',
                                  borderRadius: '6px',
                                  background: 'var(--surface-container-low)',
                                  border: '1px solid var(--outline-variant)',
                                  flexWrap: 'wrap',
                                  gap: '0.5rem'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                  {esRestaurante && (
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, color: 'var(--on-surface-variant)', background: 'var(--surface-container-high)', padding: '2px 6px', borderRadius: '4px' }}>
                                      Mesa #{index + 1}
                                    </span>
                                  )}

                                  <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                      <strong style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>{cita.cliente}</strong>
                                      <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>{cita.telefono}</span>
                                      
                                      {esRestaurante ? (
                                        <span className="badge badge-secondary" style={{ fontSize: '10px' }}>
                                          🍴 {cita.comensales} personas
                                        </span>
                                      ) : (
                                        <span className="badge badge-secondary" style={{ fontSize: '10px' }}>
                                          {cita.profNombre}
                                        </span>
                                      )}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--on-surface)', marginTop: '0.15rem' }}>
                                      <FileText size={13} color="var(--secondary)" />
                                      <span>{cita.notas}</span>
                                    </div>
                                  </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span className="badge badge-success">Confirmada</span>
                                  <button
                                    onClick={() => handleEliminarReserva(cita.id)}
                                    title="Cancelar reserva"
                                    style={{
                                      background: 'transparent',
                                      border: '1px solid #ba1a1a',
                                      color: '#ba1a1a',
                                      borderRadius: '4px',
                                      padding: '4px 8px',
                                      fontSize: '11px',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      fontFamily: 'var(--font-mono)'
                                    }}
                                  >
                                    <Trash2 size={12} /> Cancelar
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            )}

            {/* 3. PANTALLA AJUSTES DE PROPIETARIO */}
            {modoVista === 'propietario' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Banner Explicativo */}
                <div style={{
                  background: 'rgba(70, 72, 212, 0.06)',
                  border: '1px solid rgba(70, 72, 212, 0.25)',
                  borderRadius: '8px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Settings size={22} color="var(--secondary)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--primary)', fontSize: '0.95rem' }}>
                      Control Total del Propietario / Administrador
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                      Personaliza cada día de la semana hora por hora. Añade o quita franjas concretas y gestiona {esRestaurante ? 'las mesas y capacidad de tu restaurante' : 'los profesionales de tu equipo'}.
                    </p>
                  </div>
                </div>

                {/* SI ES RESTAURANTE: GESTIÓN DE MESAS Y COMENSALES */}
                {esRestaurante && (
                  <div style={{ background: 'var(--surface-container-low)', border: '1px solid var(--outline-variant)', borderRadius: '8px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LayoutGrid size={16} color="var(--secondary)" /> Configuración de Mesas y Aforo del Restaurante
                      </h4>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--secondary)', fontFamily: 'var(--font-mono)' }}>
                        Aforo: {aforoTotalRestaurante} comensales en {totalMesasRestaurante} mesas
                      </span>
                    </div>
                    <p style={{ margin: '0 0 1.25rem', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                      Especifica cuántas mesas tienes de 2, 4, 6 o más comensales. El motor de reservas asignará las mesas según el grupo:
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {mesasRestaurante.map(m => (
                        <div
                          key={m.id}
                          style={{
                            background: 'var(--surface-container-lowest)',
                            border: '1px solid var(--outline-variant)',
                            borderRadius: '8px',
                            padding: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <strong style={{ fontSize: '0.9rem', color: 'var(--primary)', display: 'block' }}>
                              {m.nombre}
                            </strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
                              Capacidad: <strong>{m.capacidad} personas</strong> / mesa
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                              type="button"
                              onClick={() => handleCambiarCantidadMesas(m.id, -1)}
                              style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-high)', cursor: 'pointer', fontWeight: 800 }}
                            >
                              -
                            </button>
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '14px', width: '20px', textAlign: 'center' }}>
                              {m.cantidad}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCambiarCantidadMesas(m.id, 1)}
                              style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid var(--outline-variant)', background: 'var(--secondary)', color: '#fff', cursor: 'pointer', fontWeight: 800 }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAgregarTipoMesa} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        placeholder="Nombre (ej: Mesas de 8 Terraza)..."
                        className="input-field"
                        style={{ flex: '2 1 200px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                        value={nuevaMesa.nombre}
                        onChange={(e) => setNuevaMesa({ ...nuevaMesa, nombre: e.target.value })}
                      />
                      <input
                        type="number"
                        placeholder="Capacidad (ej: 8)..."
                        min="1"
                        max="30"
                        className="input-field"
                        style={{ flex: '1 1 120px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                        value={nuevaMesa.capacidad}
                        onChange={(e) => setNuevaMesa({ ...nuevaMesa, capacidad: e.target.value })}
                      />
                      <input
                        type="number"
                        placeholder="Cantidad (ej: 2)..."
                        min="1"
                        max="50"
                        className="input-field"
                        style={{ flex: '1 1 120px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                        value={nuevaMesa.cantidad}
                        onChange={(e) => setNuevaMesa({ ...nuevaMesa, cantidad: e.target.value })}
                      />
                      <button type="submit" className="btn-stitch-primary" style={{ padding: '0.5rem 1rem', fontSize: '11px' }}>
                        <Plus size={14} /> + Tipo de Mesa
                      </button>
                    </form>
                  </div>
                )}

                {/* HORARIOS PERSONALIZADOS POR DÍA */}
                <div style={{ background: 'var(--surface-container-low)', border: '1px solid var(--outline-variant)', borderRadius: '8px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} color="var(--secondary)" /> Horario 100% Personalizado por Día
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                      Elige un día para ver y retocar sus horas exactas:
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {Object.entries(nombresDiasCompletos).map(([clave, nombre]) => {
                      const isSel = diaParaEditarHorario === clave;
                      const horas = horariosPorDia[clave] || [];
                      return (
                        <button
                          key={clave}
                          type="button"
                          onClick={() => setDiaParaEditarHorario(clave)}
                          style={{
                            padding: '0.45rem 0.25rem',
                            borderRadius: '6px',
                            border: `1.5px solid ${isSel ? 'var(--secondary)' : 'var(--outline-variant)'}`,
                            background: isSel ? 'var(--secondary)' : 'var(--surface-container-lowest)',
                            color: isSel ? '#fff' : 'var(--primary)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                          }}
                        >
                          <span>{nombre}</span>
                          <span style={{ fontSize: '9px', opacity: 0.8 }}>
                            {horas.length > 0 ? `${horas.length} franjas` : 'Cerrado'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{
                    background: 'var(--surface-container-lowest)',
                    border: '1px solid var(--outline-variant)',
                    borderRadius: '8px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <strong style={{ fontSize: '1rem', color: 'var(--primary)' }}>
                          Horas de apertura para el {nombresDiasCompletos[diaParaEditarHorario]}
                        </strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
                          {(horariosPorDia[diaParaEditarHorario] || []).length > 0 
                            ? `Abierto con ${(horariosPorDia[diaParaEditarHorario] || []).length} horas disponibles para reservas` 
                            : 'Cerrado este día'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => handleCargarHorarioMananaTarde(diaParaEditarHorario)}
                          className="btn-stitch-outline"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '10px' }}
                        >
                          Cargar Mñn y Tarde
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCerrarDia(diaParaEditarHorario)}
                          style={{ padding: '0.3rem 0.6rem', fontSize: '10px', background: 'transparent', border: '1px solid #ba1a1a', color: '#ba1a1a', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                        >
                          Marcar Cerrado
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {(horariosPorDia[diaParaEditarHorario] || []).length === 0 ? (
                        <div style={{ fontSize: '0.85rem', color: 'var(--outline)', fontStyle: 'italic' }}>
                          No hay horas asignadas. El negocio figura como cerrado este día.
                        </div>
                      ) : (
                        (horariosPorDia[diaParaEditarHorario] || []).map(h => (
                          <span
                            key={h}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.35rem 0.6rem',
                              borderRadius: '4px',
                              background: 'var(--surface-container-high)',
                              border: '1px solid var(--outline-variant)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              fontWeight: 700,
                              color: 'var(--primary)'
                            }}
                          >
                            {h} h
                            <button
                              type="button"
                              onClick={() => handleEliminarHoraDeDia(diaParaEditarHorario, h)}
                              title="Quitar esta hora"
                              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ba1a1a', display: 'flex', padding: 0 }}
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))
                      )}
                    </div>

                    <form onSubmit={handleAgregarHoraADia} style={{ display: 'flex', gap: '0.5rem', maxWidth: '320px' }}>
                      <input
                        type="text"
                        placeholder="Ej: 15:30 o 21:15..."
                        className="input-field"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                        value={horaNuevaInput}
                        onChange={(e) => setHoraNuevaInput(e.target.value)}
                      />
                      <button type="submit" className="btn-stitch-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '11px', whiteSpace: 'nowrap' }}>
                        <Plus size={13} /> Añadir Hora
                      </button>
                    </form>
                  </div>
                </div>

                {/* SI NO ES RESTAURANTE: GESTIÓN DE EMPLEADOS */}
                {!esRestaurante && (
                  <div style={{ background: 'var(--surface-container-low)', border: '1px solid var(--outline-variant)', borderRadius: '8px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={16} color="var(--secondary)" /> Empleados en Plantilla ({profesionalesSandbox.length})
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                        Añade o quita profesionales de tu equipo
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {profesionalesSandbox.map(p => (
                        <div key={p.id} style={{
                          background: 'var(--surface-container-lowest)',
                          border: '1px solid var(--outline-variant)',
                          borderRadius: '6px',
                          padding: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img src={p.avatar} alt={p.nombre} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <strong style={{ fontSize: '0.85rem', color: 'var(--primary)', display: 'block' }}>{p.nombre}</strong>
                              <span style={{ fontSize: '0.7rem', color: 'var(--on-surface-variant)' }}>{p.rol}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleEliminarEmpleado(p.id)}
                            disabled={profesionalesSandbox.length <= 1}
                            title="Quitar empleado"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: profesionalesSandbox.length <= 1 ? '#c6c6cd' : '#ba1a1a',
                              cursor: profesionalesSandbox.length <= 1 ? 'not-allowed' : 'pointer',
                              padding: '4px'
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAgregarEmpleado} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        placeholder="Nombre del nuevo profesional..."
                        required
                        className="input-field"
                        style={{ flex: '1 1 180px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                        value={nuevoEmpleado.nombre}
                        onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Especialidad / Rol..."
                        className="input-field"
                        style={{ flex: '1 1 180px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                        value={nuevoEmpleado.rol}
                        onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, rol: e.target.value })}
                      />
                      <button type="submit" className="btn-stitch-primary" style={{ padding: '0.5rem 1rem', fontSize: '11px' }}>
                        <Plus size={14} /> Añadir Empleado
                      </button>
                    </form>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

        {/* POP-UP MODAL DE MESAS LIBRES Y OCUPADAS POR HORA */}
        {popupMesasHora && esRestaurante && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--outline-variant)', width: '100%', maxWidth: '580px', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
              
              {/* Cabecera del Pop-up */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--secondary)', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.35rem' }}>
                    <Utensils size={14} /> Estado de Sala en Vivo
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    Mesas Disponibles a las {popupMesasHora} h
                  </h3>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                    Día: <strong>{diaSeleccionadoAgenda.dia}</strong> · Restaurante El Olivo
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setPopupMesasHora(null)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--outline)', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* DESGLOSE DE MESAS LIBRES Y DE CUÁNTAS PERSONAS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {calcularEstadoMesasEnHora(popupMesasHora, diaActivoAgenda).map(item => {
                  const hayLibres = item.libres > 0;
                  return (
                    <div
                      key={item.id}
                      style={{
                        background: hayLibres ? 'var(--surface-container-lowest)' : 'var(--surface-container-high)',
                        border: `1.5px solid ${hayLibres ? '#009668' : 'var(--outline-variant)'}`,
                        borderRadius: '8px',
                        padding: '0.9rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '1rem', color: 'var(--primary)', display: 'block' }}>
                          {item.nombre}
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                          Para grupos de <strong>{item.capacidad} personas</strong> · {item.cantidad} mesas totales en el restaurante
                        </span>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '13px',
                          fontWeight: 800,
                          color: hayLibres ? '#009668' : '#ba1a1a',
                          background: hayLibres ? 'rgba(0, 150, 104, 0.1)' : 'rgba(186, 26, 26, 0.1)',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          display: 'inline-block'
                        }}>
                          {hayLibres ? `${item.libres} LIBRES` : 'COMPLETO'}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
                          {item.ocupadas} {item.ocupadas === 1 ? 'mesa ocupada' : 'mesas ocupadas'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Botones del Pop-up */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
                <button
                  type="button"
                  className="btn-stitch-outline"
                  onClick={() => setPopupMesasHora(null)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn-stitch-primary"
                  onClick={() => {
                    setFormTelefono({ ...formTelefono, diaId: diaActivoAgenda, hora: popupMesasHora });
                    setPopupMesasHora(null);
                    setModalTelefono(true);
                  }}
                >
                  + Asignar Mesa a las {popupMesasHora} h
                </button>
              </div>

            </div>
          </div>
        )}

        {/* MODAL TELEFÓNICO */}
        {modalTelefono && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--outline-variant)', width: '100%', maxWidth: '500px', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'var(--surface-container-high)', color: 'var(--primary)' }}>
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                    {esRestaurante ? 'Atender Llamada para Reserva de Mesa' : 'Atender Llamada Telefónica'}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                    Revisas tus huecos libres al segundo y apuntas al cliente
                  </p>
                </div>
              </div>

              <div style={{
                background: 'var(--surface-container-high)',
                border: '1px solid var(--outline-variant)',
                borderRadius: '6px',
                padding: '0.75rem',
                fontSize: '0.8rem',
                color: 'var(--on-surface-variant)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <Info size={15} color="var(--secondary)" style={{ flexShrink: 0 }} />
                <span>Apuntas la reserva eligiendo entre los 5 días próximos y guardas notas para el equipo.</span>
              </div>

              <form onSubmit={handleGuardarCitaTelefonica}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      Nombre del cliente *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Marcos Pérez"
                      className="input-field"
                      value={formTelefono.cliente}
                      onChange={(e) => setFormTelefono({ ...formTelefono, cliente: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      Teléfono *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+34 600 000 000"
                      className="input-field"
                      value={formTelefono.telefono}
                      onChange={(e) => setFormTelefono({ ...formTelefono, telefono: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      Día de la reserva:
                    </label>
                    <select
                      className="input-field"
                      value={formTelefono.diaId}
                      onChange={(e) => setFormTelefono({ ...formTelefono, diaId: e.target.value })}
                    >
                      {diasDemoCinco.map(d => (
                        <option key={d.id} value={d.id}>{d.dia}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    {esRestaurante ? (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          Comensales:
                        </label>
                        <select
                          className="input-field"
                          value={formTelefono.comensales}
                          onChange={(e) => setFormTelefono({ ...formTelefono, comensales: parseInt(e.target.value, 10) })}
                        >
                          <option value={2}>2 comensales</option>
                          <option value={4}>4 comensales</option>
                          <option value={6}>6 comensales</option>
                          <option value={8}>8 comensales</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          Asignar a:
                        </label>
                        <select
                          className="input-field"
                          value={formTelefono.profId}
                          onChange={(e) => setFormTelefono({ ...formTelefono, profId: e.target.value })}
                        >
                          {profesionalesSandbox.map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Hora acordada:
                  </label>
                  <select
                    className="input-field"
                    value={formTelefono.hora}
                    onChange={(e) => setFormTelefono({ ...formTelefono, hora: e.target.value })}
                  >
                    {getHorasDeDia(diasDemoCinco.find(d => d.id === formTelefono.diaId)?.claveSemana || 'mie').map(h => (
                      <option key={h} value={h}>{h} h</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Notas / Qué servicio te pide:
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formTelefono.notas}
                    onChange={(e) => setFormTelefono({ ...formTelefono, notas: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button type="button" className="btn-stitch-outline" onClick={() => setModalTelefono(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-stitch-primary">
                    {esRestaurante ? 'Guardar Mesa' : 'Apuntar Cita'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
