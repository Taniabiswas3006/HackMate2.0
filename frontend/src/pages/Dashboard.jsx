import { CheckCircle2, CircleDashed, CircleDot } from 'lucide-react'
import { useEffect, useState } from 'react'
import ProfileCard from '../components/ui/ProfileCard.jsx'
import EventCard from '../components/ui/EventCard.jsx'
import PeerCard from '../components/ui/PeerCard.jsx'
import AIGuidanceCard from '../components/ui/AIGuidanceCard.jsx'
import Loader from '../components/ui/Loader.jsx'
import { useAuth } from '../context/useAuth.js'
import { getRecommendations } from '../services/recommendService.js'

const statusStyles = {
  'Not Started': { icon: CircleDashed, color: 'text-body', bg: 'bg-section' },
  'In Progress': { icon: CircleDot, color: 'text-primary', bg: 'bg-primary/15' },
  Completed: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-accent/20' },
}

function Dashboard() {
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState('Beginner')
  const [roadmap, setRoadmap] = useState([])
  const [events, setEvents] = useState([])
  const [peers, setPeers] = useState([])
  const [error, setError] = useState(null)

  // Derive the numeric year from the user's year string (e.g. "3rd Year" → 3)
  const numericYear = parseInt(String(currentUser.year).replace(/\D/g, ''), 10) || 2

  // The branch key the backend expects (department or branch)
  const branch = currentUser.department || currentUser.branch

  // Interests array
  const interests = currentUser.interests || []

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)
      setError(null)

      if (!branch || interests.length === 0) {
        setLoading(false)
        return
      }

      try {
        const result = await getRecommendations(branch, numericYear, interests)
        setLevel(result.level)
        setRoadmap(result.roadmap)
        setEvents(result.events)
        setPeers(result.peers)
      } catch (err) {
        console.error('Dashboard load error:', err)
        setError(err.message || 'Failed to load recommendations')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [branch, numericYear, interests])

  if (loading) {
    return <Loader text="Loading dashboard..." />
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section>
        <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
          Welcome back, {currentUser.name}
        </h1>
        <p className="mt-2 text-sm text-body">
          Here's your growth snapshot for today.
        </p>
      </section>

      {/* Profile + Level */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-heading">Your Profile</h2>
        <ProfileCard user={{ ...currentUser, level }} />
      </section>

      {error && (
        <div className="rounded-xl bg-highlight/15 px-4 py-3 text-sm text-pink-700">
          {error} — showing defaults. Make sure the backend is running.
        </div>
      )}

      {/* No interests guard */}
      {interests.length === 0 && (
        <div className="rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary">
          Head over to your <strong>Profile</strong> to select a branch and interests so we can generate your personalised roadmap!
        </div>
      )}

      {/* AI Guidance */}
      {interests.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-heading">AI Insights</h2>
          <AIGuidanceCard
            branch={branch}
            year={numericYear}
            interest={interests[0]}
          />
        </section>
      )}

      {/* Skill Roadmap Checklist */}
      {roadmap.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-heading">Skill Roadmap</h2>
          <div className="space-y-3">
            {roadmap.map((item, idx) => {
              // The backend returns { interest, level, steps[] } per roadmap item
              const itemStatus = item.status || 'Not Started'
              const config = statusStyles[itemStatus] || statusStyles['Not Started']
              const StatusIcon = config.icon

              return (
                <div
                  key={item.interest || idx}
                  className="rounded-2xl border border-primary/10 bg-card p-4 shadow-soft transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                        <StatusIcon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-heading">
                          {item.interest || item.skill}
                        </p>
                        {item.level && (
                          <span className="mt-0.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {item.level}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  {item.steps && item.steps.length > 0 && (
                    <ul className="ml-14 mt-3 list-disc space-y-1 text-sm text-body">
                      {item.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  )}

                  {/* Fallback for old format */}
                  {item.description && !item.steps && (
                    <p className="ml-14 mt-2 text-sm text-body">{item.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Events */}
      {events.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-heading">Upcoming Events</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {events.slice(0, 4).map((event, idx) => (
              <EventCard key={event.id || idx} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Peer Connect */}
      {peers.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-heading">Peer Connect</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {peers.slice(0, 4).map((peer, index) => (
              <PeerCard key={peer.id || index} peer={peer} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Dashboard
