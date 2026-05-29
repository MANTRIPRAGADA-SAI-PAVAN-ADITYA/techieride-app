import { useState } from 'react'
import { Car, User, Lock, Eye, EyeOff, ArrowRight, Info, Shield, Sun, Moon } from 'lucide-react'
import { useTheme } from '../App'

const DEMO_MEMBERS = [
  { id: 'TR1001', name: 'Rajesh Kumar', role: 'member', area: 'Kondapur', avatar: 'RK', isRider: true,  isSeekerActive: false },
  { id: 'TR1003', name: 'Vikram Singh', role: 'member', area: 'Gachibowli', avatar: 'VS', isRider: true, isSeekerActive: true },
  { id: 'TR1002', name: 'Priya Mehta',  role: 'member', area: 'Madhapur',  avatar: 'PM', isRider: false, isSeekerActive: true },
]

export default function Login({ onLogin }) {
  const { theme, toggleTheme } = useTheme()
  const [trId, setTrId]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [showDemo, setShowDemo] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    const id = trId.trim().toUpperCase()
    if (!id || !password) { setError('Please enter your TR ID and password'); return }
    if (!/^TR\d{4}$/.test(id) && id !== 'ADMIN') { setError('Invalid TR ID format. Use TRXXXX (e.g. TR1001)'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    if (id === 'ADMIN') { onLogin({ id: 'ADMIN', name: 'Admin', role: 'admin', avatar: 'AD' }); return }
    const found = DEMO_MEMBERS.find(m => m.id === id)
    if (found) { onLogin(found); return }
    onLogin({ id, name: 'Member ' + id, role: 'member', area: 'Hyderabad', avatar: id.slice(2,4), isRider: false, isSeekerActive: false })
  }

  const quickLogin = async (member) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    setLoading(false)
    onLogin(member)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative' }}>
      {/* Theme toggle top-right */}
      <button onClick={toggleTheme}
        style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '20px', border: '1.5px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>
        {theme === 'light' ? <Moon size={14} /> : <Sun size={14} color="#fbbf24" />}
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </button>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div className="primary-gradient" style={{ width: '46px', height: '46px', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={24} color="white" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="gradient-text" style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>TechieRide</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '-2px', letterSpacing: '0.3px' }}>for a better society</div>
            </div>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 12px', background: 'var(--primary-light)', border: '1.5px solid rgba(20,161,175,0.3)', borderRadius: '20px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
            <span style={{ fontSize: '11px', color: 'var(--primary-dark)', fontWeight: '700' }}>NGO · Member Access Only · Hyderabad</span>
          </div>
        </div>

        <div className="card" style={{ borderRadius: '18px', padding: '28px' }}>
          <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: 'var(--text)' }}>Member Sign In</h2>
          <p style={{ margin: '0 0 22px', color: 'var(--text-muted)', fontSize: '13px' }}>Use your TechieRide ID to sign in</p>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '10px 13px', marginBottom: '16px', color: '#b91c1c', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Info size={13} /> {error}
            </div>
          )}

          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '5px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>TechieRide ID</label>
              <div style={{ position: 'relative' }}>
                <User size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input className="input" value={trId} onChange={e => setTrId(e.target.value.toUpperCase())}
                  placeholder="TR1001 or ADMIN"
                  style={{ paddingLeft: '36px', fontFamily: 'monospace', letterSpacing: '1.5px', fontWeight: '700' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '5px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input className="input" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" style={{ paddingLeft: '36px', paddingRight: '38px' }} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: '11px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ width: '100%', padding: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
              {loading ? <div className="spinner" /> : <><span>Sign In</span><ArrowRight size={15} /></>}
            </button>
          </form>

          {/* Demo */}
          <div style={{ marginTop: '16px', padding: '12px', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '11px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginBottom: showDemo ? '10px' : '0' }} onClick={() => setShowDemo(!showDemo)}>
              <Info size={12} color="var(--primary)" />
              <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700' }}>Demo quick login {showDemo ? '▲' : '▼'}</span>
            </div>
            {showDemo && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button onClick={() => quickLogin({ id: 'ADMIN', name: 'Admin', role: 'admin', avatar: 'AD' })}
                  style={{ padding: '8px 11px', borderRadius: '8px', background: 'var(--primary-light)', border: '1.5px solid rgba(20,161,175,0.25)', color: 'var(--primary-dark)', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={12} /> Admin Panel
                </button>
                {DEMO_MEMBERS.map(m => (
                  <button key={m.id} onClick={() => quickLogin(m)}
                    style={{ padding: '8px 11px', borderRadius: '8px', background: 'var(--surface2)', border: '1.5px solid var(--border-soft)', color: 'var(--text-2)', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{m.name}</span>
                    <span style={{ fontFamily: 'monospace', color: 'var(--primary)', fontWeight: '700' }}>{m.id}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '12px', color: 'var(--text-muted)' }}>
          Membership by reference only · Contact an existing member to join
        </p>
      </div>
    </div>
  )
}
