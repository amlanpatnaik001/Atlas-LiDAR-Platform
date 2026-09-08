from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter(prefix="/api", tags=["Upload"])

BASE_UPLOAD_DIR = Path("storage/uploads")

ALLOWED_EXTENSIONS = {
    ".las": "las",
    ".laz": "laz",
    ".e57": "e57",
}

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )

    folder = BASE_UPLOAD_DIR / ALLOWED_EXTENSIONS[extension]
    folder.mkdir(parents=True, exist_ok=True)

    destination = folder / file.filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "size": destination.stat().st_size,
        "status": "uploaded",
        "saved_to": str(destination)
    }