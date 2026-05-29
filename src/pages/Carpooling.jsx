import { useState } from 'react'
import { Car, MapPin, Clock, Users, Search, Plus, Phone, ChevronDown, ChevronUp, Check, Leaf, ArrowRight, Info } from 'lucide-react'
import { rides as initialRides, members } from '../data/mockData'

const HYD_AREAS = [
  'Hitech City', 'Gachibowli', 'Kondapur', 'Madhapur', 'Jubilee Hills',
  'Banjara Hills', 'Ameerpet', 'Secunderabad', 'KPHB', 'Kukatpally',
  'LB Nagar', 'Uppal', 'Dilsukhnagar', 'Mehdipatnam', 'Tolichowki',
  'Miyapur', 'Patancheru', 'Begumpet', 'Nampally', 'Abids',
]

function SeatDots({ total, filled }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: i < filled ? '#475569' : '#22c55e', border: '1px solid ' + (i < filled ? '#334155' : '#16a34a') }} />
      ))}
    </div>
  )
}

function RiderForm({ user, onPost }) {
  const [form, setForm] = useState({
    vehicleMake: '', vehicleReg: '', vehicleColor: '', seats: 2,
    origin: '', destination: '', route: '', date: new Date().toISOString().split('T')[0],
    time: '09:00', notes: '',
  })
  const [originOpen, setOriginOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const inp = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handlePost = () => {
    if (!form.vehicleMake || !form.origin || !form.destination || !form.route || !form.date || !form.time) return
    const newRide = {
      id: 'R' + Date.now(), riderId: user.id, riderName: user.name, riderPhone: user.phone || '+91 XXXXX XXXXX',
      vehicle: `${form.vehicleMake} (${form.vehicleColor}) • ${form.vehicleReg}`,
      origin: form.origin, destination: form.destination, route: form.route,
      date: form.date, time: form.time, seatsTotal: form.seats, seatsFilled: 0,
      notes: form.notes, status: 'open', seekers: [],
    }
    onPost(newRide)
    setSubmitted(true)
  }

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
      <h3 style={{ margin: '0 0 8px', color: '#f1f5f9', fontSize: '18px', fontWeight: '700' }}>Ride Posted!</h3>
      <p style={{ color: '#64748b', fontSize: '14px' }}>Members can now see your ride and request to join.</p>
      <button className="btn-primary" onClick={() => setSubmitted(false)} style={{ marginTop: '20px', padding: '10px 24px', borderRadius: '11px', fontWeight: '600', fontSize: '14px' }}>
        Post Another
      </button>
    </div>
  )

  const inputStyle = { width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.35)', borderRadius: '10px', padding: '10px 13px', color: '#f1f5f9', fontSize: '14px', boxSizing: 'border-box' }
  const label = (txt) => <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '5px', fontWeight: '600', letterSpacing: '0.4px', textTransform: 'uppercase' }}>{txt}</label>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Vehicle */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#94a3b8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <Car size={15} /> Vehicle Details
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            {label('Make & Model')}
            <input value={form.vehicleMake} onChange={e => inp('vehicleMake', e.target.value)} placeholder="e.g. Maruti Swift Dzire" style={inputStyle} />
          </div>
          <div>
            {label('Registration No.')}
            <input value={form.vehicleReg} onChange={e => inp('vehicleReg', e.target.value.toUpperCase())} placeholder="TS 09 AB 1234" style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: '1px' }} />
          </div>
          <div>
            {label('Colour')}
            <input value={form.vehicleColor} onChange={e => inp('vehicleColor', e.target.value)} placeholder="White, Silver, Grey…" style={inputStyle} />
          </div>
          <div>
            {label('Comfortable seats for pooling')}
            <select value={form.seats} onChange={e => inp('seats', +e.target.value)} style={inputStyle}>
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} seat{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ height: '1px', background: 'rgba(148,163,184,0.07)' }} />

      {/* Route */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#94a3b8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <MapPin size={15} /> Route Details
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {/* Origin */}
          <div style={{ position: 'relative' }}>
            {label('Origin (Hyderabad)')}
            <div style={{ position: 'relative' }}>
              <MapPin size={13} color="#22c55e" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              <input value={form.origin} onChange={e => { inp('origin', e.target.value); setOriginOpen(true) }}
                onFocus={() => setOriginOpen(true)} onBlur={() => setTimeout(() => setOriginOpen(false), 180)}
                placeholder="Starting area" style={{ ...inputStyle, paddingLeft: '32px' }} />
            </div>
            {originOpen && form.origin && (
              <div className="glass" style={{ position: 'absolute', top: '100%', left: 0, right: 0, borderRadius: '10px', marginTop: '3px', zIndex: 30, overflow: 'hidden', maxHeight: '160px', overflowY: 'auto' }}>
                {HYD_AREAS.filter(a => a.toLowerCase().includes(form.origin.toLowerCase())).map(a => (
                  <div key={a} onMouseDown={() => { inp('origin', a); setOriginOpen(false) }}
                    style={{ padding: '9px 13px', cursor: 'pointer', fontSize: '13px', color: '#94a3b8' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{a}</div>
                ))}
              </div>
            )}
          </div>
          {/* Destination */}
          <div style={{ position: 'relative' }}>
            {label('Destination (Hyderabad)')}
            <div style={{ position: 'relative' }}>
              <MapPin size={13} color="#f87171" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              <input value={form.destination} onChange={e => { inp('destination', e.target.value); setDestOpen(true) }}
                onFocus={() => setDestOpen(true)} onBlur={() => setTimeout(() => setDestOpen(false), 180)}
                placeholder="Ending area" style={{ ...inputStyle, paddingLeft: '32px' }} />
            </div>
            {destOpen && form.destination && (
              <div className="glass" style={{ position: 'absolute', top: '100%', left: 0, right: 0, borderRadius: '10px', marginTop: '3px', zIndex: 30, overflow: 'hidden', maxHeight: '160px', overflowY: 'auto' }}>
                {HYD_AREAS.filter(a => a.toLowerCase().includes(form.destination.toLowerCase()) && a !== form.origin).map(a => (
                  <div key={a} onMouseDown={() => { inp('destination', a); setDestOpen(false) }}
                    style={{ padding: '9px 13px', cursor: 'pointer', fontSize: '13px', color: '#94a3b8' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{a}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '12px' }}>
          {label('Full route (stops separated by " - ")')}
          <input value={form.route} onChange={e => inp('route', e.target.value)}
            placeholder="e.g. Kondapur - Madhapur - Hitech City - Ameerpet - Secunderabad"
            style={inputStyle} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
            <Info size={11} color="#475569" />
            <span style={{ fontSize: '11px', color: '#475569' }}>Type every stop separated by a dash ( - ) so seekers can find their pickup point</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
          <div>
            {label('Date')}
            <input type="date" value={form.date} onChange={e => inp('date', e.target.value)} style={inputStyle} />
          </div>
          <div>
            {label('Departure time')}
            <input type="time" value={form.time} onChange={e => inp('time', e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={{ marginTop: '12px' }}>
          {label('Notes / Preferences (optional)')}
          <textarea value={form.notes} onChange={e => inp('notes', e.target.value)} rows={2}
            placeholder="e.g. AC on, no smoking, music allowed, ladies preferred…"
            style={{ ...inputStyle, resize: 'vertical', minHeight: '60px' }} />
        </div>
      </div>

      <button className="btn-primary" onClick={handlePost}
        disabled={!form.vehicleMake || !form.origin || !form.destination || !form.route}
        style={{ padding: '13px', borderRadius: '12px', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: (!form.vehicleMake || !form.origin || !form.destination || !form.route) ? 0.5 : 1 }}>
        <Plus size={16} /> Post My Ride
      </button>
    </div>
  )
}

function RideCard({ ride, user }) {
  const [expanded, setExpanded] = useState(false)
  const [requested, setRequested] = useState(ride.seekers.includes(user?.id))
  const seatsLeft = ride.seatsTotal - ride.seatsFilled
  const stops = ride.route.split(' - ').map(s => s.trim())
  const isOwn = ride.riderId === user?.id

  return (
    <div className="glass" style={{ borderRadius: '16px', border: `1px solid ${isOwn ? 'rgba(251,191,36,0.15)' : 'rgba(148,163,184,0.08)'}`, overflow: 'hidden' }}>
      <div style={{ padding: '16px 18px', cursor: 'pointer', display: 'flex', gap: '13px', alignItems: 'center' }} onClick={() => setExpanded(!expanded)}>
        {/* Avatar */}
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
          {ride.riderName.split(' ').map(w => w[0]).join('')}
        </div>
        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#f1f5f9' }}>{ride.origin} → {ride.destination}</span>
            {isOwn && <span className="tag tag-amber" style={{ fontSize: '10px' }}>Your ride</span>}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>
            {ride.riderName} · {ride.vehicle}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={11} />{ride.date} at {ride.time}</span>
            <SeatDots total={ride.seatsTotal} filled={ride.seatsFilled} />
            <span style={{ fontSize: '12px', color: seatsLeft > 0 ? '#4ade80' : '#f87171' }}>{seatsLeft} seat{seatsLeft !== 1 ? 's' : ''} free</span>
          </div>
        </div>
        {expanded ? <ChevronUp size={16} color="#475569" /> : <ChevronDown size={16} color="#475569" />}
      </div>

      {expanded && (
        <div style={{ padding: '0 18px 18px', borderTop: '1px solid rgba(148,163,184,0.06)' }}>
          {/* Route stops */}
          <div style={{ marginTop: '14px', marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Route</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'wrap' }}>
              {stops.map((stop, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? '#22c55e' : i === stops.length - 1 ? '#f87171' : '#38bdf8', flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', textAlign: 'center', maxWidth: '80px', wordBreak: 'break-word' }}>{stop}</span>
                  </div>
                  {i < stops.length - 1 && <div style={{ width: '24px', height: '1px', background: 'rgba(56,189,248,0.3)', margin: '0 4px', marginBottom: '20px', flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </div>

          {ride.notes && (
            <div style={{ marginBottom: '14px', padding: '10px 13px', background: 'rgba(15,23,42,0.5)', borderRadius: '10px', fontSize: '13px', color: '#94a3b8' }}>
              📝 {ride.notes}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {!isOwn && (
              <button
                onClick={() => setRequested(!requested)}
                disabled={seatsLeft === 0 && !requested}
                style={{ padding: '9px 18px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', background: requested ? 'rgba(74,222,128,0.12)' : 'linear-gradient(135deg,#0ea5e9,#6366f1)', border: requested ? '1px solid rgba(74,222,128,0.3)' : 'none', color: requested ? '#4ade80' : 'white', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.18s' }}>
                {requested ? <><Check size={14} /> Requested</> : <><Users size={14} /> Request to Join</>}
              </button>
            )}
            <a href={`tel:${ride.riderPhone}`} style={{ padding: '9px 18px', borderRadius: '10px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', color: '#38bdf8', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
              <Phone size={14} /> {ride.riderPhone}
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', background: 'rgba(74,222,128,0.07)', borderRadius: '10px' }}>
              <Leaf size={12} color="#4ade80" />
              <span style={{ fontSize: '12px', color: '#4ade80' }}>Saves ~3 kg CO₂</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Carpooling({ user }) {
  const [tab, setTab] = useState('seekers')
  const [allRides, setAllRides] = useState(initialRides)
  const [filter, setFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  const onPost = (newRide) => setAllRides(prev => [newRide, ...prev])

  const filtered = allRides.filter(r => {
    const q = filter.toLowerCase()
    const matchText = !q || r.origin.toLowerCase().includes(q) || r.destination.toLowerCase().includes(q) || r.route.toLowerCase().includes(q)
    const matchDate = !dateFilter || r.date === dateFilter
    return matchText && matchDate && r.status === 'open'
  })

  return (
    <div style={{ maxWidth: '820px' }}>
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: '#f1f5f9' }}>Carpooling</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Hyderabad community carpool network · Members only</p>
      </div>

      {/* Tab toggle */}
      <div style={{ display: 'flex', gap: '0', background: 'rgba(15,23,42,0.8)', borderRadius: '14px', padding: '4px', marginBottom: '24px', border: '1px solid rgba(71,85,105,0.25)', width: 'fit-content' }}>
        {[
          { id: 'seekers', label: '🔍 Find a Ride', desc: 'Browse available rides' },
          { id: 'riders',  label: '🚗 Offer a Ride', desc: 'Post your ride' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '10px 22px', borderRadius: '11px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', border: 'none', background: tab === t.id ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'transparent', color: tab === t.id ? 'white' : '#64748b', transition: 'all 0.18s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'seekers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={14} color="#475569" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input value={filter} onChange={e => setFilter(e.target.value)}
                placeholder="Search by area or route stop…"
                style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.35)', borderRadius: '11px', padding: '10px 14px 10px 35px', color: '#f1f5f9', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
              style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.35)', borderRadius: '11px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px' }} />
            {dateFilter && <button onClick={() => setDateFilter('')} style={{ padding: '10px 14px', borderRadius: '11px', background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(71,85,105,0.25)', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>Clear</button>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}><strong style={{ color: '#f1f5f9' }}>{filtered.length}</strong> rides available</span>
            <span className="tag tag-green"><Leaf size={11} /> All rides save CO₂</span>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px', color: '#475569', fontSize: '14px' }}>
              No rides found. Try a different area or date.
            </div>
          )}

          {filtered.map(r => <RideCard key={r.id} ride={r} user={user} />)}
        </div>
      )}

      {tab === 'riders' && (
        <div className="glass" style={{ borderRadius: '18px', padding: '26px', border: '1px solid rgba(148,163,184,0.08)' }}>
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ margin: '0 0 5px', fontSize: '17px', fontWeight: '700', color: '#f1f5f9' }}>Post a Ride</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Share your vehicle and route — community members will coordinate with you for pickup.</p>
          </div>
          <RiderForm user={user} onPost={onPost} />
        </div>
      )}
    </div>
  )
}
