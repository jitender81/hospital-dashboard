import React, { useState } from 'react';
import { User, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PatientProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Rahul Sharma',
    email: user?.email || 'patient@hospital.com',
    phone: user?.phone || '+91 98765 43210',
    dateOfBirth: user?.dateOfBirth || '1997-04-12',
    gender: user?.gender || 'Male',
    bloodGroup: user?.bloodGroup || 'B+',
    address: user?.address || '42, Park Street, New Delhi, India',
    emergencyContact: user?.emergencyContact || '+91 98111 22233'
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">My Medical Profile</h1>
        <p className="text-xs text-slate-500 mt-1">Manage personal demographics and emergency contacts</p>
      </div>

      {savedMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-semibold">
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              disabled
              value={formData.email}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-100 text-slate-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
            <input
              type="text"
              value={formData.bloodGroup}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
            />
          </div>
        </div>

        <div className="text-xs">
          <label className="block font-semibold text-slate-700 mb-1">Address</label>
          <textarea
            rows="2"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
          />
        </div>

        <div className="text-xs">
          <label className="block font-semibold text-slate-700 mb-1">Emergency Contact Number</label>
          <input
            type="text"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
            className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <Save className="h-4 w-4" /> Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientProfile;