from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime


# 共通フィールド
class UserBase(BaseModel):
    user_name: str
    email: Optional[EmailStr] = None
    gender: Optional[str] = None
    status: Optional[str] = None
    icon_url: Optional[str] = None

# ユーザー作成
class UserCreate(UserBase):
    user_pass: str

# ユーザー更新
class UserUpdate(BaseModel):
    user_name: Optional[str] = None
    email: Optional[EmailStr] = None
    gender: Optional[str] = None
    status: Optional[str] = None
    icon_url: Optional[str] = None

# レスポンス用
class UserResponse(UserBase):
    user_id: int
    is_online:bool
    is_verified:bool


