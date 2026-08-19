import React, { useState, useEffect } from 'react';
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import AppointmentCard from '../../components/AppointmentCard';
import Loading from '../../components/Loading';
import { getAppointments, getPatients } from '../../services/api';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAppointments(), getPatients()]).then(([aptRes, patRes]) => {
      setAppointments(aptRes.data);
      setPatients(patRes.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-800 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold">Welcome, {user?.name || 'Dr. Ananya Mehta'}</h1>
        <p className="text-blue-200 text-xs mt-1">Specialization: {user?.specialization || 'Cardiologist'} | Outpatient Schedule Active</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Appointments" value={appointments.length} icon={Calendar} color="blue" />
        <StatCard title="Total Assigned Patients" value={patients.length} icon={Users} color="teal" />
        <StatCard title="Pending Consults" value={appointments.filter((a) => a.status === 'Scheduled').length} icon={Clock} color="amber" />
        <StatCard title="Completed Consults" value={appointments.filter((a) => a.status === 'Completed').length} icon={CheckCircle} color="emerald" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 text-base mb-4">Today's Appointment Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;