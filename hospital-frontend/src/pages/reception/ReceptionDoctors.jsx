import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { getDoctors } from '../../services/api';

const ReceptionDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors().then((res) => {
      setDoctors(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Doctor Roster & Availability</h1>
        <p className="text-xs text-slate-500 mt-1">Track duty schedules and consultation charges</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-slate-800 text-sm">{doc.name}</h3>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-semibold">{doc.status}</span>
            </div>
            <p className="text-teal-600 font-medium">{doc.specialization}</p>
            <p className="text-slate-500">Phone: {doc.phone}</p>
            <p className="text-slate-500">Consult Fee: <span className="font-bold text-slate-700">{doc.fee}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceptionDoctors;