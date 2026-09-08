import os
import json
import subprocess

PDAL_EXE = os.getenv(
    "PDAL_EXE",
    r"C:\Users\User\.conda\envs\atlas-pdal\Library\bin\pdal.exe"
)

def read_metadata(file_path: str):
    result = subprocess.run(
        [
            PDAL_EXE,
            "info",
            "--metadata",
            file_path,
        ],
        capture_output=True,
        text=True,
    )

    if result.returncode != 0:
        raise RuntimeError(result.stderr)

    data = json.loads(result.stdout)
    metadata = data.get("metadata", {})

    srs = None
    if isinstance(metadata.get("srs"), dict):
        srs = (
            metadata["srs"].get("prettycompoundwkt")
            or metadata["srs"].get("prettywkt")
            or metadata["srs"].get("proj4")
        )

    return {
        "point_count": metadata.get("count"),
        "srs": srs,
        "scale": [
            metadata.get("scale_x"),
            metadata.get("scale_y"),
            metadata.get("scale_z"),
        ],
        "offset": [
            metadata.get("offset_x"),
            metadata.get("offset_y"),
            metadata.get("offset_z"),
        ],
    }