import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Car, Menu, X, Sun, Moon, Heart } from 'lucide-react'
import { useTheme } from '../App'

export default function PublicLayout({ children, onLoginClick }) {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { path: '/',           label: 'Home' },
    { path: '/activities', label: 'Our Activities' },
    { path: '/donate',     label: 'Donate' },
    { path: '/register',   label: 'Join Us' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Logo */}
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}>
            <div className="primary-gradient" style={{ width: '36px', height: '36px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={18} color="white" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.3px', lineHeight: 1 }}>TechieRide</div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.8px', lineHeight: 1, marginTop: '1px' }}>FOR A BETTER SOCIETY</div>
            </div>
          </div>

          {/* Desktop links */}
          <nav style={{ display: 'flex', gap: '4px', flex: 1 }}>
            {links.map(l => (
              <button key={l.path} onClick={() => navigate(l.path)}
                style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', background: location.pathname === l.path ? 'var(--primary-light)' : 'transparent', color: location.pathname === l.path ? 'var(--primary)' : 'var(--text-2)', fontSize: '13.5px', fontWeight: location.pathname === l.path ? '700' : '500', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { if (location.pathname !== l.path) e.currentTarget.style.background = 'var(--bg2)' }}
                onMouseLeave={e => { if (location.pathname !== l.path) e.currentTarget.style.background = 'transparent' }}>
                {l.label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button onClick={toggleTheme}
              style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} color="#fbbf24" />}
            </button>
            <button onClick={() => navigate('/donate')}
              style={{ padding: '8px 14px', borderRadius: '8px', border: '1.5px solid var(--primary)', background: 'transparent', color: 'var(--primary)', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Heart size={13} /> Donate
            </button>
            <button onClick={onLoginClick}
              style={{ padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', border: 'none', background: 'var(--primary)', color: 'white' }}>
              Member Login
            </button>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: '#0d3c55', color: '#94a3b8', padding: '32px 24px 20px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '28px', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(20,161,175,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Car size={16} color="#14a1af" />
                </div>
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#e2e8f0' }}>TechieRide</span>
              </div>
              <p style={{ fontSize: '12.5px', lineHeight: '1.6', color: '#64748b', margin: 0 }}>An NGO started in 2014 by techies from Hyderabad. Carpooling + social welfare for a better society.</p>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#14a1af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Quick Links</div>
              {links.map(l => <div key={l.path} onClick={() => navigate(l.path)} style={{ fontSize: '13px', color: '#64748b', marginBottom: '5px', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>{l.label}</div>)}
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#14a1af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Legal & Info</div>
              {[['Registration No.', '1947/2016'], ['Founded', '2014, Hyderabad'], ['Type', 'Non-Governmental Org.'], ['Area', 'Hyderabad, Telangana']].map(([k, v]) => (
                <div key={k} style={{ fontSize: '12px', color: '#475569', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b', fontWeight: '600' }}>{k}: </span>{v}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#14a1af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Contact</div>
              <div style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '1.7' }}>
                Membership by reference only.<br />
                Contact an existing member to get referred and apply.
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(148,163,184,0.1)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#334155' }}>© 2024 TechieRide NGO · Reg. 1947/2016</span>
            <span style={{ fontSize: '12px', color: '#334155' }}>for a better society</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
