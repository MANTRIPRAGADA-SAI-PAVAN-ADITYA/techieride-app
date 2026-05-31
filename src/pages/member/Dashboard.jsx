import { useNavigate } from 'react-router-dom'
import { Car, Users, Leaf, Heart, ArrowRight, MapPin, Clock, CalendarDays, Megaphone, TrendingUp, CheckCircle } from 'lucide-react'
import { members, rides, activities, participations, announcements } from '../../data/mockData'

export default function Dashboard({ user }) {
  const navigate  = useNavigate()
  const member    = members.find(m => m.id === user.id) || {}
  const hour      = new Date().getHours()
  const greeting  = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  // ── Member-specific data only ──────────────────────────────
  const myRidesAsRider  = rides.filter(r => r.riderId === user.id)
  const myRidesAsSeeker = rides.filter(r => r.seekers?.includes(user.id))
  const myParts         = participations.filter(p => p.memberId === user.id)
  const myActivities    = activities.filter(a => a.rsvps?.includes(user.id))
  const upcoming        = myParts.filter(p => p.status === 'upcoming')
  const upcomingRides   = rides.filter(r => r.status === 'open' && (r.riderId === user.id || r.seekers?.includes(user.id)))

  // Poolmates: people this member has ridden with or driven
  const poolmateIds = new Set()
  myRidesAsRider.forEach(r  => r.seekers?.forEach(id => poolmateIds.add(id)))
  myRidesAsSeeker.forEach(r => poolmateIds.add(r.riderId))
  poolmateIds.delete(user.id)
  const poolmates = [...poolmateIds].map(id => members.find(m => m.id === id)).filter(Boolean)

  // CO2 estimate: avg 3kg per ride
  const co2 = (myRidesAsRider.length + myRidesAsSeeker.length) * 3

  const myStats = [
    { label: 'Rides Offered',  value: myRidesAsRider.length,  icon: Car,       color: 'var(--primary)',  note: 'as driver',   show: user.isRider },
    { label: 'Rides Joined',   value: myRidesAsSeeker.length, icon: Users,     color: '#15803d',         note: 'as seeker',   show: true },
    { label: 'CO₂ Saved',      value: `${co2} kg`,            icon: Leaf,      color: '#0369a1',         note: 'est. total',  show: true },
    { label: 'Activities',     value: myActivities.length,    icon: Heart,     color: '#b91c1c',         note: 'joined',      show: true },
    { label: 'Poolmates',      value: poolmates.length,       icon: Users,     color: '#6d28d9',         note: 'unique',      show: true },
    { label: 'Events Ahead',   value: upcoming.length,        icon: CalendarDays, color: '#b45309',      note: 'upcoming',    show: true },
  ].filter(s => s.show)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

      {/* Welcome */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 3px', fontSize: '22px', fontWeight: '900', color: 'var(--text)' }}>
            {greeting}, {user.name.split(' ')[0]} 👋
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Member</span>
            <span style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: '800', color: 'var(--primary)', background: 'var(--primary-light)', padding: '2px 9px', borderRadius: '6px' }}>{user.id}</span>
            {user.isRider    && <span className="tag tag-blue"  style={{ fontSize: '10px' }}>🚗 Rider</span>}
            {user.isSeekerActive && <span className="tag tag-green" style={{ fontSize: '10px' }}>🔍 Seeker</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {user.isRider && (
            <button className="btn-primary" onClick={() => navigate('/carpooling')}
              style={{ padding: '9px 18px', borderRadius: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Car size={14} /> Post a Ride
            </button>
          )}
          {(user.isSeekerActive || !user.isRider) && (
            <button className="btn-outline" onClick={() => navigate('/carpooling')}
              style={{ padding: '9px 18px', borderRadius: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} /> Find a Ride
            </button>
          )}
        </div>
      </div>

      {/* Pinned announcements */}
      {announcements.filter(a => a.pinned).map(a => (
        <div key={a.id} style={{ padding: '12px 16px', borderRadius: '11px', background: 'rgba(245,158,11,0.06)', border: '1.5px solid rgba(245,158,11,0.22)', display: 'flex', gap: '10px' }}>
          <Megaphone size={15} color="#b45309" style={{ flexShrink: 0, marginTop: '1px' }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#b45309' }}>{a.title}</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-2)', marginTop: '2px' }}>{a.body}</div>
          </div>
        </div>
      ))}

      {/* My personal stats */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>My Carpool & Activity Stats</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          {myStats.map(s => (
            <div key={s.label} className="card card-hover" style={{ padding: '16px 18px', borderRadius: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{s.label}</span>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: s.color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon size={13} color={s.color} />
                </div>
              </div>
              <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: s.color, marginTop: '4px', fontWeight: '600' }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>

        {/* My Poolmates */}
        <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Users size={14} color="var(--primary)" /> My Poolmates
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '14px' }}>People you've ridden with or driven for</div>
          {poolmates.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '13px' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🤝</div>
              No poolmates yet. Join or post a ride!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {poolmates.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border-soft)' }}>
                  <div className="primary-gradient" style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                    {p.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.area}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {p.isRider && <span className="tag tag-blue" style={{ fontSize: '9px', padding: '1px 6px' }}>Rider</span>}
                    {p.isSeekerActive && <span className="tag tag-green" style={{ fontSize: '9px', padding: '1px 6px' }}>Seeker</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <button className="btn-outline" onClick={() => navigate('/my-pools')}
            style={{ width: '100%', padding: '9px', borderRadius: '10px', fontSize: '12px', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            View Pool History <ArrowRight size={12} />
          </button>
        </div>

        {/* Upcoming */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Upcoming rides */}
          <div className="card" style={{ borderRadius: '16px', padding: '18px' }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Car size={14} color="var(--primary)" /> My Upcoming Rides
            </div>
            {upcomingRides.length === 0 ? (
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', padding: '10px 0', textAlign: 'center' }}>No upcoming rides — find or post one!</div>
            ) : upcomingRides.slice(0, 3).map(r => (
              <div key={r.id} onClick={() => navigate('/carpooling')}
                style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border-soft)', marginBottom: '7px', cursor: 'pointer' }}>
                <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text)' }}>{r.origin} → {r.destination}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} />{r.date} {r.time}</span>
                  <span style={{ color: r.riderId === user.id ? 'var(--primary)' : '#15803d', fontWeight: '700' }}>
                    {r.riderId === user.id ? '🚗 You\'re driving' : '🔍 Seeker'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming activities */}
          <div className="card" style={{ borderRadius: '16px', padding: '18px' }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Heart size={14} color="#b91c1c" /> My Upcoming Activities
            </div>
            {upcoming.length === 0 ? (
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', padding: '10px 0', textAlign: 'center' }}>No upcoming events — join an activity!</div>
            ) : upcoming.map(p => {
              const act = activities.find(a => a.id === p.activityId)
              return (
                <div key={p.id} style={{ padding: '10px 12px', borderRadius: '10px', background: act?.bg || 'var(--bg)', border: `1px solid ${act?.color || 'var(--border)'}18`, marginBottom: '7px', display: 'flex', gap: '9px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>{act?.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text)' }}>{p.activityTitle}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>{p.date} · {p.role}</div>
                  </div>
                  <span className="tag tag-blue" style={{ fontSize: '9px' }}>Upcoming</span>
                </div>
              )
            })}
            <button className="btn-outline" onClick={() => navigate('/activities')}
              style={{ width: '100%', padding: '8px', borderRadius: '9px', fontSize: '12px', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              Browse Activities <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* My activity participation history */}
      <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><CheckCircle size={14} color="var(--primary)" /> My NGO Participation</span>
          <button onClick={() => navigate('/activities')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
            All activities <ArrowRight size={12} />
          </button>
        </div>
        {myActivities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>You haven't joined any NGO activities yet. <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => navigate('/activities')}>Browse now →</span></div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {myActivities.map(a => (
              <div key={a.id} style={{ padding: '13px', borderRadius: '11px', background: a.bg, border: `1px solid ${a.color}18`, display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: 'var(--text)' }}>{a.title}</div>
                  <div style={{ fontSize: '11px', color: a.color, fontWeight: '700', marginTop: '2px' }}>{a.impact}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{a.rsvps.length} members · {a.nextEvent}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
