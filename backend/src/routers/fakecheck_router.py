from fastapi import APIRouter,Depends,HTTPException
import src.cruds.fakecheck_cruds as fakecheck_cruds
router=APIRouter(tags=["fakecheck"],prefix="/fakecheck")

@router.post("fake_check_by_post",response_model=int)
async def fake_check_by_post(post_id:int):
    return await fakecheck_cruds.fake_check_by_post_id(post_id)


