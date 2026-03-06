import os
import sqlalchemy
import ormar
from ormar import DatabaseConnection


#DBファイルの作成、まずこのファイル自体のパスを取得
DATABASE_URL = os.getenv("DATABASE_URL")

base_ormar_config = ormar.OrmarConfig(
    metadata=sqlalchemy.MetaData(),
    database=DatabaseConnection(DATABASE_URL),
)

print("データベース初期化")
#ゲストユーザーの作成
