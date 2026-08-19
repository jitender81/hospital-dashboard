import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import { getMedicalRecords, createMedicalRecord, getPatients } from '../../services/api';

const DoctorMedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    patientId: 'p1',
    diagnosis: '',
    symptoms: '',
    treatment: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [recRes, patRes] = await Promise.all([getMedicalRecords(), getPatients()]);
    setRecords(recRes.data);
    setPatients(patRes.data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pat = patients.find((p) => p.id === formData.patientId);
    await createMedicalRecord({
      ...formData,
      patientName: pat ? pat.name : 'Rahul Sharma',
      doctorName: 'Dr. Ananya Mehta',
      department: 'Cardiology'
    });
    setIsModalOpen(false);
    fetchData();
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Medical Records Management</h1>
          <p className="text-xs text-slate-500 mt-1">Create clinical diagnoses and treatment logs</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold"
        >
          <Plus className="h-4 w-4" /> Add Medical Record
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Date</th>
                <th className="p-3">Diagnosis</th>
                <th className="p-3">Treatment Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td className="p-3 font-bold text-slate-800">{rec.patientName}</td>
                  <td className="p-3 font-mono">{rec.date}</td>
                  <td className="p-3 text-teal-700 font-semibold">{rec.diagnosis}</td>
                  <td className="p-3 text-slate-600 max-w-xs truncate">{rec.treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Clinical Medical Record">
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Patient</label>
            <select
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.gender}, {p.age}y)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Diagnosis</label>
            <input
              type="text"
              required
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Symptoms</label>
            <input
              type="text"
              required
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Treatment Plan</label>
            <textarea
              rows="2"
              required
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Doctor Notes</label>
            <textarea
              rows="2"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded-lg text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg"
            >
              Save Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorMedicalRecords;