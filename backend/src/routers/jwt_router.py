from fastapi import APIRouter,HTTPException,Depends,Form,status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

#関数の挿入
from src.schemas.jwt_schemas import Token,TokenData,User
import src.cruds.process as process
from src.login_jwt.create_jwt import create_access_token,get_current_active_user

router=APIRouter(tags=["JWT"],prefix="")
ACCESS_TOKEN_EXPIRE_MINUTES=30

@router.post("/login")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    #フォームデータ->トークン型スキーマで返却
    user=await process.authentication(form_data.username,form_data.password)
    #そのパスワードとユーザ名のユーザーを発見!
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    #JWTの有効期限を30分 ACCESS_TOKEN_EXPIRE_MINUTES=30と代入されている
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    access_token = create_access_token(
        data={"sub": user.user_name}, expires_delta=access_token_expires
    )
    #完成したJWTのトークンを返す
    # token_type → トークンの種類（ここでは "bearer" が標準）
    #このアクセストークンが返却された時点でログイン完了
    return Token(access_token=access_token, token_type="bearer")
    # const data = await res.json()
    #if (data.access_token) ならログイン完了

@router.get("/users/me/",response_model=User)
async def read_users_me(
    #Annotated[型、追加情報(Field)など]
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> User:
    #ここでcurrent_userについて情報を受け取れるのでここで、トークンを返したことになる
    return current_user

@router.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]