import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Login from './pages/auth/Login';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientDoctors from './pages/patient/PatientDoctors';
import PatientMedicalRecords from './pages/patient/PatientMedicalRecords';
import PatientPrescriptions from './pages/patient/PatientPrescriptions';
import PatientProfile from './pages/patient/PatientProfile';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorMedicalRecords from './pages/doctor/DoctorMedicalRecords';
import DoctorPrescriptions from './pages/doctor/DoctorPrescriptions';
import DoctorProfile from './pages/doctor/DoctorProfile';

// Reception Pages
import ReceptionDashboard from './pages/reception/ReceptionDashboard';
import ReceptionPatients from './pages/reception/ReceptionPatients';
import ReceptionDoctors from './pages/reception/ReceptionDoctors';
import ReceptionAppointments from './pages/reception/ReceptionAppointments';
import ReceptionBilling from './pages/reception/ReceptionBilling';
import ReceptionProfile from './pages/reception/ReceptionProfile';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Patient Portal */}
          <Route element={<ProtectedRoute allowedRole="patient" />}>
            <Route element={<DashboardLayout />}>
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              <Route path="/patient/appointments" element={<PatientAppointments />} />
              <Route path="/patient/doctors" element={<PatientDoctors />} />
              <Route path="/patient/medical-records" element={<PatientMedicalRecords />} />
              <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
              <Route path="/patient/profile" element={<PatientProfile />} />
            </Route>
          </Route>

          {/* Doctor Portal */}
          <Route element={<ProtectedRoute allowedRole="doctor" />}>
            <Route element={<DashboardLayout />}>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/appointments" element={<DoctorAppointments />} />
              <Route path="/doctor/patients" element={<DoctorPatients />} />
              <Route path="/doctor/medical-records" element={<DoctorMedicalRecords />} />
              <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
              <Route path="/doctor/profile" element={<DoctorProfile />} />
            </Route>
          </Route>

          {/* Reception Portal */}
          <Route element={<ProtectedRoute allowedRole="reception" />}>
            <Route element={<DashboardLayout />}>
              <Route path="/reception/dashboard" element={<ReceptionDashboard />} />
              <Route path="/reception/patients" element={<ReceptionPatients />} />
              <Route path="/reception/doctors" element={<ReceptionDoctors />} />
              <Route path="/reception/appointments" element={<ReceptionAppointments />} />
              <Route path="/reception/billing" element={<ReceptionBilling />} />
              <Route path="/reception/profile" element={<ReceptionProfile />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;