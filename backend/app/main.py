# backend/app/main.py
import logging
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.core.config import PROJECT_NAME, API_V1_STR, CORS_ORIGINS
from app.api.endpoints import router as api_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=PROJECT_NAME,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(api_router, prefix=API_V1_STR)

# Frontend static files setup
FRONTEND_DIR = Path(__file__).parent.parent.parent / "frontend" / "dist"

if FRONTEND_DIR.exists():
    # Serve static assets
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIR / "assets"), name="assets")
    
    @app.exception_handler(404)
    async def custom_404_handler(request, exc):
        return FileResponse(FRONTEND_DIR / "index.html")
    
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        requested_path = FRONTEND_DIR / full_path
        if requested_path.exists() and requested_path.is_file():
            return FileResponse(requested_path)
        return FileResponse(FRONTEND_DIR / "index.html")
else:
    logger.warning(f"Frontend build directory not found at {FRONTEND_DIR}")
    
    @app.get("/")
    def root():
        return {
            "message": f"Welcome to {PROJECT_NAME}",
            "status": "Backend is running, but frontend is not built",
            "docs": "/api/docs"
        }