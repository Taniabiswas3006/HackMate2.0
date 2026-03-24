import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-main md:flex">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
