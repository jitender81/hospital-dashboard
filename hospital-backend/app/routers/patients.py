from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from bson.errors import InvalidId
from app.database import patients_collection
from app.core.deps import get_current_user, require_roles
from app.core.utils import serialize_doc, serialize_list
from app.models.schemas import PatientCreate, PatientOut

router = APIRouter(prefix="/api/patients", tags=["patients"])


@router.get("", response_model=list[PatientOut])
async def list_patients(current_user: dict = Depends(get_current_user)):
    docs = await patients_collection.find().to_list(length=None)
    return serialize_list(docs)


@router.post("", response_model=PatientOut, status_code=status.HTTP_201_CREATED)
async def create_patient(
    payload: PatientCreate,
    current_user: dict = Depends(require_roles("reception")),
):
    result = await patients_collection.insert_one(payload.model_dump())
    doc = await patients_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(doc)


@router.put("/{patient_id}", response_model=PatientOut)
async def update_patient(
    patient_id: str,
    payload: PatientCreate,
    current_user: dict = Depends(require_roles("reception", "doctor")),
):
    try:
        oid = ObjectId(patient_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid patient id")

    result = await patients_collection.update_one(
        {"_id": oid}, {"$set": payload.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Patient not found")

    doc = await patients_collection.find_one({"_id": oid})
    return serialize_doc(doc)


@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_patient(
    patient_id: str,
    current_user: dict = Depends(require_roles("reception")),
):
    try:
        oid = ObjectId(patient_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid patient id")

    result = await patients_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Patient not found")
