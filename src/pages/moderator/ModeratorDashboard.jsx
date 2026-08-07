import { useState, useContext } from 'react'
import { pendingRequests as initialPending, rides as allRides, members, generateTRId } from '../../data/mockData'
import { NotificationContext } from '../../App'
import { showPushNotification, makeNotification, NOTIF_TYPES } from '../../utils/notifications'
import { Shield, CheckCircle, XCircle, Flag, Car, Clock, Phone, MapPin, AlertTriangle, Users, Eye, X } from 'lucide-react'

export default function ModeratorDashboard({ user }) {
  const [pending, setPending]       = useState(initialPending)
  const [flagged, setFlagged]       = useState([])
  const [rides,   setRides]         = useState(allRides)
  const [tab,     setTab]           = useState('approvals')
  const [viewReq, setViewReq]       = useState(null)
  const { addNotification }         = useContext(NotificationContext)

  const approveMember = (req) => {
    const newId = generateTRId(members.map(m => m.id))
    setPending(prev => prev.filter(p => p.id !== req.id))
    const notif = makeNotification(NOTIF_TYPES.MEMBER_APPROVED, {
      title: `${req.name} approved`,
      body: `${newId} assigned — referred by ${req.referrerName}`,
      icon: '✅',
    })
    addNotification(notif)
    showPushNotification('Member Approved', `${req.name} has been approved as ${newId}`)
  }

  const rejectMember = (id) => setPending(prev => prev.filter(p => p.id !== id))

  const flagRide = (ride) => {
    if (flagged.find(f => f.id === ride.id)) return
    setFlagged(prev => [...prev, { ...ride, flaggedAt: new Date().toISOString(), flagReason: '' }])
    setRides(prev => prev.map(r => r.id === ride.id ? { ...r, flagged: true } : r))
    const notif = makeNotification(NOTIF_TYPES.RIDE_FLAGGED, {
      title: 'Ride flagged for review',
      body: `${ride.origin} → ${ride.destination} by ${ride.riderName}`,
      icon: '🚩',
    })
    addNotification(notif)
  }

  const clearFlag = (rideId) => {
    setFlagged(prev => prev.filter(f => f.id !== rideId))
    setRides(prev => prev.map(r => r.id === rideId ? { ...r, flagged: false } : r))
  }

  const kpis = [
    { label: 'Pending Approvals', value: pending.length,  color: '#b45309', icon: Clock   },
    { label: 'Flagged Rides',     value: flagged.length,   color: '#dc2626', icon: Flag    },
    { label: 'Active Rides',      value: rides.filter(r=>r.status==='open').length, color: 'var(--primary)', icon: Car },
    { label: 'Total Members',     value: members.length,   color: '#15803d', icon: Users   },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'linear-gradient(135deg,#f59e0b,#b45309)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={16} color="white" />
          </div>
          <h1 style={{ margin: 0, fontSize: '21px', fontWeight: '800', color: 'var(--text)' }}>Moderator Panel</h1>
        </div>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>
          Hello {user?.name?.split(' ')[0]} — you can approve members and flag rides. Financial data is admin-only.
        </p>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '12px' }}>
        {kpis.map(k => (
          <div key={k.label} className="card" style={{ padding: '16px', borderRadius: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{k.label}</span>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: k.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><k.icon size={13} color={k.color} /></div>
            </div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text)' }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', background: 'var(--bg)', borderRadius: '12px', padding: '3px', border: '1.5px solid var(--border)', width: 'fit-content' }}>
        {[
          { id: 'approvals', label: `Pending Approvals (${pending.length})`, alert: pending.length > 0 },
          { id: 'rides',     label: `Ride Moderation`,  alert: false },
          { id: 'flagged',   label: `Flagged (${flagged.length})`, alert: flagged.length > 0 },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', border: 'none', background: tab === t.id ? '#f59e0b' : 'transparent', color: tab === t.id ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
            {t.alert && tab !== t.id && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── PENDING APPROVALS ── */}
      {tab === 'approvals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {pending.length === 0 && (
            <div className="card" style={{ padding: '40px', textAlign: 'center', borderRadius: '16px', color: 'var(--text-muted)' }}>
              <CheckCircle size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <div style={{ fontSize: '14px', fontWeight: '600' }}>No pending requests</div>
            </div>
          )}
          {pending.map(r => (
            <div key={r.id} className="card" style={{ padding: '18px', borderRadius: '14px', border: '1.5px solid rgba(245,158,11,0.2)' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg,#f59e0b,#b45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                  {r.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>{r.name}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '6px' }}>
                    {[
                      ['📍', r.area],
                      ['📞', r.phone],
                      ['👤', `Referred by ${r.referrerName} (${r.referredBy})`],
                      ['📅', `Applied: ${r.requestDate}`],
                    ].map(([icon, val]) => (
                      <div key={val} style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{icon} {val}</div>
                    ))}
                  </div>
                  {r.wantsToBeRider && r.vehicle && (
                    <div style={{ padding: '7px 10px', borderRadius: '8px', background: 'var(--primary-light)', fontSize: '11px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <Car size={11} /> {r.vehicle.make} · {r.vehicle.color} · {r.vehicle.reg} · {r.vehicle.seats} seats
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignSelf: 'center' }}>
                  <button onClick={() => approveMember(r)}
                    style={{ padding: '9px 16px', borderRadius: '10px', background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.3)', color: '#15803d', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <CheckCircle size={13} /> Approve
                  </button>
                  <button onClick={() => rejectMember(r.id)}
                    style={{ padding: '9px 12px', borderRadius: '10px', background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.2)', color: '#b91c1c', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <XCircle size={13} /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── RIDE MODERATION ── */}
      {tab === 'rides' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {rides.filter(r => r.status === 'open').map(r => (
            <div key={r.id} className="card" style={{ padding: '16px 18px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', border: r.flagged ? '1.5px solid rgba(239,68,68,0.35)' : '1.5px solid var(--border)' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {r.origin} → {r.destination}
                  {r.flagged && <span style={{ padding: '2px 8px', borderRadius: '20px', background: 'rgba(239,68,68,0.1)', color: '#dc2626', fontSize: '10px', fontWeight: '700' }}>🚩 Flagged</span>}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {r.riderName} · {r.date} {r.time} · {r.seatsTotal - r.seatsFilled} seats left
                </div>
                {r.notes && <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px', fontStyle: 'italic' }}>"{r.notes}"</div>}
              </div>
              {!r.flagged ? (
                <button onClick={() => flagRide(r)}
                  style={{ padding: '8px 14px', borderRadius: '9px', background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.2)', color: '#dc2626', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                  <Flag size={12} /> Flag Ride
                </button>
              ) : (
                <button onClick={() => clearFlag(r.id)}
                  style={{ padding: '8px 14px', borderRadius: '9px', background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.3)', color: '#15803d', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                  <CheckCircle size={12} /> Clear Flag
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── FLAGGED ── */}
      {tab === 'flagged' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {flagged.length === 0 && (
            <div className="card" style={{ padding: '40px', textAlign: 'center', borderRadius: '16px', color: 'var(--text-muted)' }}>
              <AlertTriangle size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <div style={{ fontSize: '14px', fontWeight: '600' }}>No flagged rides</div>
            </div>
          )}
          {flagged.map(r => (
            <div key={r.id} className="card" style={{ padding: '16px 18px', borderRadius: '14px', border: '1.5px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)', marginBottom: '3px' }}>{r.origin} → {r.destination}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{r.riderName} · Posted {r.date}</div>
              </div>
              <button onClick={() => clearFlag(r.id)}
                style={{ padding: '8px 14px', borderRadius: '9px', background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.3)', color: '#15803d', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CheckCircle size={12} /> Unflag & Allow
              </button>
              <button onClick={() => setFlagged(prev => prev.filter(f => f.id !== r.id))}
                style={{ padding: '8px 14px', borderRadius: '9px', background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.2)', color: '#dc2626', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <X size={12} /> Remove Ride
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
