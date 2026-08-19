import React, { useState, useEffect } from 'react';
import { Pill, Eye } from 'lucide-react';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import { getPrescriptions } from '../../services/api';

const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRx, setSelectedRx] = useState(null);

  useEffect(() => {
    getPrescriptions().then((res) => {
      setPrescriptions(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">My Prescriptions</h1>
        <p className="text-xs text-slate-500 mt-1">Medication plans issued by doctors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prescriptions.map((rx) => (
          <div key={rx.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-mono text-slate-400">ID: {rx.id}</span>
                <h3 className="font-bold text-slate-800 text-sm mt-0.5">{rx.diagnosis}</h3>
                <p className="text-xs text-slate-500">{rx.doctorName} • {rx.date}</p>
              </div>
              <button
                onClick={() => setSelectedRx(rx)}
                className="px-3 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Eye className="h-3.5 w-3.5" /> View Rx
              </button>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-700 mb-2">Prescribed Medicines ({rx.medicines.length})</p>
              <ul className="space-y-1 text-xs text-slate-600">
                {rx.medicines.map((m, idx) => (
                  <li key={idx} className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-medium text-slate-800">{m.name}</span>
                    <span className="text-slate-500">{m.dosage} ({m.frequency})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedRx} onClose={() => setSelectedRx(null)} title="Prescription Details">
        {selectedRx && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-teal-50 rounded-lg border border-teal-100 flex justify-between">
              <div>
                <p className="font-bold text-teal-900">{selectedRx.doctorName}</p>
                <p className="text-teal-700">Diagnosis: {selectedRx.diagnosis}</p>
              </div>
              <p className="text-teal-800 font-mono">{selectedRx.date}</p>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-slate-800">Medicines Schedule:</p>
              {selectedRx.medicines.map((med, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{med.name}</span>
                    <span className="text-teal-600">{med.dosage}</span>
                  </div>
                  <p className="text-slate-500">Frequency: {med.frequency} | Duration: {med.duration}</p>
                </div>
              ))}
            </div>

            {selectedRx.instructions && (
              <div className="p-3 bg-amber-50 text-amber-800 rounded-lg border border-amber-100">
                <span className="font-bold">Instructions: </span> {selectedRx.instructions}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientPrescriptions;