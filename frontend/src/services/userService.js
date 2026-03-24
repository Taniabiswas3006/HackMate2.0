import api from './api.js'
import usersData from '../data/users.json'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetch suggested peers from the backend via recommendation endpoint.
 * Falls back to local JSON if no user context is available.
 */
export async function getSuggestedPeers(branch, year, interests) {
  if (!branch || !year || !interests || interests.length === 0) {
    await delay(250)
    return usersData.peers
  }

  try {
    const { data } = await api.post('/recommend', { branch, year, interests })
    if (data.success && data.peers) {
      return data.peers
    }
    return usersData.peers
  } catch {
    return usersData.peers
  }
}

export async function getCurrentUser() {
  await delay(250)
  return usersData.currentUser
}
