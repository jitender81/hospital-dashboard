import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import { getInvoices, createInvoice, getPatients, getDoctors } from '../../services/api';

const ReceptionBilling = () => {
  const [invoices, setInvoices] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [patientName, setPatientName] = useState('Rahul Sharma');
  const [doctorName, setDoctorName] = useState('Dr. Ananya Mehta');
  const [consultationFee, setConsultationFee] = useState(1200);
  const [testCharges, setTestCharges] = useState(500);
  const [medicineCharges, setMedicineCharges] = useState(300);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [invRes, patRes, docRes] = await Promise.all([getInvoices(), getPatients(), getDoctors()]);
    setInvoices(invRes.data);
    setPatients(patRes.data);
    setDoctors(docRes.data);
    setLoading(false);
  };

  const subtotal = Number(consultationFee) + Number(testCharges) + Number(medicineCharges) - Number(discount);
  const tax = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createInvoice({
      patientName,
      doctorName,
      consultationFee: Number(consultationFee),
      testCharges: Number(testCharges),
      medicineCharges: Number(medicineCharges),
      discount: Number(discount),
      tax,
      totalAmount
    });
    setIsModalOpen(false);
    fetchData();
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Billing & Invoices</h1>
          <p className="text-xs text-slate-500 mt-1">Generate invoices and review financial ledgers</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold"
        >
          <Plus className="h-4 w-4" /> Create Invoice
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b text-slate-500 uppercase">
            <tr>
              <th className="p-3">Invoice ID</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y font-medium text-slate-700">
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="p-3 font-mono text-slate-500">{inv.id}</td>
                <td className="p-3 font-bold text-slate-800">{inv.patientName}</td>
                <td className="p-3">{inv.doctorName}</td>
                <td className="p-3 font-bold text-teal-700">₹{inv.totalAmount}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate Invoice">
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Patient</label>
            <select value={patientName} onChange={(e) => setPatientName(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              {patients.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Doctor</label>
            <select value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
              {doctors.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold mb-1">Consultation Fee</label>
              <input type="number" value={consultationFee} onChange={(e) => setConsultationFee(e.target.value)} className="w-full p-2 border rounded bg-slate-50" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Test Charges</label>
              <input type="number" value={testCharges} onChange={(e) => setTestCharges(e.target.value)} className="w-full p-2 border rounded bg-slate-50" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold mb-1">Medicine Charges</label>
              <input type="number" value={medicineCharges} onChange={(e) => setMedicineCharges(e.target.value)} className="w-full p-2 border rounded bg-slate-50" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Discount</label>
              <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full p-2 border rounded bg-slate-50" />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg space-y-1 font-semibold text-slate-700">
            <div className="flex justify-between"><span>Tax (5%):</span><span>₹{tax}</span></div>
            <div className="flex justify-between text-teal-800 text-sm font-bold pt-1 border-t"><span>Total Invoice Amount:</span><span>₹{totalAmount}</span></div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded font-semibold">Generate</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReceptionBilling;