from typing import Optional
import src.models.user_model as model
from src.schemas.user_schemas import *
from src.login_jwt.hashfunction import get_password_hash,verify_password

#ユーザー認証
# 認証
async def authenticate_user(user_name: str, password: str) -> Optional[model.User]:
    user = await model.User.objects.filter(user_name=user_name).first()
    if user and verify_password(password, user.user_pass):
        return user
    return None

#新規登録
async def create_user(user_data:UserCreate) -> model.User:
    hashed_pass = get_password_hash(user_data.user_pass)
    user = await model.User.objects.create(
        user_name=user_data.user_name,
        user_pass=hashed_pass,
        email=user_data.email,
        gender=user_data.gender,
        status=user_data.status,
        icon_url=user_data.icon_url
    )
    print("ユーザー登録が完了しました")
    return user

# 全件取得
async def get_all_users() ->list[model.User]:
    return await model.User.objects.all()

#アイコンを取得

# IDで取得
async def get_user_by_id(user_id: int) -> Optional[model.User]:
    return await model.User.objects.get_or_none(user_id=user_id)

#特定のユーザーネームのユーザーを取得
async def get_user_by_name(user_name: str) -> Optional[model.User]:
    user = await model.User.objects.get_or_none(user_name=user_name)
    return user

#更新処理
async def update_user(user_data:UserUpdate) -> Optional[model.User]:
    user = await get_user_by_id(user_data.user_id)
    if user:
        ##ここでは名前とパスワードしか変更されない
        user.user_name = user_data.user_name
        user.user_pass = get_password_hash(user_data.user_pass)
        await user.update()
    return user

#削除処理
async def delete_user(user_id: int) -> Optional[model.User]:
    user = await get_user_by_id(user_id)
    if user:
        await user.delete()
    return user
