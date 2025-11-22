import React from 'react';

interface HorarioDisponible {
  hora: string;
  disponible: boolean;
}

interface AvailableSlotsProps {
  fecha: string;
  horaSeleccionada: string;
  onHoraSelect: (hora: string) => void;
}

const AvailableSlots: React.FC<AvailableSlotsProps> = ({ 
  fecha, 
  horaSeleccionada, 
  onHoraSelect 
}) => {
  // Horarios por fecha - Simulando disponibilidad real
  const obtenerHorariosPorFecha = (fechaStr: string): HorarioDisponible[] => {
    const fecha = new Date(fechaStr);
    const diaSemana = fecha.getDay(); // 0 = Domingo, 1 = Lunes, etc.
    
    // Domingo - Sin atención
    if (diaSemana === 0) {
      return [];
    }
    
    // Sábado - Horario reducido
    if (diaSemana === 6) {
      return [
        { hora: '09:00 AM', disponible: true },
        { hora: '09:30 AM', disponible: false },
        { hora: '10:00 AM', disponible: true },
        { hora: '10:30 AM', disponible: true },
        { hora: '11:00 AM', disponible: false },
      ];
    }
    
    // Lunes a Viernes
    const horariosBase: HorarioDisponible[] = [
      { hora: '08:00 AM', disponible: true },
      { hora: '08:30 AM', disponible: true },
      { hora: '09:00 AM', disponible: diaSemana !== 1 }, // Lunes ocupado
      { hora: '09:30 AM', disponible: true },
      { hora: '10:00 AM', disponible: diaSemana !== 2 }, // Martes ocupado
      { hora: '10:30 AM', disponible: true },
      { hora: '11:00 AM', disponible: true },
      { hora: '11:30 AM', disponible: diaSemana !== 3 }, // Miércoles ocupado
      { hora: '12:00 PM', disponible: false }, // Almuerzo
      { hora: '02:00 PM', disponible: true },
      { hora: '02:30 PM', disponible: true },
      { hora: '03:00 PM', disponible: diaSemana !== 4 }, // Jueves ocupado
      { hora: '03:28 PM', disponible: true },
      { hora: '04:00 PM', disponible: true },
      { hora: '04:30 PM', disponible: diaSemana !== 5 }, // Viernes ocupado
      { hora: '05:00 PM', disponible: true },
      { hora: '05:30 PM', disponible: true },
    ];
    
    return horariosBase;
  };

  const horariosDisponibles = obtenerHorariosPorFecha(fecha);
  const hayHorariosDisponibles = horariosDisponibles.some(h => h.disponible);

  const handleHoraClick = (hora: string, disponible: boolean) => {
    if (disponible) {
      onHoraSelect(hora);
    }
  };

  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return '';
    const date = new Date(fechaStr);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="available-slots">
      <h3 className="slots-title">Horarios Disponibles</h3>
      <p className="slots-subtitle">
        {fecha && `Fecha: ${formatearFecha(fecha)}`}
      </p>

      {/* Sin horarios disponibles */}
      {horariosDisponibles.length === 0 && (
        <div className="no-slots-message">
          <div className="no-slots-icon"></div>
          <h4 className="no-slots-title">No hay atención este día</h4>
          <p className="no-slots-text">
            Los domingos no hay atención médica. Por favor selecciona otro día.
          </p>
        </div>
      )}

      {/* Todos los horarios ocupados */}
      {horariosDisponibles.length > 0 && !hayHorariosDisponibles && (
        <div className="no-slots-message">
          <div className="no-slots-icon"></div>
          <h4 className="no-slots-title">No hay horarios disponibles</h4>
          <p className="no-slots-text">
            Todos los horarios para esta fecha están ocupados. Por favor selecciona otra fecha.
          </p>
        </div>
      )}

      {/* Mostrar horarios */}
      {horariosDisponibles.length > 0 && hayHorariosDisponibles && (
        <>
          <div className="slots-grid">
            {horariosDisponibles.map((horario) => (
              <button
                key={horario.hora}
                onClick={() => handleHoraClick(horario.hora, horario.disponible)}
                className={`slot-button ${
                  horario.disponible ? 'slot-available' : 'slot-occupied'
                } ${horaSeleccionada === horario.hora ? 'slot-selected' : ''}`}
                disabled={!horario.disponible}
              >
                <span className="slot-time">{horario.hora}</span>
                <span className="slot-status">
                  {horario.disponible ? '✓ Disponible' : '✗ Ocupado'}
                </span>
              </button>
            ))}
          </div>

          <div className="slots-legend">
            <div className="legend-item">
              <div className="legend-color legend-available"></div>
              <span>Disponible</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-selected"></div>
              <span>Seleccionado</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-occupied"></div>
              <span>Ocupado</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableSlots;