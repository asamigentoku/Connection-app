from fastapi import APIRouter,Depends,HTTPException
from pydantic import ValidationError
from uvicorn import logging

from src.login_jwt.create_jwt import get_current_active_user
from src.schemas.user_schemas import *
from src.schemas.main_schemas import *
from src.schemas.dm_schemas import *
import src.cruds.dm_cruds as dm_cruds
from typing import Annotated
router=APIRouter(tags=["DM"],prefix="/talk",dependencies=[Depends(get_current_active_user)])

#トークを始める、トークルームを作る
@router.post("/create_room",response_model=ResponseSchema)
async def create_room(room:CreateRoom):
    try:
        await dm_cruds.create_room(room)
        return ResponseSchema(message="room created")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ルームの作成に失敗しました: {str(e)}")

#トークルームにメンバーを追加
@router.post("/add_room_member",response_model=ResponseSchema)
async def add_room_member(newmember:AddRoomMember):
    try:
        await dm_cruds.add_room_member(newmember)
        return ResponseSchema(message="member added")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ルームへのメンバーの追加に失敗しました: {str(e)}")

#できれば、リストでも
@router.get("/friend_information/{room_id}",response_model=UserResponse)
async def read_room(room_id:int,current_user: Annotated[UserResponse,Depends(get_current_active_user)]):
    try:
        information=await dm_cruds.get_friend_info_by_room(room_id,current_user)
        return information
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ルームの読み込みに失敗しました {str(e)}")
    #ルームメンバーの取得
#->現在の区レントユーザーじゃなもの
#それの友達スキーマを返す

@router.post("/search_make_users_room",response_model=RoomBase)
async def search_room(user1_id:int,user2_id:int):
    try:
        rooms=await dm_cruds.get_rooms_by_users(user1_id, user2_id)
        if rooms:
            room=rooms[0]
            print(f"room.model_dump(): {room.model_dump()}")
            print(f"RoomBaseのフィールド: {RoomBase.model_fields.keys()}")  # ← フィールド確認
            try:
                # room_base = RoomBase(**room.model_dump())
                room_base = RoomBase(**room.model_dump(exclude={'messages', 'roommembers'}))
            except ValidationError as e:
                logging.error(f"ValidationError: {e.errors()}")  # ターミナルに出力
                print(f"ValidationError: {e.errors()}")           # printでも可
                raise HTTPException(status_code=422, detail=e.errors())
            print(room_base)

            return room_base
        else:
            room=await dm_cruds.create_room(user1_id, user2_id)
            # room_base=RoomBase(**room.model_dump())
            room_base = RoomBase(**room.model_dump(exclude={'messages', 'roommembers'}))
            print(room_base)
            return room_base

    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ルームの読み込みに失敗しました {str(e)}")

#ユーザーのルームを取得
@router.get("/user_rooms",response_model=list[RoomBase])
async def get_rooms_by_user(
    current_user: Annotated[UserResponse,Depends(get_current_active_user)]):
    try:
        rooms=await dm_cruds.get_rooms_by_userid(current_user.user_id)
        #現在のスキーマを変換
        #ここの変換でエラーが起きてる
        rooms_base=[RoomBase(**r.model_dump()) for r in rooms]
        #ここでラストメッセージと、その時刻を読み込みたい
        return rooms_base
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ユーザーのルーム一覧の読み込みに失敗しました {str(e)}")   

###特定のルームのメッセージを読み込む
@router.get("/user_information/{room_id}",response_model=list[GetMessage])
async def read_room(room_id:int):
    try:
        informations=await dm_cruds.get_room_information_by_id(room_id)
        return informations
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"ルームの読み込みに失敗しました {str(e)}")  


###メッセージを送信
@router.post("/message_submit",response_model=ResponseSchema)
async def submit_message(message:SubmitMessage,
    current_user: Annotated[UserResponse,Depends(get_current_active_user)]):
    try:
        await dm_cruds.register_messages(message,current_user.user_id)
        return ResponseSchema(message="messege registered")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"メッセージの送信に失敗しました: {str(e)}")

##送信取り消し
@router.delete("/message_delete/{message_id}",response_model=ResponseSchema)
async def delete_message(message_id:int):
    try:
        await dm_cruds.delete_message(message_id)
        return ResponseSchema(message="messege deleted")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"メッセージの送信取り消しに失敗しました: {str(e)}")

#メッセージを編集
@router.put("/message_update",response_model=ResponseSchema)
async def update(message:UpdateMessage):
    try:
        await dm_cruds.update_message(message.id,message.content)
        return ResponseSchema(message="messege updated")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"メッセージの更新に失敗しました: {str(e)}")
    


