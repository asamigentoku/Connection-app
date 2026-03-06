import datetime
import ormar
import sqlalchemy
from src.database.db import DATABASE_URL

#外部キーのインポート
from src.models.user_model import User

# Ormar の共通設定
base_ormar_config = ormar.OrmarConfig(
    metadata=sqlalchemy.MetaData(),
    database=ormar.DatabaseConnection(DATABASE_URL),
)

# ----------------- Post -----------------
class Post(ormar.Model):
    ormar_config = base_ormar_config.copy()
    post_id: int = ormar.Integer(primary_key=True,autoincrement=True)
    user: User = ormar.ForeignKey(User)
    content: str = ormar.Text()
    created_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.utcnow)


# ----------------- Post Image -----------------
class PostImage(ormar.Model):
    ormar_config = base_ormar_config.copy()
    id: int = ormar.Integer(primary_key=True,autoincrement=True)
    post: Post = ormar.ForeignKey(Post)
    image_url: str = ormar.String(max_length=255)


# ----------------- Reply -----------------
class Reply(ormar.Model):
    ormar_config = base_ormar_config.copy()
    id: int = ormar.Integer(primary_key=True,autoincrement=True)
    post: Post = ormar.ForeignKey(Post)
    user: User = ormar.ForeignKey(User)
    content: str = ormar.Text()
    created_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.utcnow)


# ----------------- Like -----------------
class Like(ormar.Model):
    ormar_config = base_ormar_config.copy()
    id: int = ormar.Integer(primary_key=True,autoincrement=True)
    user: User = ormar.ForeignKey(User)
    post: Post = ormar.ForeignKey(Post)
    created_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.utcnow)