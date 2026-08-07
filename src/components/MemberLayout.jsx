import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Car, History, Heart, User, LogOut, Bell, Menu, ChevronRight, Sun, Moon, DollarSign, Shield, X } from 'lucide-react'
import { useTheme, NotificationContext } from '../App'
import { formatNotifTime } from '../utils/notifications'

export default function MemberLayout({ children, user, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const { notifications, markAllRead } = useContext(NotificationContext)
  const unread = notifications.filter(n => n.unread).length

  const nav = [
    { path: '/dashboard',  label: 'My Dashboard',   icon: LayoutDashboard },
    { path: '/carpooling', label: 'Carpooling',      icon: Car },
    { path: '/my-pools',   label: 'My Pools',        icon: History },
    { path: '/activities', label: 'NGO Activities',  icon: Heart },
    { path: '/donate',     label: 'Donate',          icon: DollarSign },
    { path: '/profile',    label: 'My Profile',      icon: User },
    ...(user?.isModerator ? [{ path: '/moderator', label: 'Moderator', icon: Shield }] : []),
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: collapsed ? '64px' : '220px', minHeight: '100vh', background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', transition: 'width 0.22s ease', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, overflow: 'hidden', boxShadow: '2px 0 12px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: collapsed ? '16px 14px' : '16px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border)', minHeight: '64px' }}>
          <div className="primary-gradient" style={{ width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Car size={17} color="white" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.3px' }}>TechieRide</div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.8px', marginTop: '1px' }}>FOR A BETTER SOCIETY</div>
            </div>
          )}
        </div>

        {!collapsed && (
          <div style={{ margin: '10px 10px 4px', padding: '12px', borderRadius: '11px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '8px' }}>
              <div className="primary-gradient" style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                {user.avatar}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--primary)', fontWeight: '700' }}>{user.id}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {user.isRider && <span className="tag tag-blue" style={{ fontSize: '9px', padding: '2px 7px' }}>🚗 Rider</span>}
              {user.isSeekerActive && <span className="tag tag-green" style={{ fontSize: '9px', padding: '2px 7px' }}>🔍 Seeker</span>}
              {user.isModerator && <span className="tag tag-amber" style={{ fontSize: '9px', padding: '2px 7px' }}>🛡️ Mod</span>}
              {!user.isRider && !user.isSeekerActive && !user.isModerator && <span className="tag tag-amber" style={{ fontSize: '9px', padding: '2px 7px' }}>Member</span>}
            </div>
          </div>
        )}

        <nav style={{ flex: 1, padding: '8px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {nav.map(({ path, label, icon: Icon }) => (
            <div key={path}
              className={`sidebar-link ${location.pathname === path ? 'active' : ''}`}
              onClick={() => navigate(path)}
              title={collapsed ? label : ''}
              style={{ justifyContent: collapsed ? 'center' : 'flex-start', ...(path === '/moderator' && location.pathname !== '/moderator' ? { color: '#b45309' } : {}) }}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && location.pathname === path && <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.4 }} />}
            </div>
          ))}
        </nav>

        <div style={{ padding: '8px 8px', borderTop: '1px solid var(--border)' }}>
          <div className="sidebar-link" onClick={onLogout} style={{ justifyContent: collapsed ? 'center' : 'flex-start', color: '#dc2626' }}>
            <LogOut size={15} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Sign Out</span>}
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, marginLeft: collapsed ? '64px' : '220px', transition: 'margin-left 0.22s ease', display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '64px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '12px', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
          <button onClick={() => setCollapsed(!collapsed)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '6px', borderRadius: '8px' }}>
            <Menu size={18} />
          </button>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>
              {nav.find(n => n.path === location.pathname)?.label || 'TechieRide'}
            </span>
          </div>
          <button onClick={toggleTheme}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>
            {theme === 'light' ? <Moon size={13} /> : <Sun size={13} color="#fbbf24" />}
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>

          {/* Notification bell */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) markAllRead() }}
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '7px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', position: 'relative' }}>
              <Bell size={16} />
              {unread > 0 && (
                <div style={{ position: 'absolute', top: '3px', right: '3px', width: '16px', height: '16px', background: 'var(--primary)', borderRadius: '50%', border: '1.5px solid var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800', color: 'white' }}>
                  {unread > 9 ? '9+' : unread}
                </div>
              )}
            </button>
            {notifOpen && (
              <div className="card" style={{ position: 'absolute', top: '46px', right: 0, width: '300px', borderRadius: '14px', padding: '14px', zIndex: 200, boxShadow: 'var(--shadow-md)', maxHeight: '360px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Notifications</div>
                  <button onClick={() => setNotifOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={14} /></button>
                </div>
                {notifications.length === 0 && (
                  <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>No notifications yet</div>
                )}
                {notifications.map(n => (
                  <div key={n.id} style={{ padding: '10px 11px', borderRadius: '9px', background: n.unread ? 'var(--primary-light)' : 'transparent', marginBottom: '4px', borderLeft: n.unread ? '2.5px solid var(--primary)' : '2.5px solid transparent' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                      <span style={{ fontSize: '15px', flexShrink: 0 }}>{n.icon || '🔔'}</span>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text)' }}>{n.title}</div>
                        {n.body && <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>{n.body}</div>}
                        <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '4px' }}>{formatNotifTime(n.time)}</div>
                      </div>
                    </div>
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
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
