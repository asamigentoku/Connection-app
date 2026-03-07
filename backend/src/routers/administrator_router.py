from fastapi import APIRouter,HTTPException,Depends,Form
from sqlalchemy.ext.asyncio import AsyncSession
from src.schemas.schema import User_Registration_Schema,User_Information_Schema,ResponseSchema
import src.cruds.process as process


router=APIRouter(tags=["administrator"],prefix="")

#全ユーザー取得
@router.get("/users")
async def get_users_list():
    users = await process.get_all_users()  # Ormar版は db_session 不要
    return users

# ユーザー削除
@router.delete("/users/{user_id}", response_model=ResponseSchema)
async def remove_user(user_id: int):
    result = await process.delete_user(user_id)
    if not result:
        raise HTTPException(status_code=404, detail="削除対象が見つかりません")
    return ResponseSchema(message="ユーザーが正常に削除されました")