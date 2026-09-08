from fastapi import APIRouter
router=APIRouter(prefix='/api/exports',tags=['Exports'])
@router.get('/')
def get_exports():
    return []
