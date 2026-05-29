import { useNavigate } from 'react-router-dom'
import { Users, Car, Heart, TrendingUp, ArrowRight, Clock, AlertCircle } from 'lucide-react'
import { members, rides, activities, announcements } from '../../data/mockData'

export default function AdminPanel() {
  const navigate = useNavigate()
  const activeMembers = members.filter(m => m.status === 'active')
  const riders = members.filter(m => m.isRider)
  const openRides = rides.filter(r => r.status === 'open')
  const activeActivities = activities.filter(a => a.status === 'active')

  const stats = [
    { label: 'Total Members', value: members.length, active: activeMembers.length, icon: Users, color: '#38bdf8', grad: 'linear-gradient(135deg,#0ea5e9,#0284c7)', path: '/admin/members' },
    { label: 'Active Riders', value: riders.length, active: null, icon: Car, color: '#4ade80', grad: 'linear-gradient(135deg,#22c55e,#16a34a)', path: '/admin/rides' },
    { label: 'Open Rides', value: openRides.length, active: null, icon: TrendingUp, color: '#a78bfa', grad: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', path: '/admin/rides' },
    { label: 'NGO Initiatives', value: activeActivities.length, active: null, icon: Heart, color: '#f87171', grad: 'linear-gradient(135deg,#ef4444,#dc2626)', path: '/admin/content' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: '#f1f5f9' }}>Admin Overview</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>TechieRide NGO · Hyderabad community dashboard</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
        {stats.map(s => (
          <div key={s.label} className="glass card-hover" onClick={() => navigate(s.path)}
            style={{ borderRadius: '15px', padding: '20px', border: '1px solid rgba(148,163,184,0.08)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{s.label}</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: s.grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={15} color="white" />
              </div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: '800', color: '#f1f5f9', lineHeight: 1 }}>{s.value}</div>
            {s.active !== null && (
              <div style={{ fontSize: '11px', color: s.color, marginTop: '5px' }}>{s.active} active</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
        {/* Recent members */}
        <div className="glass" style={{ borderRadius: '16px', padding: '20px', border: '1px solid rgba(148,163,184,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#f1f5f9' }}>Recent Members</span>
            <button onClick={() => navigate('/admin/members')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#38bdf8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[...members].sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate)).slice(0, 5).map(m => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', background: 'rgba(15,23,42,0.5)' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                  {m.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>{m.area}</div>
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: '700', color: '#38bdf8' }}>{m.id}</span>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: m.status === 'active' ? '#22c55e' : '#f87171', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Open rides */}
        <div className="glass" style={{ borderRadius: '16px', padding: '20px', border: '1px solid rgba(148,163,184,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#f1f5f9' }}>Open Rides</span>
            <button onClick={() => navigate('/admin/rides')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#38bdf8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {openRides.map(r => (
              <div key={r.id} style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(15,23,42,0.5)' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0', marginBottom: '3px' }}>{r.origin} → {r.destination}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#475569' }}>{r.riderName} · {r.date} {r.time}</span>
                  <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: '600' }}>{r.seatsTotal - r.seatsFilled} seats left</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements quick view */}
      <div className="glass" style={{ borderRadius: '16px', padding: '20px', border: '1px solid rgba(148,163,184,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#f1f5f9' }}>Announcements</span>
          <button onClick={() => navigate('/admin/content')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#38bdf8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
            Manage <ArrowRight size={12} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {announcements.map(a => (
            <div key={a.id} style={{ display: 'flex', gap: '10px', padding: '10px 13px', borderRadius: '10px', background: a.pinned ? 'rgba(251,191,36,0.05)' : 'rgba(15,23,42,0.4)', border: a.pinned ? '1px solid rgba(251,191,36,0.12)' : '1px solid transparent' }}>
              {a.pinned && <AlertCircle size={14} color="#fbbf24" style={{ flexShrink: 0, marginTop: '1px' }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>{a.title}</div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px', display: 'flex', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} /> {a.date}</span>
                  {a.pinned && <span style={{ color: '#fbbf24' }}>Pinned</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
