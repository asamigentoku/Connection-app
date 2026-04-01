from fastapi import APIRouter,Depends,HTTPException
from src.login_jwt.create_jwt import get_current_active_user
from src.schemas.user_schemas import *
from typing import Annotated
router=APIRouter(tags=["tweet"],prefix="/tweet")
from src.schemas.post_schemas import *
from src.schemas.main_schemas import *
import src.cruds.post_cruds as post_cruds

###投稿の読み込み
###null->post_id,ユーザー、ユーザーアイコン、コンテンツ、いいね数、写真、[Replyスキーマ]
@router.get("/posts",response_model=list[Get_Reply_PostModel])
async def get_posts():
    try:
        posts=await post_cruds.get_all_posts_information()
        return posts
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ツイートの取得ができません: {str(e)}")

@router.get("/posts/images/{post_id}",response_model=list[PostImage])
async def get_images(post_id:int):
    try:
        images=await post_cruds.get_images_by_postid(post_id)
        return images
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"イメージが取得できません: {str(e)}")

@router.get("/posts/reply/{post_id}",response_model=list[ReplyModel])
async def get_replys(post_id:int):
    try:
        replys=await post_cruds.get_replys_by_postid(post_id)
        return replys
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"リプライが取得できません: {str(e)}")

@router.get("/posts/good_num/{post_id}",response_model=int)
async def get_good_num(post_id:int):
    try:
        number=await post_cruds.get_goodnum_by_postid(post_id)
        return number
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"いいね数が取得できません: {str(e)}")

###投稿
###コンテンツ、写真,(トークンユーザー)->null、写真無し投稿
@router.post("/create_post",response_model=ResponseSchema)
async def create_post(post:Create_PostModel,current_user: Annotated[UserResponse,Depends(get_current_active_user)]):
    try:
        await post_cruds.create_post(post,current_user.user_id)
        return ResponseSchema(message="投稿が正常にされました")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ツイートの投稿に失敗しました: {str(e)}")

#写真付き投稿
@router.post("/create_post_with_image",response_model=ResponseSchema)
async def create_post_with_image(post:Create_PostModel,images:list[PostImage],current_user: Annotated[UserResponse,Depends(get_current_active_user)]):
    try:
        await post_cruds.create_post_with_post(post,images,current_user.user_id)
        #画像の保存処理もここで行う
        return ResponseSchema(message="写真付き投稿が正常にされました")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ツイートの投稿に失敗しました: {str(e)}")

###投稿を編集
####post_id,(トークン=ユーザー),コンテンツ、写真->
@router.put("/update_post",response_model=ResponseSchema)
async def update_post(post:PostModel,current_user: Annotated[UserResponse,Depends(get_current_active_user)]):
    try:
        await post_cruds.update_post(post,current_user.user_id)
        return ResponseSchema(message="投稿が正常に編集されました")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ツイートの編集に失敗しました: {str(e)}")

###投稿を削除
####post_id,(トークンユーザー)->null
@router.delete("/delete_post/{post_id}",response_model=ResponseSchema)
async def delete_post(post_id:int,current_user: Annotated[UserResponse,Depends(get_current_active_user)]):
    try:
        await post_cruds.delete_post(post_id,current_user.user_id)
        return ResponseSchema(message="投稿が正常に削除されました")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ツイートの削除に失敗しました: {str(e)}")

###いいね
####post_id,(トークンユーザー or gueest)->null
@router.post("/manege_like/{post_id}",response_model=ResponseSchema)
async def post_like(post_id:int,current_user: Annotated[Optional[UserResponse],Depends(get_current_active_user)]):
    try:
        await post_cruds.manege_like(post_id,current_user.user_id)
        return ResponseSchema(message="いいねが正常にされました")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"いいねの処理に失敗しました: {str(e)}")

