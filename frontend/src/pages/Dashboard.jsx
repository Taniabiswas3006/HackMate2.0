"use client"
import React, { useState, useEffect, useMemo } from "react"
import {
  User,
  Bell,
  Sparkles,
  TrendingUp,
  Search,
  Map,
  Calendar,
  Users,
  Award,
} from "lucide-react"
import { useAuth } from "../context/useAuth.js"
import { getRecommendations } from "../services/recommendService.js"
import Loader from "../components/ui/Loader.jsx"

const Dashboard = () => {
  const { currentUser } = useAuth()
  const [isDark, setIsDark] = useState(false)
  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState('Beginner')
  const [roadmap, setRoadmap] = useState([])
  const [events, setEvents] = useState([])
  const [peers, setPeers] = useState([])

  const numericYear = useMemo(() => 
    parseInt(String(currentUser.year).replace(/\D/g, ''), 10) || 2
  , [currentUser.year])

  const branch = useMemo(() => 
    currentUser.department || currentUser.branch
  , [currentUser.department, currentUser.branch])

  const interests = useMemo(() => 
    currentUser.interests || []
  , [currentUser.interests])

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)
      if (!branch) {
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
    <div className={`min-h-full ${isDark ? 'dark' : ''}`}>
      <div className="bg-section p-6 lg:p-10 min-h-full">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-heading">Welcome back, {currentUser.name}</h1>
            <p className="text-lg lg:text-xl text-body mt-2 lg:mt-3">Here's your growth snapshot for today</p>
          </div>
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-body" />
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-12 pr-5 py-3 rounded-xl border border-primary/20 bg-card text-base text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 w-56 lg:w-64"
              />
            </div>
            <button className="relative p-3 rounded-xl bg-card border border-primary/20 text-body hover:text-heading transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-secondary rounded-full"></span>
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-card text-body hover:text-heading transition-colors"
            >
              {isDark ? <Sparkles className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
            </button>
            <button className="p-3 rounded-xl bg-card border border-primary/20 text-body hover:text-heading transition-colors">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>

        {interests.length === 0 && (
          <div className="mb-6 lg:mb-10 rounded-2xl bg-primary/10 px-5 py-3 lg:px-6 lg:py-4 text-sm lg:text-base text-primary border border-primary/20">
            Head over to your <strong>Profile</strong> to select a branch and interests so we can generate your personalised roadmap!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10">
          <StatCard 
            icon={Award} 
            label="Your Level" 
            value={level} 
            color="primary"
          />
          <StatCard 
            icon={Map} 
            label="Roadmap Items" 
            value={roadmap.length || 0} 
            color="secondary"
          />
          <StatCard 
            icon={Calendar} 
            label="Events" 
            value={events.length || 0} 
            color="primary"
          />
          <StatCard 
            icon={Users} 
            label="Peers" 
            value={peers.length || 0} 
            color="secondary"
          />
        </div>

        {roadmap.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-primary/10 bg-card p-5 lg:p-8 shadow-soft">
                <h3 className="text-lg lg:text-xl font-semibold text-heading mb-4 lg:mb-6">Skill Roadmap</h3>
                <div className="space-y-3 lg:space-y-4">
                  {roadmap.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 lg:space-x-5 p-4 lg:p-5 rounded-xl bg-section hover:bg-primary/5 transition-colors cursor-pointer">
                      <div className="p-2 lg:p-3 rounded-xl bg-primary/10">
                        <Map className="h-4 lg:h-5 w-4 lg:w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm lg:text-base font-medium text-heading">{item.interest || item.skill}</p>
                        {item.level && (
                          <span className="text-xs lg:text-sm text-body">{item.level}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:space-y-6">
              <div className="rounded-2xl border border-primary/10 bg-card p-5 lg:p-6 shadow-soft">
                <h3 className="text-lg lg:text-xl font-semibold text-heading mb-4 lg:mb-5">Your Interests</h3>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {interests.map((interest, i) => (
                    <span key={i} className="rounded-full bg-secondary/20 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-heading">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-card p-5 lg:p-6 shadow-soft">
                <h3 className="text-lg lg:text-xl font-semibold text-heading mb-4 lg:mb-5">Quick Stats</h3>
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm lg:text-base text-body">Profile Completion</span>
                    <span className="text-sm lg:text-base font-medium text-heading">{interests.length > 0 ? '80%' : '40%'}</span>
                  </div>
                  <div className="w-full bg-section rounded-full h-2.5 lg:h-3">
                    <div className="bg-primary h-2.5 lg:h-3 rounded-full" style={{ width: interests.length > 0 ? '80%' : '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="p-5 lg:p-8 rounded-2xl border border-primary/10 bg-card shadow-soft hover:shadow-soft-lg transition-shadow">
      <div className="flex items-center justify-between mb-4 lg:mb-5">
        <div className={`p-2.5 lg:p-3 rounded-xl ${color === 'primary' ? 'bg-primary/10' : 'bg-secondary/20'}`}>
          <Icon className={`h-5 lg:h-6 w-5 lg:w-6 ${color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
        </div>
        <TrendingUp className="h-4 lg:h-5 w-4 lg:w-5 text-emerald-500" />
      </div>
      <h3 className="font-medium text-sm lg:text-base text-body mb-1.5 lg:mb-2">{label}</h3>
      <p className="text-2xl lg:text-3xl font-bold text-heading">{value}</p>
    </div>
  )
}

export default Dashboard