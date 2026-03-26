import { Sparkles, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { getAIGuidance } from '../../services/aiService.js'

function AIGuidanceCard({ branch, year, interest }) {
  const [advice, setAdvice] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchGuidance = useCallback(() => {
    if (!branch || !year || !interest) return

    let active = true
    setLoading(true)
    setError(null)
    setAdvice(null)

    getAIGuidance(branch, year, interest)
      .then((result) => { if (active) setAdvice(result) })
      .catch((err) => { if (active) setError(err.message || 'Failed to get AI guidance') })
      .finally(() => { if (active) setLoading(false) })

    return () => { active = false }
  }, [branch, year, interest])

  useEffect(() => {
    if (!branch || !year || !interest) return

    let active = true

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      setAdvice(null)
      try {
        const result = await getAIGuidance(branch, year, interest)
        if (active) setAdvice(result)
      } catch (err) {
        if (active) setError(err.message || 'Failed to get AI guidance')
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchData()
    return () => { active = false }
  }, [branch, year, interest])

  if (!branch || !year || !interest) return null

  /**
   * Convert simple markdown-like **bold** and *italic* to JSX-safe HTML,
   * matching the approach from the minimal frontend.
   */
  const formatAdvice = (text) => {
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>')
    return { __html: formatted }
  }

  return (
    <div className="rounded-2xl border border-primary/10 bg-card p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-heading">
            Gemini AI Insights
          </h3>
          <p className="text-xs text-body">Personalized hackathon strategy</p>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {loading && (
          <div className="flex items-center gap-3 text-sm text-body">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            <span> Generating personalized AI insights…</span>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-highlight/15 px-4 py-2.5 text-sm text-pink-700 flex items-center justify-between gap-3">
            <span>{error}</span>
            <button
              onClick={fetchGuidance}
              className="flex items-center gap-1 shrink-0 rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <RefreshCw className="h-3 w-3" /> Retry
            </button>
          </div>
        )}

        {advice && (
          <div
            className="prose-sm text-sm leading-relaxed text-body"
            dangerouslySetInnerHTML={formatAdvice(advice)}
          />
        )}
      </div>
    </div>
  )
}

export default AIGuidanceCard
