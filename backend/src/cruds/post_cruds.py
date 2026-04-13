from src.schemas.post_schemas import *
from typing import Optional
import src.models.post_model as post_model
import src.cruds.process as process
import src.analysis.post_category as post_category

#全てのポストを取得
async def get_all_posts()->Optional[list[post_model.Post]]:
    posts=await post_model.Post.objects.all()
    return posts

async def get_all_posts_information()->Optional[list[Get_Reply_PostModel]]:
    posts =await post_model.Post.objects.select_related("user").all()
    posts_json = []
    for p in posts:
        post=Get_Reply_PostModel(
            content=p.content,
            title=p.title,
            post_id=p.post_id,
            user_id=p.user.user_id,
            user_name=p.user.user_name,
            user_icon=p.user.icon_url,
            created_at=p.created_at,
            category=p.category,
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
    replys=await post_model.Reply.objects.filter(post=post).select_related("user").all()
    replys_json = []
    for r in replys:
        post=ReplyModel(
            reply_id=r.id,
            content=r.content,
            user_name=r.user.user_name,
            user_icon=r.user.icon_url,
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

async def create_post(post:Create_PostModel,user_id:int):
    user=await process.get_user_by_id(user_id)
    await post_model.Post.objects.create(content=post.content,title=post.title,user=user)
    return

async def create_post_with_post(post:Create_PostModel,images:list[PostImage],user_id:int):
    user=await process.get_user_by_id(user_id)
    #ここでカテゴリーを自動作成したい
    category=post_category.post_classify(post.content)
    new_post=await post_model.Post.objects.create(content=post.content,title=post.title,user=user,category=category)
    for image in images:
        await post_model.PostImage.objects.create(image_url=image.image_url,post=new_post)
    return

async def update_post(post:PostModel,user_id:int):
    existing_post=await get_post_by_id(post.post_id)
    if existing_post and existing_post.user.user_id==user_id:
        existing_post.title=post.title
        existing_post.content=post.content
        await existing_post.update()
    return

async def delete_post(post_id:int,user_id:int):
    existing_post=await get_post_by_id(post_id)
    if existing_post and existing_post.user.user_id==user_id:
        await existing_post.delete()
    return

async def manege_like(post_id:int,user_id:int):
    post=await get_post_by_id(post_id)
    user=await process.get_user_by_id(user_id)
    existing_like=await post_model.Like.objects.filter(post=post,user=user).get_or_none()
    if existing_like:
        await existing_like.delete()
    else:
        await post_model.Like.objects.create(post=post,user=user)
    return