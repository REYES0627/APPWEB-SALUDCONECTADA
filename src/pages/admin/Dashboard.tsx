import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#2a4ea2', margin: 0 }}>⚙️ Panel Administrativo</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
        
        <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '5px', marginBottom: '2rem' }}>
          <h3>Bienvenido, Administrador {user?.name}!</h3>
          <p>Email: {user?.email} | Rol: {user?.role}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fcd34d' }}>
            <h3>👥 Usuarios</h3>
            <p>Gestionar todos los usuarios</p>
          </div>
          
          <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fcd34d' }}>
            <h3>📊 Estadísticas</h3>
            <p>Ver estadísticas del sistema</p>
          </div>
          
          <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fcd34d' }}>
            <h3>⚙️ Configuración</h3>
            <p>Configurar el sistema</p>
          </div>
          
          <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fcd34d' }}>
            <h3>📋 Reportes</h3>
            <p>Generar reportes del sistema</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;