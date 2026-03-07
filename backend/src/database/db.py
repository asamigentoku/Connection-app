
#ゲストユーザーの作成

import sqlalchemy
from ormar import DatabaseConnection
import os

DATABASE_URL = os.getenv("DATABASE_URL")
metadata = sqlalchemy.MetaData()
database=DatabaseConnection(DATABASE_URL)
engine = sqlalchemy.create_engine(DATABASE_URL.replace("+asyncpg", ""))

