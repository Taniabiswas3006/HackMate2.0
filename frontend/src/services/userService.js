import api from './api.js'

/**
 * Fetch suggested peers from the backend via recommendation endpoint.
 * Falls back to local JSON if no user context is available.
 */
export async function getSuggestedPeers(branch, year, interests) {
  if (!branch || !year || !Array.isArray(interests)) {
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

/**
 * Fetch a user's public profile by ID
 */
export async function getUserProfile(userId) {
  try {
    const { data } = await api.get(`/users/${userId}`)
    if (data.success) {
      return data.user
    }
    throw new Error('User not found')
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch user profile')
  }
}

