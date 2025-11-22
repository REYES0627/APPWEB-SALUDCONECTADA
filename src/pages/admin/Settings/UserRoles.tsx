// src/pages/admin/Settings/UserRoles.tsx
import React from 'react';

const UserRoles: React.FC = () => {
  const roles = [
    {
      name: 'Administrador',
      icon: '🛡️',
      description: 'Control total del sistema.',
      permissions: [
        'Gestión de usuarios',
        'Asignación de permisos',
        'Acceso a estadísticas',
        'Configuración del sistema',
      ],
      color: '#2563eb',
    },
    {
      name: 'Médico',
      icon: '🩺',
      description: 'Gestión de pacientes y consultas.',
      permissions: [
        'Ver pacientes asignados',
        'Registrar diagnósticos',
        'Gestionar agenda médica',
        'Generar reportes clínicos',
      ],
      color: '#16a34a',
    },
    {
      name: 'Paciente',
      icon: '👤',
      description: 'Acceso a información personal.',
      permissions: [
        'Ver historial médico',
        'Agendar citas',
        'Ver recetas médicas',
        'Actualizar datos personales',
      ],
      color: '#7c3aed',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h1 style={{ fontSize: '26px', margin: 0, color: '#111827' }}>
          Control de permisos y roles
        </h1>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
          Define qué puede hacer cada tipo de usuario dentro de SaludConectada.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {roles.map((role) => (
          <div
            key={role.name}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
              borderTop: `4px solid ${role.color}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <span style={{ fontSize: '22px' }}>{role.icon}</span>
              <div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#111827',
                  }}
                >
                  {role.name}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6b7280',
                  }}
                >
                  {role.description}
                </div>
              </div>
            </div>

            <ul
              style={{
                fontSize: '13px',
                color: '#4b5563',
                paddingLeft: '18px',
                margin: '8px 0 12px',
              }}
            >
              {role.permissions.map((perm) => (
                <li key={perm}>✓ {perm}</li>
              ))}
            </ul>

            <button
              type="button"
              style={{
                width: '100%',
                padding: '8px 0',
                borderRadius: '999px',
                border: `1px solid ${role.color}`,
                backgroundColor: '#ffffff',
                color: role.color,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              Editar permisos (demo)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoles;
