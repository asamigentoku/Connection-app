from typing import Optional
import src.models.models as model
import src.schemas.schema as schema
from src.login_jwt.hashfunction import get_password_hash,verify_password

#ユーザー認証
# 認証
async def authenticate_user(user_name: str, password: str) -> Optional[model.User]:
    user = await model.User.objects.filter(user_name=user_name).first()
    if user and verify_password(password, user.user_pass):
        return user
    return None

#新規登録
async def create_user(user_data:schema.User_Registration_Schema) -> model.User:
    hashed_pass = get_password_hash(user_data.user_pass)
    user = await model.User.objects.create(user_name=user_data.user_name, user_pass=hashed_pass)
    return user

# 全件取得
async def get_all_users() ->list[model.User]:
    return await model.User.objects.all()

# IDで取得
async def get_user_by_id(user_id: int) -> Optional[model.User]:
    return await model.User.objects.get_or_none(user_id=user_id)

#特定のメモを取得
async def get_user_by_name(user_name: str) -> Optional[model.User]:
    user = await model.User.objects.get_or_none(user_name=user_name)
    return user

#更新処理
async def update_user(user_data:schema.User_Registration_Schema) -> Optional[model.User]:
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
