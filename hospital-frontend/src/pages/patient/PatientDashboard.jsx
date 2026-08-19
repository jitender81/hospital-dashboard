import React, { useEffect, useState } from 'react';
import { Calendar, FileText, Pill, CreditCard, PlusCircle, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import AppointmentCard from '../../components/AppointmentCard';
import Loading from '../../components/Loading';
import { getAppointments, getDoctors, getMedicalRecords, getPrescriptions } from '../../services/api';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aptRes, recRes, rxRes, docRes] = await Promise.all([
          getAppointments(),
          getMedicalRecords(),
          getPrescriptions(),
          getDoctors()
        ]);
        setAppointments(aptRes.data);
        setRecords(recRes.data);
        setPrescriptions(rxRes.data);
        setDoctors(docRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  const upcomingApt = appointments.find((a) => a.status === 'Confirmed' || a.status === 'Scheduled');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 rounded-2xl p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'Rahul Sharma'}</h1>
        <p className="text-teal-100 text-xs mt-1">
          Patient ID: {user?.id || 'p1'} | Blood Group: <span className="font-bold text-white">{user?.bloodGroup || 'B+'}</span> | Age: {user?.age || 29}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Upcoming Appointment" value={upcomingApt ? upcomingApt.date : 'None'} icon={Calendar} color="teal" description={upcomingApt?.doctorName || 'No upcoming consult'} />
        <StatCard title="Total Appointments" value={appointments.length} icon={Calendar} color="blue" />
        <StatCard title="Active Prescriptions" value={prescriptions.length} icon={Pill} color="emerald" />
        <StatCard title="Medical Records" value={records.length} icon={FileText} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 text-base mb-4">Next Scheduled Appointment</h3>
            {upcomingApt ? (
              <AppointmentCard appointment={upcomingApt} />
            ) : (
              <p className="text-xs text-slate-500 py-4">No upcoming appointments found.</p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 text-base mb-3">Recent Prescriptions</h3>
            <div className="divide-y divide-slate-100">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-slate-800">{rx.diagnosis}</p>
                    <p className="text-slate-500">{rx.doctorName} • {rx.date}</p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[11px] font-medium">
                    {rx.medicines.length} Medicines
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 text-base mb-3">Recommended Doctors</h3>
            <div className="space-y-3">
              {doctors.slice(0, 3).map((doc) => (
                <div key={doc.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 text-xs">{doc.name}</p>
                    <p className="text-[11px] text-slate-500">{doc.specialization}</p>
                  </div>
                  <span className="text-xs font-semibold text-teal-600">{doc.fee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;