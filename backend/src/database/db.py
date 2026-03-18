
#ゲストユーザーの作成

import sqlalchemy
from ormar import DatabaseConnection
import os
#これがないと最近は読み取れない
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
print("データベースURL:", DATABASE_URL)
metadata = sqlalchemy.MetaData()
database=DatabaseConnection(DATABASE_URL)
engine = sqlalchemy.create_engine(DATABASE_URL.replace("+asyncpg", ""))
