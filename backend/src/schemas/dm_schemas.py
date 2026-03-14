from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RoomBase(BaseModel):
    romm_id:int
    room_name:str
    created_at: Optional[datetime] = None

class CreateRoom(BaseModel):
    room_name:str
    user1_id:int
    user2_id:int
    
class AddRoomMember(BaseModel):
    room_id:int
    user_id:int


class BaseMessage(BaseModel):
    id:int
    content:str
    room_id:int

class UpdateMessage(BaseModel):
    id:int
    content:str

class GetMessage(BaseMessage):
    user_id:int
    user_icon:Optional[str] = None
    created_at: Optional[datetime] = None

class SubmitMessage(BaseModel):
    content:str
    room_id:int