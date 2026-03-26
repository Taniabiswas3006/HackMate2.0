import { ChevronLeft, BookOpen, Code2, Zap, Target, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/useAuth.js'
import { getGeminiRoadmap } from '../../services/geminiRoadmapService.js'
import Loader from './Loader.jsx'
import SkillRoadmapError from './SkillRoadmapError.jsx'

function SkillRoadmapDetail({ skill, level, onBack }) {
  const { currentUser } = useAuth()
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch roadmap from Gemini API
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true)
        setError(null)

        const branch = currentUser?.department || currentUser?.branch || ''
        const year = currentUser?.year
          ? parseInt(String(currentUser.year).replace(/\D/g, ''), 10)
          : null

        const data = await getGeminiRoadmap(skill, level, branch, year)
        setRoadmap(data)
      } catch (err) {
        console.error('Error fetching roadmap:', err)
        setError(err.message || 'Failed to generate roadmap. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchRoadmap()
  }, [skill, level, currentUser])

  if (loading) {
    return (
      <div className="animate-fade-in-up">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 rounded-lg hover:bg-section p-2"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">Back</span>
        </button>
        <Loader text={`Generating personalized ${skill} roadmap for ${level} level...`} />
      </div>
    )
  }

  if (error) {
    return (
      <SkillRoadmapError 
        skill={skill} 
        onBack={onBack}
        error={error}
      />
    )
  }

  if (!roadmap) {
    return (
      <SkillRoadmapError 
        skill={skill} 
        onBack={onBack}
        error="No roadmap data was returned from the server."
      />
    )
  }

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/10 to-accent/10 p-6 shadow-soft">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/20"
          title="Go back"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-heading">
            {skill} Roadmap
          </h1>
          <p className="mt-1 text-sm text-body">
            {level} Level • Comprehensive learning path with topics and practical projects
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Topics Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-heading">Topics to Cover</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {roadmap.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-primary/10 bg-card p-5 shadow-soft transition-all hover:border-primary/20 hover:shadow-md"
                >
                  <h3 className="mb-3 font-semibold text-heading">{topic.name}</h3>
                  <ul className="mb-4 space-y-2">
                    {topic.subtopics.map((sub, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-body">
                        <span className="mt-1 block h-2 w-2 rounded-full bg-primary/60 flex-shrink-0" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-primary/10 pt-3">
                    <p className="text-xs font-medium text-primary/80 mb-2">Resources:</p>
                    <ul className="space-y-1">
                      {topic.resources.map((resource, i) => (
                        <li key={i} className="text-xs text-body/80">
                          • {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Code2 className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold text-heading">Practical Projects</h2>
            </div>

            <div className="space-y-4">
              {roadmap.practical.map((project, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-accent/10 bg-card p-5 shadow-soft"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="font-semibold text-heading">{project.project}</h3>
                    <div className="flex gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          project.difficulty === 'Easy'
                            ? 'bg-emerald-100 text-emerald-700'
                            : project.difficulty === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : project.difficulty === 'Hard'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {project.difficulty}
                      </span>
                      <span className="rounded-full bg-body/10 px-3 py-1 text-xs font-medium text-body">
                        {project.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, i) => (
                      <span key={i} className="inline-flex items-center gap-1 rounded-lg bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                        <Zap className="h-3 w-3" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Learning Path Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-primary/10 bg-card p-6 shadow-soft">
            <div className="mb-6 flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-heading">Learning Path Overview</h3>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-primary/5 p-4">
                <p className="text-xs font-medium uppercase text-primary/80 mb-2">
                  Topics to Master
                </p>
                <p className="text-2xl font-bold text-heading">{roadmap.topics.length}</p>
              </div>

              <div className="rounded-lg bg-accent/5 p-4">
                <p className="text-xs font-medium uppercase text-accent/80 mb-2">
                  Practical Projects
                </p>
                <p className="text-2xl font-bold text-heading">{roadmap.practical.length}</p>
              </div>

              <div className="rounded-lg bg-section/20 p-4">
                <p className="text-xs font-medium uppercase text-body/80 mb-2">
                  Estimated Timeline
                </p>
                <p className="text-lg font-semibold text-heading">
                  {level === 'Beginner'
                    ? '3-4 months'
                    : level === 'Intermediate'
                      ? '5-6 months'
                      : '6-12 months'}
                </p>
              </div>

              <div className="mt-6 border-t border-primary/10 pt-6">
                <h4 className="mb-3 text-sm font-semibold text-heading">Recommended Approach:</h4>
                <ul className="space-y-2 text-xs text-body">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Start with foundational topics</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Build small projects as you learn</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Practice with real-world datasets</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Contribute to open source</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillRoadmapDetail
