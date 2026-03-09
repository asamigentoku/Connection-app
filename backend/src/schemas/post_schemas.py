from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class PostModel(BaseModel):
    content:str
    user_id:int

class Get_Reply_PostModel(PostModel):
    post_id:int
    user_icon:Optional[str] = None
    created_at: Optional[datetime] = None

class PostImage(BaseModel):
    post_id:int
    image_url:Optional[str] = None

class UpdatePostModel(PostModel):
    post_id:int
    image_url:Optional[str] = None
    created_at: Optional[datetime] = None

class GoodModel(BaseModel):
    post_id:int
    user_id:Optional[int] = None


    
    
    
    
    
