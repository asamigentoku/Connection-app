category_keywords = {
    "お知らせ": ["お知らせ", "重要", "通知", "告知", "アップデート"],
    "雑談": ["雑談", "ひま", "話そう", "つぶやき"],
    "技術": ["Python", "JavaScript", "エラー", "バグ", "開発", "プログラム", "API"],
    "イベント": ["イベント", "開催", "参加", "募集", "フェス", "大会"],
    "健康": ["健康", "運動", "筋トレ", "睡眠", "食事", "ダイエット"]
}
def post_classify(content:str):
    for category, keywords in category_keywords.items():
        for word in keywords:
            if word in content:
                return category
    return "様々"