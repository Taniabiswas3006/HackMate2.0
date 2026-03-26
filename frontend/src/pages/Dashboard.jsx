"use client"
import React, { useState, useEffect, useMemo } from "react"
import {
  Home,
  User,
  Users,
  Calendar,
  Bell,
  ChevronDown,
  ChevronsRight,
  Map,
  Award,
  Sparkles,
  TrendingUp,
  Search,
} from "lucide-react"
import { useAuth } from "../context/useAuth.js"
import { getRecommendations } from "../services/recommendService.js"
import Loader from "../components/ui/Loader.jsx"

const Dashboard = () => {
  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState("Dashboard")
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
      } finally {
        setLoading(false)
      }
    }
    loadDashboard()
  }, [branch, numericYear, interests])

  const navItems = [
    { Icon: Home, title: "Dashboard", path: "/dashboard" },
    { Icon: User, title: "Profile", path: "/profile" },
    { Icon: Users, title: "Peers", path: "/peers" },
    { Icon: Calendar, title: "Events", path: "/events" },
    { Icon: Map, title: "Roadmap", path: "/roadmap" },
    { Icon: Award, title: "Achievements", path: "/achievements" },
  ]

  return (
    <div className={`flex min-h-screen w-full ${isDark ? 'dark' : ''}`}>
      <div className="flex w-full bg-section text-heading">
        <Sidebar 
          open={open} 
          setOpen={setOpen} 
          selected={selected} 
          setSelected={setSelected}
          navItems={navItems}
          currentUser={currentUser}
        />
        <DashboardContent 
          isDark={isDark} 
          setIsDark={setIsDark}
          currentUser={currentUser}
          loading={loading}
          level={level}
          roadmap={roadmap}
          events={events}
          peers={peers}
          interests={interests}
        />
      </div>
    </div>
  )
}

const Sidebar = ({ open, setOpen, selected, setSelected, navItems, currentUser }) => {
  return (
    <nav className={`sticky top-0 h-screen shrink-0 border-r border-primary/10 bg-card transition-all duration-300 ease-in-out ${open ? 'w-64' : 'w-16'}`}>
      <div className="mb-6 border-b border-primary/10 pb-4 pt-4">
        <div className="flex cursor-pointer items-center justify-between rounded-md mx-2 p-2 transition-colors hover:bg-primary/5">
          <div className="flex items-center gap-3">
            <Logo />
            {open && (
              <div className="transition-opacity duration-200">
                <div className="flex items-center gap-2">
                  <div>
                    <span className="block text-sm font-semibold text-heading">
                      HackMate
                    </span>
                    <span className="block text-xs text-body">
                      {currentUser.year || 'Student'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {open && <ChevronDown className="h-4 w-4 text-body" />}
        </div>
      </div>

      <div className="space-y-1 px-2">
        {navItems.map((item) => (
          <NavOption
            key={item.title}
            Icon={item.Icon}
            title={item.title}
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        ))}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  )
}

const Logo = () => {
  return (
    <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-sm">
      <Sparkles className="h-5 w-5 text-white" />
    </div>
  )
}

const NavOption = ({ Icon, title, selected, setSelected, open }) => {
  const isSelected = selected === title
  return (
    <button
      onClick={() => setSelected(title)}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected 
          ? "bg-primary/10 text-primary border-l-2 border-primary" 
          : "text-body hover:bg-primary/5 hover:text-heading"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      {open && (
        <span className="text-sm font-medium">{title}</span>
      )}
    </button>
  )
}

const ToggleClose = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-primary/10 transition-colors hover:bg-primary/5"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 transition-transform duration-300 text-body ${open ? "rotate-180" : ""}`}
          />
        </div>
        {open && (
          <span className="text-sm font-medium text-body">Collapse</span>
        )}
      </div>
    </button>
  )
}

const DashboardContent = ({ isDark, setIsDark, currentUser, loading, level, roadmap, events, peers, interests }) => {
  if (loading) {
    return <Loader text="Loading dashboard..." />
  }

  return (
    <div className="flex-1 bg-section p-6 overflow-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-heading">Welcome back, {currentUser.name}</h1>
          <p className="text-body mt-1">Here's your growth snapshot for today</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-body" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-primary/20 bg-card text-sm text-heading focus:outline-none focus:border-primary"
            />
          </div>
          <button className="relative p-2 rounded-lg bg-card border border-primary/20 text-body hover:text-heading transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-secondary rounded-full"></span>
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-card text-body hover:text-heading transition-colors"
          >
            {isDark ? <Sparkles className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
          </button>
          <button className="p-2 rounded-lg bg-card border border-primary/20 text-body hover:text-heading transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>

      {interests.length === 0 && (
        <div className="mb-6 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary border border-primary/20">
          Head over to your <strong>Profile</strong> to select a branch and interests so we can generate your personalised roadmap!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-primary/10 bg-card p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-heading mb-4">Skill Roadmap</h3>
              <div className="space-y-4">
                {roadmap.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 rounded-lg bg-section hover:bg-primary/5 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Map className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-heading">{item.interest || item.skill}</p>
                      {item.level && (
                        <span className="text-xs text-body">{item.level}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-primary/10 bg-card p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-heading mb-4">Your Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, i) => (
                  <span key={i} className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-heading">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-primary/10 bg-card p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-heading mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-body">Profile Completion</span>
                  <span className="text-sm font-medium text-heading">{interests.length > 0 ? '80%' : '40%'}</span>
                </div>
                <div className="w-full bg-section rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: interests.length > 0 ? '80%' : '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const StatCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="p-6 rounded-xl border border-primary/10 bg-card shadow-soft hover:shadow-soft-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${color === 'primary' ? 'bg-primary/10' : 'bg-secondary/20'}`}>
          <Icon className={`h-5 w-5 ${color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
        </div>
        <TrendingUp className="h-4 w-4 text-emerald-500" />
      </div>
      <h3 className="font-medium text-body mb-1">{label}</h3>
      <p className="text-2xl font-bold text-heading">{value}</p>
    </div>
  )
}

export default Dashboard