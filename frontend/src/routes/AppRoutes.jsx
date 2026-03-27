import { Navigate, Route, Routes } from 'react-router-dom'
import Achievements from '../pages/Achievements.jsx'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Landing from '../pages/Landing.jsx'
import Opportunities from '../pages/Opportunities.jsx'
import Peers from '../pages/Peers.jsx'
import PeerProfile from '../pages/PeerProfile.jsx'
import Profile from '../pages/Profile.jsx'
import Roadmap from '../pages/Roadmap.jsx'
import SignIn from '../pages/SignIn.jsx'
import SignUp from '../pages/SignUp.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/events" element={<Opportunities />} />
        <Route path="/opportunities" element={<Navigate to="/events" replace />} />
        <Route path="/peers" element={<Peers />} />
        <Route path="/peers/:id" element={<PeerProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/achievements" element={<Achievements />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
