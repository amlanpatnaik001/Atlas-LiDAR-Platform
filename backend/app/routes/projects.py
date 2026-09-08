from fastapi import APIRouter
router=APIRouter(prefix='/api/projects',tags=['Projects'])
@router.get('/')
def get_projects():
    return []
