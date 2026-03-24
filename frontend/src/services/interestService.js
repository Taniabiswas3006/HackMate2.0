import api from './api.js'

/**
 * Fetch all branches and their interests from the backend.
 * GET /interests  →  { success: true, data: { CSE: [...], IT: [...], ... } }
 */
export async function getAllBranchInterests() {
  const { data } = await api.get('/interests')
  if (data.success) return data.data
  throw new Error(data.message || 'Failed to fetch interests')
}

/**
 * Fetch interests for a specific branch.
 * GET /interests?branch=CSE  →  { success: true, branch, interests: [...] }
 */
export async function getInterestsForBranch(branch) {
  const { data } = await api.get('/interests', { params: { branch } })
  if (data.success) return data.interests
  throw new Error(data.message || `No interests found for branch "${branch}"`)
}
