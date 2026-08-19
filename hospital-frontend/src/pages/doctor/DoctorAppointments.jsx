import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { getAppointments, updateAppointment } from '../../services/api';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApts();
  }, []);

  const fetchApts = () => {
    getAppointments().then((res) => {
      setAppointments(res.data);
      setLoading(false);
    });
  };

  const handleStatusChange = async (id, status) => {
    await updateAppointment(id, { status });
    fetchApts();
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Doctor's Consultation List</h1>
        <p className="text-xs text-slate-500 mt-1">Manage patient checkups and clinical statuses</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
              <tr>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-800">{apt.patientName}</td>
                  <td className="p-3 font-mono">{apt.date}</td>
                  <td className="p-3">{apt.time}</td>
                  <td className="p-3 text-slate-500">{apt.reason}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {apt.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    {apt.status !== 'Completed' && (
                      <button
                        onClick={() => handleStatusChange(apt.id, 'Completed')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold"
                      >
                        Complete
                      </button>
                    )}
                    {apt.status !== 'Cancelled' && (
                      <button
                        onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                        className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-[11px] font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;