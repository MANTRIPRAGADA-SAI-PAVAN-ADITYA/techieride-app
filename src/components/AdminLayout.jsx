import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Heart, Car, LogOut, Shield, Menu, Sun, Moon, DollarSign } from 'lucide-react'
import { useTheme } from '../App'

const nav = [
  { path: '/admin/dashboard', label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/admin/members',   label: 'Members',      icon: Users },
  { path: '/admin/rides',     label: 'Rides',        icon: Car },
  { path: '/admin/content',   label: 'NGO Content',  icon: Heart },
  { path: '/admin/donate',    label: 'Donations',    icon: DollarSign },
]

export default function AdminLayout({ children, user, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: collapsed ? '64px' : '215px', minHeight: '100vh', background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', transition: 'width 0.22s ease', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, overflow: 'hidden', boxShadow: '2px 0 10px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: collapsed ? '16px 14px' : '16px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border)', minHeight: '64px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(135deg, var(--primary), #0d3c55)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={17} color="white" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-dark)' }}>Admin Panel</div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>TECHIERIDE NGO</div>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
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

        <div style={{ padding: '8px', borderTop: '1px solid var(--border)' }}>
          <div className="sidebar-link" onClick={onLogout} style={{ justifyContent: collapsed ? 'center' : 'flex-start', color: '#dc2626' }}>
            <LogOut size={15} />
            {!collapsed && <span>Sign Out</span>}
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, marginLeft: collapsed ? '64px' : '215px', transition: 'margin-left 0.22s ease', display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '64px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '12px', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '6px', borderRadius: '8px' }}>
            <Menu size={18} />
          </button>
          <span style={{ flex: 1, fontSize: '14px', fontWeight: '700', color: 'var(--primary-dark)' }}>
            {nav.find(n => n.path === location.pathname)?.label || 'Admin'}
          </span>
          <button onClick={toggleTheme}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>
            {theme === 'light' ? <Moon size={13} /> : <Sun size={13} color="#fbbf24" />}
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #0d3c55)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: 'white' }}>AD</div>
        </header>
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
