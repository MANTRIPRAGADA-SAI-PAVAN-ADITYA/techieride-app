import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Layouts
import PublicLayout  from './components/PublicLayout'
import MemberLayout  from './components/MemberLayout'
import AdminLayout   from './components/AdminLayout'

// Public pages
import Landing          from './pages/public/Landing'
import Register         from './pages/public/Register'
import Donate           from './pages/public/Donate'
import PublicActivities from './pages/public/PublicActivities'

// Member pages
import Dashboard   from './pages/member/Dashboard'
import Carpooling  from './pages/member/Carpooling'
import MyPools     from './pages/member/MyPools'
import Activities  from './pages/member/Activities'
import Profile     from './pages/member/Profile'
import Schedule    from './pages/Schedule'

// Moderator pages
import ModeratorDashboard from './pages/moderator/ModeratorDashboard'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMembers   from './pages/admin/AdminMembers'
import AdminRides     from './pages/admin/AdminRides'
import AdminContent   from './pages/admin/AdminContent'
import AdminDonate    from './pages/admin/AdminDonate'
import AdminReports   from './pages/admin/AdminReports'

// Auth + utilities
import Login          from './pages/Login'
import InstallBanner  from './components/InstallBanner'
import { requestPushPermission, showPushNotification, updateAppBadge, makeNotification, NOTIF_TYPES } from './utils/notifications'

/* ─── THEME CONTEXT ─────────────────────────────────── */
export const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })
export const useTheme = () => useContext(ThemeContext)

/* ─── NOTIFICATION CONTEXT ──────────────────────────── */
export const NotificationContext = createContext({
  notifications: [],
  addNotification: () => {},
  markAllRead: () => {},
})

/* ─── PUSH PERMISSION BANNER ─────────────────────────── */
function PushPermissionBanner({ onGrant, onDismiss }) {
  return (
    <div style={{
      position: 'fixed', top: '72px', right: '16px', zIndex: 998,
      background: 'var(--surface)', border: '1.5px solid var(--border)',
      borderRadius: '14px', padding: '16px 18px', maxWidth: '320px',
      boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
      animation: 'slideInRight 0.3s ease',
    }}>
      <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', marginBottom: '4px' }}>🔔 Enable Notifications</div>
      <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: '1.5' }}>
        Get instant alerts for new member requests, ride postings, and NGO activity announcements.
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={onGrant}
          style={{ flex: 1, padding: '9px', borderRadius: '9px', background: 'var(--primary)', border: 'none', color: 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
          Allow
        </button>
        <button onClick={onDismiss}
          style={{ padding: '9px 14px', borderRadius: '9px', background: 'var(--bg)', border: '1.5px solid var(--border)', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
          Later
        </button>
      </div>
      <style>{`@keyframes slideInRight { from { opacity:0; transform:translateX(20px) } to { opacity:1; transform:translateX(0) } }`}</style>
    </div>
  )
}

/* ─── SEED NOTIFICATIONS ─────────────────────────────── */
const seedNotifications = [
  makeNotification(NOTIF_TYPES.MEMBER_REQUEST, { title: 'New member request', body: 'Nikhil Sharma — referred by Rajesh Kumar', icon: '👤' }),
  makeNotification(NOTIF_TYPES.RIDE_POSTED,    { title: 'New ride posted', body: 'Rohit: LB Nagar → Gachibowli · 4 seats', icon: '🚗' }),
  makeNotification(NOTIF_TYPES.ACTIVITY_POSTED, { title: 'Village Ride this Sunday', body: 'Saraswathi Govt School, Medchal — drivers needed', icon: '🏫' }),
]

/* ─── APP ────────────────────────────────────────────── */
export default function App() {
  const [user,  setUser]  = useState(null)
  const [mode,  setMode]  = useState('visitor')
  const [theme, setTheme] = useState(() => localStorage.getItem('tr-theme') || 'light')
  const [notifications, setNotifications] = useState(seedNotifications)
  const [showPushBanner, setShowPushBanner] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('tr-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  const addNotification = useCallback((notif) => {
    setNotifications(prev => [notif, ...prev].slice(0, 50))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }, [])

  useEffect(() => {
    const unread = notifications.filter(n => n.unread).length
    updateAppBadge(unread)
  }, [notifications])

  const handleLogin = (u) => {
    setUser(u)
    setMode(u.role === 'admin' ? 'admin' : 'member')
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => setShowPushBanner(true), 1500)
    }
  }
  const handleLogout = () => {
    setUser(null)
    setMode('visitor')
    setShowPushBanner(false)
  }

  const handlePushGrant = async () => {
    const result = await requestPushPermission()
    if (result === 'granted') {
      showPushNotification('TechieRide Notifications Active', 'You\'ll now receive alerts for rides, activities, and member requests.')
    }
    setShowPushBanner(false)
    localStorage.setItem('tr-push-asked', '1')
  }

  const handlePushDismiss = () => {
    setShowPushBanner(false)
    localStorage.setItem('tr-push-asked', '1')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <NotificationContext.Provider value={{ notifications, addNotification, markAllRead }}>
        <BrowserRouter>
          {/* ── VISITOR ── */}
          {mode === 'visitor' && (
            <PublicLayout onLoginClick={() => setMode('login')}>
              <Routes>
                <Route path="/"           element={<Landing onLoginClick={() => setMode('login')} />} />
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
                {user.isModerator && (
                  <Route path="/moderator" element={<ModeratorDashboard user={user} />} />
                )}
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
                <Route path="/admin/reports"   element={<AdminReports />} />
                <Route path="*"                element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </AdminLayout>
          )}

          {/* ── GLOBAL OVERLAYS ── */}
          {showPushBanner && (
            <PushPermissionBanner onGrant={handlePushGrant} onDismiss={handlePushDismiss} />
          )}
          <InstallBanner />
        </BrowserRouter>
      </NotificationContext.Provider>
    </ThemeContext.Provider>
  )
}
