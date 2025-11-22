import React, { useState } from 'react';
import '../../../styles/MyAppointments.css';

interface Cita {
  id: number;
  fecha: string;
  hora: string;
  especialidad: string;
  medico: string;
  modalidad: string;
  estado: string;
  asunto?: string;
  motivo?: string;
}

const MyAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'proximas' | 'pasadas' | 'canceladas'>('proximas');

  // Nuevo: controla qué card se abrió y de qué tab
  const [showDetails, setShowDetails] = useState<{ tab: string; id: number | null }>({
    tab: '',
    id: null,
  });

  const [showReprogramModal, setShowReprogramModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);

  // Modal cancelar
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [motivoCancelacion, setMotivoCancelacion] = useState('');

  // Datos reprogramación
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHora, setNuevaHora] = useState('');
  const [nuevoMedico, setNuevoMedico] = useState('');
  const [nuevoAsunto, setNuevoAsunto] = useState('');
  const [nuevaModalidad, setNuevaModalidad] = useState('');

  // Próximas (STATE)
  const [citasProximas, setCitasProximas] = useState<Cita[]>([
    {
      id: 1,
      fecha: '01-01-2025',
      hora: '03:28 PM',
      especialidad: 'Medicina general',
      medico: 'Dr. Diego Ramírez',
      modalidad: 'Presencial',
      estado: 'Confirmada',
      asunto: 'Dolor de garganta',
    },
    {
      id: 2,
      fecha: '05-01-2025',
      hora: '10:00 AM',
      especialidad: 'Cardiología',
      medico: 'Dra. Ana Martínez',
      modalidad: 'Virtual',
      estado: 'Por confirmar',
      asunto: 'Control de presión arterial',
    },
  ]);

  // Pasadas (NO cambian)
  const citasPasadas: Cita[] = [
    { id: 3, fecha: '10-02-2023', hora: '4:00 PM', especialidad: 'Cardiología', medico: 'Dr. Juan Pérez', modalidad: 'Presencial', estado: 'Atendido' },
    { id: 4, fecha: '22-01-2023', hora: '11:00 AM', especialidad: 'Medicina general', medico: 'Dra. Laura Torres', modalidad: 'Virtual', estado: 'Atendido' },
    { id: 5, fecha: '18-12-2022', hora: '9:30 AM', especialidad: 'Odontología', medico: 'Dr. Carlos Gómez', modalidad: 'Presencial', estado: 'Atendido' },
    { id: 6, fecha: '05-11-2022', hora: '2:15 PM', especialidad: 'Dermatología', medico: 'Dra. María Silva', modalidad: 'Presencial', estado: 'Atendido' },
  ];

  // Canceladas (STATE para agregar nuevas)
  const [citasCanceladas, setCitasCanceladas] = useState<Cita[]>([
    { id: 7, fecha: '18-04-2023', hora: '3:30 PM', especialidad: 'Cardiología', medico: 'Dr. Ricardo Medina', modalidad: 'Presencial', estado: 'Cancelada', motivo: 'Previo aviso del paciente el mismo día de la cita' },
    { id: 8, fecha: '05-02-2023', hora: '2:00 PM', especialidad: 'Medicina general', medico: 'Dr. Javier Polo', modalidad: 'Virtual', estado: 'Cancelada', motivo: 'Emergencia médica del doctor' },
    { id: 9, fecha: '27-01-2023', hora: '9:00 AM', especialidad: 'Medicina general', medico: 'Dr. Andrés Morales', modalidad: 'Presencial', estado: 'Cancelada', motivo: 'Cambio inesperado de turno en el trabajo del paciente' },
    { id: 10, fecha: '15-12-2022', hora: '4:45 PM', especialidad: 'Traumatología', medico: 'Dr. Luis Fernández', modalidad: 'Presencial', estado: 'Cancelada', motivo: 'Paciente no se presentó' },
  ]);

  // Abrir modal reprogramar
  const handleReprogramar = (cita: Cita) => {
    setSelectedCita(cita);
    setNuevaFecha('');
    setNuevaHora('');
    setNuevoMedico('');
    setNuevoAsunto(cita.asunto || '');
    setNuevaModalidad(cita.modalidad);
    setShowReprogramModal(true);
  };

  // Abrir modal cancelar
  const handleCancelar = (cita: Cita) => {
    setSelectedCita(cita);
    setMotivoCancelacion('');
    setShowCancelModal(true);
  };

  // Confirmar cancelación
  const confirmarCancelacion = () => {
    if (!motivoCancelacion.trim()) {
      alert('Debes ingresar un motivo');
      return;
    }
    if (!selectedCita) return;

    setCitasProximas(prev => prev.filter(c => c.id !== selectedCita.id));

    setCitasCanceladas(prev => [
      ...prev,
      { ...selectedCita, estado: 'Cancelada', motivo: motivoCancelacion },
    ]);

    setShowCancelModal(false);
    alert('Cita cancelada exitosamente');
  };

  // Confirmar reprogramación
  const confirmarReprogramacion = () => {
    if (!nuevaFecha || !nuevaHora || !nuevaModalidad) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    setCitasProximas(prev =>
      prev.map(c =>
        c.id === selectedCita?.id
          ? {
              ...c,
              fecha: nuevaFecha,
              hora: nuevaHora,
              medico: nuevoMedico || c.medico,
              asunto: nuevoAsunto,
              modalidad: nuevaModalidad,
            }
          : c
      )
    );

    alert('Cita reprogramada correctamente');
    setShowReprogramModal(false);
  };

  // Cambiar visibilidad del detalle por TAB
  const toggleDetails = (tab: string, id: number) => {
    setShowDetails(prev =>
      prev.tab === tab && prev.id === id
        ? { tab: '', id: null }
        : { tab, id }
    );
  };

  return (
    <div className="appointments-container">

      {/* Header */}
      <div className="appointments-header">
        <h1 className="appointments-title">Mis Citas Médicas</h1>
        <p className="appointments-subtitle">Revisa tus próximas citas, pasadas y canceladas</p>
      </div>

      {/* Tabs */}
      <div className="appointments-tabs">
        <button onClick={() => setActiveTab('proximas')} className={`tab-button ${activeTab === 'proximas' ? 'tab-active tab-proximas' : ''}`}>🔜 Próximas</button>
        <button onClick={() => setActiveTab('pasadas')} className={`tab-button ${activeTab === 'pasadas' ? 'tab-active tab-pasadas' : ''}`}>✅ Pasadas</button>
        <button onClick={() => setActiveTab('canceladas')} className={`tab-button ${activeTab === 'canceladas' ? 'tab-active tab-canceladas' : ''}`}>❌ Canceladas</button>
      </div>

      {/* Grid */}
      <div className="appointments-grid">

        {/* Próximas */}
        {activeTab === 'proximas' && citasProximas.map(cita => (
          <div key={cita.id} className="appointment-card card-proxima">

            <div className="card-header">
              <span className="badge badge-proxima">{cita.estado}</span>

              {/* Nuevo botón + individual */}
              <button onClick={() => toggleDetails('proximas', cita.id)} className="details-button">
                {showDetails.tab === 'proximas' && showDetails.id === cita.id ? '−' : '+'}
              </button>
            </div>

            <div className="card-info">
              <div className="info-item"><span className="info-label">Fecha y Hora</span> <span className="info-value">{cita.fecha} - {cita.hora}</span></div>
              <div className="info-item"><span className="info-label">Especialidad</span> <span className="info-value">{cita.especialidad}</span></div>
              <div className="info-item"><span className="info-label">Médico</span> <span className="info-value">{cita.medico}</span></div>
              <div className="info-item"><span className="info-label">Modalidad</span> <span className="info-value">{cita.modalidad}</span></div>
            </div>

            {/* Mostrar detalles */}
            {showDetails.tab === 'proximas' && showDetails.id === cita.id && (
              <div className="details-box">
                <span className="info-label">Asunto</span>
                <p className="details-text">{cita.asunto}</p>
              </div>
            )}

            <div className="card-actions">
              <button onClick={() => handleReprogramar(cita)} className="btn btn-reprogram">Reprogramar</button>
              <button onClick={() => handleCancelar(cita)} className="btn btn-cancel">Cancelar</button>
            </div>

          </div>
        ))}

        {/* Pasadas */}
        {activeTab === 'pasadas' && citasPasadas.map(cita => (
          <div key={cita.id} className="appointment-card card-pasada">

            <div className="card-header">
              <span className="badge badge-pasada">{cita.estado}</span>

              <button onClick={() => toggleDetails('pasadas', cita.id)} className="details-button">
                {showDetails.tab === 'pasadas' && showDetails.id === cita.id ? '−' : '+'}
              </button>
            </div>

            <div className="card-info">
              <div className="info-item"><span className="info-label">Fecha y Hora</span> <span className="info-value">{cita.fecha} - {cita.hora}</span></div>
              <div className="info-item"><span className="info-label">Especialidad</span> <span className="info-value">{cita.especialidad}</span></div>
              <div className="info-item"><span className="info-label">Médico</span> <span className="info-value">{cita.medico}</span></div>
              <div className="info-item"><span className="info-label">Modalidad</span> <span className="info-value">{cita.modalidad}</span></div>
            </div>

            {showDetails.tab === 'pasadas' && showDetails.id === cita.id && (
              <div className="details-box details-pasada">
                <p className="details-text">Cita atendida exitosamente</p>
              </div>
            )}

          </div>
        ))}

        {/* Canceladas */}
        {activeTab === 'canceladas' && citasCanceladas.map(cita => (
          <div key={cita.id} className="appointment-card card-cancelada">

            <div className="card-header">
              <span className="badge badge-cancelada">{cita.estado}</span>

              <button onClick={() => toggleDetails('canceladas', cita.id)} className="details-button">
                {showDetails.tab === 'canceladas' && showDetails.id === cita.id ? '−' : '+'}
              </button>
            </div>

            <div className="card-info">
              <div className="info-item"><span className="info-label">Fecha y Hora</span> <span className="info-value">{cita.fecha} - {cita.hora}</span></div>
              <div className="info-item"><span className="info-label">Especialidad</span> <span className="info-value">{cita.especialidad}</span></div>
              <div className="info-item"><span className="info-label">Médico</span> <span className="info-value">{cita.medico}</span></div>
              <div className="info-item"><span className="info-label">Modalidad</span> <span className="info-value">{cita.modalidad}</span></div>
            </div>

            {showDetails.tab === 'canceladas' && showDetails.id === cita.id && (
              <div className="details-box details-cancelada">
                <span className="info-label">Motivo de cancelación</span>
                <p className="details-text">{cita.motivo}</p>
              </div>
            )}

          </div>
        ))}

      </div>

      {/* Modal Reprogramación */}
      {showReprogramModal && (
        <div className="modal-overlay" onClick={() => setShowReprogramModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Reprogramar Cita</h2>
              <button onClick={() => setShowReprogramModal(false)} className="modal-close">✕</button>
            </div>

            <p className="modal-subtitle">Selecciona e ingresa los datos necesarios</p>

            <div className="modal-body">

              {/* Especialidad y hora */}
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Especialidad</label>
                  <select className="form-input">
                    <option value={selectedCita?.especialidad}>{selectedCita?.especialidad}</option>
                    <option value="Cardiología">Cardiología</option>
                    <option value="Dermatología">Dermatología</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Hora</label>
                  <select className="form-input" value={nuevaHora} onChange={e => setNuevaHora(e.target.value)}>
                    <option value="">Seleccionar</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Médico y fecha */}
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Médico</label>
                  <select className="form-input" value={nuevoMedico} onChange={e => setNuevoMedico(e.target.value)}>
                    <option value="">Seleccionar</option>
                    <option value="Dr. Diego Ramírez">Dr. Diego Ramírez</option>
                    <option value="Dra. Ana Martínez">Dra. Ana Martínez</option>
                    <option value="Dr. Carlos López">Dr. Carlos López</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Fecha</label>
                  <input type="date" className="form-input" value={nuevaFecha} onChange={e => setNuevaFecha(e.target.value)} />
                </div>
              </div>

              {/* Modalidad */}
              <div className="form-field">
                <label className="form-label">Modalidad</label>
                <select className="form-input" value={nuevaModalidad} onChange={e => setNuevaModalidad(e.target.value)}>
                  <option value="Presencial">Presencial</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>

              {/* Asunto */}
              <div className="form-field">
                <label className="form-label">Asunto</label>
                <input type="text" className="form-input" value={nuevoAsunto} onChange={e => setNuevoAsunto(e.target.value)} />
              </div>

            </div>

            <div className="modal-actions">
              <button onClick={() => setShowReprogramModal(false)} className="btn btn-modal-cancel">Cancelar</button>
              <button onClick={confirmarReprogramacion} className="btn btn-modal-confirm">✅ Reprogramar</button>
            </div>

          </div>
        </div>
      )}

      {/* Modal Cancelación */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Cancelar Cita</h2>
              <button onClick={() => setShowCancelModal(false)} className="modal-close">✕</button>
            </div>

            <p className="modal-subtitle">Ingresa el motivo de la cancelación</p>

            <div className="modal-body">
              <div className="form-field">
                <label className="form-label">Motivo</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={motivoCancelacion}
                  onChange={e => setMotivoCancelacion(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowCancelModal(false)} className="btn btn-modal-cancel">Cerrar</button>
              <button onClick={confirmarCancelacion} className="btn btn-modal-confirm">❌ Confirmar Cancelación</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyAppointments;