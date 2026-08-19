def serialize_doc(doc: dict) -> dict:
    """Convert a MongoDB document's _id (ObjectId) into a string 'id' field."""
    if doc is None:
        return doc
    doc = dict(doc)
    if "_id" in doc:
        doc["id"] = str(doc.pop("_id"))
    return doc


def serialize_list(docs: list[dict]) -> list[dict]:
    return [serialize_doc(d) for d in docs]
