import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import { getPatients } from '../../services/api';

const ReceptionPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '',
    email: '',
    allergies: '',
    medicalHistory: ''
  });

  useEffect(() => {
    getPatients().then((res) => {
      setPatients(res.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this patient record?')) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPat = {
      id: `p-${Date.now()}`,
      status: 'Active',
      lastVisit: new Date().toISOString().split('T')[0],
      ...formData
    };
    setPatients([newPat, ...patients]);
    setIsModalOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Patient Directory & Registration</h1>
          <p className="text-xs text-slate-500 mt-1">Register new admissions and manage patient data</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold"
        >
          <Plus className="h-4 w-4" /> Register Patient
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b text-slate-500 uppercase">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Age/Gender</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Phone</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y font-medium text-slate-700">
            {patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((p) => (
              <tr key={p.id}>
                <td className="p-3 font-bold text-slate-800">{p.name}</td>
                <td className="p-3">{p.age} Yrs / {p.gender}</td>
                <td className="p-3"><span className="px-2 py-0.5 bg-red-50 text-red-700 font-bold rounded">{p.bloodGroup}</span></td>
                <td className="p-3">{p.phone}</td>
                <td className="p-3 text-right">
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Patient">
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded bg-slate-50" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold mb-1">Age</label>
              <input type="number" required value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full p-2 border rounded bg-slate-50" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Gender</label>
              <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full p-2 border rounded bg-slate-50">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold mb-1">Blood Group</label>
              <input type="text" value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} className="w-full p-2 border rounded bg-slate-50" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Phone</label>
              <input type="text" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2 border rounded bg-slate-50" />
            </div>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded font-semibold">Register</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReceptionPatients;