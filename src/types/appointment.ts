// types/appointment.ts
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
  doctorId: string;
  createdAt: string;
}

export interface CreateAppointmentRequest {
  patientId: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  appointment?: Appointment;
}