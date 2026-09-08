from fastapi import APIRouter
router=APIRouter(prefix='/api/processing',tags=['Processing'])
@router.get('/')
def get_processing_jobs():
    return []
