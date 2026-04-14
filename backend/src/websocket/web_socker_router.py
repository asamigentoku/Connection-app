import json
import jwt
from fastapi import APIRouter, HTTPException, Depends, Form, WebSocket, WebSocketDisconnect, Query
from typing import List,Annotated
from jwt import PyJWTError
import src.models.dm_model as dm_model
from src.cruds import process
from src.login_jwt.create_jwt import get_current_active_user, SECRET_KEY, ALGORITHM
from src.schemas.user_schemas import *
from src.schemas.dm_schemas import *
import src.cruds.dm_cruds as dm_cruds
router=APIRouter(tags=["websocket"],prefix="")


# 接続管理
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(
        websocket: WebSocket,
        room_id: int,
        token: str = Query(...)):
    # トークンを手動で検証
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_name = payload.get("sub")
        if user_name is None:
            await websocket.close(code=1008)
            return
        current_user = await process.get_user_by_name(user_name=user_name)
        if current_user is None:
            await websocket.close(code=1008)
            return
    except PyJWTError:
        await websocket.close(code=1008)
        return
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # ormarでDBに保存
            print(f"data{data}")
            data= json.loads(data)
            submit=SubmitMessage(
                content=data["content"],
                room_id=room_id
            )
            await dm_cruds.register_messages(submit,current_user.user_id)
            await manager.broadcast(json.dumps(data))
    except WebSocketDisconnect:
        manager.disconnect(websocket)