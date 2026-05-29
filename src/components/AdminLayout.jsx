import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Heart, Car, LogOut, Shield, Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '../App'

const nav = [
  { path: '/admin',         label: 'Overview',    icon: LayoutDashboard },
  { path: '/admin/members', label: 'Members',     icon: Users },
  { path: '/admin/rides',   label: 'Rides',       icon: Car },
  { path: '/admin/content', label: 'NGO Content', icon: Heart },
]

export default function AdminLayout({ children, user, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: collapsed ? '64px' : '210px', minHeight: '100vh', background: 'var(--surface)', borderRight: '1.5px solid var(--border)', display: 'flex', flexDirection: 'column', transition: 'width 0.22s ease', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <div style={{ padding: collapsed ? '16px 14px' : '16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1.5px solid var(--border)', minHeight: '62px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(135deg, var(--primary), #0d3c55)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={17} color="white" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-dark)' }}>Admin Panel</div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '1px' }}>TECHIERIDE NGO</div>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {nav.map(({ path, label, icon: Icon }) => (
            <div key={path}
              className={`sidebar-link ${location.pathname === path ? 'active' : ''}`}
              onClick={() => navigate(path)}
              style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
              title={collapsed ? label : ''}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
            </div>
          ))}
        </nav>

        <div style={{ padding: '8px', borderTop: '1.5px solid var(--border)' }}>
          <div className="sidebar-link" onClick={onLogout} style={{ justifyContent: collapsed ? 'center' : 'flex-start', color: '#dc2626' }}>
            <LogOut size={15} />
            {!collapsed && <span>Sign Out</span>}
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, marginLeft: collapsed ? '64px' : '210px', transition: 'margin-left 0.22s ease', display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '62px', background: 'var(--surface)', backdropFilter: 'blur(12px)', borderBottom: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '12px', position: 'sticky', top: 0, zIndex: 40, boxShadow: 'var(--shadow)' }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '6px', borderRadius: '8px' }}>
            <Menu size={18} />
          </button>
          <span style={{ flex: 1, fontSize: '14px', fontWeight: '700', color: 'var(--primary-dark)' }}>TechieRide — Admin</span>

          <button onClick={toggleTheme}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', border: '1.5px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>
            {theme === 'light' ? <Moon size={13} /> : <Sun size={13} color="#fbbf24" />}
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>

          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #0d3c55)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: 'white' }}>AD</div>
        </header>
        <main style={{ flex: 1, padding: '24px 20px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
