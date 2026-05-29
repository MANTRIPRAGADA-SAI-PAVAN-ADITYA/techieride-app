import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Heart, Car, LogOut, Shield, Menu } from 'lucide-react'
import { useState } from 'react'

const nav = [
  { path: '/admin',          label: 'Overview',    icon: LayoutDashboard },
  { path: '/admin/members',  label: 'Members',     icon: Users },
  { path: '/admin/rides',    label: 'Rides',       icon: Car },
  { path: '/admin/content',  label: 'NGO Content', icon: Heart },
]

export default function AdminLayout({ children, user, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e' }}>
      <aside style={{ width: collapsed ? '64px' : '210px', minHeight: '100vh', background: 'rgba(10,15,30,0.98)', borderRight: '1px solid rgba(167,139,250,0.1)', display: 'flex', flexDirection: 'column', transition: 'width 0.22s ease', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, overflow: 'hidden' }}>
        <div style={{ padding: collapsed ? '18px 14px' : '18px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(167,139,250,0.1)', minHeight: '64px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={17} color="white" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#a78bfa' }}>Admin Panel</div>
              <div style={{ fontSize: '9px', color: '#334155', letterSpacing: '1px' }}>TECHIERIDE NGO</div>
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
              <Icon size={17} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
            </div>
          ))}
        </nav>

        <div style={{ padding: '8px', borderTop: '1px solid rgba(148,163,184,0.07)' }}>
          <div className="sidebar-link" onClick={onLogout} style={{ justifyContent: collapsed ? 'center' : 'flex-start', color: '#f87171' }}>
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, marginLeft: collapsed ? '64px' : '210px', transition: 'margin-left 0.22s ease', display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '64px', background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(167,139,250,0.08)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '14px', position: 'sticky', top: 0, zIndex: 40 }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', padding: '6px', borderRadius: '8px' }}>
            <Menu size={18} />
          </button>
          <span style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: '#a78bfa' }}>
            TechieRide — Admin Panel
          </span>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: 'white' }}>
            AD
          </div>
        </header>
        <main style={{ flex: 1, padding: '28px 24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
