import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Loader from '../components/ui/Loader.jsx'
import { useAuth } from '../context/useAuth.js'
import { getSuggestedPeers } from '../services/userService.js'

const avatarColors = [
  'bg-primary/15 text-primary',
  'bg-secondary/20 text-purple-600',
  'bg-accent/20 text-emerald-600',
  'bg-highlight/20 text-pink-600',
]

function Peers() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [peers, setPeers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const branch = currentUser.department || currentUser.branch
    const numericYear = parseInt(String(currentUser.year).replace(/\D/g, ''), 10) || 2
    const interests = currentUser.interests || []

    let active = true

    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getSuggestedPeers(branch, numericYear, interests)
        if (active) setPeers(data || [])
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchData()
    return () => { active = false }
  }, [currentUser])

  if (loading) {
    return <Loader text="Loading peers..." />
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
        Peer Connect
      </h1>
      <p className="mt-2 text-sm text-body">
        Collaborate with students who share your interests.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {peers.length > 0 ? (
          peers.map((peer, index) => (
            <Card
              key={peer.id || index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold ${avatarColors[index % avatarColors.length]}`}
                >
                  {peer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-heading">{peer.name}</h3>
                  <p className="text-xs text-body">
                    {peer.branch ? `${peer.branch} (Year ${peer.year})` : peer.interests?.join(' · ')}
                  </p>
                </div>
              </div>

              {peer.skills && peer.skills.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-body">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {peer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {peer.interests && peer.interests.length > 0 && (
                <div className="mt-3">
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-body">Interests</p>
                  <p className="text-xs text-body">{peer.interests.join(', ')}</p>
                </div>
              )}

              <Button className="mt-4 w-full" onClick={() => navigate(`/peers/${peer.id}`)}>
                Connect
              </Button>
            </Card>
          ))
        ) : (
          <p className="text-sm text-body col-span-full">
            No peers matched your criteria. Be the first!
          </p>
        )}
      </div>
    </div>
  )
}

export default Peers
