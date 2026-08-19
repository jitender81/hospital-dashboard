from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

client = AsyncIOMotorClient(settings.mongo_uri)
db = client[settings.mongo_db_name]

users_collection = db["users"]
doctors_collection = db["doctors"]
patients_collection = db["patients"]
appointments_collection = db["appointments"]
medical_records_collection = db["medical_records"]
prescriptions_collection = db["prescriptions"]
invoices_collection = db["invoices"]
