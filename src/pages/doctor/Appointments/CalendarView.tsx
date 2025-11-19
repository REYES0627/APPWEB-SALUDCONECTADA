import React, { useState } from 'react';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
}

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');

  // Datos de ejemplo - citas médicas
  const appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Ana García López',
      patientId: 'P001',
      date: '2024-01-20',
      time: '09:00',
      duration: 30,
      type: 'Consulta general',
      status: 'confirmed',
      notes: 'Control de presión arterial'
    },
    {
      id: '2',
      patientName: 'Carlos Rodríguez',
      patientId: 'P002',
      date: '2024-01-20',
      time: '10:30',
      duration: 45,
      type: 'Revisión',
      status: 'confirmed',
      notes: 'Resultados de laboratorio'
    },
    {
      id: '3',
      patientName: 'María Torres',
      patientId: 'P003',
      date: '2024-01-20',
      time: '14:00',
      duration: 60,
      type: 'Consulta especializada',
      status: 'pending'
    },
    {
      id: '4',
      patientName: 'Juan Pérez',
      patientId: 'P004',
      date: '2024-01-21',
      time: '11:00',
      duration: 30,
      type: 'Control',
      status: 'confirmed'
    }
  ];

  // Horarios de trabajo
  const workHours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

  // Obtener citas para la fecha seleccionada
  const getAppointmentsForDate = (date: string) => {
    return appointments.filter(appointment => appointment.date === date);
  };

  // Navegación del calendario
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  // Formatear fecha
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener color según estado
  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: '#10b981',
      pending: '#f59e0b',
      cancelled: '#ef4444'
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  };

  // Vista semanal - Días de la semana
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDays = getWeekDays();

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          color: '#2a4ea2', 
          margin: '0 0 8px 0',
          fontSize: '28px',
          fontWeight: '700'
        }}>
          Agenda Médica
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Gestiona tus citas y horarios de atención
        </p>
      </div>

      {/* Controles del calendario */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={goToToday}
            style={{
              padding: '8px 16px',
              background: '#2a4ea2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Hoy
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={goToPrevious}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '5px'
              }}
            >
              ◀
            </button>
            
            <span style={{ 
              fontWeight: '600',
              color: '#1e293b',
              minWidth: '200px',
              textAlign: 'center'
            }}>
              {formatDate(currentDate)}
            </span>

            <button
              onClick={goToNext}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '5px'
              }}
            >
              ▶
            </button>
          </div>
        </div>

        {/* Selector de vista */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {(['day', 'week', 'month'] as const).map(viewType => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              style={{
                padding: '8px 16px',
                background: view === viewType ? '#2a4ea2' : 'white',
                color: view === viewType ? 'white' : '#374151',
                border: `1px solid ${view === viewType ? '#2a4ea2' : '#d1d5db'}`,
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {viewType === 'day' ? 'Día' : viewType === 'week' ? 'Semana' : 'Mes'}
            </button>
          ))}
        </div>

        <button style={{
          padding: '10px 20px',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>➕</span>
          Nueva Cita
        </button>
      </div>

      {/* Vista Semanal del Calendario */}
      {view === 'week' && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Encabezado de días */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '80px repeat(7, 1fr)',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <div style={{ 
              padding: '15px', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Hora
            </div>
            {weekDays.map(day => (
              <div
                key={day.toISOString()}
                style={{
                  padding: '15px',
                  textAlign: 'center',
                  fontWeight: '600',
                  color: day.toDateString() === new Date().toDateString() 
                    ? '#2a4ea2' 
                    : '#374151',
                  background: day.toDateString() === new Date().toDateString() 
                    ? '#f0f9ff' 
                    : 'transparent',
                  borderLeft: '1px solid #e5e7eb'
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {day.toLocaleDateString('es-ES', { weekday: 'short' })}
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '700',
                  marginTop: '4px'
                }}>
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Cuerpo del calendario - Horas */}
          <div style={{ maxHeight: '600px', overflow: 'auto' }}>
            {workHours.map(hour => (
              <div
                key={hour}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px repeat(7, 1fr)',
                  borderBottom: '1px solid #f3f4f6'
                }}
              >
                {/* Columna de horas */}
                <div style={{
                  padding: '10px 15px',
                  color: '#6b7280',
                  fontSize: '14px',
                  borderRight: '1px solid #e5e7eb',
                  background: '#f8fafc'
                }}>
                  {hour}:00
                </div>

                {/* Celdas de cada día */}
                {weekDays.map(day => {
                  const dayString = day.toISOString().split('T')[0];
                  const hourAppointments = getAppointmentsForDate(dayString)
                    .filter(apt => parseInt(apt.time.split(':')[0]) === hour);

                  return (
                    <div
                      key={dayString}
                      style={{
                        minHeight: '60px',
                        borderRight: '1px solid #e5e7eb',
                        position: 'relative',
                        background: 'white'
                      }}
                    >
                      {hourAppointments.map(appointment => (
                        <div
                          key={appointment.id}
                          style={{
                            background: getStatusColor(appointment.status),
                            color: 'white',
                            padding: '8px',
                            margin: '2px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '0',
                            left: '2px',
                            right: '2px',
                            zIndex: 1
                          }}
                          title={`${appointment.patientName} - ${appointment.time} - ${appointment.type}`}
                        >
                          <div style={{ 
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {appointment.patientName}
                          </div>
                          <div style={{ 
                            fontSize: '11px',
                            opacity: '0.9'
                          }}>
                            {appointment.time} - {appointment.type}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leyenda de estados */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '20px',
        padding: '15px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#10b981'
          }}></div>
          <span style={{ fontSize: '14px', color: '#374151' }}>Confirmada</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#f59e0b'
          }}></div>
          <span style={{ fontSize: '14px', color: '#374151' }}>Pendiente</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#ef4444'
          }}></div>
          <span style={{ fontSize: '14px', color: '#374151' }}>Cancelada</span>
        </div>
      </div>

      {/* Resumen del día seleccionado */}
      <div style={{
        marginTop: '30px',
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ 
          margin: '0 0 20px 0',
          color: '#2a4ea2',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          Citas para {new Date(selectedDate).toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>

        {getAppointmentsForDate(selectedDate).length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#6b7280',
            padding: '40px'
          }}>
            No hay citas programadas para este día
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {getAppointmentsForDate(selectedDate)
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(appointment => (
                <div
                  key={appointment.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: getStatusColor(appointment.status),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      {appointment.time.split(':')[0]}
                    </div>
                    <div>
                      <div style={{ 
                        fontWeight: '600',
                        color: '#1e293b',
                        marginBottom: '4px'
                      }}>
                        {appointment.patientName}
                      </div>
                      <div style={{ 
                        fontSize: '14px',
                        color: '#64748b'
                      }}>
                        {appointment.time} • {appointment.type} • {appointment.duration} min
                      </div>
                      {appointment.notes && (
                        <div style={{ 
                          fontSize: '13px',
                          color: '#6b7280',
                          fontStyle: 'italic',
                          marginTop: '4px'
                        }}>
                          📝 {appointment.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      padding: '6px 12px',
                      background: '#e0f2fe',
                      color: '#0369a1',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Ver
                    </button>
                    <button style={{
                      padding: '6px 12px',
                      background: '#fef3c7',
                      color: '#92400e',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Editar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;