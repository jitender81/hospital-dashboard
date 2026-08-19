import React from 'react';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';

const AppointmentCard = ({ appointment, onCancel, onAction, actionLabel }) => {
  const statusStyles = {
    Confirmed: 'bg-teal-50 text-teal-700 border-teal-200',
    Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Cancelled: 'bg-red-50 text-red-700 border-red-200'
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusStyles[appointment.status] || 'bg-slate-100 text-slate-700'}`}>
            {appointment.status}
          </span>
          <span className="text-xs font-mono text-slate-400">ID: {appointment.id}</span>
        </div>

        <h4 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-teal-600" />
          {appointment.doctorName || appointment.patientName}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">{appointment.department || 'General Medicine'}</p>

        <div className="mt-4 space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{appointment.time}</span>
          </div>
          {appointment.reason && (
            <p className="pt-1 text-slate-500 border-t border-slate-200 mt-1 italic">
              "{appointment.reason}"
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2 pt-3 border-t border-slate-100">
        {onAction && (
          <button
            onClick={() => onAction(appointment)}
            className="flex-1 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-medium hover:bg-teal-700 transition-colors"
          >
            {actionLabel || 'Details'}
          </button>
        )}
        {onCancel && appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
          <button
            onClick={() => onCancel(appointment.id)}
            className="py-1.5 px-3 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;