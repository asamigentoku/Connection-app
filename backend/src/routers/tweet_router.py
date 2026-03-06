from fastapi import APIRouter,Depends
from src.login_jwt.create_jwt import get_current_user
router=APIRouter(tags=["twitter"],prefix="tweet")

###投稿の読み込み
###null->post_id,ユーザー、ユーザーアイコン、コンテンツ、いいね数、写真、[Replyスキーマ]

###投稿
###コンテンツ、写真,(トークンユーザー)->null

###投稿を編集
####post_id,(トークン=ユーザー),コンテンツ、写真->

###投稿を削除
####post_id,(トークンユーザー)->null

###いいね
####post_id,(トークンユーザー or gueest)->null

