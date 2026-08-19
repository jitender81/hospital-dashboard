import React, { useState, useEffect } from 'react';
import { Search, Star, Stethoscope, Clock } from 'lucide-react';
import Loading from '../../components/Loading';
import { getDoctors } from '../../services/api';

const PatientDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState('All');

  useEffect(() => {
    getDoctors().then((res) => {
      setDoctors(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || doc.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = specFilter === 'All' || doc.specialization === specFilter;
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Hospital Doctor Directory</h1>
        <p className="text-xs text-slate-500 mt-1">Browse and consult specialists across departments</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search doctor name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-teal-500"
          />
        </div>
        <select
          value={specFilter}
          onChange={(e) => setSpecFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-medium"
        >
          <option value="All">All Specializations</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Orthopedic Specialist">Orthopedic</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-base border border-teal-200">
                  {doc.name.charAt(4) || 'D'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{doc.name}</h3>
                  <p className="text-xs text-teal-600 font-medium">{doc.specialization}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{doc.experience} Experience</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Rating:</span>
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> {doc.rating}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Availability:</span>
                  <span className="font-medium">{doc.availability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Consult Fee:</span>
                  <span className="font-bold text-teal-700">{doc.fee}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Appointment request initialized for ${doc.name}`)}
              className="mt-4 w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-semibold transition-colors"
            >
              Book Consultation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDoctors;