from pathlib import Path
import shutil
from fastapi import APIRouter,UploadFile,File,HTTPException

router=APIRouter(prefix="/api",tags=["Upload"])
UPLOAD_DIR=Path("storage/uploads")
UPLOAD_DIR.mkdir(parents=True,exist_ok=True)
ALLOWED_EXTENSIONS={".las",".laz",".e57"}

@router.post("/upload")
async def upload_file(file:UploadFile=File(...)):
    ext=Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400,detail="Unsupported file type")
    dest=UPLOAD_DIR/file.filename
    with dest.open("wb") as buffer:
        shutil.copyfileobj(file.file,buffer)
    return {"filename":file.filename,"size":dest.stat().st_size,"status":"uploaded"}
