import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Layouts
import PublicLayout  from './components/PublicLayout'
import MemberLayout  from './components/MemberLayout'
import AdminLayout   from './components/AdminLayout'

// Public pages
import Landing  from './pages/public/Landing'
import Register from './pages/public/Register'
import Donate   from './pages/public/Donate'
import PublicActivities from './pages/public/PublicActivities'

// Member pages
import Dashboard   from './pages/member/Dashboard'
import Carpooling  from './pages/member/Carpooling'
import MyPools     from './pages/member/MyPools'
import Activities  from './pages/member/Activities'
import Profile     from './pages/member/Profile'
import Schedule    from './pages/Schedule'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMembers   from './pages/admin/AdminMembers'
import AdminRides     from './pages/admin/AdminRides'
import AdminContent   from './pages/admin/AdminContent'
import AdminDonate    from './pages/admin/AdminDonate'

// Auth
import Login from './pages/Login'

/* ─── THEME CONTEXT ─────────────────────────────────── */
export const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })
export const useTheme = () => useContext(ThemeContext)

/* ─── APP ────────────────────────────────────────────── */
export default function App() {
  const [user,  setUser]  = useState(null)
  const [mode,  setMode]  = useState('visitor') // visitor | member | admin
  const [theme, setTheme] = useState(() => localStorage.getItem('tr-theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('tr-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  const handleLogin = (u) => {
    setUser(u)
    setMode(u.role === 'admin' ? 'admin' : 'member')
  }
  const handleLogout = () => { setUser(null); setMode('visitor') }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        {/* ── VISITOR (public) ── */}
        {mode === 'visitor' && (
          <PublicLayout onLoginClick={() => setMode('login')}>
            <Routes>
              <Route path="/"           element={<Landing  onLoginClick={() => setMode('login')} />} />
              <Route path="/activities" element={<PublicActivities />} />
              <Route path="/register"   element={<Register />} />
              <Route path="/donate"     element={<Donate />} />
              <Route path="*"           element={<Navigate to="/" replace />} />
            </Routes>
          </PublicLayout>
        )}

        {/* ── LOGIN ── */}
        {mode === 'login' && (
          <Login onLogin={handleLogin} onBack={() => setMode('visitor')} />
        )}

        {/* ── MEMBER ── */}
        {mode === 'member' && user && (
          <MemberLayout user={user} onLogout={handleLogout}>
            <Routes>
              <Route path="/"             element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard"    element={<Dashboard   user={user} />} />
              <Route path="/carpooling"   element={<Carpooling  user={user} />} />
              <Route path="/my-pools"     element={<MyPools     user={user} />} />
              <Route path="/activities"   element={<Activities  user={user} />} />
              <Route path="/donate"       element={<Donate member />} />
              <Route path="/schedule"     element={<Schedule />} />
              <Route path="/profile"      element={<Profile user={user} setUser={setUser} />} />
              <Route path="*"             element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </MemberLayout>
        )}

        {/* ── ADMIN ── */}
        {mode === 'admin' && user && (
          <AdminLayout user={user} onLogout={handleLogout}>
            <Routes>
              <Route path="/"                element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/members"   element={<AdminMembers />} />
              <Route path="/admin/rides"     element={<AdminRides />} />
              <Route path="/admin/content"   element={<AdminContent />} />
              <Route path="/admin/donate"    element={<AdminDonate />} />
              <Route path="*"                element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
          </AdminLayout>
        )}
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}
