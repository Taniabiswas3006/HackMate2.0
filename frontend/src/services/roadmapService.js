import api from './api.js'
import roadmapFallback from '../data/roadmap.json'

/**
 * Fetch roadmap from the backend via recommendation endpoint.
 * Falls back to local JSON if no user context is available.
 */
export async function getRoadmap(branch, year, interests) {
  if (!branch || !year || !interests || interests.length === 0) {
    return roadmapFallback
  }

  try {
    const { data } = await api.post('/recommend', { branch, year, interests })
    if (data.success && data.roadmap) {
      return data.roadmap
    }
    return roadmapFallback
  } catch {
    return roadmapFallback
  }
}
