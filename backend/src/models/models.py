from typing import Optional
import ormar
import sqlalchemy
from src.database.db import base_ormar_config


# Ormar の共通設定
base_ormar_config = ormar.OrmarConfig(
    metadata=sqlalchemy.MetaData(),
    database=ormar.DatabaseConnection(DATABASE_URL),
)

class User(ormar.Model):
    ormar_config = base_ormar_config.copy()
    user_id:int=ormar.Integer(primary_key=True,autoincrement=True)
    user_name: Optional[str] = ormar.String(max_length=100, nullable=True)
    user_pass: Optional[str] = ormar.String(max_length=100, nullable=True)