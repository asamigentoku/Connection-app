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
    print(score)
    return score