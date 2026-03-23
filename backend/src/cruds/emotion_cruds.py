import src.cruds.post_cruds as post_cruds
import src.cruds.dm_cruds as dm_cruds
import src.analysis.emotion_check as emotion_check

async def get_emotion_by_post_id(post_id:int):
    post=await post_cruds.get_post_by_id(post_id)
    return emotion_check.get_emotion_by_text(post.content)

async def get_emotion_by_message_id(message_id:int):
    message=await dm_cruds.get_message_by_id(message_id)
    return emotion_check.get_emotion_by_text(message.content)


