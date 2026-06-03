import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Car, Menu, X, Sun, Moon, Heart, MessageCircle } from 'lucide-react'
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

      {/* Sticky WhatsApp button */}
      <a href="https://wa.me/919876543210?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20TechieRide."
        target="_blank" rel="noopener noreferrer"
        style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999, background: '#25D366', color: 'white', padding: '12px 18px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '13px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.45)', transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <MessageCircle size={18} /> Chat with us
      </a>

      {/* Footer */}
      <footer style={{ background: '#0d3c55', color: '#94a3b8', padding: '40px 24px 20px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '28px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'rgba(20,161,175,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Car size={17} color="#14a1af" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#e2e8f0' }}>TechieRide</div>
                  <div style={{ fontSize: '9px', color: '#475569', letterSpacing: '0.8px' }}>FOR A BETTER SOCIETY</div>
                </div>
              </div>
              <p style={{ fontSize: '12.5px', lineHeight: '1.65', color: '#64748b', margin: '0 0 14px' }}>
                A community of Hyderabad professionals sharing rides, saving costs, and running welfare drives for society since 2014.
              </p>
              {/* Social / Contact chips */}
              <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 11px', borderRadius: '20px', background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.25)', color: '#4ade80', fontSize: '11.5px', fontWeight: '700', textDecoration: 'none' }}>
                  <MessageCircle size={12} /> WhatsApp
                </a>
                <a href="mailto:contact@techieride.in"
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 11px', borderRadius: '20px', background: 'rgba(20,161,175,0.12)', border: '1px solid rgba(20,161,175,0.2)', color: '#14a1af', fontSize: '11.5px', fontWeight: '700', textDecoration: 'none' }}>
                  ✉️ Email
                </a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#14a1af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Navigate</div>
              {links.map(l => (
                <div key={l.path} onClick={() => navigate(l.path)}
                  style={{ fontSize: '13px', color: '#64748b', marginBottom: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                  → {l.label}
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#14a1af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Organisation</div>
              {[
                ['Registration', 'No. 1947/2016'],
                ['Founded', '2014, Hyderabad'],
                ['Type', 'Non-Governmental Org.'],
                ['Coverage', 'Hyderabad, Telangana'],
                ['Funding', 'Member savings + donations'],
              ].map(([k, v]) => (
                <div key={k} style={{ fontSize: '12px', color: '#475569', marginBottom: '5px' }}>
                  <span style={{ color: '#64748b', fontWeight: '600' }}>{k}: </span><span style={{ color: '#94a3b8' }}>{v}</span>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#14a1af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Get In Touch</div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7', marginBottom: '14px' }}>
                New to TechieRide? Don't know anyone yet? Just message us — we'll introduce you to a member near you.
              </div>
              <a href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20join%20TechieRide."
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 16px', borderRadius: '8px', background: '#25D366', color: 'white', fontSize: '13px', fontWeight: '700', textDecoration: 'none', marginBottom: '8px' }}>
                <MessageCircle size={14} /> +91 98765 43210
              </a>
              <div style={{ fontSize: '12px', color: '#475569' }}>📧 contact@techieride.in</div>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>📍 Hyderabad, Telangana</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(148,163,184,0.08)', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#334155' }}>© 2024 TechieRide NGO · Reg. 1947/2016 · All rights reserved</span>
            <span style={{ fontSize: '12px', color: '#334155', fontStyle: 'italic' }}>"for a better society"</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
