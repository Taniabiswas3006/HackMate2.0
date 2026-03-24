import api from './api.js'

/**
 * Get personalized AI guidance for hackathon strategy.
 * POST /ai/guidance  →  { success: true, advice: string }
 */
export async function getAIGuidance(branch, year, interest) {
  const { data } = await api.post('/ai/guidance', { branch, year, interest })
  if (data.success) return data.advice
  throw new Error(data.message || 'Failed to get AI guidance')
}

/**
 * Get AI explanation for a topic.
 * POST /ai/explain  →  { success: true, explanation: string }
 */
export async function getAIExplanation(topic, domain, level) {
  const { data } = await api.post('/ai/explain', { topic, domain, level })
  if (data.success) return data.explanation
  throw new Error(data.message || 'Failed to get AI explanation')
}
