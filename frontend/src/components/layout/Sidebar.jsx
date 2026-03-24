import {
  Compass,
  Home,
  LayoutDashboard,
  Network,
  Trophy,
  UserCircle,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/roadmap', label: 'Skill Roadmap', icon: Compass },
  { to: '/events', label: 'Events', icon: Trophy },
  { to: '/peers', label: 'Peer Connect', icon: Network },
  { to: '/profile', label: 'Profile', icon: UserCircle },
]

function Sidebar() {
  return (
    <aside className="w-full border-b border-primary/10 bg-white p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="mb-6 flex items-center gap-2 px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <LayoutDashboard className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold tracking-wide text-primary">
          HackMate
        </h2>
      </div>
      <nav className="grid grid-cols-2 gap-1.5 md:grid-cols-1">
        {navItems.map((item) => {
          const NavIcon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-primary/10 text-primary shadow-soft'
                  : 'text-body hover:bg-section hover:text-heading'
                }`
              }
            >
              <NavIcon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
