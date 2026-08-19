import React, { useState, useEffect } from 'react';
import { Eye, FileText } from 'lucide-react';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import { getMedicalRecords } from '../../services/api';

const PatientMedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    getMedicalRecords().then((res) => {
      setRecords(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Medical History & Records</h1>
        <p className="text-xs text-slate-500 mt-1">Access clinical diagnoses and lab reports</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Department</th>
                <th className="p-3">Diagnosis</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/50">
                  <td className="p-3 font-mono">{rec.date}</td>
                  <td className="p-3 font-semibold text-slate-800">{rec.doctorName}</td>
                  <td className="p-3">{rec.department}</td>
                  <td className="p-3 text-teal-700 font-medium">{rec.diagnosis}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[11px]">
                      {rec.reportStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedRecord(rec)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        title="Medical Record Details"
      >
        {selectedRecord && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg">
              <div>
                <p className="text-slate-400">Doctor:</p>
                <p className="font-bold text-slate-800">{selectedRecord.doctorName}</p>
              </div>
              <div>
                <p className="text-slate-400">Date:</p>
                <p className="font-bold text-slate-800">{selectedRecord.date}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-slate-700">Diagnosis</p>
              <p className="p-2 bg-teal-50 border border-teal-100 rounded text-teal-900 font-medium mt-1">
                {selectedRecord.diagnosis}
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-700">Symptoms</p>
              <p className="text-slate-600 mt-0.5">{selectedRecord.symptoms}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-700">Clinical Treatment & Notes</p>
              <p className="text-slate-600 mt-0.5">{selectedRecord.treatment}</p>
              <p className="text-slate-500 italic mt-1">{selectedRecord.notes}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientMedicalRecords;