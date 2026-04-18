from fastapi import APIRouter,Depends,HTTPException
import src.cruds.friend_cruds as friend_cruds
router=APIRouter(tags=["friends"],prefix="/friends")
from src.schemas.main_schemas import *
from src.schemas.user_schemas import *

#フレンド作成
@router.post("/make_friends",response_model=ResponseSchema)
async def create_friends(user_id:int,friends_id:int):
    try:
        friends=await friend_cruds.make_friends(user_id,friends_id)
        if friends:
            return ResponseSchema(message="registered")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ユーザーの登録に失敗しました: {str(e)}")


#フレンド削除
@router.delete("/delete_friends",response_model=ResponseSchema)
async def delete_friends(user_id:int,friends_id:int):
    try:
        friends=await friend_cruds.delete_friends(user_id,friends_id)
        if friends:
            return ResponseSchema(message="deleted")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ユーザーの削除に失敗しました: {str(e)}")

#ユーザーから自動的にfriendを一覧を取得
@router.get("/friends_list/{user_id}",response_model=list[UserResponse])
async def get_friends_list(user_id:int):
    try:
        friends_list=await friend_cruds.get_friends_list(user_id)
        return friends_list
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ユーザーのフレンドリストの取得に失敗しました: {str(e)}")

#ユーザーをブロック

#ユーザーのブロックを解除

#ユーザーからブロックリスト一覧を取得