import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminUser {
  id: string;
  name: string;
  role: 'Paciente' | 'Medico' | 'Administrador';
  specialty: string;
  registeredAt: string;
  status: 'Activo' | 'Inactivo';
}

const mockUsers: AdminUser[] = [
  { id: '1', name: 'Jaren Buendia', role: 'Paciente', specialty: 'N/A', registeredAt: '10/11/2022', status: 'Activo' },
  { id: '2', name: 'Juan Carhuaz', role: 'Medico', specialty: 'Cardiología', registeredAt: '11/11/2025', status: 'Activo' },
  { id: '3', name: 'Luis Torres', role: 'Medico', specialty: 'Medicina General', registeredAt: '11/11/2025', status: 'Activo' },
  { id: '4', name: 'Jo Hi', role: 'Administrador', specialty: 'N/A', registeredAt: '11/11/2025', status: 'Activo' }
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Activo' | 'Inactivo'>('Todos');

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'Todos' ? true : user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Título + botón nuevo usuario */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '26px', margin: 0, color: '#111827' }}>
            Lista de usuarios
          </h1>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
            Gestión de usuarios del sistema (vista administrativa).
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/users/new')}
          style={{
            borderRadius: '999px',
            padding: '10px 18px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #4f46e5, #22c1c3)',
            color: '#ffffff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'none';
          }}
        >
          + Nuevo usuario
        </button>
      </div>

      {/* Caja de búsqueda y filtro */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4fd1c5, #38bdf8)',
          borderRadius: '16px',
          padding: '18px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '14px',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="text"
            placeholder="Buscar usuario (nombre o ID)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '220px',
              padding: '10px 14px',
              borderRadius: '999px',
              border: 'none',
              outline: 'none',
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={{
              padding: '10px 14px',
              borderRadius: '999px',
              border: 'none',
              minWidth: '140px',
              cursor: 'pointer',
            }}
          >
            <option value="Todos">Todos los estados</option>
            <option value="Activo">Activos</option>
            <option value="Inactivo">Inactivos</option>
          </select>
        </div>

        {/* Tabla */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '16px',
            padding: '12px 16px',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0 8px',
              fontSize: '14px',
            }}
          >
            <thead>
              <tr style={{ textAlign: 'left', color: '#111827' }}>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Especialidad</th>
                <th>Fecha registro</th>
                <th>Estado</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  {[
                    user.name,
                    user.role,
                    user.specialty,
                    user.registeredAt,
                  ].map((value, index) => (
                    <td key={index} style={{ paddingTop: '6px', paddingBottom: '6px' }}>
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          borderRadius: '999px',
                          backgroundColor: '#e5e7eb',
                        }}
                      >
                        {value}
                      </div>
                    </td>
                  ))}

                  {/* Estado */}
                  <td>
                    <span
                      style={{
                        padding: '6px 12px',
                        borderRadius: '999px',
                        backgroundColor:
                          user.status === 'Activo' ? '#dcfce7' : '#fee2e2',
                        color:
                          user.status === 'Activo' ? '#166534' : '#b91c1c',
                        fontSize: '13px',
                      }}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td style={{ textAlign: 'right' }}>
                    <button
                      style={{
                        padding: '6px 10px',
                        borderRadius: '999px',
                        border: '1px solid #d1d5db',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        fontSize: '13px',
                        marginRight: '8px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ paddingTop: '12px', textAlign: 'center', color: '#6b7280' }}>
                    No se encontraron usuarios con los filtros actuales.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
