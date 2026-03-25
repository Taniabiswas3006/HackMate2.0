import api from './api.js'

/**
 * Fetch suggested peers from the backend via recommendation endpoint.
 * Falls back to local JSON if no user context is available.
 */
export async function getSuggestedPeers(branch, year, interests) {
  if (!branch || !year || !interests || interests.length === 0) {
    return []
  }

  try {
    const { data } = await api.post('/recommend', { branch, year, interests })
    if (data.success && data.peers) {
      return data.peers
    }
    return []
  } catch {
    return []
  }
}

