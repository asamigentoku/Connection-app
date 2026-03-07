import datetime
import ormar
import sqlalchemy
from src.database.db import base_ormar_config
#外部キーのインポート
from src.models.user_model import User

# ----------------- Talk Room -----------------
class TalkRoom(ormar.Model):
    ormar_config = base_ormar_config.copy()
    room_id: int = ormar.Integer(primary_key=True,autoincrement=True)
    room_name:str =ormar.String(max_length=255, nullable=False)
    created_at = ormar.DateTime(default=datetime.datetime.now)


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


# ----------------- Message Read -----------------
class MessageRead(ormar.Model):
    ormar_config = base_ormar_config.copy()
    id: int = ormar.Integer(primary_key=True,autoincrement=True)
    message: Message = ormar.ForeignKey(Message)
    user: User = ormar.ForeignKey(User)
    read_at: datetime.datetime=ormar.DateTime(default=datetime.datetime.now)