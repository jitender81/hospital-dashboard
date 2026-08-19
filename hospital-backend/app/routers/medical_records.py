from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from bson.errors import InvalidId
from app.database import medical_records_collection
from app.core.deps import get_current_user, require_roles
from app.core.utils import serialize_doc, serialize_list
from app.models.schemas import MedicalRecordCreate, MedicalRecordOut

router = APIRouter(prefix="/api/medical-records", tags=["medical-records"])


@router.get("", response_model=list[MedicalRecordOut])
async def list_medical_records(current_user: dict = Depends(get_current_user)):
    docs = await medical_records_collection.find().sort("date", -1).to_list(length=None)
    return serialize_list(docs)


@router.post("", response_model=MedicalRecordOut, status_code=status.HTTP_201_CREATED)
async def create_medical_record(
    payload: MedicalRecordCreate,
    current_user: dict = Depends(require_roles("doctor")),
):
    data = payload.model_dump()
    data.setdefault("reportStatus", "Available")
    result = await medical_records_collection.insert_one(data)
    doc = await medical_records_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(doc)


@router.put("/{record_id}", response_model=MedicalRecordOut)
async def update_medical_record(
    record_id: str,
    payload: MedicalRecordCreate,
    current_user: dict = Depends(require_roles("doctor")),
):
    try:
        oid = ObjectId(record_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid record id")

    result = await medical_records_collection.update_one(
        {"_id": oid}, {"$set": payload.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Medical record not found")

    doc = await medical_records_collection.find_one({"_id": oid})
    return serialize_doc(doc)


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_medical_record(
    record_id: str,
    current_user: dict = Depends(require_roles("doctor")),
):
    try:
        oid = ObjectId(record_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid record id")

    result = await medical_records_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Medical record not found")
