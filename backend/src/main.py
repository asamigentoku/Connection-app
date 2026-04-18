import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.user_router import  router as user_router
from src.routers.jwt_router import router as jwt_router
from src.routers.post_router import router as post_router
from src.routers.dm_router import router as dm_router
from src.routers.emotin_router import router as emotion_router
from src.websocket.web_socker_router import router as websocket_router
from src.routers.harassment_router import router as harassment_router
from src.routers.fakecheck_router import router as fakecheck_router
from src.routers.friend_router import router as friend_router
from src.database.db import database, metadata,engine
from contextlib import asynccontextmanager
from sqlalchemy import text
import yaml
from src.database.init_db import init_db
from dotenv import load_dotenv
load_dotenv()

test = os.getenv("Test", "false").lower() == "true"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    if not database.is_connected:
        await database.connect()
        if test:
            if engine is not None:
                with engine.connect() as conn:
                    conn.execute(text("DROP SCHEMA public CASCADE"))
                    conn.execute(text("CREATE SCHEMA public"))
                    conn.commit()
                metadata.create_all(engine)
        else:
            async with engine.begin() as conn:
                await conn.run_sync(metadata.create_all)
        await init_db()
    yield

    # shutdown
    if database.is_connected:
        await database.disconnect()

app = FastAPI(lifespan=lifespan)

load_dotenv(".env")

# 環境変数を利用する
FRONTEND_URL=os.getenv('FRONTEND_URL')
print(f"フロントURL{FRONTEND_URL}")

#CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router)
app.include_router(jwt_router)
app.include_router(post_router)
app.include_router(dm_router)
app.include_router(emotion_router)
app.include_router(harassment_router)
app.include_router(fakecheck_router)
app.include_router(websocket_router)
app.include_router(friend_router)
from fastapi.responses import JSONResponse
from pydantic import ValidationError
@app.exception_handler(ValidationError)
async def validation_exception_handler(exc:ValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "detail":exc.errors(),
            "body":exc.model
        }
    )
    

with open("openapi.yaml","w") as f:
    yaml.dump(app.openapi(), f)