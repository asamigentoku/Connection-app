from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RoomBase(BaseModel):
    romm_id:int
    room_name:str
    created_at: Optional[datetime] = None

class BaseMessage(BaseModel):
    id:int
    content:str
    room_id:int

class UpdateMessage():
    id:int
    content:str

class GetMessage(BaseMessage):
    user_id:int
    user_icon:Optional[str] = None
    created_at: Optional[datetime] = None

class SubmitMessage():
    content:str
    room_id:int