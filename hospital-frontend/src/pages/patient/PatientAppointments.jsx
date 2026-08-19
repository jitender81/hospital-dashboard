import React, { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import AppointmentCard from '../../components/AppointmentCard';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import EmptyState from '../../components/EmptyState';
import { getAppointments, getDoctors, createAppointment, updateAppointment } from '../../services/api';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Appointment Form State
  const [formData, setFormData] = useState({
    doctorId: 'd1',
    department: 'Cardiology',
    date: '2026-08-25',
    time: '11:00 AM',
    type: 'In-person Consultation',
    reason: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [aptRes, docRes] = await Promise.all([getAppointments(), getDoctors()]);
      setAppointments(aptRes.data);
      setDoctors(docRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      await updateAppointment(id, { status: 'Cancelled' });
      fetchData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = doctors.find((d) => d.id === formData.doctorId);
    await createAppointment({
      ...formData,
      doctorName: doc ? doc.name : 'Dr. Ananya Mehta',
      patientName: 'Rahul Sharma',
      patientId: 'p1'
    });
    setIsModalOpen(false);
    fetchData();
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">My Appointments</h1>
          <p className="text-xs text-slate-500 mt-1">Book and manage your hospital consultation schedules</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" /> Book Appointment
        </button>
      </div>

      {appointments.length === 0 ? (
        <EmptyState title="No appointments scheduled" description="You have no upcoming or past consultation appointments." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} onCancel={handleCancel} />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book New Appointment">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Doctor</label>
            <select
              value={formData.doctorId}
              onChange={(e) => {
                const doc = doctors.find((d) => d.id === e.target.value);
                setFormData({ ...formData, doctorId: e.target.value, department: doc?.specialization || 'Cardiology' });
              }}
              className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-teal-500 focus:border-teal-500 bg-slate-50"
            >
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
            <input
              type="text"
              readOnly
              value={formData.department}
              className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-slate-100 text-slate-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Time</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-slate-50"
              >
                <option value="09:30 AM">09:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Visit</label>
            <textarea
              rows="3"
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Describe symptoms or checkup reasons..."
              className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:ring-teal-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-600 font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PatientAppointments;