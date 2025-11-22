import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const AppointmentList: React.FC = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo
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
      date: '2024-01-21',
      time: '14:00',
      duration: 60,
      type: 'Consulta especializada',
      status: 'pending'
    },
    {
      id: '4',
      patientName: 'Juan Pérez',
      patientId: 'P004',
      date: '2024-01-22',
      time: '11:00',
      duration: 30,
      type: 'Control',
      status: 'confirmed'
    },
    {
      id: '5',
      patientName: 'Laura Mendoza',
      patientId: 'P005',
      date: '2024-01-19',
      time: '16:30',
      duration: 45,
      type: 'Seguimiento',
      status: 'cancelled',
      notes: 'Paciente canceló por enfermedad'
    }
  ];

  // Filtrar citas
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: '#10b981',
      pending: '#f59e0b',
      cancelled: '#ef4444'
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  };

  const getStatusText = (status: string) => {
    const texts = {
      confirmed: 'Confirmada',
      pending: 'Pendiente',
      cancelled: 'Cancelada'
    };
    return texts[status as keyof typeof texts] || status;
  };

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
          Lista de Citas
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Gestiona todas tus citas médicas programadas
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {/* Búsqueda */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar por paciente o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 40px 10px 15px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                width: '300px'
              }}
            />
            <span style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280'
            }}>
              🔍
            </span>
          </div>

          {/* Filtro por estado */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              background: 'white'
            }}
          >
            <option value="all">Todos los estados</option>
            <option value="confirmed">Confirmadas</option>
            <option value="pending">Pendientes</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>

        <button 
          onClick={() => navigate('/doctor/appointments/new')}
          style={{
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
          }}
        >
          <span>➕</span>
          Nueva Cita
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#2a4ea2' }}>
            {appointments.length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Citas</div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
            {appointments.filter(a => a.status === 'confirmed').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Confirmadas</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
            {appointments.filter(a => a.status === 'pending').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Pendientes</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444' }}>
            {appointments.filter(a => a.status === 'cancelled').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Canceladas</div>
        </div>
      </div>

      {/* Tabla de citas */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Paciente
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Fecha y Hora
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Tipo
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Duración
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Estado
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => (
              <tr key={appointment.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>
                    {appointment.patientName}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>
                    ID: {appointment.patientId}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '500', color: '#1e293b' }}>
                    {new Date(appointment.date).toLocaleDateString('es-ES')}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {appointment.time}
                  </div>
                </td>
                <td style={{ padding: '16px', color: '#6b7280' }}>
                  {appointment.type}
                </td>
                <td style={{ padding: '16px', color: '#6b7280' }}>
                  {appointment.duration} min
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '6px 12px',
                    background: getStatusColor(appointment.status),
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {getStatusText(appointment.status)}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
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
                    <button style={{
                      padding: '6px 12px',
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Cancelar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppointments.length === 0 && (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#6b7280' 
          }}>
            No se encontraron citas con los filtros aplicados
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;