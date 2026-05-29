import { useState } from 'react'
import { rides as initialRides } from '../../data/mockData'
import { Car, MapPin, Clock, Users, ChevronDown, ChevronUp, Trash2, CheckCircle } from 'lucide-react'

function SeatDots({ total, filled }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', background: i < filled ? '#475569' : '#22c55e' }} />
      ))}
    </div>
  )
}

export default function AdminRides() {
  const [rides, setRides] = useState(initialRides)
  const [expanded, setExpanded] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const closeRide = (id) => setRides(prev => prev.map(r => r.id === id ? { ...r, status: 'closed' } : r))
  const deleteRide = (id) => setRides(prev => prev.filter(r => r.id !== id))

  const filtered = rides.filter(r => filterStatus === 'all' || r.status === filterStatus)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: '#f1f5f9' }}>Rides</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>All carpool rides posted by members in Hyderabad</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'open', 'closed'].map(f => (
            <button key={f} onClick={() => setFilterStatus(f)}
              style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', background: filterStatus === f ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'rgba(30,41,59,0.6)', border: filterStatus === f ? 'none' : '1px solid rgba(71,85,105,0.25)', color: filterStatus === f ? 'white' : '#64748b', textTransform: 'capitalize', transition: 'all 0.15s' }}>
              {f === 'all' ? `All (${rides.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${rides.filter(r => r.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(r => (
          <div key={r.id} className="glass" style={{ borderRadius: '15px', border: `1px solid ${r.status === 'closed' ? 'rgba(248,113,113,0.1)' : 'rgba(148,163,184,0.08)'}`, overflow: 'hidden', opacity: r.status === 'closed' ? 0.7 : 1 }}>
            <div style={{ padding: '15px 18px', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                {r.riderName.split(' ').map(w => w[0]).join('')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#f1f5f9' }}>{r.origin} → {r.destination}</span>
                  <span className={`tag ${r.status === 'open' ? 'tag-green' : 'tag-red'}`} style={{ fontSize: '10px' }}>{r.status}</span>
                </div>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{r.riderName}</span>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={11} />{r.date} {r.time}</span>
                  <SeatDots total={r.seatsTotal} filled={r.seatsFilled} />
                  <span style={{ fontSize: '12px', color: '#4ade80' }}>{r.seatsTotal - r.seatsFilled} free</span>
                </div>
              </div>
              {expanded === r.id ? <ChevronUp size={15} color="#475569" /> : <ChevronDown size={15} color="#475569" />}
            </div>

            {expanded === r.id && (
              <div style={{ padding: '0 18px 16px', borderTop: '1px solid rgba(148,163,184,0.06)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', margin: '14px 0' }}>
                  {[
                    { label: 'Vehicle', value: r.vehicle },
                    { label: 'Phone', value: r.riderPhone },
                    { label: 'Seats', value: `${r.seatsFilled}/${r.seatsTotal} filled` },
                    { label: 'Seekers', value: r.seekers.length > 0 ? r.seekers.join(', ') : 'None yet' },
                  ].map(d => (
                    <div key={d.label} style={{ background: 'rgba(15,23,42,0.5)', borderRadius: '9px', padding: '10px 12px' }}>
                      <div style={{ fontSize: '11px', color: '#475569', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{d.label}</div>
                      <div style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>{d.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: '14px', padding: '10px 13px', background: 'rgba(15,23,42,0.5)', borderRadius: '10px', fontSize: '13px', color: '#64748b' }}>
                  <strong style={{ color: '#94a3b8' }}>Route:</strong> {r.route}
                </div>
                {r.notes && <div style={{ marginBottom: '14px', fontSize: '13px', color: '#64748b' }}>📝 {r.notes}</div>}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {r.status === 'open' && (
                    <button onClick={() => closeRide(r.id)} style={{ padding: '8px 14px', borderRadius: '9px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <CheckCircle size={13} /> Mark Closed
                    </button>
                  )}
                  <button onClick={() => deleteRide(r.id)} style={{ padding: '8px 14px', borderRadius: '9px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)', color: '#f87171', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#475569', fontSize: '14px' }}>No rides found.</div>
        )}
      </div>
    </div>
  )
}
