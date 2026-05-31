import { useState } from 'react'
import { Heart, CheckCircle, Users, Leaf, BookOpen, Droplets, ArrowRight, Shield } from 'lucide-react'
import { activities } from '../../data/mockData'

const AMOUNTS = [100, 250, 500, 1000, 2500, 5000]

export default function Donate({ member }) {
  const [selected, setSelected]  = useState(500)
  const [custom, setCustom]      = useState('')
  const [purpose, setPurpose]    = useState('general')
  const [name, setName]          = useState('')
  const [email, setEmail]        = useState('')
  const [phone, setPhone]        = useState('')
  const [done, setDone]          = useState(false)
  const [loading, setLoading]    = useState(false)

  const amount = custom ? parseInt(custom) || 0 : selected

  const submit = async () => {
    if (!name || !email || amount < 10) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setDone(true)
  }

  const INP = { width: '100%', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '11px 14px', color: 'var(--text)', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }

  if (done) return (
    <div style={{ maxWidth: '520px', margin: '60px auto', textAlign: 'center', padding: '0 24px' }}>
      <div className="card" style={{ borderRadius: '20px', padding: '48px 36px' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <CheckCircle size={34} color="#15803d" />
        </div>
        <h2 style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: '900', color: 'var(--text)' }}>Thank You, {name}! 🙏</h2>
        <p style={{ margin: '0 0 6px', fontSize: '16px', color: 'var(--text-2)' }}>
          Your donation of <strong style={{ color: 'var(--primary)' }}>₹{amount.toLocaleString()}</strong> has been received.
        </p>
        <p style={{ margin: '0 0 24px', fontSize: '14px', color: 'var(--text-muted)' }}>A confirmation will be sent to {email}. Your contribution directly funds TechieRide's community welfare activities.</p>
        <div style={{ padding: '14px', borderRadius: '11px', background: 'var(--primary-light)', border: '1px solid rgba(20,161,175,0.2)', fontSize: '13px', color: 'var(--primary-dark)', fontWeight: '600' }}>
          TechieRide NGO · Reg. 1947/2016 · Hyderabad
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Heart size={36} color="var(--primary)" style={{ marginBottom: '12px' }} />
        <h1 style={{ margin: '0 0 10px', fontSize: '38px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px' }}>Support TechieRide NGO</h1>
        <p style={{ margin: 0, fontSize: '16px', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto' }}>Every contribution goes directly to community welfare — school drives, blood camps, water distribution and more.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        {/* Left — impact info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '17px', fontWeight: '800', color: 'var(--text)' }}>Where your donation goes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activities.map(a => (
                <div key={a.id} style={{ display: 'flex', gap: '13px', alignItems: 'center', padding: '13px', borderRadius: '11px', background: a.bg, border: `1px solid ${a.color}18` }}>
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>{a.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{a.participantsNeeded}</div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: a.color, background: 'white', padding: '3px 9px', borderRadius: '20px', flexShrink: 0 }}>{a.impact}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Shield size={18} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: 'var(--text)' }}>Your donation is safe & transparent</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[['Registered NGO', '1947/2016'], ['Founded', '2014'], ['Location', 'Hyderabad'], ['Model', '100% community-funded']].map(([k, v]) => (
                <div key={k} style={{ padding: '10px 12px', borderRadius: '9px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '2px' }}>{k}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — donation form */}
        <div className="card" style={{ borderRadius: '18px', padding: '28px', position: 'sticky', top: '80px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: 'var(--text)' }}>Make a Donation</h3>

          {/* Purpose */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '7px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Donate Towards</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { id: 'general',   label: 'General NGO Fund',       sub: 'Admin decides best use' },
                { id: 'village',   label: 'Village Ride — Schools',  sub: 'Education support' },
                { id: 'water',     label: 'Free Water Camp',         sub: 'Summer welfare' },
                { id: 'vidya',     label: 'VidyaNidhi Education',    sub: 'Student sponsorship' },
              ].map(p => (
                <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: purpose === p.id ? 'var(--primary-light)' : 'var(--bg)', border: `1.5px solid ${purpose === p.id ? 'rgba(20,161,175,0.35)' : 'var(--border)'}`, cursor: 'pointer', transition: 'all 0.15s' }}>
                  <input type="radio" checked={purpose === p.id} onChange={() => setPurpose(p.id)} style={{ accentColor: 'var(--primary)', width: '15px', height: '15px' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{p.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.sub}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '7px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Amount (₹)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '7px', marginBottom: '8px' }}>
              {AMOUNTS.map(a => (
                <button key={a} onClick={() => { setSelected(a); setCustom('') }}
                  style={{ padding: '9px', borderRadius: '9px', border: `1.5px solid ${selected === a && !custom ? 'var(--primary)' : 'var(--border)'}`, background: selected === a && !custom ? 'var(--primary-light)' : 'var(--bg)', color: selected === a && !custom ? 'var(--primary)' : 'var(--text-2)', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.15s' }}>
                  ₹{a >= 1000 ? (a / 1000) + 'k' : a}
                </button>
              ))}
            </div>
            <input value={custom} onChange={e => setCustom(e.target.value.replace(/\D/, ''))} placeholder="Or enter custom amount"
              style={{ ...INP, textAlign: 'center', fontWeight: '700', fontSize: '16px' }} />
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
            {[['Name *', name, v => setName(v), 'Your full name'],['Email *', email, v => setEmail(v), 'email@example.com'],['Phone', phone, v => setPhone(v), '+91 XXXXX XXXXX']].map(([l, val, set, ph]) => (
              <div key={l}>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{l}</label>
                <input value={val} onChange={e => set(e.target.value)} placeholder={ph} style={INP} />
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Donation amount</span>
            <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary)' }}>₹{(amount || 0).toLocaleString()}</span>
          </div>

          <button className="btn-primary" onClick={submit} disabled={!name || !email || amount < 10 || loading}
            style={{ width: '100%', padding: '13px', borderRadius: '11px', fontSize: '15px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {loading ? <div className="spinner" /> : <><Heart size={16} /> Donate ₹{(amount || 0).toLocaleString()} Now</>}
          </button>

          <p style={{ margin: '10px 0 0', fontSize: '11.5px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
            🔒 Demo only — no real payment processed. TechieRide NGO Reg. 1947/2016
          </p>
        </div>
      </div>
    </div>
  )
}
