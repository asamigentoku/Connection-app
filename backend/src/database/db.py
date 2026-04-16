
#ゲストユーザーの作成

import sqlalchemy
from ormar import DatabaseConnection
import os
#これがないと最近は読み取れない
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine

load_dotenv()

test = os.getenv("Test", "false").lower() == "true"

if test:
    DATABASE_URL = os.getenv("DATABASE_URL")
else:
    DATABASE_URL = os.getenv("SUPABASE_URL")

print("データベースURL:", DATABASE_URL)
print("テストモード:", test)


metadata = sqlalchemy.MetaData()
database=DatabaseConnection(DATABASE_URL)
if test:
    engine = sqlalchemy.create_engine(DATABASE_URL.replace("+asyncpg", ""))
else:
    engine =create_async_engine(DATABASE_URL)
