import api from './api.js'
import opportunitiesFallback from '../data/opportunities.json'

/**
 * Fetch events/opportunities from the backend via recommendation endpoint.
 * Falls back to local JSON if no user context is available.
 */
export async function getOpportunities(branch, year, interests) {
  if (!branch || !year || !interests || interests.length === 0) {
    return opportunitiesFallback
  }

  try {
    const { data } = await api.post('/recommend', { branch, year, interests })
    if (data.success && data.events) {
      return data.events
    }
    return opportunitiesFallback
  } catch {
    return opportunitiesFallback
  }
}
