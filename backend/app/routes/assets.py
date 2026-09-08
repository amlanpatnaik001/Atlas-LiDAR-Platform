from fastapi import APIRouter
router=APIRouter(prefix='/api/assets',tags=['Assets'])
@router.get('/')
def get_assets():
    return []
