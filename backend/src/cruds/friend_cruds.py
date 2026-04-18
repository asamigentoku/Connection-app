from fastapi import HTTPException
import src.models.user_model as user_model
import src.cruds.process as process
from src.schemas.user_schemas import *
async def search_friends(user_id:int,friend_id:int):
    user=await process.get_user_by_id(user_id)
    friend=await process.get_user_by_id(friend_id)
    friends_pattern1 =await user_model.Friends.objects.filter(user1=user, user2=friend).select_related(["user1", "user2"]).first_or_none()
    friends_pattern2=await user_model.Friends.objects.filter(user1=friend, user2=user).select_related(["user1", "user2"]).first_or_none()
    if friends_pattern1:
        return  friends_pattern1
    elif friends_pattern2:
        return  friends_pattern2
    else:
        return None

async def make_friends(user_id:int,friend_id:int):
    user=await process.get_user_by_id(user_id)
    friend=await process.get_user_by_id(friend_id)
    if user_id < friend_id:
        user1 = user
        user2 = friend
    else:
        user1 = friend
        user2 = user
    existing=await search_friends(user_id,friend_id)
    if existing:
        return existing
    friends=await user_model.Friends.objects.create(user1=user1,user2=user2)
    return friends

async def delete_friends(user_id:int,friend_id:int):
    user=await process.get_user_by_id(user_id)
    friend=await process.get_user_by_id(friend_id)
    friends=await user_model.Friends.objects.create(user,friend)
    if friends:
        await friends.delete()
        return True
    else:
        return False


async def get_friends_list(user_id: int):
    try:
        user = await process.get_user_by_id(user_id)
        if not user:
            return []
        # 友達関係を取得（user1 または user2 が user のもの）
        friends_relations_1 = await user_model.Friends.objects.select_related(["user1", "user2"]).filter(user1=user).all()

        friends_relations_2 = await user_model.Friends.objects.select_related(["user1", "user2"]).filter(user2=user).all()

        friends = []
        for relation in friends_relations_1:
            friends.append(relation.user2)
        for relation in friends_relations_2:
            friends.append(relation.user1)
        return [UserResponse(**friend.model_dump()) for friend in friends]
    except Exception as e:
        # ログに元のエラーを出力しつつ、ユーザーには500エラーを返す
        print(f"Database Error: {e}")
        raise HTTPException(
            status_code=500,
            detail="データベースクエリの実行中にエラーが発生しました。"
        )


