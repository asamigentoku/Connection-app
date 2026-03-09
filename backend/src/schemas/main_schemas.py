from pydantic import BaseModel,Field
class ResponseSchema(BaseModel):
    message:str=Field(...,
                      description="API操作の結果を説明するメッセージ",
                      example="メモの更新に成功しました")