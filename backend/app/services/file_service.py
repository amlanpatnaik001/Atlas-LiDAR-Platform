from pathlib import Path
import shutil

BASE_DIR = Path("storage/uploads")


def save_upload(file):
    extension = Path(file.filename).suffix.lower().replace(".", "")

    folder = BASE_DIR / extension
    folder.mkdir(parents=True, exist_ok=True)

    destination = folder / file.filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return destination