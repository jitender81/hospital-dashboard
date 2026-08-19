import React, { useState, useEffect } from 'react';
import { Users, Calendar, UserCheck, DollarSign } from 'lucide-react';
import StatCard from '../../components/StatCard';
import Loading from '../../components/Loading';
import { getPatients, getAppointments, getDoctors, getInvoices } from '../../services/api';

const ReceptionDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPatients(), getAppointments(), getDoctors(), getInvoices()]).then(
      ([patRes, aptRes, docRes, invRes]) => {
        setPatients(patRes.data);
        setAppointments(aptRes.data);
        setDoctors(docRes.data);
        setInvoices(invRes.data);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <Loading />;

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.status === 'Paid' ? inv.totalAmount : 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-teal-950 rounded-2xl p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold">Front Desk Admin Console</h1>
        <p className="text-slate-300 text-xs mt-1">Manage hospital admissions, scheduling, and billing</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Registered Patients" value={patients.length} icon={Users} color="blue" />
        <StatCard title="Today's Appointments" value={appointments.length} icon={Calendar} color="teal" />
        <StatCard title="Available Doctors" value={doctors.length} icon={UserCheck} color="emerald" />
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Recent Appointments</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {appointments.map((apt) => (
              <div key={apt.id} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">{apt.patientName}</p>
                  <p className="text-slate-500">{apt.doctorName} • {apt.time}</p>
                </div>
                <span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded font-medium">{apt.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Doctor Duty Status</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {doctors.map((doc) => (
              <div key={doc.id} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">{doc.name}</p>
                  <p className="text-slate-500">{doc.specialization}</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-medium">{doc.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDashboard;