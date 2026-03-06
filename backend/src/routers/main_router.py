from fastapi import APIRouter,HTTPException,Depends,Form
from sqlalchemy.ext.asyncio import AsyncSession
from src.schemas.schema import User_Registration_Schema,User_Information_Schema,ResponseSchema
import src.cruds.process as process


router=APIRouter(tags=["Users"],prefix="")

#登録
@router.post("/register",response_model=ResponseSchema)
async def create_user(user: User_Registration_Schema):
    try:
        await process.create_user(user)  # Ormar版は db_session 不要
        return ResponseSchema(message="registered")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ユーザーの登録に失敗しました: {str(e)}")

#全ユーザー取得
@router.get("/users", response_model=list[User_Information_Schema])
async def get_users_list():
    users = await process.get_all_users()  # Ormar版は db_session 不要
    return users

# 特定のユーザー取得
@router.get("/users/{user_id}", response_model=User_Information_Schema)
async def get_user_detail(user_id: int):
    user = await process.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    return user

# ユーザー更新
@router.put("/users/{user_id}", response_model=ResponseSchema)
async def modify_user(user_id: int, user: User_Registration_Schema):
    updated_user = await process.update_user(user_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="更新対象が見つかりません")
    return ResponseSchema(message="ユーザーが正常に更新されました")

# ユーザー削除
@router.delete("/users/{user_id}", response_model=ResponseSchema)
async def remove_user(user_id: int):
    result = await process.delete_user(user_id)
    if not result:
        raise HTTPException(status_code=404, detail="削除対象が見つかりません")
    return ResponseSchema(message="ユーザーが正常に削除されました")