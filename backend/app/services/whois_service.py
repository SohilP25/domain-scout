# backend/app/services/whois_service.py
import httpx
from fastapi import HTTPException
from app.core.config import WHOIS_API_KEY, WHOIS_API_URL

async def get_whois_data(domain: str):
    """
    Fetch WHOIS data for a given domain using the WHOIS API.
    
    Args:
        domain (str): The domain name to look up.
    
    Returns:
        dict: The WHOIS data for the domain.
    
    Raises:
        HTTPException: If the API request fails or returns an error.
    
    """
    
    params = {
        "apiKey": WHOIS_API_KEY,
        "domainName": domain,
        "outputFormat": "JSON"
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(WHOIS_API_URL, params=params)
            
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, 
                               detail=f"Error from WHOIS API: {response.text}")
        
        data = response.json()
        
        # Check if the API returned an error
        if "ErrorMessage" in data:
            raise HTTPException(status_code=400, 
                               detail=f"WHOIS API Error: {data['ErrorMessage']['msg']}")
            
        return data
        
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, 
                           detail=f"Error connecting to WHOIS API: {str(e)}")