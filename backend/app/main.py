from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.upload import router as upload_router
from app.routes.projects import router as projects_router
from app.routes.processing import router as processing_router
from app.routes.assets import router as assets_router
from app.routes.exports import router as exports_router

app=FastAPI(title="Atlas LiDAR API",version="1.0.0")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:3000"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(upload_router)
app.include_router(projects_router)
app.include_router(processing_router)
app.include_router(assets_router)
app.include_router(exports_router)

@app.get("/")
def root():
    return {"status":"running","service":"Atlas LiDAR API"}
