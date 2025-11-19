import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Unauthorized from '../pages/shared/Unauthorized'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import MainLayout from '../components/layout/MainLayout'

// Importar componentes del Panel Médico
import DoctorDashboard from '../pages/doctor/Dashboard'
import PatientList from '../pages/doctor/Patients/PatientList'
import CalendarView from '../pages/doctor/Appointments/CalendarView'
import AppointmentList from '../pages/doctor/Appointments/AppointmentList'
import RecordList from '../pages/doctor/MedicalRecords/RecordList'
import ViewRecord from '../pages/doctor/MedicalRecords/ViewRecord'

// Placeholders para otras páginas
const DoctorPrescriptions = () => <div style={{ padding: '20px' }}>Recetas - En construcción</div>;
const DoctorReports = () => <div style={{ padding: '20px' }}>Reportes - En construcción</div>;

// Placeholders para Panel Paciente
const PatientDashboard = () => (
  <div style={{ padding: '20px' }}>
    <h1 style={{ color: '#2a4ea2' }}>Panel del Paciente</h1>
    <p>Bienvenido al panel del paciente - En construcción</p>
  </div>
);

const PatientAppointments = () => <div style={{ padding: '20px' }}>Mis Citas - En construcción</div>;
const PatientMedicalHistory = () => <div style={{ padding: '20px' }}>Historial Médico - En construcción</div>;
const PatientPrescriptions = () => <div style={{ padding: '20px' }}>Mis Recetas - En construcción</div>;
const PatientProfile = () => <div style={{ padding: '20px' }}>Mi Perfil - En construcción</div>;

// Placeholders para Panel Admin
const AdminDashboard = () => (
  <div style={{ padding: '20px' }}>
    <h1 style={{ color: '#2a4ea2' }}>Panel Administrativo</h1>
    <p>Bienvenido al panel administrativo - En construcción</p>
  </div>
);

const AdminUsers = () => <div style={{ padding: '20px' }}>Usuarios - En construcción</div>;
const AdminStatistics = () => <div style={{ padding: '20px' }}>Estadísticas - En construcción</div>;
const AdminSettings = () => <div style={{ padding: '20px' }}>Configuración - En construcción</div>;
const AdminReports = () => <div style={{ padding: '20px' }}>Reportes - En construcción</div>;

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* ==================== */}
      {/* RUTAS PANEL PACIENTE */}
      {/* ==================== */}
      <Route path="/patient" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <PatientDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/patient/appointments" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <PatientAppointments />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/patient/medical-history" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <PatientMedicalHistory />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/patient/prescriptions" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <PatientPrescriptions />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/patient/profile" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <PatientProfile />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* ================== */}
      {/* RUTAS PANEL MÉDICO */}
      {/* ================== */}
      <Route path="/doctor" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <DoctorDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Gestión de Pacientes */}
      <Route path="/doctor/patients" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <PatientList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Agenda y Citas */}
      <Route path="/doctor/schedule" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <CalendarView />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/appointments" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <AppointmentList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* HISTORIALES MÉDICOS - CORREGIDO */}
      <Route path="/doctor/medical-records" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <RecordList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/medical-records/:id" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <ViewRecord />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Recetas Médicas */}
      <Route path="/doctor/prescriptions" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <DoctorPrescriptions />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Reportes */}
      <Route path="/doctor/reports" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <DoctorReports />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* =================== */}
      {/* RUTAS PANEL ADMIN */}
      {/* =================== */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <AdminDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <AdminUsers />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/statistics" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <AdminStatistics />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/settings" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <AdminSettings />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <AdminReports />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* ==================== */}
      {/* RUTAS POR DEFECTO */}
      {/* ==================== */}
      
      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes