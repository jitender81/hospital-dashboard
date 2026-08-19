import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ReceptionProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Sunita Rao',
    department: user?.department || 'Front Desk Administration',
    phone: user?.phone || '+91 98222 33344'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Reception Desk Profile</h1>
        <p className="text-xs text-slate-500 mt-1">Admin account details</p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold">
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Staff Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded bg-slate-50"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Department</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full p-2 border rounded bg-slate-50"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-2 border rounded bg-slate-50"
          />
        </div>
        <button type="submit" className="px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-lg flex items-center gap-2">
          <Save className="h-4 w-4" /> Save Details
        </button>
      </form>
    </div>
  );
};

export default ReceptionProfile;