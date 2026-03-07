from functools import lru_cache
from pathlib import Path
import os
#DBファイルの作成、まずこのファイル自体のパスを取得
DATABASE_URL = os.getenv("DATABASE_URL")
from pydantic import BaseSettings

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent.parent

class Settings(BaseSettings):
    base_dir: Path = BASE_DIR
    db_url=DATABASE_URL 


@lru_cache
def get_settings():
    return Settings()