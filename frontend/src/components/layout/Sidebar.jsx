
import {
  Home,
  User,
  Users,
  Calendar,
  Map,
  Award,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/peers', label: 'Peers', icon: Users },
  { to: '/events', label: 'Events', icon: Calendar },
  { to: '/roadmap', label: 'Roadmap', icon: Map },
  { to: '/achievements', label: 'Achievements', icon: Award },
];


function Sidebar() {
  return (
    <aside className="w-full border-b border-primary/10 bg-white p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="mb-8 flex flex-col items-center gap-1 px-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow">
          {/* Logo SVG or Emoji */}
          <span className="text-2xl">🧑‍💻</span>
        </div>
        <span className="mt-2 font-bold text-lg text-heading">HackMate</span>
        <span className="text-xs text-body/70">3rd Year</span>
      </div>
      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => {
          const NavIcon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${isActive
                  ? 'bg-secondary/20 text-heading shadow-soft' // active
                  : 'text-body hover:bg-secondary/10 hover:text-heading'
                }`
              }
            >
              <NavIcon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar
