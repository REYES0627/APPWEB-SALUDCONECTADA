import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = {
    totalUsers: 42,
    totalDoctors: 8,
    totalPatients: 30,
    todayAppointments: 18,
  };

  const recentActivity = [
    { id: 1, title: 'Nuevo usuario registrado', detail: 'Se registró un nuevo paciente en el sistema.', time: '10:30 AM - Hoy' },
    { id: 2, title: 'Cita médica completada', detail: 'Dr. Silva completó una consulta con Juan Pérez.', time: '09:15 AM - Hoy' },
    { id: 3, title: 'Actualización de tratamiento', detail: 'Se actualizó el tratamiento de Jaren Buendia.', time: '08:45 AM - Hoy' },
    { id: 4, title: 'Reporte generado', detail: 'Se generó el reporte estadístico mensual.', time: 'Ayer' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Encabezado */}
      <div>
        <h1 style={{ fontSize: '26px', margin: 0, color: '#111827' }}>
          Panel del administrador
        </h1>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
          Hola {user?.name ?? 'Administrador'}, desde aquí puedes gestionar usuarios,
          estadísticas y permisos del sistema.
        </p>
      </div>

      {/* Tarjetas de resumen */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        <div
          style={{
            background: '#eff6ff',
            padding: '16px',
            borderRadius: '12px',
            borderLeft: '4px solid #2563eb',
          }}
        >
          <div style={{ fontSize: '13px', color: '#1d4ed8' }}>Usuarios totales</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{stats.totalUsers}</div>
        </div>

        <div
          style={{
            background: '#ecfdf3',
            padding: '16px',
            borderRadius: '12px',
            borderLeft: '4px solid #16a34a',
          }}
        >
          <div style={{ fontSize: '13px', color: '#15803d' }}>Médicos activos</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{stats.totalDoctors}</div>
        </div>

        <div
          style={{
            background: '#fefce8',
            padding: '16px',
            borderRadius: '12px',
            borderLeft: '4px solid #eab308',
          }}
        >
          <div style={{ fontSize: '13px', color: '#854d0e' }}>Pacientes registrados</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{stats.totalPatients}</div>
        </div>

        <div
          style={{
            background: '#f5f3ff',
            padding: '16px',
            borderRadius: '12px',
            borderLeft: '4px solid #4f46e5',
          }}
        >
          <div style={{ fontSize: '13px', color: '#4338ca' }}>Citas de hoy</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{stats.todayAppointments}</div>
        </div>
      </div>

      {/* Actividad reciente + accesos rápidos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)',
          gap: '20px',
        }}
      >
        {/* Actividad reciente */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
          }}
        >
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Actividad reciente</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
            Últimos eventos registrados en el sistema.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentActivity.map((item) => (
              <div
                key={item.id}
                style={{
                  borderRadius: '10px',
                  padding: '10px 12px',
                  backgroundColor: '#eef2ff',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: '#4b5563' }}>{item.detail}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

    {/* Accesos rápidos */}
<div
  style={{
    background: 'linear-gradient(135deg, #4fd1c5, #38bdf8)',
    borderRadius: '12px',
    padding: '16px',
  }}
>
  <h2 style={{ fontSize: '18px', marginBottom: '8px', color: '#000000', fontWeight: 700 }}>
    Accesos rápidos
  </h2>
  <p style={{ fontSize: '13px', marginBottom: '12px', color: '#000000' }}>
    Navega rápidamente a las secciones más usadas del panel.
  </p>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <button
      onClick={() => navigate('/admin/users')}
      style={{
        borderRadius: '999px',
        padding: '10px 14px',
        border: 'none',
        backgroundColor: 'rgba(255,255,255,0.25)',
        color: '#000000',
        fontWeight: 750,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
      }}
    >
      <span>👥 Gestionar usuarios</span>
      <span>→</span>
    </button>

    <button
      onClick={() => navigate('/admin/statistics')}
      style={{
        borderRadius: '999px',
        padding: '10px 14px',
        border: 'none',
        backgroundColor: 'rgba(255,255,255,0.25)',
        color: '#000000',
        fontWeight: 750,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
      }}
    >
      <span>📊 Ver estadísticas</span>
      <span>→</span>
    </button>

    <button
      onClick={() => navigate('/admin/settings')}
      style={{
        borderRadius: '999px',
        padding: '10px 14px',
        border: 'none',
        backgroundColor: 'rgba(255,255,255,0.25)',
        color: '#000000',
        fontWeight: 750,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
      }}
    >
      <span>🛡️ Permisos y roles</span>
      <span>→</span>
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
