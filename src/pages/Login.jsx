import { useState } from 'react'
import { Car, User, Lock, Eye, EyeOff, ArrowRight, Info, Shield } from 'lucide-react'

const DEMO_MEMBERS = [
  { id: 'TR1001', name: 'Rajesh Kumar', role: 'member', area: 'Kondapur', avatar: 'RK', isRider: true, isSeekerActive: false },
  { id: 'TR1003', name: 'Vikram Singh', role: 'member', area: 'Gachibowli', avatar: 'VS', isRider: true, isSeekerActive: true },
  { id: 'TR1002', name: 'Priya Mehta', role: 'member', area: 'Madhapur', avatar: 'PM', isRider: false, isSeekerActive: true },
]

export default function Login({ onLogin }) {
  const [trId, setTrId] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDemo, setShowDemo] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    const id = trId.trim().toUpperCase()
    if (!id || !password) { setError('Please enter your TR ID and password'); return }
    if (!/^TR\d{4}$/.test(id) && id !== 'ADMIN') { setError('Invalid TR ID format. Use TRXXXX (e.g. TR1001)'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    if (id === 'ADMIN') {
      onLogin({ id: 'ADMIN', name: 'Admin', role: 'admin', avatar: 'AD' })
      return
    }
    const found = DEMO_MEMBERS.find(m => m.id === id)
    if (found) { onLogin(found); return }
    // any valid TRXXXX logs in as generic member
    onLogin({ id, name: 'Member ' + id, role: 'member', area: 'Hyderabad', avatar: id.slice(2, 4), isRider: false, isSeekerActive: false })
  }

  const quickLogin = async (member) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    setLoading(false)
    onLogin(member)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-150px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div className="gradient-bg" style={{ width: '46px', height: '46px', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={24} color="white" />
            </div>
            <span style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }} className="gradient-text">TechieRide</span>
          </div>
          <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>Community Carpooling • Hyderabad</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '8px', padding: '4px 10px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '20px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: '600' }}>NGO · Member Access Only</span>
          </div>
        </div>

        <div className="glass" style={{ borderRadius: '20px', padding: '32px', border: '1px solid rgba(148,163,184,0.08)' }}>
          <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700', color: '#f1f5f9' }}>Member Sign In</h2>
          <p style={{ margin: '0 0 24px', color: '#64748b', fontSize: '13px' }}>Use your TechieRide ID to sign in</p>

          {error && (
            <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '18px', color: '#f87171', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={14} /> {error}
            </div>
          )}

          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.3px', textTransform: 'uppercase' }}>TechieRide ID</label>
              <div style={{ position: 'relative' }}>
                <User size={15} color="#475569" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  value={trId} onChange={e => setTrId(e.target.value.toUpperCase())}
                  placeholder="TR1001 or ADMIN"
                  style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '10px', padding: '11px 14px 11px 38px', color: '#f1f5f9', fontSize: '14px', fontFamily: 'monospace', letterSpacing: '1px' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.3px', textTransform: 'uppercase' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="#475569" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '10px', padding: '11px 38px', color: '#f1f5f9', fontSize: '14px' }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 0 }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
              {loading
                ? <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                : <><span>Sign In</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ marginTop: '18px', padding: '12px', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.1)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', cursor: 'pointer' }} onClick={() => setShowDemo(!showDemo)}>
              <Info size={13} color="#38bdf8" />
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '600' }}>Demo quick login {showDemo ? '▲' : '▼'}</span>
            </div>
            {showDemo && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button onClick={() => quickLogin({ id: 'ADMIN', name: 'Admin', role: 'admin', avatar: 'AD' })}
                  style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', color: '#a78bfa', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={12} /> Admin Panel
                </button>
                {DEMO_MEMBERS.map(m => (
                  <button key={m.id} onClick={() => quickLogin(m)}
                    style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.1)', color: '#94a3b8', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{m.name}</span>
                    <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '700' }}>{m.id}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#334155' }}>
          Membership by reference only · <span style={{ color: '#475569' }}>Contact an existing member to join</span>
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
