from pydantic import BaseModel, EmailStr
from typing import Optional, List


# ---------- Auth ----------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    # optional role-specific fields
    age: Optional[int] = None
    gender: Optional[str] = None
    bloodGroup: Optional[str] = None
    phone: Optional[str] = None
    dateOfBirth: Optional[str] = None
    address: Optional[str] = None
    emergencyContact: Optional[str] = None
    specialization: Optional[str] = None
    qualification: Optional[str] = None
    experience: Optional[str] = None
    consultationFee: Optional[str] = None
    availability: Optional[str] = None
    department: Optional[str] = None


class LoginResponse(BaseModel):
    user: UserOut
    token: str


# ---------- Doctor ----------
class DoctorBase(BaseModel):
    name: str
    specialization: str
    experience: Optional[str] = None
    rating: Optional[float] = None
    availability: Optional[str] = None
    fee: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    status: Optional[str] = "Active"


class DoctorCreate(DoctorBase):
    pass


class DoctorOut(DoctorBase):
    id: str


# ---------- Patient ----------
class PatientBase(BaseModel):
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None
    bloodGroup: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    lastVisit: Optional[str] = None
    status: Optional[str] = "Active"
    allergies: Optional[str] = None
    medicalHistory: Optional[str] = None


class PatientCreate(PatientBase):
    pass


class PatientOut(PatientBase):
    id: str


# ---------- Appointment ----------
class AppointmentBase(BaseModel):
    patientName: str
    patientId: str
    doctorName: str
    doctorId: str
    department: Optional[str] = None
    date: str
    time: str
    type: Optional[str] = None
    status: Optional[str] = "Scheduled"
    reason: Optional[str] = None


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentUpdate(BaseModel):
    status: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    reason: Optional[str] = None


class AppointmentOut(AppointmentBase):
    id: str


# ---------- Medical Record ----------
class MedicalRecordBase(BaseModel):
    patientName: str
    patientId: str
    doctorName: str
    department: Optional[str] = None
    date: str
    diagnosis: str
    symptoms: Optional[str] = None
    treatment: Optional[str] = None
    notes: Optional[str] = None
    reportStatus: Optional[str] = "Available"


class MedicalRecordCreate(MedicalRecordBase):
    pass


class MedicalRecordOut(MedicalRecordBase):
    id: str


# ---------- Prescription ----------
class Medicine(BaseModel):
    name: str
    dosage: str
    frequency: str
    duration: str


class PrescriptionBase(BaseModel):
    patientName: str
    patientId: str
    doctorName: str
    date: str
    diagnosis: str
    medicines: List[Medicine]
    instructions: Optional[str] = None


class PrescriptionCreate(PrescriptionBase):
    pass


class PrescriptionOut(PrescriptionBase):
    id: str


# ---------- Invoice ----------
class InvoiceBase(BaseModel):
    patientName: str
    doctorName: str
    date: Optional[str] = None
    consultationFee: float = 0
    testCharges: float = 0
    medicineCharges: float = 0
    discount: float = 0
    tax: float = 0
    totalAmount: float
    status: Optional[str] = "Pending"


class InvoiceCreate(InvoiceBase):
    pass


class InvoiceOut(InvoiceBase):
    id: str
