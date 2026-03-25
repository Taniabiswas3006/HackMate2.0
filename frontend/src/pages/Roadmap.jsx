import { CheckCircle2, CircleDashed, CircleDot } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import Card from '../components/ui/Card.jsx'
import Loader from '../components/ui/Loader.jsx'
import SkillRoadmapDetail from '../components/ui/SkillRoadmapDetail.jsx'
import { useAuth } from '../context/useAuth.js'
import { getRoadmap } from '../services/roadmapService.js'

const statusStyles = {
  'Not Started': {
    icon: CircleDashed,
    badge: 'bg-section text-body',
  },
  'In Progress': {
    icon: CircleDot,
    badge: 'bg-primary/15 text-primary',
  },
  Completed: {
    icon: CheckCircle2,
    badge: 'bg-accent/20 text-emerald-700',
  },
}

function Roadmap() {
  const { currentUser } = useAuth()
  const [roadmap, setRoadmap] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSkill, setSelectedSkill] = useState(null)

  const branch = currentUser.department || currentUser.branch
  const numericYear = parseInt(String(currentUser.year).replace(/\D/g, ''), 10) || 2
  const interests = currentUser.interests || []

  useEffect(() => {
    let active = true
    setLoading(true)

    getRoadmap(branch, numericYear, interests)
      .then((data) => {
        if (active) setRoadmap(data || [])
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [branch, numericYear, interests])

  if (loading) {
    return <Loader text="Loading roadmap..." />
  }

  // If a skill is selected, show the detailed view
  if (selectedSkill) {
    return (
      <SkillRoadmapDetail
        skill={selectedSkill.skill}
        level={selectedSkill.level}
        onBack={() => setSelectedSkill(null)}
      />
    )
  }

  // Support both old format (status-based) and new format (steps-based)
  const hasOldFormat = roadmap.length > 0 && roadmap[0]?.status

  // Progress for old format
  const completedCount = hasOldFormat
    ? roadmap.filter((item) => item.status === 'Completed').length
    : 0
  const progressPercent = hasOldFormat
    ? Math.round((completedCount / roadmap.length) * 100)
    : 0

  return (
    <div>
      <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
        Skill Roadmap
      </h1>
      <p className="mt-2 text-sm text-body">
        Track each skill with status-based milestones.
      </p>

      {/* Overall Progress (old format) */}
      {hasOldFormat && (
        <div className="mt-6 rounded-2xl border border-primary/10 bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-body">Overall Progress</p>
              <p className="mt-0.5 text-2xl font-bold text-heading">{progressPercent}%</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {completedCount}/{roadmap.length} skills
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary/10">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {roadmap.map((item, index) => {
          // New backend format: { interest, level, steps[] }
          if (item.interest) {
            return (
              <Card
                key={item.interest}
                title={item.interest}
                subtitle={item.level ? `Level: ${item.level}` : undefined}
                className="animate-fade-in-up cursor-pointer transition-all hover:shadow-lg hover:border-primary"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => setSelectedSkill({ skill: item.interest, level: item.level })}
              >
                {item.steps && item.steps.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-4 text-sm text-body">
                    {item.steps.slice(0, 3).map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                    {item.steps.length > 3 && (
                      <li className="text-primary font-medium">
                        +{item.steps.length - 3} more topics...
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-body">No specific steps defined yet.</p>
                )}
                <div className="mt-4 text-xs font-medium text-primary">
                  Click to view detailed roadmap →
                </div>
              </Card>
            )
          }

          // Old fallback format: { id, skill, description, status }
          const statusConfig = statusStyles[item.status] || statusStyles['Not Started']
          const StatusIcon = statusConfig.icon

          return (
            <Card
              key={item.id}
              title={item.skill}
              subtitle={item.description}
              className="animate-fade-in-up cursor-pointer transition-all hover:shadow-lg hover:border-primary"
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => setSelectedSkill({ skill: item.skill, level: 'Beginner' })}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusConfig.badge}`}
                >
                  <StatusIcon className="h-3.5 w-3.5" />
                  {item.status}
                </span>
                <span className="text-xs font-medium text-primary">
                  View Details →
                </span>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Roadmap
