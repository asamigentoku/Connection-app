
import src.cruds.post_cruds as post_cruds

fake_news_dict = {
    "suspicious_words": {
        "words": ["拡散希望", "絶対に見て", "今すぐシェア"],
        "weight": 2
    },
    "source_unreliable": {
        "words": ["匿名情報", "噂では", "未確認情報"],
        "weight": 3
    },
    "exaggeration": {
        "words": ["100%", "絶対", "確実に"],
        "weight": 1
    }
}

def fake_check_by_content(content:str):
    score = 0
    for category in fake_news_dict.values():
        for word in category["words"]:
            if word in content:
                score += category["weight"]
    return score

async def fake_check_by_post_id(post_id:int):
    post=await post_cruds.get_post_by_id(post_id)
    return fake_check_by_content(post.content)
