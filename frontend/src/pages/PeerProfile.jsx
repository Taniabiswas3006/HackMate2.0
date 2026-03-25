import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Loader from '../components/ui/Loader.jsx'
import { useAuth } from '../context/useAuth.js'
import { getUserProfile } from '../services/userService.js'

const avatarColors = [
  'bg-primary/15 text-primary',
  'bg-secondary/20 text-purple-600',
  'bg-accent/20 text-emerald-600',
  'bg-highlight/20 text-pink-600',
]

function PeerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [peer, setPeer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin')
      return
    }

    getUserProfile(id)
      .then((data) => {
        setPeer(data)
      })
      .catch(() => {
        navigate('/peers')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id, currentUser, navigate])

  const handleConnect = async () => {
    setConnecting(true)
    // TODO: Implement connect functionality
    // For now, just show an alert
    alert(`Connection request sent to ${peer.name}!`)
    setConnecting(false)
  }

  if (loading) {
    return <Loader text="Loading profile..." />
  }

  if (!peer) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-heading">Profile not found</h1>
        <Button onClick={() => navigate('/peers')} className="mt-4">
          Back to Peers
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        onClick={() => navigate('/peers')}
        className="mb-6"
        variant="outline"
      >
        ← Back to Peers
      </Button>

      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold ${avatarColors[0]}`}
          >
            {peer.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-heading">{peer.name}</h1>
            <p className="text-sm text-body">
              {peer.branch} • {peer.year}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-heading mb-1">Department</h3>
            <p className="text-sm text-body">{peer.department || peer.branch}</p>
          </div>

          {peer.interests && peer.interests.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-heading mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {peer.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Note: Not showing email, phone, gender for privacy */}
        </div>

        <Button
          onClick={handleConnect}
          disabled={connecting}
          className="mt-6 w-full"
        >
          {connecting ? 'Connecting...' : 'Connect Now'}
        </Button>
      </Card>
    </div>
  )
}

export default PeerProfile