from datetime import date
import random
from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from bson.errors import InvalidId
from app.database import invoices_collection
from app.core.deps import get_current_user, require_roles
from app.core.utils import serialize_doc, serialize_list
from app.models.schemas import InvoiceCreate, InvoiceOut

router = APIRouter(prefix="/api/invoices", tags=["invoices"])


@router.get("", response_model=list[InvoiceOut])
async def list_invoices(current_user: dict = Depends(get_current_user)):
    docs = await invoices_collection.find().sort("date", -1).to_list(length=None)
    return serialize_list(docs)


@router.post("", response_model=InvoiceOut, status_code=status.HTTP_201_CREATED)
async def create_invoice(
    payload: InvoiceCreate,
    current_user: dict = Depends(require_roles("reception")),
):
    data = payload.model_dump()
    data.setdefault("date", date.today().isoformat())
    data.setdefault("status", "Pending")
    result = await invoices_collection.insert_one(data)
    doc = await invoices_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(doc)


@router.put("/{invoice_id}", response_model=InvoiceOut)
async def update_invoice(
    invoice_id: str,
    payload: InvoiceCreate,
    current_user: dict = Depends(require_roles("reception")),
):
    try:
        oid = ObjectId(invoice_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid invoice id")

    result = await invoices_collection.update_one(
        {"_id": oid}, {"$set": payload.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Invoice not found")

    doc = await invoices_collection.find_one({"_id": oid})
    return serialize_doc(doc)


@router.delete("/{invoice_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_invoice(
    invoice_id: str,
    current_user: dict = Depends(require_roles("reception")),
):
    try:
        oid = ObjectId(invoice_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid invoice id")

    result = await invoices_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Invoice not found")
