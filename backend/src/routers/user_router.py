from fastapi import APIRouter,HTTPException,Depends,Form
from sqlalchemy.ext.asyncio import AsyncSession
from src.schemas.schema import ResponseSchema
from src.schemas.user_schemas import *
import src.cruds.process as process
from src.login_jwt.create_jwt import get_current_active_user
from typing import Annotated


router=APIRouter(tags=["Users"],prefix="")

#登録
#Userスキーマ->レスポンス
@router.post("/register",response_model=ResponseSchema)
async def create_user(user: UserCreate):
    try:
        await process.create_user(user)
        return ResponseSchema(message="registered")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ユーザーの登録に失敗しました: {str(e)}")

#特定のユーザー情報取得
#(トークン->ユーザーID)->User
@router.get("/users/{user_id}",response_model=UserResponse)
async def get_user_detail(current_user: Annotated[UserResponse, Depends(get_current_active_user)]):
    user = await process.get_user_by_id(current_user.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    return user

#特定のユーザー情報更新
# (トークン→ユーザーID),User->レスポンス
@router.put("/users/{user_id}", response_model=ResponseSchema)
async def modify_user(user:UserUpdate,current_user: Annotated[UserResponse, Depends(get_current_active_user)]):
    updated_user = await process.update_user(current_user.user_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="更新対象が見つかりません")
    return ResponseSchema(message="ユーザーが正常に更新されました")
