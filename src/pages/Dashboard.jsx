import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Car, Users, Leaf, Heart, MapPin, Clock, ArrowRight,
  CheckCircle, CalendarDays, Megaphone, Globe, UserCheck, Plus,
  ChevronRight, Phone, BookOpen
} from 'lucide-react'
import { rides, activities, announcements, participations } from '../data/mockData'

// ─── LEFT PANEL: ACTIVITIES TAB ───────────────────────────
function ActivitiesTab({ user }) {
  const [joined, setJoined] = useState({})
  const toggle = (id) => setJoined(j => ({ ...j, [id]: !j[id] }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        TechieRide NGO runs these welfare drives. Join any to volunteer.
      </p>
      {activities.map(a => (
        <div key={a.id} style={{ padding: '12px', borderRadius: '12px', background: a.bg, border: `1.5px solid ${a.color}22` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
            <span style={{ fontSize: '20px', flexShrink: 0, lineHeight: 1 }}>{a.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', marginBottom: '2px' }}>{a.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '6px' }}>{a.desc.slice(0, 80)}…</div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10px', color: a.color, fontWeight: '700', background: a.bg, padding: '2px 7px', borderRadius: '10px', border: `1px solid ${a.color}30` }}>{a.impact}</span>
                <button onClick={() => toggle(a.id)}
                  style={{ fontSize: '10px', fontWeight: '700', padding: '3px 10px', borderRadius: '10px', border: `1.5px solid ${joined[a.id] ? '#15803d' : a.color}`, background: joined[a.id] ? 'rgba(34,197,94,0.1)' : 'transparent', color: joined[a.id] ? '#15803d' : a.color, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', transition: 'all 0.15s' }}>
                  {joined[a.id] ? <><CheckCircle size={9} /> Joined</> : <><Plus size={9} /> Join</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── LEFT PANEL: CARPOOLING TAB ───────────────────────────
function CarpoolingTab({ user }) {
  const navigate = useNavigate()
  const openRides = rides.filter(r => r.status === 'open')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px', marginBottom: '4px' }}>
        <button className="btn-primary" onClick={() => navigate('/carpooling')}
          style={{ padding: '9px 8px', borderRadius: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
          <Car size={13} /> Offer Ride
        </button>
        <button className="btn-outline" onClick={() => navigate('/carpooling')}
          style={{ padding: '9px 8px', borderRadius: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
          <MapPin size={13} /> Find Ride
        </button>
      </div>

      <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {openRides.length} open rides · Hyderabad
      </div>

      {openRides.map(r => {
        const seatsLeft = r.seatsTotal - r.seatsFilled
        return (
          <div key={r.id} onClick={() => navigate('/carpooling')}
            className="card-hover"
            style={{ padding: '11px 12px', borderRadius: '11px', background: 'var(--surface)', border: '1.5px solid var(--border)', cursor: 'pointer', transition: 'all 0.18s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <div className="primary-gradient" style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                {r.riderName.split(' ').map(w => w[0]).join('')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.origin} → {r.destination}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{r.riderName}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={9} /> {r.time}</span>
              <span style={{ fontSize: '10px', color: seatsLeft > 0 ? '#15803d' : '#b91c1c', fontWeight: '700' }}>{seatsLeft} seat{seatsLeft !== 1 ? 's' : ''} free</span>
              <span style={{ fontSize: '10px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '3px' }}><Leaf size={9} /> eco</span>
            </div>
          </div>
        )
      })}
      <button className="btn-outline" onClick={() => navigate('/carpooling')}
        style={{ padding: '9px', borderRadius: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', width: '100%' }}>
        View all rides <ArrowRight size={12} />
      </button>
    </div>
  )
}

// ─── LEFT PANEL: MY PARTICIPATIONS TAB ──────────────────
function MyParticipationsTab({ user }) {
  const navigate = useNavigate()
  const myPools = rides.filter(r => r.seekers?.includes(user?.id) || r.riderId === user?.id)
  const myActivity = participations.filter(p => p.memberId === user?.id)
  const upcoming = myActivity.filter(p => p.status === 'upcoming')
  const past = myActivity.filter(p => p.status === 'completed')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <CalendarDays size={11} /> Upcoming
          </div>
          {upcoming.map(p => {
            const act = activities.find(a => a.id === p.activityId)
            return (
              <div key={p.id} style={{ padding: '10px 11px', borderRadius: '10px', background: 'var(--primary-light)', border: '1.5px solid rgba(20,161,175,0.25)', marginBottom: '6px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>{act?.icon} {p.activityTitle}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{p.date} · {p.role}</div>
                {p.note && <div style={{ fontSize: '11px', color: 'var(--primary-dark)', marginTop: '3px' }}>{p.note}</div>}
              </div>
            )
          })}
        </div>
      )}

      {/* Active carpool involvements */}
      {myPools.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Car size={11} /> My Carpools
          </div>
          {myPools.map(r => (
            <div key={r.id} onClick={() => navigate('/rides')}
              style={{ padding: '10px 11px', borderRadius: '10px', background: 'var(--surface)', border: '1.5px solid var(--border)', marginBottom: '6px', cursor: 'pointer' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>{r.origin} → {r.destination}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{r.date} · {r.riderId === user?.id ? '🚗 You\'re driving' : '🔍 You\'re seeking'}</div>
            </div>
          ))}
        </div>
      )}

      {/* Past activity history */}
      {past.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <CheckCircle size={11} /> Activity History
          </div>
          {past.map(p => {
            const act = activities.find(a => a.id === p.activityId)
            return (
              <div key={p.id} style={{ padding: '10px 11px', borderRadius: '10px', background: 'var(--bg)', border: '1.5px solid var(--border-soft)', marginBottom: '6px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '16px', flexShrink: 0, lineHeight: 1, marginTop: '1px' }}>{act?.icon || '✅'}</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)' }}>{p.activityTitle}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{p.date} · {p.role}</div>
                  {p.note && <div style={{ fontSize: '10px', color: 'var(--text-2)', marginTop: '2px', fontStyle: 'italic' }}>{p.note}</div>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {myPools.length === 0 && myActivity.length === 0 && (
        <div style={{ textAlign: 'center', padding: '28px 10px', color: 'var(--text-muted)', fontSize: '13px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🙌</div>
          No participations yet.<br />Join an activity or a carpool!
        </div>
      )}
    </div>
  )
}

// ─── LEFT PANEL WRAPPER ───────────────────────────────────
function LeftPanel({ user }) {
  const [tab, setTab] = useState('activities')
  const tabs = [
    { id: 'activities',      label: 'Activities',    icon: Heart },
    { id: 'carpooling',      label: 'Carpooling',    icon: Car },
    { id: 'participations',  label: 'My Activity',   icon: UserCheck },
  ]

  return (
    <div className="card" style={{ borderRadius: '16px', padding: '16px', width: '290px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px', alignSelf: 'flex-start', position: 'sticky', top: '16px' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '0', background: 'var(--bg)', borderRadius: '11px', padding: '3px', border: '1.5px solid var(--border)' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, padding: '7px 4px', borderRadius: '9px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', border: 'none', background: tab === t.id ? 'var(--primary)' : 'transparent', color: tab === t.id ? 'white' : 'var(--text-muted)', transition: 'all 0.16s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
            <t.icon size={11} />
            <span style={{ display: 'none' }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Active tab label */}
      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        {(() => { const t = tabs.find(t => t.id === tab); return <><t.icon size={14} color="var(--primary)" />{t.label}</> })()}
      </div>

      {/* Tab content — scrollable */}
      <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', paddingRight: '2px' }}>
        {tab === 'activities'     && <ActivitiesTab user={user} />}
        {tab === 'carpooling'     && <CarpoolingTab user={user} />}
        {tab === 'participations' && <MyParticipationsTab user={user} />}
      </div>
    </div>
  )
}

// ─── MAIN DASHBOARD ───────────────────────────────────────
export default function Dashboard({ user }) {
  const navigate = useNavigate()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const openRides = rides.filter(r => r.status === 'open')

  const stats = [
    { label: 'Total Members',  value: '12',         sub: 'Reference-only', icon: Users,       color: 'var(--primary)' },
    { label: 'Active Rides',   value: openRides.length, sub: 'Open in Hyd', icon: Car,        color: '#15803d' },
    { label: 'NGO Activities', value: activities.length, sub: 'Running now', icon: Heart,     color: '#b91c1c' },
    { label: 'CO₂ Saved',      value: '210 kg',     sub: 'Community (May)', icon: Leaf,       color: '#0369a1' },
  ]

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      {/* ── LEFT PANEL ── */}
      <LeftPanel user={user} />

      {/* ── RIGHT MAIN ── */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>

        {/* Welcome */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '21px', fontWeight: '800', color: 'var(--text)' }}>{greeting}, {user.name.split(' ')[0]} 👋</h1>
            <p style={{ margin: '3px 0 0', color: 'var(--text-muted)', fontSize: '13px' }}>
              Member&nbsp;
              <span style={{ fontFamily: 'monospace', color: 'var(--primary)', fontWeight: '700', background: 'var(--primary-light)', padding: '1px 8px', borderRadius: '6px' }}>{user.id}</span>
              &nbsp;· Hyderabad
            </p>
          </div>
        </div>

        {/* NGO tagline banner */}
        <div style={{ borderRadius: '14px', background: 'linear-gradient(135deg, var(--primary) 0%, #0d3c55 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Globe size={26} color="rgba(255,255,255,0.9)" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'white', letterSpacing: '0.3px' }}>TechieRide — for a better society</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '2px' }}>NGO since 2014 · Reg. 1947/2016 · Community carpooling + social welfare, Hyderabad</div>
          </div>
        </div>

        {/* Pinned announcement */}
        {announcements.filter(a => a.pinned).map(a => (
          <div key={a.id} style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(245,158,11,0.07)', border: '1.5px solid rgba(245,158,11,0.25)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <Megaphone size={16} color="#b45309" style={{ flexShrink: 0, marginTop: '1px' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#b45309', marginBottom: '2px' }}>{a.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-2)' }}>{a.body}</div>
            </div>
          </div>
        ))}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {stats.map(s => (
            <div key={s.label} className="card card-hover" style={{ padding: '16px 18px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '13px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={19} color={s.color} />
              </div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-2)', marginTop: '2px' }}>{s.label}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Announcements */}
        <div className="card" style={{ borderRadius: '14px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Megaphone size={14} color="var(--primary)" /> Announcements
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {announcements.slice(0, 4).map(a => (
              <div key={a.id} style={{ display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: a.pinned ? 'rgba(245,158,11,0.06)' : 'var(--bg)', border: `1.5px solid ${a.pinned ? 'rgba(245,158,11,0.2)' : 'var(--border-soft)'}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: '700', color: a.pinned ? '#b45309' : 'var(--text)', marginBottom: '2px' }}>
                    {a.pinned && '📌 '}{a.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{a.body}</div>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>{a.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* About TechieRide */}
        <div className="card" style={{ borderRadius: '14px', padding: '18px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <BookOpen size={14} color="var(--primary)" /> About TechieRide
          </div>
          <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--text-2)', lineHeight: '1.6' }}>
            TechieRide is an NGO started in <strong>2014</strong> by a group of techies from Hyderabad. It began with the concept of <strong>carpooling</strong> and grew into social welfare activities — Go-Green, Rural Education, Blood Donation and more.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { label: 'Mission', value: 'Build a better society' },
              { label: 'Funding', value: 'Carpool savings + donations' },
              { label: 'Focus', value: 'Students & youth' },
              { label: 'Reg No.', value: '1947/2016' },
            ].map(d => (
              <div key={d.label} className="card-inner" style={{ padding: '9px 11px', borderRadius: '9px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{d.label}</div>
                <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text)', marginTop: '2px' }}>{d.value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
