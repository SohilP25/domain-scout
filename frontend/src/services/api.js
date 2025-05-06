const API_URL = import.meta.env.VITE_API_URL

export const fetchDomainInfo = async (domain, dataType) => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/domain/info/?domain=${domain}&data_type=${dataType}`
    )
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch domain info')
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}