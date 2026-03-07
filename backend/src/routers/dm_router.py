from fastapi import APIRouter,Depends
from src.login_jwt.create_jwt import get_current_active_user
from typing import Annotated
router=APIRouter(tags=["Home"],prefix="private",dependencies=Depends(get_current_active_user))
##ここのルーターでは認証している人のみ実行される
###ユーザーが入っているroom一覧を取得
###(tokenからユーザーID)->ルームID,ルーム名
@router.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User,Depends(get_current_active_user)],):


###特定のroomの中身を開く->そのルームIDのメッセージを読み込む->メッセージ順に読み込む
###ルーム名->list[コンテンツ,ユーザー名、時間,メッセージID、ユーザーアイコン]

###送信
###(tokenからユーザーID)、ルームID,コンテンツ->Null

##送信取り消し
###(メッセージID)->Null

#メッセージを編集
###(メッセージID)、コンテンツ、(tokenからユーザーID)->Null


