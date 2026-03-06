from pydantic import BaseModel,Field

class User_Registration_Schema(BaseModel):
    user_name:str=Field(...,description="名前を入力してください1文字は必要です",
    example="山田太郎",min_length=1)
    
    user_pass:str=Field(default="",                          
                          description="パスワード",
                          example="yamada")

class User_Information_Schema(User_Registration_Schema):
    user_id:int=Field(...,
                      description="ユーザーを一意に識別する番号 データベースで自動的に割り当てられます",
                    example=123)

class ResponseSchema(BaseModel):
    message:str=Field(...,
                      description="API操作の結果を説明するメッセージ",
                      example="メモの更新に成功しました")

