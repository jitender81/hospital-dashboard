import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { getAppointments, updateAppointment } from '../../services/api';

const ReceptionAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAppointments().then((res) => {
      setAppointments(res.data);
      setLoading(false);
    });
  };

  const handleUpdate = async (id, status) => {
    await updateAppointment(id, { status });
    fetchData();
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">All Hospital Appointments</h1>
        <p className="text-xs text-slate-500 mt-1">Reception master schedule controller</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b text-slate-500 uppercase">
            <tr>
              <th className="p-3">Patient</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Date/Time</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y font-medium text-slate-700">
            {appointments.map((apt) => (
              <tr key={apt.id}>
                <td className="p-3 font-bold">{apt.patientName}</td>
                <td className="p-3">{apt.doctorName}</td>
                <td className="p-3 font-mono">{apt.date} {apt.time}</td>
                <td className="p-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded">{apt.status}</span></td>
                <td className="p-3 text-right space-x-1">
                  <button onClick={() => handleUpdate(apt.id, 'Completed')} className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px]">Mark Done</button>
                  <button onClick={() => handleUpdate(apt.id, 'Cancelled')} className="px-2 py-1 bg-red-50 text-red-600 rounded text-[11px]">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceptionAppointments;