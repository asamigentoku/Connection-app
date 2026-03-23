# ポジティブ
positive_words = [
    "ありがとう", "感謝", "嬉しい", "楽しい", "素晴らしい", "最高", "良い", "いいね",
    "助かる", "素敵", "おめでとう", "よかった"
]

# ネガティブ
negative_words = [
    "悲しい", "辛い", "苦しい", "困る", "心配", "不安", "残念"
]

# 怒り
angry_words = [
    "腹立つ", "むかつく", "許せない", "ふざけるな", "いい加減"
]

def get_emotion_by_text(content)->str:
    for word in positive_words:
        if word in content:
            return "positive"

    for word in angry_words:
        if word in content:
            return "angry"

    for word in negative_words:
        if word in content:
            return "negative"

    return "neutral"