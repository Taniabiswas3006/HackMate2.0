import api from './api.js'

/**
 * Fetch personalized recommendations from the backend.
 * POST /recommend  →  { success, level, roadmap, events, peers }
 *
 * @param {string}   branch    - e.g. "CSE"
 * @param {number}   year      - 1-4
 * @param {string[]} interests - e.g. ["AI/ML", "Web Development"]
 */
export async function getRecommendations(branch, year, interests) {
  const { data } = await api.post('/recommend', { branch, year, interests })
  if (data.success) {
    return {
      level: data.level,
      roadmap: data.roadmap || [],
      events: data.events || [],
      peers: data.peers || [],
    }
  }
  throw new Error(data.message || 'Failed to get recommendations')
}
