# Configuration settings for the FastAPI application
import os
from dotenv import load_dotenv

load_dotenv()

# API settings
API_V1_STR = "/api/v1"
PROJECT_NAME = "DomainScout API"

# WHOIS API settings
WHOIS_API_KEY = os.getenv("WHOIS_API_KEY")
WHOIS_API_URL = os.getenv("WHOIS_API_URL")

# CORS settings (default to localhost)
CORS_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")]