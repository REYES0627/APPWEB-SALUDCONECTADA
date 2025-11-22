import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Paciente' | 'Medico' | 'Administrador'>('Paciente');
  const [specialty, setSpecialty] = useState('');
  const [registeredAt, setRegisteredAt] = useState('');
  const [status, setStatus] = useState<'Activo' | 'Inactivo'>('Activo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí luego se conectará a la BD (Supabase u otra)
    alert('Usuario creado (demo, sin conexión a BD).');
    navigate('/admin/users');
  };

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, #4fd1c5, #38bdf8)',
        borderRadius: '16px',
        padding: '24px',
        color: '#111827',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '18px', fontSize: '24px' }}>
        Nuevo usuario
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '18px',
        }}
      >
        {/* Nombre */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Nombre completo *</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        {/* Edad */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Edad *</label>
          <input
            required
            type="number"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        {/* Teléfono */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Teléfono *</label>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        {/* Email */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        {/* Rol */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Rol *</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              border: '1px solid #d1d5db',
            }}
          >
            <option value="Paciente">Paciente</option>
            <option value="Medico">Médico</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>

        {/* Especialidad */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Especialidad</label>
          <input
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        {/* Fecha registro */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Fecha de registro</label>
          <input
            type="date"
            value={registeredAt}
            onChange={(e) => setRegisteredAt(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        {/* Estado */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Estado *</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['Activo', 'Inactivo'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStatus(option)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: status === option ? '2px solid #2563eb' : '1px solid #d1d5db',
                  backgroundColor: status === option ? '#e0f2fe' : '#ffffff',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div
          style={{
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
            marginTop: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1px solid #d1d5db',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Cancelar
          </button>

          <button
            type="submit"
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              background: 'linear-gradient(135deg, #4f46e5, #22c1c3)',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Guardar usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
