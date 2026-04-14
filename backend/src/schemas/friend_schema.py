from pydantic import BaseModel
from typing import Optional

class Friend(BaseModel):
    user1_id:int
    user2_id:int

class Block(BaseModel):
    user1_id:int
    user2_id:int