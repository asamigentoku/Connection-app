from fastapi import APIRouter,Depends,HTTPException
import src.cruds.harassment_cruds as harassment_cruds
router=APIRouter(tags=["harassment_check"],prefix="/harassment")

@router.post("/anycheck",response_model=str)
async def harassment_check(post_id:int):
    return await harassment_cruds.harassment_check_by_post_id(post_id)