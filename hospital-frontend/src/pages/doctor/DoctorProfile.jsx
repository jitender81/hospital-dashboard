import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DoctorProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Dr. Ananya Mehta',
    specialization: user?.specialization || 'Cardiologist',
    qualification: user?.qualification || 'MD, DM (Cardiology)',
    experience: user?.experience || '12 Years',
    consultationFee: user?.consultationFee || '₹1,200',
    phone: user?.phone || '+91 98100 11223',
    availability: user?.availability || 'Mon - Fri (09:00 AM - 04:00 PM)'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Doctor Profile</h1>
        <p className="text-xs text-slate-500 mt-1">Manage consultation availability & clinical credentials</p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold">
          Doctor credentials updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Doctor Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Specialization</label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Qualification</label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Consultation Fee</label>
            <input
              type="text"
              value={formData.consultationFee}
              onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Availability Schedule</label>
          <input
            type="text"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg flex items-center gap-2"
        >
          <Save className="h-4 w-4" /> Save Doctor Profile
        </button>
      </form>
    </div>
  );
};

export default DoctorProfile;