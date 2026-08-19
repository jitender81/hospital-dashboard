from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from bson.errors import InvalidId
from app.database import prescriptions_collection
from app.core.deps import get_current_user, require_roles
from app.core.utils import serialize_doc, serialize_list
from app.models.schemas import PrescriptionCreate, PrescriptionOut

router = APIRouter(prefix="/api/prescriptions", tags=["prescriptions"])


@router.get("", response_model=list[PrescriptionOut])
async def list_prescriptions(current_user: dict = Depends(get_current_user)):
    docs = await prescriptions_collection.find().sort("date", -1).to_list(length=None)
    return serialize_list(docs)


@router.post("", response_model=PrescriptionOut, status_code=status.HTTP_201_CREATED)
async def create_prescription(
    payload: PrescriptionCreate,
    current_user: dict = Depends(require_roles("doctor")),
):
    data = payload.model_dump()
    result = await prescriptions_collection.insert_one(data)
    doc = await prescriptions_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(doc)


@router.put("/{prescription_id}", response_model=PrescriptionOut)
async def update_prescription(
    prescription_id: str,
    payload: PrescriptionCreate,
    current_user: dict = Depends(require_roles("doctor")),
):
    try:
        oid = ObjectId(prescription_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid prescription id")

    result = await prescriptions_collection.update_one(
        {"_id": oid}, {"$set": payload.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Prescription not found")

    doc = await prescriptions_collection.find_one({"_id": oid})
    return serialize_doc(doc)


@router.delete("/{prescription_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prescription(
    prescription_id: str,
    current_user: dict = Depends(require_roles("doctor")),
):
    try:
        oid = ObjectId(prescription_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid prescription id")

    result = await prescriptions_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Prescription not found")
