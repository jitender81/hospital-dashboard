import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import { getPrescriptions, createPrescription, getPatients } from '../../services/api';

const DoctorPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [patientId, setPatientId] = useState('p1');
  const [diagnosis, setDiagnosis] = useState('');
  const [instructions, setInstructions] = useState('');
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', frequency: 'Once Daily', duration: '7 Days' }
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [rxRes, patRes] = await Promise.all([getPrescriptions(), getPatients()]);
    setPrescriptions(rxRes.data);
    setPatients(patRes.data);
    setLoading(false);
  };

  const addMedicineField = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: 'Once Daily', duration: '7 Days' }]);
  };

  const removeMedicineField = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pat = patients.find((p) => p.id === patientId);
    await createPrescription({
      patientId,
      patientName: pat ? pat.name : 'Rahul Sharma',
      doctorName: 'Dr. Ananya Mehta',
      date: new Date().toISOString().split('T')[0],
      diagnosis,
      medicines,
      instructions
    });
    setIsModalOpen(false);
    fetchData();
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Issue Prescriptions</h1>
          <p className="text-xs text-slate-500 mt-1">Prescribe medications and dosage schedules to patients</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold"
        >
          <Plus className="h-4 w-4" /> Create Prescription
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prescriptions.map((rx) => (
          <div key={rx.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm">{rx.patientName}</h3>
            <p className="text-xs text-slate-500">Diagnosis: <span className="font-semibold text-slate-700">{rx.diagnosis}</span> • {rx.date}</p>
            <div className="mt-3 pt-2 border-t border-slate-100 text-xs">
              <p className="font-semibold text-slate-700">Medicines:</p>
              <ul className="list-disc list-inside text-slate-600 mt-1">
                {rx.medicines.map((m, i) => (
                  <li key={i}>{m.name} - {m.dosage} ({m.frequency})</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue New Prescription">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Patient</label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Diagnosis</label>
            <input
              type="text"
              required
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-700">Medicines List</label>
              <button
                type="button"
                onClick={addMedicineField}
                className="text-xs text-teal-600 font-semibold hover:underline"
              >
                + Add Medicine
              </button>
            </div>

            {medicines.map((med, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    required
                    value={med.name}
                    onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                    className="flex-1 p-1.5 border rounded bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Dosage (e.g. 500mg)"
                    required
                    value={med.dosage}
                    onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                    className="w-28 p-1.5 border rounded bg-white"
                  />
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedicineField(idx)}
                      className="p-1.5 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Instructions</label>
            <textarea
              rows="2"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
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
              Save Prescription
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorPrescriptions;