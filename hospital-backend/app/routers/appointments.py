from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from bson.errors import InvalidId
from app.database import appointments_collection
from app.core.deps import get_current_user
from app.core.utils import serialize_doc, serialize_list
from app.models.schemas import AppointmentCreate, AppointmentUpdate, AppointmentOut

router = APIRouter(prefix="/api/appointments", tags=["appointments"])


@router.get("", response_model=list[AppointmentOut])
async def list_appointments(current_user: dict = Depends(get_current_user)):
    docs = await appointments_collection.find().sort("date", -1).to_list(length=None)
    return serialize_list(docs)


@router.post("", response_model=AppointmentOut, status_code=status.HTTP_201_CREATED)
async def create_appointment(
    payload: AppointmentCreate,
    current_user: dict = Depends(get_current_user),
):
    data = payload.model_dump()
    data.setdefault("status", "Confirmed")
    result = await appointments_collection.insert_one(data)
    doc = await appointments_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(doc)


@router.put("/{appointment_id}", response_model=AppointmentOut)
async def update_appointment(
    appointment_id: str,
    payload: AppointmentUpdate,
    current_user: dict = Depends(get_current_user),
):
    try:
        oid = ObjectId(appointment_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid appointment id")

    update_data = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = await appointments_collection.update_one({"_id": oid}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")

    doc = await appointments_collection.find_one({"_id": oid})
    return serialize_doc(doc)


@router.delete("/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_appointment(
    appointment_id: str,
    current_user: dict = Depends(get_current_user),
):
    try:
        oid = ObjectId(appointment_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid appointment id")

    result = await appointments_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
