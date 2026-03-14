
import datetime
import ormar
from src.database.db import database,metadata
from ormar import OrmarConfig

base_ormar_config = OrmarConfig(
    metadata=metadata,
    database=database
)


print("読み込みされました")
class User(ormar.Model):
    ormar_config = base_ormar_config.copy()
    user_id:int=ormar.Integer(primary_key=True,autoincrement=True)
    user_name: str = ormar.String(max_length=255, nullable=False)
    user_pass: str = ormar.String(max_length=255, nullable=False)
    email: str = ormar.String(max_length=255, unique=True, nullable=True)
    gender: str = ormar.String(max_length=50, nullable=True)
    status: str = ormar.String(max_length=50, nullable=True)
    icon_url: str = ormar.String(max_length=255, nullable=True)
    created_at = ormar.DateTime(default=datetime.datetime.now)

# ----------------- Follow -----------------
class Follow(ormar.Model):
    ormar_config = base_ormar_config.copy()
    id: int = ormar.Integer(primary_key=True,autoincrement=True)
    follower: User = ormar.ForeignKey(User, related_name="following")
    following: User = ormar.ForeignKey(User, related_name="followers")
    created_at: datetime.datetime =  ormar.DateTime(default=datetime.datetime.now)

# ----------------- Block -----------------
class Block(ormar.Model):
    ormar_config = base_ormar_config.copy()
    id: int = ormar.Integer(primary_key=True,autoincrement=True)
    blocker: User = ormar.ForeignKey(User, related_name="blocked_users")
    blocked: User = ormar.ForeignKey(User, related_name="blocked_by")
    created_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.now)