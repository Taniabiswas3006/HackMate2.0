import { Outlet, Link } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import { useAuth } from '../../context/useAuth.js'
import Button from '../ui/Button.jsx'

function DashboardLayout() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-main p-4 text-center">
        <div className="rounded-2xl border border-primary/10 bg-card p-8 shadow-soft-lg max-w-md w-full">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">

          </div>
          <h2 className="mb-2 text-2xl font-bold text-heading">Forge Your Path</h2>
          <p className="mb-8 text-sm text-body">
            Please sign in or create an account to access your personalized dashboard, skill roadmap, and hackathons.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/signin" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full">Sign In</Button>
            </Link>
            <Link to="/signup" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-main md:flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
