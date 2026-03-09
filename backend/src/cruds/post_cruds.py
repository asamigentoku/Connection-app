from src.schemas.post_schemas import *
from typing import Optional
import src.models.post_model as post_model

#全てのポストを取得
async def get_all_posts()->Optional[list[post_model.Post]]:
    posts=await post_model.Post.objects.all()
    return posts

async def get_all_posts_information()->Optional[list[Get_Reply_PostModel]]:
    posts=await get_all_posts()
    posts_json = []
    for p in posts:
        post=Get_Reply_PostModel(
            content=p.content,
            post_id=p.post_id,
            user_name=p.user.user_name,
            user_icon=p.user.user_icon,
            created_at=p.created_at
        )
        posts_json.append(post)
    return posts_json

async def get_post_by_id(id:int)->Optional[post_model.Post]:
    return await post_model.Post.objects.get_or_none(post_id=id)

async def get_images_by_postid(post_id:int)->Optional[list[PostImage]]:
    post=await get_post_by_id(post_id)
    images=await post_model.PostImage.objects.filter(post=post).all()
    post_images=[PostImage(**i.model_dump()) for i in images]
    return post_images

async def get_replys_by_postid(post_id:int)->Optional[list[ReplyModel]]:
    post=await get_post_by_id(post_id)
    replys=await post_model.Reply.objects.filter(post=post).all()
    replys_json = []
    for r in replys:
        post=ReplyModel(
            reply_id=r.id,
            content=r.content,
            user_name=r.user.user_name,
            user_icon=r.user.user_icon,
            created_at=r.created_at
        )
        replys_json.append(post)
    return replys_json

async def get_goodnum_by_postid(post_id:int)->int:
    post=await get_post_by_id(post_id)
    number=await post_model.Like.objects.filter(post=post).count()
    if(number):
        return number
    else:
        return 0