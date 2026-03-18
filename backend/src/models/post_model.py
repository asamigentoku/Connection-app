import datetime
import ormar
from src.models.user_model import User
from src.database.db import database,metadata
from ormar import OrmarConfig

base_ormar_config = OrmarConfig(
    metadata=metadata,
    database=database
)

#外部キーのインポート
#　　※related_nameがないとエラーが起きる

# ----------------- Post -----------------
class Post(ormar.Model):
    ormar_config = base_ormar_config.copy()
    post_id: int = ormar.Integer(primary_key=True,autoincrement=True)
    user: User = ormar.ForeignKey(User)
    title:str=ormar.Text()
    content: str = ormar.Text()
    category: str = ormar.String(max_length=50,nullable=True)
    created_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.utcnow)
    replies: int = ormar.Integer(default=0)
    likes: int = ormar.Integer(default=0)


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
    post: Post = ormar.ForeignKey(Post, related_name="reply_post")
    user: User = ormar.ForeignKey(User, related_name="replypost")
    content: str = ormar.Text()
    created_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.utcnow)


# ----------------- Like -----------------
class Like(ormar.Model):
    ormar_config = base_ormar_config.copy()
    id: int = ormar.Integer(primary_key=True,autoincrement=True)
    post: Post = ormar.ForeignKey(Post, related_name="likes_post")
    user: User = ormar.ForeignKey(User, related_name="likes_user")
    created_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.utcnow)