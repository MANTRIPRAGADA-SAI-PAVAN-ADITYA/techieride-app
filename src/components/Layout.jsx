import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Car, History, Heart, Calendar, User, LogOut, Bell, Menu, ChevronRight, Sun, Moon } from 'lucide-react'
import { useTheme } from '../App'

const nav = [
  { path: '/dashboard',  label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/carpooling', label: 'Carpooling',    icon: Car },
  { path: '/rides',      label: 'My Pools',      icon: History },
  { path: '/activities', label: 'NGO Activities',icon: Heart },
  { path: '/schedule',   label: 'Schedule',      icon: Calendar },
  { path: '/profile',    label: 'My Profile',    icon: User },
]

export default function Layout({ children, user, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const notifs = [
    { id: 1, text: 'Vikram posted a ride: Gachibowli → LB Nagar', time: '10m ago', unread: true },
    { id: 2, text: 'Your pool request was accepted by Rajesh K.', time: '1h ago', unread: true },
    { id: 3, text: 'Village Ride this Sunday — drivers needed!', time: '3h ago', unread: false },
  ]

  const S = {
    sidebar: {
      width: collapsed ? '64px' : '215px',
      minHeight: '100vh',
      background: 'var(--surface)',
      borderRight: '1.5px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.23s ease',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, overflow: 'hidden',
      boxShadow: 'var(--shadow)',
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={S.sidebar}>
        {/* Logo */}
        <div style={{ padding: collapsed ? '16px 14px' : '16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1.5px solid var(--border)', minHeight: '62px' }}>
          <div className="primary-gradient" style={{ width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Car size={17} color="white" />
          </div>
          {!collapsed && (
            <div>
              <div className="gradient-text" style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '-0.3px' }}>TechieRide</div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '1px', marginTop: '1px' }}>FOR A BETTER SOCIETY</div>
            </div>
          )}
        </div>

        {/* Member badge */}
        {!collapsed && (
          <div style={{ margin: '10px 9px 4px', padding: '10px 11px', borderRadius: '11px', background: 'var(--bg)', border: '1.5px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="primary-gradient" style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                {user.avatar}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.5px' }}>{user.id}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
              {user.isRider && <span className="tag tag-blue" style={{ fontSize: '9px', padding: '2px 7px' }}>🚗 Rider</span>}
              {user.isSeekerActive && <span className="tag tag-green" style={{ fontSize: '9px', padding: '2px 7px' }}>🔍 Seeker</span>}
              {!user.isRider && !user.isSeekerActive && <span className="tag tag-amber" style={{ fontSize: '9px', padding: '2px 7px' }}>Member</span>}
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {nav.map(({ path, label, icon: Icon }) => (
            <div key={path}
              className={`sidebar-link ${location.pathname === path ? 'active' : ''}`}
              onClick={() => navigate(path)}
              title={collapsed ? label : ''}
              style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && location.pathname === path && <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.4 }} />}
            </div>
          ))}
        </nav>

        <div style={{ padding: '8px 8px', borderTop: '1.5px solid var(--border)' }}>
          <div className="sidebar-link" onClick={onLogout} style={{ justifyContent: collapsed ? 'center' : 'flex-start', color: '#dc2626' }} title={collapsed ? 'Sign Out' : ''}>
            <LogOut size={15} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Sign Out</span>}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: collapsed ? '64px' : '215px', transition: 'margin-left 0.23s ease', display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header style={{ height: '62px', background: 'var(--surface)', borderBottom: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '10px', position: 'sticky', top: 0, zIndex: 40, boxShadow: 'var(--shadow)' }}>
          <button onClick={() => setCollapsed(!collapsed)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <Menu size={18} />
          </button>

          <span style={{ flex: 1, fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>
            {nav.find(n => n.path === location.pathname)?.label || 'TechieRide'}
          </span>

          {/* Theme toggle */}
          <button onClick={toggleTheme}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 13px', borderRadius: '20px', border: '1.5px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', transition: 'all 0.18s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} color="#fbbf24" />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          {/* Notif */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setNotifOpen(!notifOpen)}
              style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '7px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', position: 'relative', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
              <Bell size={16} />
              <div style={{ position: 'absolute', top: '5px', right: '5px', width: '7px', height: '7px', background: 'var(--primary)', borderRadius: '50%', border: '1.5px solid var(--surface)' }} />
            </button>
            {notifOpen && (
              <div className="card" style={{ position: 'absolute', top: '46px', right: 0, width: '290px', borderRadius: '14px', padding: '12px', boxShadow: 'var(--shadow-md)', zIndex: 100 }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Notifications</div>
                {notifs.map(n => (
                  <div key={n.id} style={{ padding: '9px 10px', borderRadius: '9px', background: n.unread ? 'var(--primary-light)' : 'transparent', marginBottom: '3px', borderLeft: n.unread ? '2.5px solid var(--primary)' : '2.5px solid transparent' }}>
                    <div style={{ fontSize: '12.5px', color: 'var(--text)', marginBottom: '2px' }}>{n.text}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="primary-gradient" onClick={() => navigate('/profile')}
            style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: 'white', cursor: 'pointer', flexShrink: 0 }}>
            {user.avatar}
          </div>
        </header>

        <main style={{ flex: 1, padding: '22px 20px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
