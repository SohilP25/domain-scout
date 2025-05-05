# backend/app/api/endpoints.py
from fastapi import APIRouter, HTTPException, Query
from app.services.whois_service import get_domain_data
from app.core.constants import DOMAIN_INFO, CONTACT_INFO
from typing import Literal
from enum import Enum

router = APIRouter()

class DomainDataType(str, Enum):
    DOMAIN = DOMAIN_INFO
    CONTACT = CONTACT_INFO

@router.get("/domain/info/")
async def get_domain_info(
    domain: str = Query(..., description="Domain name to look up"),
    data_type: DomainDataType = Query(..., description="Type of information to retrieve")
    ):
    """
    Get raw WHOIS data for a given domain.
    Args:
        domain (str): The domain name to look up.
        data_type (DataType): Type of information to retrieve (domain or contact)

    Returns:
        dict: The raw WHOIS data for the domain.
    Raises:
        HTTPException: If the domain name is not provided or if there is an error fetching the data.
    """
    if not domain:
        raise HTTPException(status_code=400, detail="Domain name is required")
    
    try:
        result = await get_domain_data(domain,data_type.value)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")