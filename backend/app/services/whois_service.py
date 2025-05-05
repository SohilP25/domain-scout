# backend/app/services/whois_service.py
import httpx
from fastapi import HTTPException
from app.core.config import WHOIS_API_KEY, WHOIS_API_URL
from app.core.constants import DOMAIN_INFO, CONTACT_INFO

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
    
async def get_domain_data(domain: str, data_type: str):
    """
    Get formatted domain data based on the requested type

    Args:
        domain (str): The domain name to look up.
        data_type (str): The type of data to retrieve (e.g., "domain_info", "contact_info").
    
    Returns:
        dict: The formatted domain data.
    
    Raises:
        HTTPException: If invalid data type requested.
    """
    whois_data = await get_whois_data(domain)
    
    if data_type == DOMAIN_INFO:
        return format_domain_info(whois_data)
    elif data_type == CONTACT_INFO:
        return format_contact_info(whois_data)
    else:
        raise HTTPException(status_code=400, detail="Invalid data type requested")
    
def format_domain_info(whois_data):
    """
    Format domain information from WHOIS data
    
    Args:
        whois_data (dict): The raw WHOIS data.
    
    Returns:
        dict: Formatted domain information.

    """
    # Extract WhoisRecord which contains the actual data
    record = whois_data.get("WhoisRecord", {})
    
    # Extract nameServers
    name_servers = []
    name_servers_data = record.get("nameServers", {})
    if "hostNames" in name_servers_data:
        name_servers = name_servers_data.get("hostNames", [])
    
    # Format domain info according to requirements
    return {
        "data": {
            "domainName": record.get("domainName", "N/A"),
            "registrarName": record.get("registrarName", "N/A"),
            "registrarRegistrationDate": record.get("createdDate", "N/A"),
            "expirationDate": record.get("expiresDate", "N/A"),
            "estimatedDomainAge": record.get("estimatedDomainAge", "N/A"),
            "hostnames": name_servers
        }
    }

def format_contact_info(whois_data):
    """
    Format contact information from WHOIS data
    
    Args:
        whois_data (dict): The raw WHOIS data.
    
    Returns:
        dict: Formatted contact information.
    
    """
    # Extract WhoisRecord which contains the actual data
    record = whois_data.get("WhoisRecord", {})
    
    # Get contact email - it could be in different places
    contact_email = None
    for contact_type in ["registrant", "technicalContact", "administrativeContact"]:
        if contact_type in record and "email" in record[contact_type]:
            contact_email = record[contact_type]["email"]
            break

    return {
        "registrantName": _get_nested_value(record, "registrant.name"),
        "technicalContactName": _get_nested_value(record, "technicalContact.name"),
        "administrativeContactName": _get_nested_value(record, "administrativeContact.name"),
        "contactEmail": contact_email if contact_email else "N/A"
    }

def _get_nested_value(data, key_path):
    """
    Extract nested value from dictionary using dot notation path.

    Args:
        data (dict): The dictionary to extract from.
        key_path (str): The dot-separated path to the desired value (e.g., "registrant.name").

    Returns:
        any: The value at the specified path, or "N/A" if the path doesn't exist.
    """
    if "." not in key_path:
        return data.get(key_path, "N/A")

    keys = key_path.split(".")
    value = data
    for key in keys:
        if isinstance(value, dict) and key in value:
            value = value[key]
        else:
            return "N/A"
    return value if value else "N/A"