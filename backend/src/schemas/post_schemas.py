from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class PostModel(BaseModel):
    content:str
    title:str
    post_id:int

class Get_Reply_PostModel(PostModel):
    user_name:str=None
    user_id:int=None
    user_icon:Optional[str] = None
    created_at: Optional[datetime] = None
    category:Optional[str] = None

class Create_PostModel(BaseModel):
    title:str
    content:str

class ReplyModel(BaseModel):
    reply_id:int
    content:str
    user_name:str
    user_icon:Optional[str] = None
    created_at: Optional[datetime] = None

class PostImage(BaseModel):
    image_url:Optional[str] = None





    
    
    
    
    
