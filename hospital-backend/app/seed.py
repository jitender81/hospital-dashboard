"""
Seed the MongoDB database with demo data matching the original frontend mock data.

Run with:
    python -m app.seed

SAFETY: This script deletes ALL existing data in every collection. It refuses
to run against production unless ALLOW_SEED_ENDPOINT=true is explicitly set,
so it can never accidentally wipe real patient/appointment data.
"""
import asyncio
import secrets
from app.config import settings
from app.database import (
    users_collection,
    doctors_collection,
    patients_collection,
    appointments_collection,
    medical_records_collection,
    prescriptions_collection,
    invoices_collection,
)
from app.core.security import hash_password


async def seed():
    if settings.environment == "production" and not settings.allow_seed_endpoint:
        raise RuntimeError(
            "Refusing to run seed.py against production (ENVIRONMENT=production). "
            "This would delete all real data. If you really need demo data on a "
            "non-prod deployment, set ALLOW_SEED_ENDPOINT=true explicitly."
        )

    # Use random passwords instead of well-known ones once this isn't purely local dev.
    if settings.environment == "development":
        patient_pw, doctor_pw, reception_pw = "patient123", "doctor123", "reception123"
    else:
        patient_pw = secrets.token_urlsafe(12)
        doctor_pw = secrets.token_urlsafe(12)
        reception_pw = secrets.token_urlsafe(12)

    print("Clearing existing collections...")
    for coll in [
        users_collection,
        doctors_collection,
        patients_collection,
        appointments_collection,
        medical_records_collection,
        prescriptions_collection,
        invoices_collection,
    ]:
        await coll.delete_many({})

    print("Seeding users...")
    users = [
        {
            "name": "Rahul Sharma",
            "email": "patient@hospital.com",
            "password_hash": hash_password(patient_pw),
            "role": "patient",
            "age": 29,
            "gender": "Male",
            "bloodGroup": "B+",
            "phone": "+91 98765 43210",
            "dateOfBirth": "1997-04-12",
            "address": "42, Park Street, New Delhi, India",
            "emergencyContact": "+91 98111 22233",
        },
        {
            "name": "Dr. Ananya Mehta",
            "email": "doctor@hospital.com",
            "password_hash": hash_password(doctor_pw),
            "role": "doctor",
            "specialization": "Cardiologist",
            "qualification": "MD, DM (Cardiology)",
            "experience": "12 Years",
            "phone": "+91 98100 11223",
            "consultationFee": "\u20b91,200",
            "availability": "Mon - Fri (09:00 AM - 04:00 PM)",
        },
        {
            "name": "Sunita Rao",
            "email": "reception@hospital.com",
            "password_hash": hash_password(reception_pw),
            "role": "reception",
            "department": "Front Desk Administration",
            "phone": "+91 98222 33344",
        },
    ]
    await users_collection.insert_many(users)

    print("Seeding doctors...")
    doctors = [
        {
            "name": "Dr. Ananya Mehta",
            "specialization": "Cardiologist",
            "experience": "12 Years",
            "rating": 4.9,
            "availability": "Mon - Fri",
            "fee": "\u20b91,200",
            "phone": "+91 98100 11223",
            "email": "ananya.mehta@hospital.com",
            "status": "Active",
        },
        {
            "name": "Dr. Rajiv Kapoor",
            "specialization": "Neurologist",
            "experience": "15 Years",
            "rating": 4.8,
            "availability": "Tue - Sat",
            "fee": "\u20b91,500",
            "phone": "+91 98200 22334",
            "email": "rajiv.kapoor@hospital.com",
            "status": "Active",
        },
        {
            "name": "Dr. Priya Sharma",
            "specialization": "Dermatologist",
            "experience": "8 Years",
            "rating": 4.7,
            "availability": "Mon - Sat",
            "fee": "\u20b9900",
            "phone": "+91 98300 33445",
            "email": "priya.sharma@hospital.com",
            "status": "Active",
        },
        {
            "name": "Dr. Arjun Malhotra",
            "specialization": "Orthopedic Specialist",
            "experience": "10 Years",
            "rating": 4.8,
            "availability": "Wed - Sun",
            "fee": "\u20b91,100",
            "phone": "+91 98400 44556",
            "email": "arjun.malhotra@hospital.com",
            "status": "Active",
        },
    ]
    doctor_result = await doctors_collection.insert_many(doctors)
    doctor_ids = doctor_result.inserted_ids

    print("Seeding patients...")
    patients = [
        {
            "name": "Rahul Sharma",
            "age": 29,
            "gender": "Male",
            "bloodGroup": "B+",
            "phone": "+91 98765 43210",
            "email": "patient@hospital.com",
            "lastVisit": "2026-08-10",
            "status": "Active",
            "allergies": "Penicillin",
            "medicalHistory": "Mild Hypertension",
        },
        {
            "name": "Sneha Verma",
            "age": 34,
            "gender": "Female",
            "bloodGroup": "O+",
            "phone": "+91 98112 34567",
            "email": "sneha.v@example.com",
            "lastVisit": "2026-08-14",
            "status": "Active",
            "allergies": "None",
            "medicalHistory": "Asthma",
        },
        {
            "name": "Vikram Singh",
            "age": 52,
            "gender": "Male",
            "bloodGroup": "A+",
            "phone": "+91 98334 55667",
            "email": "vikram.s@example.com",
            "lastVisit": "2026-07-28",
            "status": "Inactive",
            "allergies": "Dust, Sulfa Drugs",
            "medicalHistory": "Type 2 Diabetes",
        },
    ]
    patient_result = await patients_collection.insert_many(patients)
    patient_ids = patient_result.inserted_ids

    print("Seeding appointments...")
    appointments = [
        {
            "patientName": "Rahul Sharma",
            "patientId": str(patient_ids[0]),
            "doctorName": "Dr. Ananya Mehta",
            "doctorId": str(doctor_ids[0]),
            "department": "Cardiology",
            "date": "2026-08-22",
            "time": "10:30 AM",
            "type": "In-person Consultation",
            "status": "Confirmed",
            "reason": "Routine cardiac checkup & ECG review",
        },
        {
            "patientName": "Sneha Verma",
            "patientId": str(patient_ids[1]),
            "doctorName": "Dr. Ananya Mehta",
            "doctorId": str(doctor_ids[0]),
            "department": "Cardiology",
            "date": "2026-08-18",
            "time": "02:00 PM",
            "type": "Follow-up",
            "status": "Scheduled",
            "reason": "Blood pressure regulation review",
        },
        {
            "patientName": "Rahul Sharma",
            "patientId": str(patient_ids[0]),
            "doctorName": "Dr. Priya Sharma",
            "doctorId": str(doctor_ids[2]),
            "department": "Dermatology",
            "date": "2026-07-15",
            "time": "11:15 AM",
            "type": "Consultation",
            "status": "Completed",
            "reason": "Skin rash assessment",
        },
    ]
    await appointments_collection.insert_many(appointments)

    print("Seeding medical records...")
    records = [
        {
            "patientName": "Rahul Sharma",
            "patientId": str(patient_ids[0]),
            "doctorName": "Dr. Ananya Mehta",
            "department": "Cardiology",
            "date": "2026-07-10",
            "diagnosis": "Sinus Tachycardia",
            "symptoms": "Mild chest tightness during heavy exertion",
            "treatment": "Prescribed beta-blockers, reduced caffeine diet.",
            "notes": "ECG shows normal sinus rhythm. Advised follow-up in 4 weeks.",
            "reportStatus": "Available",
        },
        {
            "patientName": "Sneha Verma",
            "patientId": str(patient_ids[1]),
            "doctorName": "Dr. Rajiv Kapoor",
            "department": "Neurology",
            "date": "2026-06-22",
            "diagnosis": "Migraine without aura",
            "symptoms": "Throbbing unilateral headache, light sensitivity",
            "treatment": "Sumatriptan as needed, lifestyle log.",
            "notes": "MRI Brain clear. Stress-induced triggers suspected.",
            "reportStatus": "Available",
        },
    ]
    await medical_records_collection.insert_many(records)

    print("Seeding prescriptions...")
    prescriptions = [
        {
            "patientName": "Rahul Sharma",
            "patientId": str(patient_ids[0]),
            "doctorName": "Dr. Ananya Mehta",
            "date": "2026-07-10",
            "diagnosis": "Sinus Tachycardia",
            "medicines": [
                {
                    "name": "Metoprolol Succinate",
                    "dosage": "25mg",
                    "frequency": "Once daily (Morning)",
                    "duration": "30 Days",
                },
                {
                    "name": "Multivitamin Complex",
                    "dosage": "1 Tablet",
                    "frequency": "Once daily (After meal)",
                    "duration": "30 Days",
                },
            ],
            "instructions": "Take medications with warm water. Avoid heavy physical exertion.",
        },
    ]
    await prescriptions_collection.insert_many(prescriptions)

    print("Seeding invoices...")
    invoices = [
        {
            "patientName": "Rahul Sharma",
            "doctorName": "Dr. Ananya Mehta",
            "date": "2026-08-10",
            "consultationFee": 1200,
            "testCharges": 1500,
            "medicineCharges": 450,
            "discount": 100,
            "tax": 180,
            "totalAmount": 3230,
            "status": "Paid",
        },
        {
            "patientName": "Sneha Verma",
            "doctorName": "Dr. Rajiv Kapoor",
            "date": "2026-08-14",
            "consultationFee": 1500,
            "testCharges": 3000,
            "medicineCharges": 800,
            "discount": 200,
            "tax": 300,
            "totalAmount": 5400,
            "status": "Pending",
        },
    ]
    await invoices_collection.insert_many(invoices)

    print("\n✅ Seed complete!")
    print("\nLogin credentials (save these now, they are not stored anywhere):")
    print(f"  patient@hospital.com   / {patient_pw}")
    print(f"  doctor@hospital.com    / {doctor_pw}")
    print(f"  reception@hospital.com / {reception_pw}")


if __name__ == "__main__":
    asyncio.run(seed())