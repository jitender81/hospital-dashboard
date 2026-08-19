from fastapi import APIRouter, HTTPException, status, Depends, Request
from app.database import users_collection
from app.core.security import verify_password, create_access_token
from app.core.utils import serialize_doc
from app.core.deps import get_current_user
from app.models.schemas import LoginRequest, LoginResponse
from app.core.limiter import limiter

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
@limiter.limit("5/minute")
async def login(request: Request, payload: LoginRequest):
    user = await users_collection.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password credential.",
        )

    token = create_access_token({"sub": user["email"], "role": user["role"]})

    user_out = serialize_doc(user)
    user_out.pop("password_hash", None)

    return {"user": user_out, "token": token}


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user