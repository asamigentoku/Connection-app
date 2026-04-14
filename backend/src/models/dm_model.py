import datetime
import ormar
#外部キーのインポート
from src.models.user_model import User
from src.database.db import database,metadata
from ormar import OrmarConfig

base_ormar_config = OrmarConfig(
    metadata=metadata,
    database=database
)

# ----------------- Talk Room -----------------
class TalkRoom(ormar.Model):
    ormar_config = base_ormar_config.copy()
    room_id: int = ormar.Integer(primary_key=True,autoincrement=True)
    room_name:str =ormar.String(max_length=255, nullable=True)
    room_icon:str= ormar.String(max_length=255, nullable=True)
    created_at = ormar.DateTime(default=datetime.datetime.now)
    is_group:bool = ormar.Boolean(default=False)


# ----------------- Room Member -----------------
class RoomMember(ormar.Model):
    ormar_config = base_ormar_config.copy()
    id: int = ormar.Integer(primary_key=True,autoincrement=True)
    user: User = ormar.ForeignKey(User)
    room: TalkRoom = ormar.ForeignKey(TalkRoom)

# ----------------- Message -----------------
class Message(ormar.Model):
    ormar_config = base_ormar_config.copy()
    id: int = ormar.Integer(primary_key=True,autoincrement=True)
    room: TalkRoom = ormar.ForeignKey(TalkRoom)
    user: User = ormar.ForeignKey(User)
    content: str = ormar.Text()
    created_at = ormar.DateTime(default=datetime.datetime.now)
    is_read: bool = ormar.Boolean(default=False)


# ----------------- Message Read -----------------
class MessageRead(ormar.Model):
    ormar_config = base_ormar_config.copy()
    id: int = ormar.Integer(primary_key=True,autoincrement=True)
    message: Message = ormar.ForeignKey(Message)
    user: User = ormar.ForeignKey(User)
    read_at: datetime.datetime=ormar.DateTime(default=datetime.datetime.now)