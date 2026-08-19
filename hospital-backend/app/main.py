from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.core.limiter import limiter
from app.routers import (
    auth,
    doctors,
    patients,
    appointments,
    medical_records,
    prescriptions,
    invoices,
)

app = FastAPI(title="Hospital Automation API", version="1.0.0")

# Rate limiting — protects endpoints like /api/auth/login from brute-force attempts.
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(doctors.router)
app.include_router(patients.router)
app.include_router(appointments.router)
app.include_router(medical_records.router)
app.include_router(prescriptions.router)
app.include_router(invoices.router)


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}