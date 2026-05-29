import { useState } from 'react'
import { MapPin, Clock, Car, Users, ArrowRight, Check, Leaf, UserPlus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const availablePools = [
  {
    id: 1, driver: 'Rajesh Kumar', driverAvatar: 'RK', from: 'Sector 62, Noida', to: 'Cyber City, Gurugram',
    time: '09:00 AM', seatsLeft: 2, totalSeats: 4, fare: '₹80', co2: '3.2 kg',
    poolmates: ['Neha S.', 'Amit R.'], vehicle: 'Swift Dzire • DL 4C AB 9821', rating: 4.9,
  },
  {
    id: 2, driver: 'Priya Mehta', driverAvatar: 'PM', from: 'Sector 62, Noida', to: 'Cyber City, Gurugram',
    time: '09:15 AM', seatsLeft: 1, totalSeats: 3, fare: '₹75', co2: '3.0 kg',
    poolmates: ['Suresh P.', 'Anita R.'], vehicle: 'Honda City • HR 26 DK 3344', rating: 4.8,
  },
  {
    id: 3, driver: 'Vikram Singh', driverAvatar: 'VS', from: 'DLF Phase 3', to: 'Cyber City, Gurugram',
    time: '08:45 AM', seatsLeft: 3, totalSeats: 4, fare: '₹60', co2: '2.4 kg',
    poolmates: ['Deepak M.'], vehicle: 'Ertiga • MH 02 CD 5566', rating: 4.7,
  },
]

const locations = [
  'Sector 62, Noida', 'Cyber City, Gurugram', 'Connaught Place, Delhi',
  'DLF Phase 3, Gurugram', 'Techie HQ – Tower A', 'Noida Expressway Metro',
  'Janakpuri, Delhi', 'Greater Noida West', 'Lajpat Nagar, Delhi',
]

export default function BookRide({ user }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('join') // 'join' | 'offer'
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState('09:00')
  const [searched, setSearched] = useState(false)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)
  // offer mode
  const [seats, setSeats] = useState(2)
  const [vehicle, setVehicle] = useState('')

  const handleSearch = () => { if (from && to) setSearched(true) }
  const handleConfirm = () => {
    if (!selected) return
    setConfirmed(true)
    setTimeout(() => navigate('/tracking'), 2500)
  }
  const handleOfferSubmit = () => {
    setConfirmed(true)
    setTimeout(() => navigate('/dashboard'), 2500)
  }

  if (confirmed) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div className="glass" style={{ borderRadius: '24px', padding: '48px', textAlign: 'center', maxWidth: '400px', border: '1px solid rgba(74,222,128,0.2)' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Check size={32} color="white" />
        </div>
        <h2 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '700', color: '#f1f5f9' }}>
          {mode === 'join' ? 'You\'re in the pool! 🎉' : 'Seat offered! 🚗'}
        </h2>
        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 16px' }}>
          {mode === 'join'
            ? `Joined ${availablePools.find(p => p.id === selected)?.driver}'s carpool. Pickup at ${availablePools.find(p => p.id === selected)?.time}.`
            : 'Your seat listing is live. Poolmates will be notified.'}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '10px', padding: '10px 16px' }}>
          <Leaf size={14} color="#4ade80" />
          <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: '600' }}>
            You'll save ~{availablePools.find(p => p.id === selected)?.co2 || '2.8 kg'} of CO₂ on this trip
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '700', color: '#f1f5f9' }}>Carpooling</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Share a ride, reduce emissions, save money</p>
      </div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: '0', background: 'rgba(15,23,42,0.8)', borderRadius: '14px', padding: '4px', marginBottom: '24px', border: '1px solid rgba(71,85,105,0.3)', width: 'fit-content' }}>
        {[
          { id: 'join', label: 'Find a Pool', icon: Search },
          { id: 'offer', label: 'Offer a Seat', icon: UserPlus },
        ].map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { setMode(id); setSearched(false); setSelected(null) }}
            style={{ padding: '10px 20px', borderRadius: '11px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px', border: 'none', background: mode === id ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'transparent', color: mode === id ? 'white' : '#64748b', transition: 'all 0.18s' }}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Search form */}
      <div className="glass" style={{ borderRadius: '18px', padding: '24px', border: '1px solid rgba(148,163,184,0.08)', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 18px', fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>
          {mode === 'join' ? 'Where are you headed?' : 'Your route details'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {/* From */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>From</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={15} color="#22c55e" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
                <input value={from} onChange={e => { setFrom(e.target.value); setFromOpen(true) }} onFocus={() => setFromOpen(true)} onBlur={() => setTimeout(() => setFromOpen(false), 200)}
                  placeholder="Pickup area" style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '10px', padding: '10px 12px 10px 36px', color: '#f1f5f9', fontSize: '14px' }} />
              </div>
              {fromOpen && from && (
                <div className="glass" style={{ position: 'absolute', top: '100%', left: 0, right: 0, borderRadius: '10px', marginTop: '3px', zIndex: 20, overflow: 'hidden' }}>
                  {locations.filter(l => l.toLowerCase().includes(from.toLowerCase())).slice(0, 4).map(l => (
                    <div key={l} onMouseDown={() => { setFrom(l); setFromOpen(false) }} style={{ padding: '9px 14px', cursor: 'pointer', fontSize: '13px', color: '#94a3b8' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <MapPin size={12} color="#475569" style={{ display: 'inline', marginRight: '7px' }} />{l}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* To */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>To</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={15} color="#f87171" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
                <input value={to} onChange={e => { setTo(e.target.value); setToOpen(true) }} onFocus={() => setToOpen(true)} onBlur={() => setTimeout(() => setToOpen(false), 200)}
                  placeholder="Destination" style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '10px', padding: '10px 12px 10px 36px', color: '#f1f5f9', fontSize: '14px' }} />
              </div>
              {toOpen && to && (
                <div className="glass" style={{ position: 'absolute', top: '100%', left: 0, right: 0, borderRadius: '10px', marginTop: '3px', zIndex: 20, overflow: 'hidden' }}>
                  {locations.filter(l => l.toLowerCase().includes(to.toLowerCase()) && l !== from).slice(0, 4).map(l => (
                    <div key={l} onMouseDown={() => { setTo(l); setToOpen(false) }} style={{ padding: '9px 14px', cursor: 'pointer', fontSize: '13px', color: '#94a3b8' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <MapPin size={12} color="#475569" style={{ display: 'inline', marginRight: '7px' }} />{l}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mode === 'offer' ? '1fr 1fr 1fr' : '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '10px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>Time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '10px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px' }} />
            </div>
            {mode === 'offer' && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>Seats to offer</label>
                <select value={seats} onChange={e => setSeats(+e.target.value)} style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '10px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px' }}>
                  {[1,2,3,4].map(n => <option key={n} value={n}>{n} seat{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
            )}
          </div>

          {mode === 'offer' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>Your vehicle (optional)</label>
              <input value={vehicle} onChange={e => setVehicle(e.target.value)} placeholder="e.g. Swift Dzire • DL 4C AB 1234" style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '10px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px' }} />
            </div>
          )}

          <button className="btn-primary" disabled={!from || !to}
            onClick={mode === 'join' ? handleSearch : handleOfferSubmit}
            style={{ padding: '12px', borderRadius: '12px', fontWeight: '600', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: !from || !to ? 0.5 : 1 }}>
            {mode === 'join' ? <><Search size={16} /> Search Carpools</> : <><Check size={16} /> List My Seat</>}
          </button>
        </div>
      </div>

      {/* Results */}
      {searched && mode === 'join' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px', color: '#94a3b8' }}><strong style={{ color: '#f1f5f9' }}>{availablePools.length}</strong> carpools found</span>
            <span className="tag tag-green"><Leaf size={11} /> Avg. 2.9 kg CO₂ saved per trip</span>
          </div>

          {availablePools.map(pool => (
            <div key={pool.id} onClick={() => setSelected(pool.id === selected ? null : pool.id)}
              className="card-hover"
              style={{ padding: '20px', borderRadius: '16px', border: `1px solid ${selected === pool.id ? 'rgba(56,189,248,0.4)' : 'rgba(148,163,184,0.08)'}`, background: selected === pool.id ? 'rgba(56,189,248,0.05)' : 'rgba(15,23,42,0.5)', cursor: 'pointer', transition: 'all 0.18s' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
                  {pool.driverAvatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#f1f5f9' }}>{pool.driver}</span>
                    <span style={{ fontSize: '12px', color: '#fbbf24' }}>★ {pool.rating}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>{pool.vehicle}</div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={11} /> {pool.time}</span>
                    <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={11} /> {pool.seatsLeft} seat{pool.seatsLeft > 1 ? 's' : ''} left</span>
                    <span style={{ fontSize: '12px', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}><Leaf size={11} /> saves {pool.co2} CO₂</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: selected === pool.id ? '#38bdf8' : '#f1f5f9' }}>{pool.fare}</div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>per seat</div>
                </div>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${selected === pool.id ? '#38bdf8' : '#334155'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {selected === pool.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38bdf8' }} />}
                </div>
              </div>

              {selected === pool.id && (
                <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(56,189,248,0.1)' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Poolmates already joined:</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {pool.poolmates.map(p => (
                      <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '20px', padding: '4px 12px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', color: 'white' }}>
                          {p.split(' ').map(w => w[0]).join('')}
                        </div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {selected && (
            <button className="btn-primary" onClick={handleConfirm} style={{ padding: '14px', borderRadius: '14px', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
              <Check size={17} /> Join This Carpool
            </button>
          )}
        </div>
      )}
    </div>
  )
}
