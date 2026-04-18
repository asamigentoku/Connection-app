import src.models.user_model as user_model
import src.models.dm_model as dm_model
import src.models.post_model as post_model
from itertools import combinations
import  src.cruds.friend_cruds as friend_cruds
from src.database.db import database, metadata, engine
from datetime import datetime

hashed_password = "$argon2id$v=19$m=65536,t=3,p=4$VNw7qP5++in7fwvwnRCioQ$+A+9um/SzU2gtNNhnsVOz7V0bnmOsx7SZZQWmHb5FKk"

users_data = [
    {"user_id": 1, "user_name": "佐藤太郎", "user_pass": hashed_password, "icon_url": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", "status": "よろしくお願いします", "is_online": True, "is_verified": True},
    {"user_id": 2, "user_name": "田中花子", "user_pass": hashed_password, "icon_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", "status": "今日は良い天気ですね", "is_online": True, "is_verified": True},
    {"user_id": 3, "user_name": "鈴木一郎", "user_pass": hashed_password, "icon_url": "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop", "status": "勉強中", "is_online": False, "is_verified": False},
    {"user_id": 4, "user_name": "高橋美咲", "user_pass": hashed_password, "icon_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", "status": "コーヒー休憩中", "is_online": True, "is_verified": True},
    {"user_id": 5, "user_name": "伊藤健太", "user_pass": hashed_password, "icon_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", "status": "会議中", "is_online": False, "is_verified": False},
]

posts_data = [
    {"user_id": 1, "title": "掲示板へようこそ！", "content": "みなさん、こんにちは！この掲示板では自由に議論や情報交換ができます。気軽に投稿してくださいね。ありがとうございます！", "category": "お知らせ", "replies": 15, "likes": 32},
    {"user_id": 2, "title": "おすすめのカフェを教えてください", "content": "最近引っ越してきたばかりで、近所の良いカフェを探しています。Wi-Fiがあって静かに作業できる場所があれば教えてください!嬉しいです。", "category": "雑談", "replies": 8, "likes": 12},
    {"user_id": 3, "title": "プログラミング学習について", "content": "初心者におすすめのプログラミング言語は何ですか？PythonとJavaScriptで迷っています。", "category": "技術", "replies": 23, "likes": 45},
    {"user_id": 4, "title": "【注意】新型ウイルスに関する重要情報", "content": "政府が隠している情報らしいですが、新型ウイルスは100%人工的に作られたものだそうです。マスコミは報道しないみたいですが、拡散希望します！", "category": "お知らせ", "replies": 3, "likes": 2},
    {"user_id": 5, "title": "週末のイベント情報", "content": "今週末に開催される面白いイベントがあったら共有しましょう！私は美術館の展示会に行く予定です。楽しみです！", "category": "イベント", "replies": 5, "likes": 8},
]

replies_data = [
    {"id": 1, "post_id": 2, "user_id": 4, "content": "駅前の「カフェ・モーニング」がおすすめです!Wi-Fi完備で、コーヒーも美味しいですよ。素晴らしいお店です。"},
    {"id": 2, "post_id": 3, "user_id": 1, "content": "私も「カフェ・モーニング」によく行きます。落ち着いた雰囲気で作業に集中できますね。"},
    {"id": 3, "post_id": 3, "user_id": 2, "content": "初心者ならPythonがおすすめです!文法がわかりやすくて、学習リソースも豊富です。"},
    {"id": 4, "post_id": 3, "user_id": 3, "content": "こんなことも分からないの？使えないな。Pythonなんて無能でも分かるだろ。"},
    {"id": 5, "post_id": 4, "user_id": 1, "content": "その情報のソースはどこでしょうか？公式な情報源を確認することをおすすめします。"},
]

messages_data = [
    {"id": 1,  "user1_id": 2, "user2_id": 3, "content": "こんにちは！先日の投稿、とても参考になりました。",           "timestamp": datetime(2026, 3, 13, 10, 30), "is_read": True},
    {"id": 2,  "user1_id": 1, "user2_id": 4, "content": "ありがとうございます！お役に立てて嬉しいです。",             "timestamp": datetime(2026, 3, 13, 10, 35), "is_read": True},
    {"id": 3,  "user1_id": 2, "user2_id": 5, "content": "また何か情報があったら教えてくださいね！",                   "timestamp": datetime(2026, 3, 13, 10, 40), "is_read": True},
    {"id": 4,  "user1_id": 4, "user2_id": 2, "content": "週末のイベント、一緒に行きませんか？",                       "timestamp": datetime(2026, 3, 14, 15, 20), "is_read": False},
    {"id": 5,  "user1_id": 3, "user2_id": 1, "content": "プログラミングの学習方法について、もう少し詳しく教えていただけますか？", "timestamp": datetime(2026, 3, 14,  9, 15), "is_read": False},
    {"id": 6,  "user1_id": 2, "user2_id": 3, "content": "昨日の資料、もう一度送ってもらえますか？",                   "timestamp": datetime(2026, 3, 15, 11,  5), "is_read": True},
    {"id": 7,  "user1_id": 3, "user2_id": 2, "content": "もちろんです！今送りますね。",                               "timestamp": datetime(2026, 3, 15, 11,  7), "is_read": True},
    {"id": 8,  "user1_id": 1, "user2_id": 5, "content": "最近どう？開発進んでる？",                                   "timestamp": datetime(2026, 3, 15, 18, 22), "is_read": False},
    {"id": 9,  "user1_id": 5, "user2_id": 1, "content": "ちょっと詰まってるけど頑張ってる！",                         "timestamp": datetime(2026, 3, 15, 18, 25), "is_read": False},
    {"id": 10, "user1_id": 4, "user2_id": 1, "content": "明日のミーティング何時からでしたっけ？",                     "timestamp": datetime(2026, 3, 16,  8, 10), "is_read": True},
    {"id": 11, "user1_id": 1, "user2_id": 4, "content": "10時からですよ！",                                           "timestamp": datetime(2026, 3, 16,  8, 12), "is_read": True},
    {"id": 12, "user1_id": 2, "user2_id": 4, "content": "資料の修正終わりました！確認お願いします。",                 "timestamp": datetime(2026, 3, 16, 14, 30), "is_read": False},
    {"id": 13, "user1_id": 4, "user2_id": 2, "content": "確認しました、問題なさそうです！",                           "timestamp": datetime(2026, 3, 16, 15, 10), "is_read": False},
    {"id": 14, "user1_id": 3, "user2_id": 5, "content": "おすすめの勉強サイトありますか？",                           "timestamp": datetime(2026, 3, 17,  9, 45), "is_read": True},
    {"id": 15, "user1_id": 5, "user2_id": 3, "content": "Progateとかいいですよ！",                                    "timestamp": datetime(2026, 3, 17,  9, 50), "is_read": True},
    {"id": 16, "user1_id": 1, "user2_id": 2, "content": "今日の進捗どうですか？",                                     "timestamp": datetime(2026, 3, 18, 17,  5), "is_read": False},
    {"id": 17, "user1_id": 2, "user2_id": 1, "content": "API周りは終わりました！",                                    "timestamp": datetime(2026, 3, 18, 17, 20), "is_read": False},
    {"id": 18, "user1_id": 3, "user2_id": 4, "content": "今週末空いてます？",                                         "timestamp": datetime(2026, 3, 19, 20, 10), "is_read": True},
    {"id": 19, "user1_id": 4, "user2_id": 3, "content": "空いてます！どこ行きます？",                                 "timestamp": datetime(2026, 3, 19, 20, 15), "is_read": True},
    {"id": 20, "user1_id": 3, "user2_id": 4, "content": "カフェ巡りとかどうですか？",                                 "timestamp": datetime(2026, 3, 19, 20, 18), "is_read": True},
    {"id": 21, "user1_id": 5, "user2_id": 2, "content": "デザインちょっと変えてみました！",                           "timestamp": datetime(2026, 3, 20, 13, 30), "is_read": False},
    {"id": 22, "user1_id": 2, "user2_id": 5, "content": "いい感じですね！",                                           "timestamp": datetime(2026, 3, 20, 13, 40), "is_read": False},
    {"id": 23, "user1_id": 1, "user2_id": 3, "content": "バグ見つけました…",                                          "timestamp": datetime(2026, 3, 21, 11,  2), "is_read": True},
    {"id": 24, "user1_id": 3, "user2_id": 1, "content": "どの部分ですか？",                                           "timestamp": datetime(2026, 3, 21, 11,  5), "is_read": True},
    {"id": 25, "user1_id": 1, "user2_id": 3, "content": "ログイン処理です",                                           "timestamp": datetime(2026, 3, 21, 11,  7), "is_read": True},
    {"id": 26, "user1_id": 4, "user2_id": 5, "content": "新しい機能どう思います？",                                   "timestamp": datetime(2026, 3, 22, 16, 10), "is_read": False},
    {"id": 27, "user1_id": 5, "user2_id": 4, "content": "かなり良いと思います！",                                     "timestamp": datetime(2026, 3, 22, 16, 20), "is_read": False},
    {"id": 28, "user1_id": 2, "user2_id": 1, "content": "ちょっと相談いいですか？",                                   "timestamp": datetime(2026, 3, 23, 10,  0), "is_read": True},
    {"id": 29, "user1_id": 1, "user2_id": 2, "content": "もちろんです！",                                             "timestamp": datetime(2026, 3, 23, 10,  2), "is_read": True},
    {"id": 30, "user1_id": 2, "user2_id": 1, "content": "DB設計で悩んでます",                                         "timestamp": datetime(2026, 3, 23, 10,  5), "is_read": True},
]

follows_data = [
    {"follower_id": 1, "following_id": 2},
    {"follower_id": 1, "following_id": 3},
    {"follower_id": 1, "following_id": 4},
    {"follower_id": 1, "following_id": 5},
    {"follower_id": 2, "following_id": 1},
    {"follower_id": 2, "following_id": 3},
    {"follower_id": 2, "following_id": 4},
    {"follower_id": 2, "following_id": 5},
    {"follower_id": 3, "following_id": 1},
    {"follower_id": 3, "following_id": 2},
    {"follower_id": 3, "following_id": 4},
    {"follower_id": 4, "following_id": 1},
    {"follower_id": 4, "following_id": 2},
    {"follower_id": 4, "following_id": 5},
    {"follower_id": 5, "following_id": 1},
    {"follower_id": 5, "following_id": 3},
    {"follower_id": 5, "following_id": 4},
]


def get_room_by_ids(rooms_dict, uid1, uid2):
    key = tuple(sorted([uid1, uid2]))
    return rooms_dict.get(key, None)


async def init_db():
    print("初期データ挿入開始")

    # ユーザー作成
    user_objs = {}
    for i, u in enumerate(users_data, start=1):
        user = await user_model.User.objects.get_or_none(user_name=u["user_name"])
        if not user:
            user = await user_model.User.objects.create(**u)
        user_objs[i] = user

    # 投稿作成
    post_objs = {}
    for i, p in enumerate(posts_data, start=1):
        user = user_objs[p["user_id"]]
        post = await post_model.Post.objects.create(
            user=user,
            title=p["title"],
            content=p["content"],
            category=p["category"],
            replies=p["replies"],
            likes=p["likes"],
        )
        post_objs[i] = post

    # 返信作成
    for r in replies_data:
        post = post_objs[r["post_id"]]
        user = user_objs[r["user_id"]]
        await post_model.Reply.objects.create(
            post=post,
            user=user,
            content=r["content"],
        )

    # ルーム作成
    rooms_dict = {}
    for user1, user2 in combinations(list(user_objs.items()), 2):
        uid1, uid2 = sorted([user1[0], user2[0]])
        room_name = f"{uid1}_{uid2}_room"
        room = await dm_model.TalkRoom.objects.create(room_name=room_name)
        await dm_model.RoomMember.objects.create(user=user1[1], room=room)
        await dm_model.RoomMember.objects.create(user=user2[1], room=room)
        rooms_dict[(uid1, uid2)] = room

    # メッセージ作成
    for m in messages_data:
        user = user_objs[m["user1_id"]]
        room = get_room_by_ids(rooms_dict, m["user1_id"], m["user2_id"])
        if room:
            await dm_model.Message.objects.create(
                room=room,
                user=user,
                content=m["content"],
                created_at=m["timestamp"],
                is_read=m["is_read"],
            )

    # 友達関係作成（インデントバグ修正済み）
    for f in follows_data:
        follower = user_objs[f["follower_id"]]
        following = user_objs[f["following_id"]]
        await friend_cruds.make_friends(follower.user_id, following.user_id)

    print("初期データ挿入完了!!")