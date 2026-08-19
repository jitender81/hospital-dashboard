export const MOCK_USERS = {
  'patient@hospital.com': {
    id: 'p1',
    name: 'Rahul Sharma',
    email: 'patient@hospital.com',
    role: 'patient',
    age: 29,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 98765 43210',
    dateOfBirth: '1997-04-12',
    address: '42, Park Street, New Delhi, India',
    emergencyContact: '+91 98111 22233'
  },
  'doctor@hospital.com': {
    id: 'd1',
    name: 'Dr. Ananya Mehta',
    email: 'doctor@hospital.com',
    role: 'doctor',
    specialization: 'Cardiologist',
    qualification: 'MD, DM (Cardiology)',
    experience: '12 Years',
    phone: '+91 98100 11223',
    consultationFee: '₹1,200',
    availability: 'Mon - Fri (09:00 AM - 04:00 PM)'
  },
  'reception@hospital.com': {
    id: 'r1',
    name: 'Sunita Rao',
    email: 'reception@hospital.com',
    role: 'reception',
    department: 'Front Desk Administration',
    phone: '+91 98222 33344'
  }
};

export const MOCK_DOCTORS = [
  {
    id: 'd1',
    name: 'Dr. Ananya Mehta',
    specialization: 'Cardiologist',
    experience: '12 Years',
    rating: 4.9,
    availability: 'Mon - Fri',
    fee: '₹1,200',
    phone: '+91 98100 11223',
    email: 'ananya.mehta@hospital.com',
    status: 'Active'
  },
  {
    id: 'd2',
    name: 'Dr. Rajiv Kapoor',
    specialization: 'Neurologist',
    experience: '15 Years',
    rating: 4.8,
    availability: 'Tue - Sat',
    fee: '₹1,500',
    phone: '+91 98200 22334',
    email: 'rajiv.kapoor@hospital.com',
    status: 'Active'
  },
  {
    id: 'd3',
    name: 'Dr. Priya Sharma',
    specialization: 'Dermatologist',
    experience: '8 Years',
    rating: 4.7,
    availability: 'Mon - Sat',
    fee: '₹900',
    phone: '+91 98300 33445',
    email: 'priya.sharma@hospital.com',
    status: 'Active'
  },
  {
    id: 'd4',
    name: 'Dr. Arjun Malhotra',
    specialization: 'Orthopedic Specialist',
    experience: '10 Years',
    rating: 4.8,
    availability: 'Wed - Sun',
    fee: '₹1,100',
    phone: '+91 98400 44556',
    email: 'arjun.malhotra@hospital.com',
    status: 'Active'
  }
];

export const MOCK_PATIENTS = [
  {
    id: 'p1',
    name: 'Rahul Sharma',
    age: 29,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 98765 43210',
    email: 'patient@hospital.com',
    lastVisit: '2026-08-10',
    status: 'Active',
    allergies: 'Penicillin',
    medicalHistory: 'Mild Hypertension'
  },
  {
    id: 'p2',
    name: 'Sneha Verma',
    age: 34,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+91 98112 34567',
    email: 'sneha.v@example.com',
    lastVisit: '2026-08-14',
    status: 'Active',
    allergies: 'None',
    medicalHistory: 'Asthma'
  },
  {
    id: 'p3',
    name: 'Vikram Singh',
    age: 52,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+91 98334 55667',
    email: 'vikram.s@example.com',
    lastVisit: '2026-07-28',
    status: 'Inactive',
    allergies: 'Dust, Sulfa Drugs',
    medicalHistory: 'Type 2 Diabetes'
  }
];

export const MOCK_APPOINTMENTS = [
  {
    id: 'apt-101',
    patientName: 'Rahul Sharma',
    patientId: 'p1',
    doctorName: 'Dr. Ananya Mehta',
    doctorId: 'd1',
    department: 'Cardiology',
    date: '2026-08-22',
    time: '10:30 AM',
    type: 'In-person Consultation',
    status: 'Confirmed',
    reason: 'Routine cardiac checkup & ECG review'
  },
  {
    id: 'apt-102',
    patientName: 'Sneha Verma',
    patientId: 'p2',
    doctorName: 'Dr. Ananya Mehta',
    doctorId: 'd1',
    department: 'Cardiology',
    date: '2026-08-18',
    time: '02:00 PM',
    type: 'Follow-up',
    status: 'Scheduled',
    reason: 'Blood pressure regulation review'
  },
  {
    id: 'apt-103',
    patientName: 'Rahul Sharma',
    patientId: 'p1',
    doctorName: 'Dr. Priya Sharma',
    doctorId: 'd3',
    department: 'Dermatology',
    date: '2026-07-15',
    time: '11:15 AM',
    type: 'Consultation',
    status: 'Completed',
    reason: 'Skin rash assessment'
  }
];

export const MOCK_MEDICAL_RECORDS = [
  {
    id: 'mr-201',
    patientName: 'Rahul Sharma',
    patientId: 'p1',
    doctorName: 'Dr. Ananya Mehta',
    department: 'Cardiology',
    date: '2026-07-10',
    diagnosis: 'Sinus Tachycardia',
    symptoms: 'Mild chest tightness during heavy exertion',
    treatment: 'Prescribed beta-blockers, reduced caffeine diet.',
    notes: 'ECG shows normal sinus rhythm. Advised follow-up in 4 weeks.',
    reportStatus: 'Available'
  },
  {
    id: 'mr-202',
    patientName: 'Sneha Verma',
    patientId: 'p2',
    doctorName: 'Dr. Rajiv Kapoor',
    department: 'Neurology',
    date: '2026-06-22',
    diagnosis: 'Migraine without aura',
    symptoms: 'Throbbing unilateral headache, light sensitivity',
    treatment: 'Sumatriptan as needed, lifestyle log.',
    notes: 'MRI Brain clear. Stress-induced triggers suspected.',
    reportStatus: 'Available'
  }
];

export const MOCK_PRESCRIPTIONS = [
  {
    id: 'rx-301',
    patientName: 'Rahul Sharma',
    patientId: 'p1',
    doctorName: 'Dr. Ananya Mehta',
    date: '2026-07-10',
    diagnosis: 'Sinus Tachycardia',
    medicines: [
      { name: 'Metoprolol Succinate', dosage: '25mg', frequency: 'Once daily (Morning)', duration: '30 Days' },
      { name: 'Multivitamin Complex', dosage: '1 Tablet', frequency: 'Once daily (After meal)', duration: '30 Days' }
    ],
    instructions: 'Take medications with warm water. Avoid heavy physical exertion.'
  }
];

export const MOCK_INVOICES = [
  {
    id: 'INV-2026-001',
    patientName: 'Rahul Sharma',
    doctorName: 'Dr. Ananya Mehta',
    date: '2026-08-10',
    consultationFee: 1200,
    testCharges: 1500,
    medicineCharges: 450,
    discount: 100,
    tax: 180,
    totalAmount: 3230,
    status: 'Paid'
  },
  {
    id: 'INV-2026-002',
    patientName: 'Sneha Verma',
    doctorName: 'Dr. Rajiv Kapoor',
    date: '2026-08-14',
    consultationFee: 1500,
    testCharges: 3000,
    medicineCharges: 800,
    discount: 200,
    tax: 300,
    totalAmount: 5400,
    status: 'Pending'
  }
];