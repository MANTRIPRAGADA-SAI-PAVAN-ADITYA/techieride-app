import { useState } from 'react'
import { Car, Users, Search, ChevronDown, ChevronUp, Leaf, Phone } from 'lucide-react'
import { rides } from '../data/mockData'

const myHistory = [
  { id: 'H1', from: 'Kondapur', to: 'Secunderabad', date: '2026-05-25', time: '09:00', riderName: 'Rajesh Kumar', vehicle: 'Swift Dzire • TS 09 AB 1234', poolmates: ['Neha S.', 'Amit R.'], co2: '3.2 kg', role: 'seeker' },
  { id: 'H2', from: 'Gachibowli', to: 'LB Nagar', date: '2026-05-22', time: '08:30', riderName: 'Vikram Singh', vehicle: 'Honda City • TS 10 CD 5678', poolmates: ['Anita R.'], co2: '4.1 kg', role: 'seeker' },
  { id: 'H3', from: 'KPHB', to: 'Hitech City', date: '2026-05-20', time: '08:00', riderName: 'You (Arjun N.)', vehicle: 'Tata Nexon • TS 07 GH 3456', poolmates: ['Priya M.', 'Suresh B.'], co2: '2.8 kg', role: 'rider' },
]

export default function MyRides({ user }) {
  const [tab, setTab] = useState('history')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  const myPosted = rides.filter(r => r.riderId === user?.id)
  const myRequested = rides.filter(r => r.seekers?.includes(user?.id))

  const filtered = myHistory.filter(r => {
    const q = search.toLowerCase()
    return !q || r.from.toLowerCase().includes(q) || r.to.toLowerCase().includes(q) || r.riderName.toLowerCase().includes(q)
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: '#f1f5f9' }}>My Pools</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Your carpool activity — rides offered, joined, and history</p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
        {[
          { label: 'Pools Joined', value: myHistory.filter(r => r.role === 'seeker').length, color: '#38bdf8' },
          { label: 'Rides Offered', value: myHistory.filter(r => r.role === 'rider').length, color: '#4ade80' },
          { label: 'CO₂ Saved', value: '10.1 kg', color: '#a78bfa' },
          { label: 'Active Requests', value: myRequested.length, color: '#fbbf24' },
        ].map(s => (
          <div key={s.label} className="glass" style={{ borderRadius: '13px', padding: '16px', border: '1px solid rgba(148,163,184,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', background: 'rgba(15,23,42,0.8)', borderRadius: '13px', padding: '4px', border: '1px solid rgba(71,85,105,0.2)', width: 'fit-content' }}>
        {[
          { id: 'history', label: '📋 History' },
          { id: 'posted', label: '🚗 My Posted Rides' },
          { id: 'requested', label: '🔍 Requested' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', border: 'none', background: tab === t.id ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'transparent', color: tab === t.id ? 'white' : '#64748b', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* History */}
      {tab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="#475569" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search history…"
              style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.35)', borderRadius: '11px', padding: '10px 14px 10px 34px', color: '#f1f5f9', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          {filtered.map(r => (
            <div key={r.id} className="glass" style={{ borderRadius: '14px', border: '1px solid rgba(148,163,184,0.08)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 17px', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center' }} onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: r.role === 'rider' ? 'rgba(74,222,128,0.12)' : 'rgba(56,189,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {r.role === 'rider' ? <Car size={18} color="#4ade80" /> : <Users size={18} color="#38bdf8" />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#f1f5f9' }}>{r.from} → {r.to}</span>
                    <span className={r.role === 'rider' ? 'tag tag-green' : 'tag tag-blue'} style={{ fontSize: '10px' }}>
                      {r.role === 'rider' ? '🚗 Offered' : '🔍 Joined'}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>{r.date} at {r.time} · {r.poolmates.length} poolmate{r.poolmates.length !== 1 ? 's' : ''}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                  <Leaf size={12} color="#4ade80" />
                  <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: '600' }}>{r.co2}</span>
                </div>
                {expanded === r.id ? <ChevronUp size={14} color="#475569" /> : <ChevronDown size={14} color="#475569" />}
              </div>
              {expanded === r.id && (
                <div style={{ padding: '0 17px 14px', borderTop: '1px solid rgba(148,163,184,0.06)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '9px', marginTop: '12px' }}>
                    {[
                      { label: 'Vehicle', value: r.vehicle },
                      { label: 'Poolmates', value: r.poolmates.join(', ') },
                      { label: 'CO₂ Saved', value: r.co2 },
                    ].map(d => (
                      <div key={d.label} style={{ background: 'rgba(15,23,42,0.5)', borderRadius: '9px', padding: '10px 12px' }}>
                        <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: '3px' }}>{d.label}</div>
                        <div style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>{d.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: '#475569', fontSize: '14px' }}>No history found.</div>}
        </div>
      )}

      {/* Posted rides */}
      {tab === 'posted' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {myPosted.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#475569', fontSize: '14px' }}>
              You haven't posted any rides yet.<br />
              <span style={{ color: '#38bdf8', cursor: 'pointer' }}>Go to Carpooling → Offer a Ride</span>
            </div>
          ) : myPosted.map(r => (
            <div key={r.id} className="glass" style={{ borderRadius: '14px', padding: '16px 18px', border: '1px solid rgba(74,222,128,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9' }}>{r.origin} → {r.destination}</span>
                <span className="tag tag-green" style={{ fontSize: '10px' }}>{r.status}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>{r.date} at {r.time} · {r.seatsTotal - r.seatsFilled} seats free</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}><strong>Route:</strong> {r.route}</div>
              {r.seekers.length > 0 && (
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#38bdf8' }}>
                  {r.seekers.length} member{r.seekers.length !== 1 ? 's' : ''} requested to join: {r.seekers.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Requested */}
      {tab === 'requested' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {myRequested.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#475569', fontSize: '14px' }}>
              You haven't requested to join any rides yet.
            </div>
          ) : myRequested.map(r => (
            <div key={r.id} className="glass" style={{ borderRadius: '14px', padding: '16px 18px', border: '1px solid rgba(56,189,248,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9', marginBottom: '5px' }}>{r.origin} → {r.destination}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{r.riderName} · {r.date} at {r.time}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{r.vehicle}</div>
                </div>
                <a href={`tel:${r.riderPhone}`} style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', color: '#38bdf8', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                  <Phone size={13} /> Contact Rider
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
