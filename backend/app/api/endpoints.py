# backend/app/api/endpoints.py
from fastapi import APIRouter, HTTPException, Query
from app.services.whois_service import get_whois_data

router = APIRouter()

@router.get("/domain/info/")
async def get_raw_whois(domain: str = Query(..., description="Domain name to look up")):
    """
    Get raw WHOIS data for a given domain.
    Args:
        domain (str): The domain name to look up.
    Returns:
        dict: The raw WHOIS data for the domain.
    Raises:
        HTTPException: If the domain name is not provided or if there is an error fetching the data.
    """
    if not domain:
        raise HTTPException(status_code=400, detail="Domain name is required")
    
    try:
        result = await get_whois_data(domain)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")