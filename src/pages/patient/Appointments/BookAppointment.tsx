import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvailableSlots from './AvailableSlots';
import '../../../styles/BookAppointment.css';

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const [especialidad, setEspecialidad] = useState('');
  const [medico, setMedico] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [asunto, setAsunto] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [mostrarHorarios, setMostrarHorarios] = useState(false);

  // Médicos por especialidad
  const medicosPorEspecialidad: { [key: string]: string[] } = {
    'Medicina general': ['Dr. Diego Ramírez', 'Dra. Laura Martínez', 'Dr. Carlos López'],
    'Cardiología': ['Dr. Juan Pérez', 'Dra. Ana Silva', 'Dr. Ricardo Medina'],
    'Dermatología': ['Dra. María Torres', 'Dr. Luis González'],
    'Odontología': ['Dr. Carlos Gómez', 'Dra. Patricia Ruiz'],
    'Traumatología': ['Dr. Luis Fernández', 'Dra. Carmen Soto'],
  };

  const handleEspecialidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEspecialidad(e.target.value);
    setMedico('');
    setMostrarHorarios(false);
    setHoraSeleccionada('');
  };

  const handleMedicoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMedico(e.target.value);
    setMostrarHorarios(false);
    setHoraSeleccionada('');
  };

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
    if (especialidad && medico && e.target.value) {
      setMostrarHorarios(true);
    }
  };

  const handleHoraSelect = (hora: string) => {
    setHoraSeleccionada(hora);
  };

  const handleConfirmar = () => {
    if (!especialidad || !medico || !fecha || !horaSeleccionada) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    setShowConfirmation(true);
  };

  const handleAceptarConfirmacion = () => {
    alert('¡Cita agendada exitosamente!');
    // Resetear formulario
    setEspecialidad('');
    setMedico('');
    setFecha('');
    setHoraSeleccionada('');
    setAsunto('');
    setShowConfirmation(false);
    setMostrarHorarios(false);
  };

  const handleVolver = () => {
    navigate('/patient');
  };

  return (
    <div className="book-appointment-container">
      {/* Header */}
      <div className="book-header">
        <h1 className="book-title">Agendar Cita</h1>
        <p className="book-subtitle">Selecciona e ingresa los datos necesarios para programar tu cita</p>
      </div>

      <div className="book-content">
        {/* Formulario Principal */}
        <div className="book-form">
          {/* Especialidad y Hora seleccionada */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Especialidad *</label>
              <select
                className="form-select"
                value={especialidad}
                onChange={handleEspecialidadChange}
              >
                <option value="">Seleccionar especialidad</option>
                <option value="Medicina general">Medicina general</option>
                <option value="Cardiología">Cardiología</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Odontología">Odontología</option>
                <option value="Traumatología">Traumatología</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Hora seleccionada</label>
              <input
                type="text"
                className="form-input form-input-readonly"
                value={horaSeleccionada || ''}
                readOnly
                placeholder="Selecciona una hora"
              />
            </div>
          </div>

          {/* Médico y Asunto */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Médicos disponibles *</label>
              <select
                className="form-select"
                value={medico}
                onChange={handleMedicoChange}
                disabled={!especialidad}
              >
                <option value="">Seleccionar médico</option>
                {especialidad && medicosPorEspecialidad[especialidad]?.map((doc) => (
                  <option key={doc} value={doc}>{doc}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Asunto</label>
              <input
                type="text"
                className="form-input"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Describe el motivo de tu cita"
              />
            </div>
          </div>

          {/* Fecha */}
          <div className="form-group">
            <label className="form-label">Fechas disponibles *</label>
            <input
              type="date"
              className="form-input"
              value={fecha}
              onChange={handleFechaChange}
              disabled={!medico}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Botones de acción */}
          <div className="form-actions">
            <button onClick={handleVolver} className="btn btn-secondary">← Atrás</button>
            <button onClick={handleConfirmar} className="btn btn-primary">
              Confirmar
            </button>
          </div>
        </div>

        {/* Componente AvailableSlots */}
        {mostrarHorarios && (
          <AvailableSlots 
            fecha={fecha}
            horaSeleccionada={horaSeleccionada}
            onHoraSelect={handleHoraSelect}
          />
        )}
      </div>

      {/* Modal de Confirmación */}
      {showConfirmation && (
        <div className="confirmation-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirmation-icon"></div>
            <h2 className="confirmation-title">¡Cita Confirmada!</h2>
            <div className="confirmation-details">
              <p>
                Su cita con <strong>{medico}</strong> ha sido confirmada para el{' '}
                <strong>{new Date(fecha).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</strong> a las <strong>{horaSeleccionada}</strong>.
              </p>
              <p>
                <strong>Especialidad:</strong> {especialidad}
              </p>
              {asunto && (
                <p className="confirmation-asunto">
                  <strong>Motivo:</strong> {asunto}
                </p>
              )}
            </div>
            <button onClick={handleAceptarConfirmacion} className="btn btn-confirm">
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;