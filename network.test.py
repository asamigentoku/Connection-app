import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
import ssl

DATABASE_URL = "postgresql+asyncpg://postgres:password@db.oslmcvghggsgdssjtqed.supabase.co:5432/postgres"

# SSL 設定
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

# エンジン作成
engine = create_async_engine(
    DATABASE_URL,
    connect_args={"ssl": ssl_context}  # family は削除
)

async def test_connection():
    try:
        async with engine.connect() as conn:
            result = await conn.execute("SELECT NOW();")
            row = await result.fetchone()
            print("DB接続成功:", row)
    except Exception as e:
        print("接続失敗:", e)

asyncio.run(test_connection())
