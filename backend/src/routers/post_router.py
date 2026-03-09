from fastapi import APIRouter,Depends,HTTPException
from src.login_jwt.create_jwt import get_current_user
router=APIRouter(tags=["tweet"],prefix="tweet")
from src.schemas.post_schemas import *
import src.cruds.post_cruds as post_cruds

###投稿の読み込み
###null->post_id,ユーザー、ユーザーアイコン、コンテンツ、いいね数、写真、[Replyスキーマ]
@router.get("/posts",responsem_model=Get_Reply_PostModel)
async def get_posts():
    try:
        posts=await post_cruds.get_all_posts_information()
        return posts
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ツイートの取得ができません: {str(e)}")

@router.get("posts/images/{post_id}",response_model=list[PostImage])
async def get_images(post_id:int):
    try:
        images=await post_cruds.get_images_by_postid(post_id)
        return images
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"イメージが取得できません: {str(e)}")

@router.get("posts/reply/{post_id}",response_model=list[ReplyModel])
async def get_replys(post_id:int):
    try:
        replys=await post_cruds.get_replys_by_postid(post_id)
        return replys
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"リプライが取得できません: {str(e)}")

@router.get("posts/good_num/{post_id}",response_model=int)
async def get_good_num(post_id:int):
    try:
        number=await post_cruds.get_goodnum_by_postid(post_id)
        return number
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"いいね数が取得できません: {str(e)}")


###投稿
###コンテンツ、写真,(トークンユーザー)->null

###投稿を編集
####post_id,(トークン=ユーザー),コンテンツ、写真->

###投稿を削除
####post_id,(トークンユーザー)->null

###いいね
####post_id,(トークンユーザー or gueest)->null

