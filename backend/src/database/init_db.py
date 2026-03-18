import src.models.user_model as user_model
import src.models.dm_model as dm_model
import src.models.post_model as post_model
from itertools import combinations
from src.database.db import database,metadata,engine
from datetime import datetime

hashed_password="$argon2id$v=19$m=65536,t=3,p=4$VNw7qP5++in7fwvwnRCioQ$+A+9um/SzU2gtNNhnsVOz7V0bnmOsx7SZZQWmHb5FKk"
users_data = [
        {"user_id": 1, "user_name": "佐藤太郎", "user_pass":hashed_password,"icon_url": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", "status": "よろしくお願いします", "is_online": True, "is_verified": True},
        {"user_id": 2, "user_name": "田中花子", "user_pass":hashed_password, "icon_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", "status": "今日は良い天気ですね", "is_online": True, "is_verified": True},
        {"user_id": 3, "user_name": "鈴木一郎",  "user_pass":hashed_password,"icon_url": "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop", "status": "勉強中", "is_online": False, "is_verified": False},
        {"user_id": 4, "user_name": "高橋美咲",  "user_pass":hashed_password,"icon_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", "status": "コーヒー休憩中", "is_online": True, "is_verified": True},
        {"user_id": 5, "user_name": "伊藤健太", "user_pass":hashed_password, "icon_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", "status": "会議中", "is_online": False, "is_verified": False},
]

posts_data = [
        {"post_id": 1, "user_id": 1, "title": "掲示板へようこそ！", "content": "みなさん、こんにちは！この掲示板では自由に議論や情報交換ができます。気軽に投稿してくださいね。ありがとうございます！", "category": "お知らせ","replies": 15, "likes": 32},
        {"post_id": 2, "user_id": 2, "title": "おすすめのカフェを教えてください", "content": "最近引っ越してきたばかりで、近所の良いカフェを探しています。Wi-Fiがあって静かに作業できる場所があれば教えてください!嬉しいです。", "category": "雑談",  "replies": 8, "likes": 12},
        {"post_id": 3, "user_id": 3, "title": "プログラミング学習について", "content": "初心者におすすめのプログラミング言語は何ですか？PythonとJavaScriptで迷っています。", "category": "技術",  "replies": 23, "likes": 45},
        {"post_id": 4, "user_id": 4, "title": "【注意】新型ウイルスに関する重要情報", "content": "政府が隠している情報らしいですが、新型ウイルスは100%人工的に作られたものだそうです。マスコミは報道しないみたいですが、拡散希望します！", "category": "お知らせ", "replies": 3, "likes": 2},
        {"post_id": 5, "user_id": 5, "title": "週末のイベント情報", "content": "今週末に開催される面白いイベントがあったら共有しましょう！私は美術館の展示会に行く予定です。楽しみです！", "category": "イベント", "replies": 5, "likes": 8},
]

replies_data = [
    {"id": 1, "post_id": 2, "user_id": 4, "content": "駅前の「カフェ・モーニング」がおすすめです!Wi-Fi完備で、コーヒーも美味しいですよ。素晴らしいお店です。"},
    {"id": 2, "post_id": 3, "user_id": 1, "content": "私も「カフェ・モーニング」によく行きます。落ち着いた雰囲気で作業に集中できますね。"},
    {"id": 3, "post_id": 3, "user_id": 2, "content": "初心者ならPythonがおすすめです!文法がわかりやすくて、学習リソースも豊富です。"},
    {"id": 4, "post_id": 3, "user_id": 3, "content": "こんなことも分からないの？使えないな。Pythonなんて無能でも分かるだろ。"},
    {"id": 5, "post_id": 4, "user_id": 1, "content": "その情報のソースはどこでしょうか？公式な情報源を確認することをおすすめします。"},
]

messages_data = [
        {"id": 1, "user1_id": 2,"user2_id": 3,"content": "こんにちは！先日の投稿、とても参考になりました。", "timestamp": datetime(2026, 3, 13, 10, 30), "is_read": True},
        {"id": 2, "user1_id": 1,"user2_id": 4, "content": "ありがとうございます！お役に立てて嬉しいです。", "timestamp": datetime(2026, 3, 13, 10, 35), "is_read": True},
        {"id": 3, "user1_id": 2,"user2_id": 5,  "content": "また何か情報があったら教えてくださいね！", "timestamp": datetime(2026, 3, 13, 10, 40), "is_read": True},
        {"id": 4, "user1_id": 4,"user2_id": 2,  "content": "週末のイベント、一緒に行きませんか？", "timestamp": datetime(2026, 3, 14, 15, 20), "is_read": False},
        {"id": 5, "user1_id": 3,"user2_id": 1,  "content": "プログラミングの学習方法について、もう少し詳しく教えていただけますか？", "timestamp": datetime(2026, 3, 14, 9, 15), "is_read": False},
]

def get_room_by_ids(rooms_dict,uid1, uid2):
    key = tuple(sorted([uid1, uid2]))
    return rooms_dict.get(key, None)


async def init_db():
    print("初期データ挿入開始")
    user_objs = {}
    for u in users_data:
        user = await user_model.User.objects.get_or_none(user_id=u["user_id"])
        if not user:
            user = await user_model.User.objects.create(**u)
        user_objs[u["user_id"]] = user
    
    post_objs = {}
    for p in posts_data:
        post = await post_model.Post.objects.get_or_none(post_id=p["post_id"])
        if not post:
            user = user_objs[p["user_id"]]  # user_objsから実際のUserオブジェクトを取得
            post = await post_model.Post.objects.create(
                post_id=p["post_id"],
                user=user,
                title=p["title"],
                content=p["content"],
                category=p["category"],
                replies=p["replies"],
                likes=p["likes"]
            )
        post_objs[p["post_id"]] = post
    
    for r in replies_data:
        reply = await post_model.Reply.objects.get_or_none(id=r["id"])
        if not reply:
            post = post_objs[r["post_id"]]
            user = user_objs[r["user_id"]]
            reply = await post_model.Reply.objects.create(
                id=r["id"],
                post=post,
                user=user,
                content=r["content"],
            )
    
    #ユーザー同士のルーム作成
    rooms_dict = {}  # key=(id1,id2), value=room_name

    # 2人組の組み合わせでルーム作成
    for user1, user2 in combinations(users_data, 2):
        uid1, uid2 = sorted([user1["user_id"], user2["user_id"]])
        room_name = f"{uid1}_{uid2}_room"
        room = await dm_model.TalkRoom.objects.create(room_name=room_name)
        await dm_model.RoomMember.objects.create(user=user_objs[user1["user_id"]], room=room)
        await dm_model.RoomMember.objects.create(user=user_objs[user2["user_id"]], room=room)
        rooms_dict[(uid1, uid2)]=room
    
    for m in messages_data:
        message = await dm_model.Message.objects.get_or_none(id=m["id"])
        if not message:
            user = user_objs[m["user1_id"]]
            # 送信者と受信者のIDを取得
            user2_id = m["user2_id"]      
            room = get_room_by_ids(rooms_dict,m["user1_id"],user2_id)
            if room:
                message = await dm_model.Message.objects.create(
                    room=room,
                    user=user,
                    content=m["content"],
                    created_at=m['timestamp'],
                    is_read=m["is_read"]
                )
    
print("初期データ挿入完了!!")
        
    
    
    
    