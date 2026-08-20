import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('hospital_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// If the backend ever returns 401 (expired/invalid token), clear auth so the user gets sent back to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('hospital_auth_token');
      localStorage.removeItem('hospital_user');
    }
    return Promise.reject(error);
  }
);

// ---------- Auth ----------
export const loginUser = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response; // { data: { user, token } }
};

// ---------- Doctors ----------
export const getDoctors = () => API.get('/doctors');
export const createDoctor = (doctorData) => API.post('/doctors', doctorData);
export const updateDoctor = (id, doctorData) => API.put(`/doctors/${id}`, doctorData);
export const deleteDoctor = (id) => API.delete(`/doctors/${id}`);

// ---------- Patients ----------
export const getPatients = () => API.get('/patients');
export const createPatient = (patientData) => API.post('/patients', patientData);
export const updatePatient = (id, patientData) => API.put(`/patients/${id}`, patientData);
export const deletePatient = (id) => API.delete(`/patients/${id}`);

// ---------- Appointments ----------
export const getAppointments = () => API.get('/appointments');
export const createAppointment = (appointmentData) => API.post('/appointments', appointmentData);
export const updateAppointment = (id, updateData) => API.put(`/appointments/${id}`, updateData);
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);

// ---------- Medical Records ----------
export const getMedicalRecords = () => API.get('/medical-records');
export const createMedicalRecord = (recordData) => API.post('/medical-records', recordData);
export const updateMedicalRecord = (id, recordData) => API.put(`/medical-records/${id}`, recordData);
export const deleteMedicalRecord = (id) => API.delete(`/medical-records/${id}`);

// ---------- Prescriptions ----------
export const getPrescriptions = () => API.get('/prescriptions');
export const createPrescription = (prescriptionData) => API.post('/prescriptions', prescriptionData);
export const updatePrescription = (id, prescriptionData) => API.put(`/prescriptions/${id}`, prescriptionData);
export const deletePrescription = (id) => API.delete(`/prescriptions/${id}`);

// ---------- Invoices ----------
export const getInvoices = () => API.get('/invoices');
export const createInvoice = (invoiceData) => API.post('/invoices', invoiceData);
export const updateInvoice = (id, invoiceData) => API.put(`/invoices/${id}`, invoiceData);
export const deleteInvoice = (id) => API.delete(`/invoices/${id}`);

export default API;
