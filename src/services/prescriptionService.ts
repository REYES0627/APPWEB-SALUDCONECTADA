// services/prescriptionService.ts
import { Prescription, CreatePrescriptionRequest } from '../types/prescription';

// Datos de ejemplo (simulando API)
const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientId: '101',
    patientName: 'Ana García',
    doctorId: '1',
    doctorName: 'Dr. Carlos Rodríguez',
    date: '2024-01-15',
    diagnosis: 'Hipertensión arterial',
    medications: [
      {
        id: 'med1',
        name: 'Losartán',
        dosage: '50 mg',
        frequency: '1 vez al día',
        duration: '30 días',
        instructions: 'Tomar en la mañana'
      }
    ],
    status: 'active'
  },
  {
    id: '2',
    patientId: '102',
    patientName: 'Carlos López',
    doctorId: '1',
    doctorName: 'Dr. Carlos Rodríguez',
    date: '2024-01-14',
    diagnosis: 'Diabetes tipo 2',
    medications: [
      {
        id: 'med1',
        name: 'Metformina',
        dosage: '500 mg',
        frequency: '2 veces al día',
        duration: '30 días',
        instructions: 'Tomar con las comidas'
      },
      {
        id: 'med2',
        name: 'Glibenclamida',
        dosage: '5 mg',
        frequency: '1 vez al día',
        duration: '30 días',
        instructions: 'Tomar en el desayuno'
      }
    ],
    status: 'active'
  }
];

export const prescriptionService = {
  // Obtener todas las recetas del médico
  getPrescriptions: async (doctorId: string): Promise<Prescription[]> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockPrescriptions.filter(p => p.doctorId === doctorId);
  },

  // Obtener receta por ID
  getPrescriptionById: async (id: string): Promise<Prescription | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPrescriptions.find(p => p.id === id) || null;
  },

  // Crear nueva receta
  createPrescription: async (data: CreatePrescriptionRequest): Promise<Prescription> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPrescription: Prescription = {
      id: Date.now().toString(),
      patientId: data.patientId,
      patientName: 'Paciente Nuevo', // En realidad vendría del paciente
      doctorId: '1', // Del contexto de autenticación
      doctorName: 'Dr. Carlos Rodríguez',
      date: new Date().toISOString().split('T')[0],
      medications: data.medications.map((med, index) => ({
        ...med,
        id: `med${index + 1}`
      })),
      diagnosis: data.diagnosis,
      notes: data.notes,
      status: 'active'
    };

    mockPrescriptions.push(newPrescription);
    return newPrescription;
  },

  // Actualizar receta
  updatePrescription: async (id: string, data: Partial<Prescription>): Promise<Prescription> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = mockPrescriptions.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Receta no encontrada');
    
    mockPrescriptions[index] = { ...mockPrescriptions[index], ...data };
    return mockPrescriptions[index];
  }
};