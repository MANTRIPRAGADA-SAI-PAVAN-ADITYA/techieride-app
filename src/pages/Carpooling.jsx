import { useState } from 'react'
import { Car, MapPin, Clock, Users, Search, Plus, Phone, ChevronDown, ChevronUp, Check, Leaf, UserPlus, RefreshCw, CalendarDays, Info, ArrowRight } from 'lucide-react'
import { rides as initialRides, rideRequests as initialRideRequests } from '../data/mockData'

const HYD_AREAS = ['Hitech City','Gachibowli','Kondapur','Madhapur','Jubilee Hills','Banjara Hills','Ameerpet','Secunderabad','KPHB','Kukatpally','LB Nagar','Uppal','Dilsukhnagar','Mehdipatnam','Tolichowki','Miyapur','Patancheru','Begumpet','Nampally','Abids','Kukatpally','Manikonda','Narsingi']
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const INP = { width:'100%', background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:'10px', padding:'10px 13px', color:'var(--text)', fontSize:'13.5px', boxSizing:'border-box', fontFamily:'inherit', outline:'none' }

function SeatDots({ total, filled }) {
  return (
    <div style={{ display:'flex', gap:'3px' }}>
      {Array.from({ length: total }).map((_,i) => (
        <div key={i} style={{ width:'9px', height:'9px', borderRadius:'50%', background: i < filled ? 'var(--border)' : 'var(--primary)', border:`1px solid ${i < filled ? 'var(--border)' : 'var(--primary-dark)'}` }}/>
      ))}
    </div>
  )
}

function RideCard({ ride, user, onRequest }) {
  const [exp, setExp] = useState(false)
  const seatsLeft = ride.seatsTotal - ride.seatsFilled
  const isOwn     = ride.riderId === user?.id
  const stops     = ride.route.split(' - ').map(s => s.trim())

  return (
    <div className="card" style={{ borderRadius:'15px', overflow:'hidden', transition:'box-shadow 0.18s', border: isOwn ? '1.5px solid rgba(20,161,175,0.3)' : undefined }}>
      <div style={{ padding:'15px 17px', cursor:'pointer', display:'flex', gap:'12px', alignItems:'center' }} onClick={() => setExp(!exp)}>
        <div className="primary-gradient" style={{ width:'42px', height:'42px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:'800', color:'white', flexShrink:0 }}>
          {ride.riderName.split(' ').map(w=>w[0]).join('')}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'3px', flexWrap:'wrap' }}>
            <span style={{ fontSize:'14px', fontWeight:'700', color:'var(--text)' }}>{ride.origin} → {ride.destination}</span>
            {isOwn  && <span className="tag tag-blue"  style={{ fontSize:'10px' }}>Your ride</span>}
            {ride.recurring && <span className="tag tag-violet" style={{ fontSize:'10px' }}><RefreshCw size={9}/> Recurring</span>}
            {seatsLeft === 0 && <span className="tag tag-red" style={{ fontSize:'10px' }}>Full</span>}
          </div>
          <div style={{ fontSize:'11px', color:'var(--text-muted)', marginBottom:'5px' }}>{ride.riderName} · {ride.vehicle}</div>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'center' }}>
            <span style={{ fontSize:'11px', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'3px' }}><Clock size={11}/>{ride.date} {ride.time}</span>
            <SeatDots total={ride.seatsTotal} filled={ride.seatsFilled}/>
            <span style={{ fontSize:'11px', color: seatsLeft > 0 ? '#15803d' : '#b91c1c', fontWeight:'700' }}>{seatsLeft} free</span>
            <span style={{ fontSize:'11px', color:'var(--primary)', display:'flex', alignItems:'center', gap:'3px' }}><Leaf size={10}/>eco</span>
            {ride.recurring && <span style={{ fontSize:'11px', color:'var(--text-muted)' }}>↻ {ride.recurrDays.join(', ')}</span>}
          </div>
        </div>
        {exp ? <ChevronUp size={15} color="var(--text-muted)"/> : <ChevronDown size={15} color="var(--text-muted)"/>}
      </div>

      {exp && (
        <div style={{ padding:'0 17px 16px', borderTop:'1.5px solid var(--border-soft)' }}>
          {/* Route stops */}
          <div style={{ margin:'12px 0 10px' }}>
            <div style={{ fontSize:'10px', color:'var(--text-muted)', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'10px' }}>Route Stops</div>
            <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:'0' }}>
              {stops.map((stop,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center' }}>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ width:'9px', height:'9px', borderRadius:'50%', background: i===0?'#15803d': i===stops.length-1?'#b91c1c':'var(--primary)', margin:'0 auto' }}/>
                    <div style={{ fontSize:'10px', color:'var(--text-muted)', marginTop:'3px', maxWidth:'72px', wordBreak:'break-word', textAlign:'center' }}>{stop}</div>
                  </div>
                  {i < stops.length-1 && <div style={{ width:'22px', height:'1.5px', background:'var(--border)', margin:'0 2px 16px' }}/>}
                </div>
              ))}
            </div>
          </div>

          {ride.notes && (
            <div style={{ marginBottom:'12px', padding:'9px 12px', background:'var(--bg)', borderRadius:'9px', fontSize:'12px', color:'var(--text-2)', border:'1.5px solid var(--border-soft)' }}>
              📝 {ride.notes}
            </div>
          )}

          {ride.recurring && (
            <div style={{ marginBottom:'12px', padding:'9px 12px', background:'var(--primary-light)', borderRadius:'9px', fontSize:'12px', color:'var(--primary-dark)', border:'1.5px solid rgba(20,161,175,0.2)', display:'flex', alignItems:'center', gap:'8px' }}>
              <RefreshCw size={13}/>Repeats every: <strong>{ride.recurrDays.join(', ')}</strong>
            </div>
          )}

          <div style={{ display:'flex', gap:'9px', flexWrap:'wrap' }}>
            {!isOwn && (
              <button onClick={() => onRequest(ride)}
                style={{ padding:'9px 16px', borderRadius:'10px', fontWeight:'700', fontSize:'13px', cursor:'pointer', background:'linear-gradient(135deg, var(--primary), var(--primary-dark))', border:'none', color:'white', display:'flex', alignItems:'center', gap:'5px', opacity: seatsLeft===0?0.5:1 }}
                disabled={seatsLeft===0}>
                <Users size={13}/>{seatsLeft===0?'Ride Full':'Request to Join'}
              </button>
            )}
            <a href={`tel:${ride.riderPhone}`}
              style={{ padding:'9px 16px', borderRadius:'10px', background:'var(--bg)', border:'1.5px solid var(--border)', color:'var(--primary-dark)', fontSize:'13px', fontWeight:'700', display:'flex', alignItems:'center', gap:'5px', textDecoration:'none' }}>
              <Phone size={13}/>{ride.riderPhone}
            </a>
            <div style={{ display:'flex', alignItems:'center', gap:'5px', padding:'8px 12px', background:'rgba(34,197,94,0.08)', borderRadius:'9px', border:'1.5px solid rgba(34,197,94,0.2)' }}>
              <Leaf size={12} color="#15803d"/>
              <span style={{ fontSize:'11px', color:'#15803d', fontWeight:'700' }}>~3 kg CO₂ saved</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RiderForm({ user, onPost }) {
  const [form, setForm] = useState({ vehicleMake:'', vehicleReg:'', vehicleColor:'', seats:2, origin:'', destination:'', route:'', date:new Date().toISOString().split('T')[0], time:'09:00', notes:'', recurring:false, recurrDays:[] })
  const [originOpen, setOriginOpen] = useState(false)
  const [destOpen, setDestOpen]     = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const set = (k,v) => setForm(f=>({...f,[k]:v}))
  const toggleDay = (d) => set('recurrDays', form.recurrDays.includes(d) ? form.recurrDays.filter(x=>x!==d) : [...form.recurrDays, d])

  const handlePost = () => {
    if (!form.vehicleMake || !form.origin || !form.destination || !form.route) return
    onPost({ id:'R'+Date.now(), riderId:user.id, riderName:user.name, riderPhone:user.phone||'+91 XXXXX XXXXX',
      vehicle:`${form.vehicleMake} (${form.vehicleColor}) • ${form.vehicleReg}`,
      origin:form.origin, destination:form.destination, route:form.route,
      date:form.date, time:form.time, seatsTotal:form.seats, seatsFilled:0,
      notes:form.notes, status:'open', seekers:[], recurring:form.recurring, recurrDays:form.recurrDays })
    setSubmitted(true)
  }

  if (submitted) return (
    <div style={{ textAlign:'center', padding:'40px 20px' }}>
      <div style={{ fontSize:'44px', marginBottom:'14px' }}>🎉</div>
      <h3 style={{ margin:'0 0 8px', color:'var(--text)', fontSize:'17px', fontWeight:'800' }}>Ride Posted!</h3>
      <p style={{ color:'var(--text-muted)', fontSize:'13px', marginBottom:'20px' }}>Members can now see your ride and request to join. Coordinate pickup points via phone or WhatsApp.</p>
      <button className="btn-primary" onClick={() => setSubmitted(false)} style={{ padding:'10px 24px', borderRadius:'11px', fontSize:'13px' }}>Post Another Ride</button>
    </div>
  )

  const AC = ({ value, onChange, open, setOpen, placeholder, color }) => (
    <div style={{ position:'relative' }}>
      <MapPin size={13} color={color} style={{ position:'absolute', left:'11px', top:'50%', transform:'translateY(-50%)', zIndex:1 }}/>
      <input value={value} onChange={e=>{onChange(e.target.value);setOpen(true)}} onFocus={()=>setOpen(true)} onBlur={()=>setTimeout(()=>setOpen(false),180)}
        placeholder={placeholder} style={{ ...INP, paddingLeft:'32px' }}/>
      {open && value && (
        <div className="card" style={{ position:'absolute', top:'100%', left:0, right:0, borderRadius:'10px', marginTop:'3px', zIndex:30, overflow:'hidden', maxHeight:'160px', overflowY:'auto' }}>
          {HYD_AREAS.filter(a=>a.toLowerCase().includes(value.toLowerCase())).map(a=>(
            <div key={a} onMouseDown={()=>{onChange(a);setOpen(false)}} style={{ padding:'9px 13px', cursor:'pointer', fontSize:'13px', color:'var(--text-2)', transition:'background 0.12s' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--bg)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>{a}</div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
      {/* Vehicle */}
      <div>
        <div style={{ fontSize:'12px', fontWeight:'700', color:'var(--text-muted)', marginBottom:'10px', display:'flex', alignItems:'center', gap:'6px', textTransform:'uppercase', letterSpacing:'0.5px' }}><Car size={13}/>Vehicle Details</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
          {[['Make & Model','vehicleMake','Maruti Swift Dzire'],['Reg. No.','vehicleReg','TS 09 AB 1234'],['Colour','vehicleColor','White, Grey…']].map(([l,k,ph])=>(
            <div key={k} style={k==='vehicleMake'?{gridColumn:'1/-1'}:{}}>
              <label style={{ display:'block', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.4px' }}>{l}</label>
              <input value={form[k]} onChange={e=>set(k,k==='vehicleReg'?e.target.value.toUpperCase():e.target.value)} placeholder={ph} style={INP}/>
            </div>
          ))}
          <div>
            <label style={{ display:'block', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.4px' }}>Pool Seats</label>
            <select value={form.seats} onChange={e=>set('seats',+e.target.value)} style={INP}>
              {[1,2,3,4,5].map(n=><option key={n} value={n}>{n} seat{n>1?'s':''}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ height:'1.5px', background:'var(--border-soft)' }}/>

      {/* Route */}
      <div>
        <div style={{ fontSize:'12px', fontWeight:'700', color:'var(--text-muted)', marginBottom:'10px', display:'flex', alignItems:'center', gap:'6px', textTransform:'uppercase', letterSpacing:'0.5px' }}><MapPin size={13}/>Route (Hyderabad only)</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
          <div>
            <label style={{ display:'block', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.4px' }}>From</label>
            <AC value={form.origin} onChange={v=>set('origin',v)} open={originOpen} setOpen={setOriginOpen} placeholder="Starting area" color="#15803d"/>
          </div>
          <div>
            <label style={{ display:'block', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.4px' }}>To</label>
            <AC value={form.destination} onChange={v=>set('destination',v)} open={destOpen} setOpen={setDestOpen} placeholder="Destination" color="#b91c1c"/>
          </div>
        </div>
        <div style={{ marginTop:'10px' }}>
          <label style={{ display:'block', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.4px' }}>Full Route (stops separated by " - ")</label>
          <input value={form.route} onChange={e=>set('route',e.target.value)} placeholder="Kondapur - Madhapur - Hitech City - Ameerpet - Secunderabad" style={INP}/>
          <div style={{ display:'flex', alignItems:'center', gap:'4px', marginTop:'4px' }}><Info size={10} color="var(--text-muted)"/><span style={{ fontSize:'10px', color:'var(--text-muted)' }}>List every stop with a dash so seekers can find their pickup point</span></div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'10px' }}>
          <div>
            <label style={{ display:'block', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.4px' }}>Date</label>
            <input type="date" value={form.date} onChange={e=>set('date',e.target.value)} style={INP}/>
          </div>
          <div>
            <label style={{ display:'block', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.4px' }}>Time</label>
            <input type="time" value={form.time} onChange={e=>set('time',e.target.value)} style={INP}/>
          </div>
        </div>
        <div style={{ marginTop:'10px' }}>
          <label style={{ display:'block', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.4px' }}>Notes / Preferences</label>
          <textarea value={form.notes} onChange={e=>set('notes',e.target.value)} rows={2} placeholder="AC on, no smoking, ladies preferred…" style={{ ...INP, resize:'vertical', minHeight:'58px' }}/>
        </div>
      </div>

      {/* Recurring */}
      <div style={{ padding:'14px', background:'var(--bg)', borderRadius:'12px', border:'1.5px solid var(--border)' }}>
        <label style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer', marginBottom: form.recurring ? '12px' : '0' }}>
          <input type="checkbox" checked={form.recurring} onChange={e=>set('recurring',e.target.checked)} style={{ width:'15px', height:'15px', accentColor:'var(--primary)' }}/>
          <div>
            <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', display:'flex', alignItems:'center', gap:'6px' }}><RefreshCw size={13} color="var(--primary)"/>Recurring ride</div>
            <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:'1px' }}>Post this ride for specific days every week</div>
          </div>
        </label>
        {form.recurring && (
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
            {DAYS.map(d=>(
              <button key={d} type="button" onClick={()=>toggleDay(d)}
                style={{ width:'42px', height:'38px', borderRadius:'9px', fontSize:'11px', fontWeight:'700', cursor:'pointer', background:form.recurrDays.includes(d)?'var(--primary)':'var(--surface)', border:`1.5px solid ${form.recurrDays.includes(d)?'var(--primary)':'var(--border)'}`, color:form.recurrDays.includes(d)?'white':'var(--text-muted)', transition:'all 0.15s' }}>
                {d}
              </button>
            ))}
          </div>
        )}
      </div>

      <button className="btn-primary" onClick={handlePost} disabled={!form.vehicleMake||!form.origin||!form.destination||!form.route}
        style={{ padding:'13px', borderRadius:'12px', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
        <Plus size={16}/> Post My Ride
      </button>
    </div>
  )
}

export default function Carpooling({ user }) {
  const [allRides, setAllRides]         = useState(initialRides)
  const [rideRequests, setRideRequests] = useState(initialRideRequests)
  const [tab, setTab]                   = useState('find')
  const [filter, setFilter]             = useState('')
  const [dateFilter, setDateFilter]     = useState('')
  const [requestedRide, setRequestedRide] = useState(null)
  const [pickupPoint, setPickupPoint]   = useState('')

  const onPost = (newRide) => { setAllRides(prev => [newRide, ...prev]); setTab('find') }

  const openRides     = allRides.filter(r => r.status === 'open' && !r.recurring)
  const recurringRides = allRides.filter(r => r.status === 'open' && r.recurring)
  const myRequests    = rideRequests.filter(r => r.seekerId === user?.id)
  const today         = new Date().toISOString().split('T')[0]
  const upcomingRides = allRides.filter(r => r.status==='open' && r.date > today).sort((a,b)=>a.date.localeCompare(b.date))

  const filtered = openRides.filter(r => {
    const q = filter.toLowerCase()
    const matchText = !q || r.origin.toLowerCase().includes(q) || r.destination.toLowerCase().includes(q) || r.route.toLowerCase().includes(q)
    const matchDate = !dateFilter || r.date === dateFilter
    return matchText && matchDate
  })

  const submitRequest = () => {
    if (!requestedRide) return
    const req = { id:'RQ'+Date.now(), rideId:requestedRide.id, seekerId:user?.id, seekerName:user?.name, requestDate:today, status:'pending', pickupPoint }
    setRideRequests(prev => [req, ...prev])
    setAllRides(prev => prev.map(r => r.id===requestedRide.id ? { ...r, seekers:[...r.seekers, user?.id] } : r))
    setRequestedRide(null); setPickupPoint('')
  }

  const statusColor = { pending:'tag-amber', approved:'tag-green', declined:'tag-red' }

  const tabs = [
    { id:'find',      label:'🔍 Find a Ride' },
    { id:'upcoming',  label:'📅 Upcoming' },
    { id:'recurring', label:'↻ Recurring' },
    { id:'offer',     label:'🚗 Offer a Ride' },
    { id:'requests',  label:`📬 My Requests${myRequests.length>0?` (${myRequests.length})`:''}` },
  ]

  return (
    <div style={{ maxWidth:'780px' }}>
      <div style={{ marginBottom:'20px' }}>
        <h1 style={{ margin:'0 0 3px', fontSize:'21px', fontWeight:'800', color:'var(--text)' }}>Carpooling</h1>
        <p style={{ margin:0, color:'var(--text-muted)', fontSize:'13px' }}>Hyderabad community carpool — members only</p>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'0', background:'var(--bg)', borderRadius:'13px', padding:'3px', border:'1.5px solid var(--border)', marginBottom:'20px', flexWrap:'wrap' }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{ padding:'9px 16px', borderRadius:'10px', fontSize:'12px', fontWeight:'700', cursor:'pointer', border:'none', background: tab===t.id?'var(--primary)':'transparent', color: tab===t.id?'white':'var(--text-muted)', transition:'all 0.15s', whiteSpace:'nowrap' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* FIND tab */}
      {tab==='find' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          <div style={{ display:'flex', gap:'9px', flexWrap:'wrap' }}>
            <div style={{ position:'relative', flex:1, minWidth:'180px' }}>
              <Search size={13} color="var(--text-muted)" style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)' }}/>
              <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search area or route stop…"
                style={{ ...INP, paddingLeft:'34px', borderRadius:'11px' }}/>
            </div>
            <input type="date" value={dateFilter} onChange={e=>setDateFilter(e.target.value)} style={{ ...INP, borderRadius:'11px', maxWidth:'160px' }}/>
            {dateFilter && <button className="btn-outline" onClick={()=>setDateFilter('')} style={{ padding:'9px 14px', borderRadius:'11px', fontSize:'12px', whiteSpace:'nowrap' }}>Clear</button>}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:'12px', color:'var(--text-muted)' }}><strong style={{ color:'var(--text)' }}>{filtered.length}</strong> rides available</span>
            <span className="tag tag-green"><Leaf size={10}/>All rides save CO₂</span>
          </div>
          {filtered.length===0 && <div style={{ textAlign:'center', padding:'40px', color:'var(--text-muted)', fontSize:'13px' }}>No rides found. Try a different area or date.</div>}
          {filtered.map(r => <RideCard key={r.id} ride={r} user={user} onRequest={setRequestedRide}/>)}
        </div>
      )}

      {/* UPCOMING tab */}
      {tab==='upcoming' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <div style={{ padding:'12px 16px', borderRadius:'12px', background:'var(--primary-light)', border:'1.5px solid rgba(20,161,175,0.25)', fontSize:'13px', color:'var(--primary-dark)', display:'flex', alignItems:'center', gap:'8px' }}>
            <CalendarDays size={15}/><strong>Rides posted for future dates</strong> — sorted by nearest date first
          </div>
          {upcomingRides.length===0 && <div style={{ textAlign:'center', padding:'40px', color:'var(--text-muted)', fontSize:'13px' }}>No upcoming rides yet. Be the first to post one!</div>}
          {upcomingRides.map(r => <RideCard key={r.id} ride={r} user={user} onRequest={setRequestedRide}/>)}
        </div>
      )}

      {/* RECURRING tab */}
      {tab==='recurring' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <div style={{ padding:'12px 16px', borderRadius:'12px', background:'var(--bg)', border:'1.5px solid var(--border)', fontSize:'13px', color:'var(--text-2)', display:'flex', alignItems:'center', gap:'8px' }}>
            <RefreshCw size={15} color="var(--primary)"/><span>These rides happen on <strong>fixed days every week</strong>. Join once and coordinate directly with the rider.</span>
          </div>
          {recurringRides.length===0 && <div style={{ textAlign:'center', padding:'40px', color:'var(--text-muted)', fontSize:'13px' }}>No recurring rides yet.</div>}
          {recurringRides.map(r => <RideCard key={r.id} ride={r} user={user} onRequest={setRequestedRide}/>)}
        </div>
      )}

      {/* OFFER tab */}
      {tab==='offer' && (
        <div className="card" style={{ borderRadius:'18px', padding:'24px' }}>
          <div style={{ marginBottom:'20px' }}>
            <h3 style={{ margin:'0 0 4px', fontSize:'16px', fontWeight:'800', color:'var(--text)' }}>Post a Ride</h3>
            <p style={{ margin:0, color:'var(--text-muted)', fontSize:'13px' }}>Share your route — community members will coordinate with you for pickup.</p>
          </div>
          <RiderForm user={user} onPost={onPost}/>
        </div>
      )}

      {/* MY REQUESTS tab */}
      {tab==='requests' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {myRequests.length===0 && <div style={{ textAlign:'center', padding:'40px', color:'var(--text-muted)', fontSize:'13px' }}>You haven't requested any rides yet.</div>}
          {myRequests.map(req => {
            const ride = allRides.find(r => r.id === req.rideId)
            return (
              <div key={req.id} className="card" style={{ borderRadius:'14px', padding:'16px 18px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'10px' }}>
                  <div>
                    <div style={{ fontSize:'14px', fontWeight:'700', color:'var(--text)', marginBottom:'4px' }}>
                      {ride?.origin} → {ride?.destination}
                    </div>
                    <div style={{ fontSize:'12px', color:'var(--text-muted)', marginBottom:'3px' }}>{ride?.riderName} · {ride?.date} {ride?.time}</div>
                    <div style={{ fontSize:'12px', color:'var(--text-2)' }}>📍 Your pickup: <strong>{req.pickupPoint || 'Not specified'}</strong></div>
                    <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:'3px' }}>Requested: {req.requestDate}</div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'6px', alignItems:'flex-end' }}>
                    <span className={`tag ${statusColor[req.status]}`} style={{ textTransform:'capitalize' }}>{req.status}</span>
                    {ride && (
                      <a href={`tel:${ride.riderPhone}`}
                        style={{ padding:'7px 13px', borderRadius:'9px', background:'var(--primary-light)', border:'1.5px solid rgba(20,161,175,0.25)', color:'var(--primary-dark)', fontSize:'12px', fontWeight:'700', display:'flex', alignItems:'center', gap:'5px', textDecoration:'none' }}>
                        <Phone size={12}/> {ride.riderPhone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Request to join modal */}
      {requestedRide && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, padding:'16px' }}>
          <div className="card" style={{ borderRadius:'18px', padding:'24px', width:'100%', maxWidth:'400px' }}>
            <h3 style={{ margin:'0 0 6px', fontSize:'16px', fontWeight:'800', color:'var(--text)' }}>Request to Join</h3>
            <p style={{ margin:'0 0 16px', fontSize:'13px', color:'var(--text-muted)' }}>
              {requestedRide.origin} → {requestedRide.destination} with {requestedRide.riderName}
            </p>
            <label style={{ display:'block', fontSize:'11px', color:'var(--text-muted)', marginBottom:'5px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.4px' }}>Your Pickup Point on Route</label>
            <input value={pickupPoint} onChange={e=>setPickupPoint(e.target.value)}
              placeholder="e.g. Madhapur Metro Exit 2" style={{ ...INP, marginBottom:'16px' }}/>
            <div style={{ fontSize:'11px', color:'var(--text-muted)', marginBottom:'16px', lineHeight:1.5 }}>
              After requesting, the rider will contact you on <strong>{requestedRide.riderPhone}</strong> to confirm the pickup point and time.
            </div>
            <div style={{ display:'flex', gap:'9px' }}>
              <button onClick={()=>{setRequestedRide(null);setPickupPoint('')}}
                style={{ flex:1, padding:'11px', borderRadius:'11px', background:'var(--bg)', border:'1.5px solid var(--border)', color:'var(--text-muted)', fontSize:'13px', fontWeight:'600', cursor:'pointer' }}>Cancel</button>
              <button className="btn-primary" onClick={submitRequest}
                style={{ flex:2, padding:'11px', borderRadius:'11px', fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center', gap:'7px' }}>
                <Check size={14}/> Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
