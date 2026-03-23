moderation_dict = {
    "inappropriate": [
        "バカ", "馬鹿", "アホ", "死ね", "殺す", "クソ", "消えろ",
        "うざい", "キモい", "ダサい"
    ],
    "power": [
        "無能", "役立たず", "使えない", "能なし",
        "やめろ", "辞めろ", "クビ",
        "お前なんか", "こんなことも"
    ],
    "discriminatory": [
        "男のくせに", "女のくせに",
        "外国人", "障害者"
    ],
    "sexual_harassment": [
        "体触らせて", "触っていい？", "胸", "尻", "エロ",
        "セクシーすぎ", "やらせて", "ホテル行こう",
        "かわいいね（しつこい）", "スタイルいいね（しつこい）",
        "下着", "キスしよう"
    ]
}

def harassment_check_by_text(content:str):
    results = []

    for category, words in moderation_dict.items():
        for word in words:
            if word in content:
                results.append(category)
                break  # 同じカテゴリで複数ヒットしても1回だけ
    return results