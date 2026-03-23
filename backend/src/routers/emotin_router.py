from fastapi import APIRouter,Depends,HTTPException
router=APIRouter(tags=["emotion"],prefix="/emotion")
import src.cruds.emotion_cruds as emotion_cruds
#post_id->emotion
# switch (sentiment) {
#     case "positive":
# return "😊 ポジティブ";
# case "negative":
# return "😢 ネガティブ";
# case "angry":
# return "😠 怒り";
# default:
# return "😐 中立";
# }

@router.post("get_emotion_by_post",response_model=str)
async def get_emotion_by_post(post_id:int):
    emotion=await emotion_cruds.get_emotion_by_post_id(post_id)
    return emotion

@router.post("get_emotion_by_message",response_model=str)
async def get_emotion_by_message(message_id:int):
    emotion=await emotion_cruds.get_emotion_by_message_id(message_id)
    return emotion


