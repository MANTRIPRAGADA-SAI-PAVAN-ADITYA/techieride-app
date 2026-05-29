import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/Dashboard'
import Carpooling from './pages/Carpooling'
import MyRides from './pages/MyRides'
import Activities from './pages/Activities'
import Profile from './pages/Profile'
import Schedule from './pages/Schedule'
import AdminPanel from './pages/admin/AdminPanel'
import AdminMembers from './pages/admin/AdminMembers'
import AdminContent from './pages/admin/AdminContent'
import AdminRides from './pages/admin/AdminRides'

export default function App() {
  const [user, setUser] = useState(null)

  if (!user) return <Login onLogin={setUser} />

  if (user.role === 'admin') {
    return (
      <BrowserRouter>
        <AdminLayout user={user} onLogout={() => setUser(null)}>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/rides" element={<AdminRides />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </AdminLayout>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={() => setUser(null)}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/carpooling" element={<Carpooling user={user} />} />
          <Route path="/rides" element={<MyRides user={user} />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
