import { Code2, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import { useAuth } from '../../context/useAuth.js'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn, currentUser, logout } = useAuth()
  const location = useLocation()

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Events', href: '/events' },
    { name: 'Peers', href: '/peers' },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-primary/10 bg-secondary/20 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Code2 className="h-4 w-4 text-primary" />
          </div>
          <span className="text-lg font-semibold text-heading">HackMate</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${location.pathname === link.href
                  ? 'text-primary'
                  : 'text-body hover:text-primary'
                }`}
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {currentUser.name?.charAt(0) || 'U'}
              </div>
              <button
                onClick={logout}
                className="text-sm font-medium text-body transition-colors hover:text-primary"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="ml-4">
              <Link to="/signin">
                <Button className="px-5 py-2">Sign In</Button>
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-xl border border-primary/20 p-2 text-body transition-colors hover:bg-primary/5 hover:text-primary md:hidden"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-primary/10 bg-secondary/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${location.pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-body hover:bg-primary/5 hover:text-primary'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="rounded-lg px-3 py-2 text-left text-sm text-body hover:bg-primary/5"
              >
                Logout
              </button>
            ) : (
              <Link to="/signin" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
