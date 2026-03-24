import { useEffect, useState } from 'react'
import EventCard from '../components/ui/EventCard.jsx'
import Loader from '../components/ui/Loader.jsx'
import { useAuth } from '../context/useAuth.js'
import { getOpportunities } from '../services/opportunityService.js'

function Opportunities() {
  const { currentUser } = useAuth()
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)

  const branch = currentUser.department || currentUser.branch
  const numericYear = parseInt(String(currentUser.year).replace(/\D/g, ''), 10) || 2
  const interests = currentUser.interests || []

  useEffect(() => {
    let active = true
    setLoading(true)

    getOpportunities(branch, numericYear, interests)
      .then((data) => {
        if (active) setOpportunities(data || [])
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [branch, numericYear, interests])

  if (loading) {
    return <Loader text="Loading events..." />
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
        Events
      </h1>
      <p className="mt-2 text-sm text-body">
        Browse recommended events and apply quickly.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {opportunities.length > 0 ? (
          opportunities.map((event, idx) => (
            <EventCard key={event.id || idx} event={event} />
          ))
        ) : (
          <p className="text-sm text-body col-span-full">
            No matching events found. Try updating your profile interests.
          </p>
        )}
      </div>
    </div>
  )
}

export default Opportunities
