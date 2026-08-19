from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from bson.errors import InvalidId
from app.database import doctors_collection
from app.core.deps import get_current_user, require_roles
from app.core.utils import serialize_doc, serialize_list
from app.models.schemas import DoctorCreate, DoctorOut

router = APIRouter(prefix="/api/doctors", tags=["doctors"])


@router.get("", response_model=list[DoctorOut])
async def list_doctors(current_user: dict = Depends(get_current_user)):
    docs = await doctors_collection.find().to_list(length=None)
    return serialize_list(docs)


@router.post("", response_model=DoctorOut, status_code=status.HTTP_201_CREATED)
async def create_doctor(
    payload: DoctorCreate,
    current_user: dict = Depends(require_roles("reception")),
):
    result = await doctors_collection.insert_one(payload.model_dump())
    doc = await doctors_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(doc)


@router.put("/{doctor_id}", response_model=DoctorOut)
async def update_doctor(
    doctor_id: str,
    payload: DoctorCreate,
    current_user: dict = Depends(require_roles("reception")),
):
    try:
        oid = ObjectId(doctor_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid doctor id")

    result = await doctors_collection.update_one(
        {"_id": oid}, {"$set": payload.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Doctor not found")

    doc = await doctors_collection.find_one({"_id": oid})
    return serialize_doc(doc)


@router.delete("/{doctor_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_doctor(
    doctor_id: str,
    current_user: dict = Depends(require_roles("reception")),
):
    try:
        oid = ObjectId(doctor_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid doctor id")

    result = await doctors_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Doctor not found")
