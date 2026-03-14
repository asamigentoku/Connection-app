from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.user_router import  router as user_router
from src.routers.jwt_router import router as jwt_router
from src.routers.post_router import router as post_router
from src.routers.dm_router import router as dm_router
from src.database.db import database, metadata,engine
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):

    # startup
    if not database.is_connected:
        await database.connect()
        metadata.create_all(engine)

    yield

    # shutdown
    if database.is_connected:
        await database.disconnect()

app = FastAPI(lifespan=lifespan)

#環境変数読み込み
import os
from dotenv import load_dotenv
# .envファイルのパスを指定して読み込む
load_dotenv('.env')
# 環境変数を利用する
FRONTEND_URL=os.getenv('FRONTEND_URL')

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
    
import yaml
with open("openapi.yaml","w") as f:
    yaml.dump(app.openapi(), f)