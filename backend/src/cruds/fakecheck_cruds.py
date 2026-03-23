
import src.cruds.post_cruds as post_cruds
import src.analysis.fake_check as fake_check

async def fake_check_by_post_id(post_id:int):
    post=await post_cruds.get_post_by_id(post_id)
    return fake_check.fake_check_by_content(post.content)
