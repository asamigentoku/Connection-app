from fastapi import APIRouter
from database.db import database
router=APIRouter(tags=["Init"],prefix="")

@router.on_event("startup")
async def startup() -> None:
    if not database.is_connected:
        await database.connect()
@router.on_event("shutdown")
async def shutdown() -> None:
    if database.is_connected:
        await database.disconnect()