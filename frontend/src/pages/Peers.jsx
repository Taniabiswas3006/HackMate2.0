import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Users, Sparkles, Calendar, ArrowRight } from 'lucide-react'
import Loader from '../components/ui/Loader.jsx'
import { useAuth } from '../context/useAuth.js'
import { getSuggestedPeers } from '../services/userService.js'

const interestColors = {
  'AI': 'bg-purple-100 text-purple-700 border-purple-200',
  'Web Development': 'bg-blue-100 text-blue-700 border-blue-200',
  'Data Science': 'bg-green-100 text-green-700 border-green-200',
  'Machine Learning': 'bg-violet-100 text-violet-700 border-violet-200',
  'Cybersecurity': 'bg-red-100 text-red-700 border-red-200',
  'Mobile': 'bg-orange-100 text-orange-700 border-orange-200',
  'UI/UX': 'bg-pink-100 text-pink-700 border-pink-200',
  'IoT': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Robotics': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Blockchain': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Cloud Computing': 'bg-sky-100 text-sky-700 border-sky-200',
  'DevOps': 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

const getInterestColor = (interest) => {
  const key = Object.keys(interestColors).find(k => interest.toLowerCase().includes(k.toLowerCase()))
  return key ? interestColors[key] : 'bg-gray-100 text-gray-700 border-gray-200'
}

const avatarGradients = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-pink-500 to-rose-500',
]

function Peers() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [peers, setPeers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredPeers = peers.filter(peer => 
    peer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peer.interests?.some(i => i.toLowerCase().includes(searchTerm.toLowerCase())) ||
    peer.branch?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <Loader text="Loading peers..." />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-6 sm:p-8 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-xl">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Peer Connect</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-heading mb-2">
            Find Your Tech Tribe
          </h1>
          <p className="text-body max-w-xl">
            Connect with students who share your interests and passion for technology. 
            Build your network and collaborate on exciting projects together.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span className="text-lg font-bold text-heading">{peers.length}</span>
              <span className="text-xs text-body">peers found</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <Sparkles className="w-4 h-4 text-secondary" />
              </div>
              <span className="text-lg font-bold text-heading">{currentUser.interests?.length || 0}</span>
              <span className="text-xs text-body">shared interests</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-body/50" />
        <input
          type="text"
          placeholder="Search by name, interest, or branch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary/20 bg-card text-heading placeholder:text-body/50 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
        />
      </div>

      {/* Peers Grid */}
      {filteredPeers.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPeers.map((peer, index) => (
            <div
              key={peer.id || index}
              className="group relative bg-card rounded-2xl border border-primary/10 p-5 shadow-soft hover:shadow-soft-lg hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Card Header */}
              <div className="flex items-start gap-4">
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                  {peer.name?.charAt(0).toUpperCase()}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-card" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-heading truncate group-hover:text-primary transition-colors">
                    {peer.name}
                  </h3>
                  <p className="text-sm text-body">
                    {peer.branch} • {peer.year}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 text-body/60" />
                    <span className="text-xs text-body/60">Year {peer.year?.replace(/\D/g, '')}</span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              {peer.interests && peer.interests.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-body/60 mb-2 uppercase tracking-wider">Interests</p>
                  <div className="flex flex-wrap gap-1.5">
                    {peer.interests.slice(0, 4).map((interest, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getInterestColor(interest)}`}
                      >
                        {interest}
                      </span>
                    ))}
                    {peer.interests.length > 4 && (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                        +{peer.interests.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Connect Button */}
              <button
                onClick={() => navigate(`/peers/${peer.id}`)}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/5 text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all duration-300 group/btn"
              >
                <span>Connect</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-10 h-10 text-primary/50" />
          </div>
          <h3 className="text-lg font-semibold text-heading mb-2">
            {searchTerm ? 'No peers found' : 'No peers matched your criteria'}
          </h3>
          <p className="text-body text-sm max-w-md mx-auto">
            {searchTerm 
              ? 'Try adjusting your search terms or browse all peers.'
              : 'Update your profile interests to get better peer recommendations.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default Peers
