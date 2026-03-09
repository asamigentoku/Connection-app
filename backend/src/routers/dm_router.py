from fastapi import APIRouter,Depends,HTTPException
from src.login_jwt.create_jwt import get_current_active_user
from src.schemas.user_schemas import *
from src.schemas.main_schemas import *
from backend.src.schemas.dm_schemas import *
import src.cruds.dm_cruds as dm_cruds
from typing import Annotated
router=APIRouter(tags=["Home"],prefix="talk",dependencies=Depends(get_current_active_user))
##ここのルーターでは認証している人のみ実行される
###ユーザーが入っているroom一覧を取得
###(tokenからユーザーID)->ルームID,ルーム名
@router.get("/user_rooms",response_model=list[RoomBase])
async def get_rooms_by_user(
    current_user: Annotated[UserResponse,Depends(get_current_active_user)]):
    try:   
        rooms=await dm_cruds.get_rooms_by_userid(current_user.user_id)
        #現在のスキーマを変換
        rooms_base=[RoomBase(**r.model_dump()) for r in rooms]
        return rooms_base
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ユーザーのルーム一覧の読み込みに失敗しました {str(e)}")   

###特定のroomの中身を開く->そのルームIDのメッセージを読み込む->メッセージ順に読み込む
@router.get("/user_information/{room_id}",response_model=list[GetMessage])
async def read_room(room_id:int):
    try:
        informations=await dm_cruds.get_room_information_by_id(room_id)
        return informations
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ルームの読み込みに失敗しました {str(e)}")  


###送信
###(tokenからユーザーID)、ルームID,コンテンツ->Null
@router.post("/message_submit",response_model=ResponseSchema)
async def submit_message(message:SubmitMessage,
    current_user: Annotated[UserResponse,Depends(get_current_active_user)]):
    try:
        await dm_cruds.register_messages(message,current_user.user_id)
        return ResponseSchema(message="messege registered")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"メッセージの送信に失敗しました: {str(e)}")

##送信取り消し
###(メッセージID)->Null
@router.delte("/message_delete/{message_id}",response_model=ResponseSchema)
async def delete_message(message_id:int):
    try:
        await dm_cruds.delete_message(message_id)
        return ResponseSchema(message="messege deleted")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"メッセージの送信取り消しに失敗しました: {str(e)}")

#メッセージを編集
###(メッセージID)、コンテンツ->Null
@router.put("/message_update",response_model=ResponseSchema)
async def update(message:UpdateMessage):
    try:
        await dm_cruds.update_message(message.id,message.content)
        return ResponseSchema(message="messege updated")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"メッセージの更新に失敗しました: {str(e)}")
    


