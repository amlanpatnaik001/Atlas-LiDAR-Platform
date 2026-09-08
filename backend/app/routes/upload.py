from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pdal_service import read_metadata

router = APIRouter()

UPLOAD_DIR = Path("storage/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    ext = Path(file.filename).suffix.lower()

    if ext not in [".las", ".laz", ".e57"]:
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    destination = UPLOAD_DIR / file.filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    metadata = None

    if ext in [".las", ".laz"]:
        metadata = read_metadata(str(destination))

    return {
        "filename": file.filename,
        "status": "validated",
        "metadata": metadata,
    }