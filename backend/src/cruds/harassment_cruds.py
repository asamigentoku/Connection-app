import src.cruds.post_cruds as post_cruds
import src.analysis.harassment_check as harassment_check

async def harassment_check_by_post_id(post_id:int):
    post=await post_cruds.get_post_by_id(post_id)
    return harassment_check.harassment_check_by_text(post.content)