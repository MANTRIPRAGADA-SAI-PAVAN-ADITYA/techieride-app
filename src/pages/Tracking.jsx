import { useState, useEffect } from 'react'
import { MapPin, Phone, MessageCircle, Star, Car, Clock, Navigation, User, ChevronRight } from 'lucide-react'

export default function Tracking() {
  const [progress, setProgress] = useState(35)
  const [eta, setEta] = useState(8)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => { if (p >= 95) { clearInterval(t); return p } return p + 0.5 })
      setEta(e => Math.max(0, e - 0.05))
    }, 200)
    return () => clearInterval(t)
  }, [])

  const etaMin = Math.ceil(eta)

  const stops = [
    { label: 'Pickup – Sector 62 Metro Gate 2', done: true, time: '09:10 AM' },
    { label: 'Rajesh picked up Neha S.', done: true, time: '09:18 AM' },
    { label: 'Via NH-24 → NH-48', done: progress > 50, time: progress > 50 ? 'In progress' : 'Upcoming' },
    { label: 'Drop – Cyber City Tower B', done: false, time: 'ETA ~09:52 AM' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '700', color: '#f1f5f9' }}>Live Tracking</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Real-time cab location & ETA</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px', alignItems: 'start' }}>
        {/* Map */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(148,163,184,0.08)', background: '#0d1526', position: 'relative', minHeight: '480px' }}>
          <div className="map-grid" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

          {/* Animated route path */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <defs>
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Route line */}
            <polyline points="80,420 200,340 350,280 480,200 580,160 650,120" fill="none" stroke="url(#routeGrad)" strokeWidth="3" strokeDasharray="8,4" opacity="0.6" />
            {/* Completed portion */}
            <polyline
              points={`80,420 ${80 + (progress / 100) * 570},${420 - (progress / 100) * 300}`}
              fill="none" stroke="#38bdf8" strokeWidth="3" filter="url(#glow)"
            />
            {/* Pickup */}
            <circle cx="80" cy="420" r="8" fill="#22c55e" filter="url(#glow)" />
            <circle cx="80" cy="420" r="14" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.4" />
            {/* Drop */}
            <circle cx="650" cy="120" r="8" fill="#f87171" filter="url(#glow)" />
            <circle cx="650" cy="120" r="14" fill="none" stroke="#f87171" strokeWidth="2" opacity="0.4" />
            {/* Cab (moving dot) */}
            <circle
              cx={80 + (progress / 100) * 570}
              cy={420 - (progress / 100) * 300}
              r="10" fill="white" filter="url(#glow)"
            />
            <circle
              cx={80 + (progress / 100) * 570}
              cy={420 - (progress / 100) * 300}
              r="16" fill="none" stroke="white" strokeWidth="2" opacity="0.3"
            />
          </svg>

          {/* Labels */}
          <div style={{ position: 'absolute', bottom: '60px', left: '40px', zIndex: 2 }}>
            <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '6px 12px' }}>
              <div style={{ fontSize: '11px', color: '#4ade80', fontWeight: '600' }}>📍 PICKUP</div>
              <div style={{ fontSize: '12px', color: '#e2e8f0' }}>Sector 62, Noida</div>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '30px', right: '40px', zIndex: 2 }}>
            <div style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '6px 12px' }}>
              <div style={{ fontSize: '11px', color: '#f87171', fontWeight: '600' }}>🏁 DROP</div>
              <div style={{ fontSize: '12px', color: '#e2e8f0' }}>Cyber City, Gurugram</div>
            </div>
          </div>

          {/* ETA pill */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2, background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '20px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: '13px', color: '#38bdf8', fontWeight: '600' }}>ETA {etaMin} min</span>
          </div>

          {/* Progress bar */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'rgba(56,189,248,0.1)' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #0ea5e9, #6366f1)', transition: 'width 0.2s linear' }} />
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Driver card */}
          <div className="glass" style={{ borderRadius: '16px', padding: '20px', border: '1px solid rgba(148,163,184,0.08)' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Driver</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: 'white', flexShrink: 0 }}>RK</div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#f1f5f9' }}>Rajesh Kumar</div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '3px' }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={i <= 5 ? '#fbbf24' : 'none'} color="#fbbf24" />)}
                  <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '4px' }}>4.9 (312 trips)</span>
                </div>
              </div>
            </div>
            <div style={{ background: 'rgba(15,23,42,0.6)', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#f1f5f9' }}>Swift Dzire • White</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>DL 4C AB 9821</div>
              </div>
              <Car size={22} color="#38bdf8" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button style={{ padding: '11px', borderRadius: '12px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', color: '#38bdf8', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Phone size={15} /> Call
              </button>
              <button style={{ padding: '11px', borderRadius: '12px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <MessageCircle size={15} /> Chat
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="glass" style={{ borderRadius: '16px', padding: '20px', border: '1px solid rgba(148,163,184,0.08)' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Route Progress</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {stops.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: s.done ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(30,41,59,0.8)', border: s.done ? 'none' : '2px solid rgba(71,85,105,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                      {s.done && <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="2,5 4,7 8,3" fill="none" stroke="white" strokeWidth="1.5" /></svg>}
                    </div>
                    {i < stops.length - 1 && <div style={{ width: '2px', height: '32px', background: s.done ? 'linear-gradient(180deg, #22c55e, rgba(56,189,248,0.3))' : 'rgba(71,85,105,0.2)', transition: 'background 0.3s' }} />}
                  </div>
                  <div style={{ paddingBottom: i < stops.length - 1 ? '20px' : '0', flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: s.done ? '#e2e8f0' : '#64748b' }}>{s.label}</div>
                    <div style={{ fontSize: '11px', color: s.done ? '#22c55e' : '#475569', marginTop: '2px' }}>{s.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Distance Left', value: `${Math.round((1 - progress / 100) * 28)} km` },
              { label: 'ETA', value: `${etaMin} min` },
              { label: 'Speed', value: '42 km/h' },
              { label: 'Route', value: 'Via NH-48' },
            ].map(s => (
              <div key={s.label} className="glass-light" style={{ borderRadius: '12px', padding: '14px', border: '1px solid rgba(148,163,184,0.06)' }}>
                <div style={{ fontSize: '11px', color: '#475569', marginBottom: '4px' }}>{s.label}</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#38bdf8' }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
