from datetime import datetime, timedelta, timezone
from typing import Annotated
import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash
from src.cruds.process import get_user_by_name
from src.schemas.jwt_schemas import Token,TokenData,User
from src.schemas.user_schemas import *

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password_hash = PasswordHash.recommended()

DUMMY_HASH = password_hash.hash("dummypassword")

# Authorization: Bearer <access_token>　bearerタイプによるトークン作成
#このエンドポイントにアクセスするとき、
#HTTPリクエストの Authorization: Bearer <JWT> ヘッダーからトークンを取り出すと指示しています。
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    #元のデータを変更しないためにコピー
    to_encode = data.copy()
    #もし、時間が設定されているのなら
    if expires_delta:
        #有効時間=現在時間+設定された時間
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        #有効時間=現在時間＋15分
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    #ユーザー情報に新しいJSONキーを追加(有効期限)
    to_encode.update({"exp": expire})
    #ユーザー情報、有効期限、秘密鍵、暗号手法を記載し、JWTを作成
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

#現在のユーザを取得
# token: 型タイプ:str  依存関係:breaerタイプのトークン
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        #JWTトークンを解読して、内容を取り出す
        username = payload.get("sub")
        #data={"sub": user.username}, expires_delta=access_token_expires
        #これでユーザーネームを取り出せる
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    #データベースからユーザー名がそのユーザー名のものの情報を取り出す
    user = get_user_by_name(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
    #Annotated[型、追加情報(Field)など]
    current_user: Annotated[UserResponse, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user