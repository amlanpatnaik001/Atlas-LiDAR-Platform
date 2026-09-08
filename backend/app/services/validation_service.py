from pathlib import Path

ALLOWED_EXTENSIONS = {".las", ".laz", ".e57"}


def validate_file(filename: str):
    return Path(filename).suffix.lower() in ALLOWED_EXTENSIONS