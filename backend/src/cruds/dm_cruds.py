from typing import Optional
from backend.src.schemas.dm_schemas import *
import src.models.user_model as user_model
import src.models.dm_model as dm_model
import src.cruds.process as process
from fastapi import HTTPException
    #ユーザーIDからルーム名、ルームID

async def get_room_by_id(id:int)-> Optional[dm_model.TalkRoom]:
    return await dm_model.TalkRoom.objects.get_or_none(id=id)

async def get_members_by_user(user:user_model.User)->Optional[list[dm_model.RoomMember]]:
    members=await dm_model.RoomMember.objects.filter(user=user).all()
    if(members):
        
        return members
    else:
        return None


async def get_rooms_by_userid(id:int) -> Optional[list[dm_model.TalkRoom]]:
    user=await process.get_user_by_id(id)
    members=await get_members_by_user(user)
    rooms=[member.room for member in members]
    return rooms

async def get_message_by_roomid(id:int)->Optional[list[dm_model.Message]]:
    room=await get_room_by_id(id)
    messages=await dm_model.Message.objects.filter(room=room).all()
    return messages

async def get_message_by_id(id:int)-> Optional[dm_model.Message]:
    return await dm_model.Message.objects.get_or_none(id=id)

###特定のroomの中身を開く->そのルームIDのメッセージを読み込む->メッセージ順に読み込む
###ルーム名->list[コンテンツ,ユーザー名、時間,メッセージID、ユーザーアイコン]
async def get_room_information_by_id(id:int)->Optional[list[GetMessage]]:
    messages=await get_message_by_roomid(id)
    messages_json = []
    for m in messages:
        
        msg = GetMessage(
            id=m.id,
            content = m.content,
            room_id=id,
            user_id=m.user.user_id,
            user_icon = m.user.icon_url,
            created_at = m.created_at,
        )
        messages_json.append(msg)
    return messages_json

###送信
##メッセージ登録
async def register_messages(getmessage:SubmitMessage,user_id:int):
    user=await process.get_user_by_id(user_id)
    room=await get_room_by_id(getmessage.id)
    message = await dm_model.Message.objects.create(
        room=room,
        user=user,
        content=getmessage.content
    )
    return message

##送信取り消し
###(メッセージID)->Null
async def delete_message(message_id:int):
    message=await get_message_by_id(message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    await message.delete()
    return message

        
#メッセージを編集
###(メッセージID)、コンテンツ、(tokenからユーザーID)->Null
async def update_message(message_id:int,newcontent:str):
    message=await get_message_by_id(message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    message.content=newcontent
    await message.update()
    return message
    

