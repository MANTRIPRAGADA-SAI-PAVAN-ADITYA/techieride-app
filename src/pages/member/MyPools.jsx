import { useState } from 'react'
import { Car, Users, Leaf, Phone, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { rides, members } from '../../data/mockData'

export default function MyPools({ user }) {
  const [tab, setTab]       = useState('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  const asRider  = rides.filter(r => r.riderId === user?.id)
  const asSeeker = rides.filter(r => r.seekers?.includes(user?.id))

  const all = tab === 'rider' ? asRider : tab === 'seeker' ? asSeeker : [...asRider, ...asSeeker]
  const filtered = all.filter(r => {
    const q = search.toLowerCase()
    return !q || r.origin.toLowerCase().includes(q) || r.destination.toLowerCase().includes(q)
  })

  // Unique poolmates across all rides
  const poolmateIds = new Set()
  asRider.forEach(r => r.seekers?.forEach(id => poolmateIds.add(id)))
  asSeeker.forEach(r => poolmateIds.add(r.riderId))
  poolmateIds.delete(user?.id)
  const poolmates = [...poolmateIds].map(id => members.find(m => m.id === id)).filter(Boolean)

  const totalCO2 = (asRider.length + asSeeker.length) * 3

  const tabs = [
    { id: 'all',    label: `All (${asRider.length + asSeeker.length})` },
    { id: 'rider',  label: `As Rider (${asRider.length})` },
    { id: 'seeker', label: `As Seeker (${asSeeker.length})` },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '780px' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '900', color: 'var(--text)' }}>My Pools</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>Your complete carpooling history and poolmate connections</p>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
        {[
          { label: 'Rides Offered',  value: asRider.length,  color: 'var(--primary)', show: user.isRider },
          { label: 'Rides Joined',   value: asSeeker.length, color: '#15803d',         show: true },
          { label: 'Unique Poolmates',value: poolmates.length,color: '#6d28d9',         show: true },
          { label: 'CO₂ Saved (est)',value: `${totalCO2} kg`,color: '#0369a1',         show: true },
        ].filter(s => s.show).map(s => (
          <div key={s.label} className="card" style={{ padding: '16px', borderRadius: '13px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '600' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Poolmates */}
      {poolmates.length > 0 && (
        <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Users size={14} color="var(--primary)" /> My Poolmates ({poolmates.length})
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {poolmates.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="primary-gradient" style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                  {p.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{p.area}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rides list */}
      <div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rides…"
              style={{ width: '100%', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '9px 13px 9px 32px', color: 'var(--text)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: '0', background: 'var(--bg)', borderRadius: '10px', padding: '3px', border: '1.5px solid var(--border)' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ padding: '7px 13px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', border: 'none', background: tab === t.id ? 'var(--primary)' : 'transparent', color: tab === t.id ? 'white' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '13px' }}>No rides found.</div>}
          {filtered.map(r => {
            const isDriver = r.riderId === user?.id
            const seatsLeft = r.seatsTotal - r.seatsFilled
            return (
              <div key={r.id} className="card" style={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${isDriver ? 'rgba(20,161,175,0.2)' : 'rgba(34,197,94,0.2)'}` }}>
                <div style={{ padding: '14px 17px', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center' }} onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDriver ? 'var(--primary-light)' : 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {isDriver ? <Car size={17} color="var(--primary)" /> : <Users size={17} color="#15803d" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text)' }}>{r.origin} → {r.destination}</span>
                      <span className={isDriver ? 'tag tag-blue' : 'tag tag-green'} style={{ fontSize: '9px' }}>{isDriver ? '🚗 Driver' : '🔍 Seeker'}</span>
                      <span className={`tag ${r.status === 'open' ? 'tag-green' : 'tag-amber'}`} style={{ fontSize: '9px' }}>{r.status}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{r.date} {r.time} · {r.vehicle}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Leaf size={11} color="#15803d" />
                    <span style={{ fontSize: '11px', color: '#15803d', fontWeight: '700' }}>~3 kg CO₂</span>
                    {expanded === r.id ? <ChevronUp size={14} color="var(--text-muted)" style={{ marginLeft: '6px' }} /> : <ChevronDown size={14} color="var(--text-muted)" style={{ marginLeft: '6px' }} />}
                  </div>
                </div>
                {expanded === r.id && (
                  <div style={{ padding: '0 17px 14px', borderTop: '1px solid var(--border-soft)' }}>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: '12px 0 8px', background: 'var(--bg)', padding: '9px 12px', borderRadius: '9px', border: '1px solid var(--border-soft)' }}>
                      <strong>Route:</strong> {r.route}
                    </div>
                    {r.notes && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>📝 {r.notes}</div>}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {!isDriver && (
                        <a href={`tel:${r.riderPhone}`} style={{ padding: '7px 13px', borderRadius: '9px', background: 'var(--primary-light)', border: '1.5px solid rgba(20,161,175,0.25)', color: 'var(--primary-dark)', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
                          <Phone size={12} /> {r.riderPhone}
                        </a>
                      )}
                      <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{r.seatsFilled}/{r.seatsTotal} seats filled</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
