import { useNavigate } from 'react-router-dom'
import { Car, Users, Leaf, Heart, ArrowRight, MapPin, TrendingUp, Globe, HandHeart, Clock, Megaphone } from 'lucide-react'
import { rides, activities, announcements } from '../data/mockData'

export default function Dashboard({ user }) {
  const navigate = useNavigate()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const openRides = rides.filter(r => r.status === 'open')
  const activeActivities = activities.filter(a => a.status === 'active')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

      {/* Welcome */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#f1f5f9' }}>{greeting}, {user.name.split(' ')[0]} 👋</h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Member&nbsp;
            <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '700', background: 'rgba(56,189,248,0.08)', padding: '2px 8px', borderRadius: '6px' }}>{user.id}</span>
            &nbsp;· Hyderabad
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-primary" onClick={() => navigate('/carpooling')}
            style={{ padding: '10px 18px', borderRadius: '11px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Car size={15} /> Carpooling
          </button>
        </div>
      </div>

      {/* Announcements */}
      {announcements.filter(a => a.pinned).map(a => (
        <div key={a.id} style={{ borderRadius: '14px', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', padding: '14px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <Megaphone size={17} color="#fbbf24" style={{ flexShrink: 0, marginTop: '1px' }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#fbbf24', marginBottom: '2px' }}>{a.title}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>{a.body}</div>
          </div>
        </div>
      ))}

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
        {[
          { icon: Users, label: 'Total Members', value: '12', sub: 'Reference-only network', color: '#38bdf8', grad: 'linear-gradient(135deg,#0ea5e9,#0284c7)' },
          { icon: Car,   label: 'Active Rides',  value: openRides.length, sub: 'Open in Hyderabad', color: '#4ade80', grad: 'linear-gradient(135deg,#22c55e,#16a34a)' },
          { icon: Heart, label: 'NGO Drives',    value: activeActivities.length, sub: 'Running right now', color: '#f87171', grad: 'linear-gradient(135deg,#ef4444,#dc2626)' },
          { icon: Leaf,  label: 'CO₂ Saved',    value: '210 kg', sub: 'Community total (May)', color: '#a78bfa', grad: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
        ].map(s => (
          <div key={s.label} className="glass card-hover" style={{ borderRadius: '15px', padding: '18px', border: '1px solid rgba(148,163,184,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{s.label}</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: s.grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={15} color="white" />
              </div>
            </div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#f1f5f9', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: s.color, marginTop: '5px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Available rides preview */}
      <div className="glass" style={{ borderRadius: '16px', padding: '20px', border: '1px solid rgba(148,163,184,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <Car size={17} color="#38bdf8" />
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9' }}>Available Carpools</span>
            <span className="tag tag-blue">{openRides.length} open</span>
          </div>
          <button onClick={() => navigate('/carpooling')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#38bdf8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View all <ArrowRight size={13} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {openRides.slice(0, 3).map(r => (
            <div key={r.id} onClick={() => navigate('/carpooling')} style={{ padding: '13px 15px', borderRadius: '12px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.06)', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.18s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(56,189,248,0.2)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(148,163,184,0.06)'}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                {r.riderName.split(' ').map(w => w[0]).join('')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>{r.origin} → {r.destination}</div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                  {r.riderName} · {r.date} {r.time} · {r.seatsTotal - r.seatsFilled} seat{r.seatsTotal - r.seatsFilled !== 1 ? 's' : ''} free
                </div>
              </div>
              <span className="tag tag-green" style={{ flexShrink: 0 }}>{r.seatsTotal - r.seatsFilled} left</span>
            </div>
          ))}
        </div>
      </div>

      {/* NGO activities preview */}
      <div className="glass" style={{ borderRadius: '16px', padding: '20px', border: '1px solid rgba(148,163,184,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <HandHeart size={17} color="#f87171" />
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9' }}>NGO Welfare Activities</span>
          </div>
          <button onClick={() => navigate('/activities')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#38bdf8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            All activities <ArrowRight size={13} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {activeActivities.slice(0, 3).map(a => (
            <div key={a.id} onClick={() => navigate('/activities')} style={{ padding: '14px', borderRadius: '12px', background: a.bg, border: `1px solid ${a.color}20`, cursor: 'pointer', transition: 'transform 0.18s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ fontSize: '22px', marginBottom: '7px' }}>{a.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#f1f5f9', marginBottom: '3px' }}>{a.title}</div>
              <div style={{ fontSize: '11px', color: a.color, fontWeight: '600' }}>{a.impact}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
        {[
          { label: 'Find a Ride', icon: MapPin, action: '/carpooling', color: '#38bdf8' },
          { label: 'Offer a Seat', icon: Car, action: '/carpooling', color: '#4ade80' },
          { label: 'NGO Activities', icon: Heart, action: '/activities', color: '#f87171' },
          { label: 'My Profile', icon: Users, action: '/profile', color: '#a78bfa' },
        ].map(({ label, icon: Icon, action, color }) => (
          <button key={label} onClick={() => navigate(action)} style={{ padding: '14px', borderRadius: '12px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.07)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '9px', color: '#64748b', fontSize: '13px', fontWeight: '600', transition: 'all 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + '30'; e.currentTarget.style.background = color + '0d' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(148,163,184,0.07)'; e.currentTarget.style.background = 'rgba(15,23,42,0.6)' }}>
            <Icon size={16} />{label}
          </button>
        ))}
      </div>
    </div>
  )
}
