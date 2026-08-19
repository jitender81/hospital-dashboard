import React, { useState, useEffect } from 'react';
import { Search, Eye } from 'lucide-react';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import { getPatients } from '../../services/api';

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    getPatients().then((res) => {
      setPatients(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  const filteredPatients = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Assigned Patients</h1>
        <p className="text-xs text-slate-500 mt-1">Review patient profiles and medical background</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search patient name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-teal-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{patient.name}</h3>
                <p className="text-xs text-slate-500">{patient.gender}, {patient.age} Yrs • Blood Group: <span className="font-semibold text-slate-700">{patient.bloodGroup}</span></p>
              </div>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px]">
                {patient.status}
              </span>
            </div>

            <div className="text-xs space-y-1 text-slate-600 bg-slate-50 p-2.5 rounded-lg">
              <p><span className="text-slate-400">Phone:</span> {patient.phone}</p>
              <p><span className="text-slate-400">Last Visit:</span> {patient.lastVisit}</p>
            </div>

            <button
              onClick={() => setSelectedPatient(patient)}
              className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
            >
              <Eye className="h-3.5 w-3.5" /> View Medical Profile
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title="Patient Medical Record">
        {selectedPatient && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg space-y-1">
              <p className="font-bold text-teal-900 text-sm">{selectedPatient.name}</p>
              <p className="text-teal-700">Phone: {selectedPatient.phone} | Email: {selectedPatient.email}</p>
            </div>

            <div className="space-y-2">
              <div>
                <span className="font-bold text-slate-700">Known Allergies:</span>
                <p className="p-2 bg-red-50 text-red-700 rounded border border-red-100 mt-0.5">{selectedPatient.allergies || 'None'}</p>
              </div>
              <div>
                <span className="font-bold text-slate-700">Medical History:</span>
                <p className="p-2 bg-slate-50 text-slate-700 rounded border border-slate-100 mt-0.5">{selectedPatient.medicalHistory || 'No recorded chronic conditions'}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorPatients;