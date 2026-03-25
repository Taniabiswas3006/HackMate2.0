import api from './api.js'

/**
 * Fetch a personalized skill roadmap from Gemini AI
 * @param {string} skill - The skill/interest (e.g., "AI", "WebDevelopment")
 * @param {string} level - The level (e.g., "Beginner", "Intermediate", "Advanced")
 * @param {string} branch - (Optional) The student's branch
 * @param {number} year - (Optional) The student's academic year
 * @returns {Promise<{topics: Array, practical: Array}>} The generated roadmap
 */
export async function getGeminiRoadmap(skill, level, branch = '', year = null) {
  try {
    const { data } = await api.post('/ai/roadmap', {
      skill,
      level,
      branch,
      year,
    })

    if (data.success && data.roadmap) {
      return data.roadmap
    }

    throw new Error(data.message || 'Failed to generate roadmap')
  } catch (error) {
    console.error('Error fetching Gemini roadmap:', error.message)
    throw error
  }
}

export default {
  getGeminiRoadmap,
}
