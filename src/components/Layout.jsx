import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Car, History, Heart, Calendar, User, LogOut, Bell, Menu, X, ChevronRight } from 'lucide-react'

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
  const [collapsed, setCollapsed] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const notifs = [
    { id: 1, text: 'Vikram Singh posted a new ride: Gachibowli → LB Nagar', time: '10m ago', unread: true },
    { id: 2, text: 'Your pool request was accepted by Rajesh K.', time: '1h ago', unread: true },
    { id: 3, text: 'New announcement: Green Pledge Drive is live!', time: '3h ago', unread: false },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? '64px' : '220px', minHeight: '100vh',
        background: 'rgba(10,15,30,0.98)', borderRight: '1px solid rgba(148,163,184,0.07)',
        display: 'flex', flexDirection: 'column', transition: 'width 0.25s ease',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: collapsed ? '18px 14px' : '18px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(148,163,184,0.07)', minHeight: '64px' }}>
          <div className="gradient-bg" style={{ width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Car size={17} color="white" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '-0.3px' }} className="gradient-text">TechieRide</div>
              <div style={{ fontSize: '9px', color: '#334155', marginTop: '1px', letterSpacing: '1px' }}>COMMUNITY · HYD</div>
            </div>
          )}
        </div>

        {/* Member badge */}
        {!collapsed && (
          <div style={{ margin: '12px 10px 4px', padding: '10px 12px', borderRadius: '11px', background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(148,163,184,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <div className="gradient-bg" style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                {user.avatar}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '700', letterSpacing: '0.5px' }}>{user.id}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '7px', flexWrap: 'wrap' }}>
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
              <Icon size={17} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && location.pathname === path && <ChevronRight size={13} style={{ marginLeft: 'auto', opacity: 0.4 }} />}
            </div>
          ))}
        </nav>

        <div style={{ padding: '8px 8px', borderTop: '1px solid rgba(148,163,184,0.07)' }}>
          <div className="sidebar-link" onClick={onLogout}
            style={{ justifyContent: collapsed ? 'center' : 'flex-start', color: '#f87171' }}
            title={collapsed ? 'Logout' : ''}>
            <LogOut size={16} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Sign Out</span>}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: collapsed ? '64px' : '220px', transition: 'margin-left 0.25s ease', display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header style={{ height: '64px', background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(148,163,184,0.07)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '12px', position: 'sticky', top: 0, zIndex: 40 }}>
          <button onClick={() => setCollapsed(!collapsed)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <Menu size={19} />
          </button>

          <span style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>
            {nav.find(n => n.path === location.pathname)?.label || 'TechieRide'}
          </span>

          {/* Notif */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setNotifOpen(!notifOpen)}
              style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(148,163,184,0.1)', borderRadius: '10px', padding: '7px', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', position: 'relative' }}>
              <Bell size={17} />
              <div style={{ position: 'absolute', top: '5px', right: '5px', width: '7px', height: '7px', background: '#38bdf8', borderRadius: '50%', border: '1.5px solid #0a0f1e' }} />
            </button>
            {notifOpen && (
              <div className="glass" style={{ position: 'absolute', top: '46px', right: 0, width: '300px', borderRadius: '16px', padding: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 100 }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '10px', padding: '0 4px' }}>Notifications</div>
                {notifs.map(n => (
                  <div key={n.id} style={{ padding: '10px 12px', borderRadius: '10px', background: n.unread ? 'rgba(56,189,248,0.05)' : 'transparent', marginBottom: '4px', borderLeft: n.unread ? '2px solid #38bdf8' : '2px solid transparent' }}>
                    <div style={{ fontSize: '13px', color: '#e2e8f0', marginBottom: '2px' }}>{n.text}</div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="gradient-bg" onClick={() => navigate('/profile')}
            style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: 'white', cursor: 'pointer', flexShrink: 0 }}>
            {user.avatar}
          </div>
        </header>

        <main style={{ flex: 1, padding: '28px 24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
