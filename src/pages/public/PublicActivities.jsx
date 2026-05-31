import { useNavigate } from 'react-router-dom'
import { Heart, ArrowRight, Users, Calendar } from 'lucide-react'
import { activities, announcements } from '../../data/mockData'

export default function PublicActivities() {
  const navigate = useNavigate()
  const active    = activities.filter(a => a.status === 'active')
  const completed = activities.filter(a => a.status === 'completed')

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>NGO WELFARE ACTIVITIES</div>
        <h1 style={{ margin: '0 0 12px', fontSize: '38px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px' }}>What TechieRide Does</h1>
        <p style={{ margin: '0 auto', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '540px' }}>
          Beyond carpooling, TechieRide runs hands-on welfare initiatives across Hyderabad. All volunteer-driven, all community-funded.
        </p>
      </div>

      {/* Announcements */}
      {announcements.filter(a => a.pinned).map(ann => (
        <div key={ann.id} style={{ padding: '14px 18px', borderRadius: '12px', background: 'rgba(245,158,11,0.06)', border: '1.5px solid rgba(245,158,11,0.2)', marginBottom: '32px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px' }}>📌</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#b45309', marginBottom: '3px' }}>{ann.title}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-2)' }}>{ann.body}</div>
          </div>
        </div>
      ))}

      {/* Active activities */}
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#15803d' }} />
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: 'var(--text)' }}>Active Initiatives</h2>
        <span className="tag tag-green">{active.length} running</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '52px' }}>
        {active.map(a => (
          <div key={a.id} className="card" style={{ borderRadius: '18px', padding: '24px', border: `1.5px solid ${a.color}18`, transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '36px' }}>{a.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', padding: '3px 9px', borderRadius: '20px', background: a.color + '14', color: a.color, border: `1px solid ${a.color}22` }}>{a.category}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{a.date}</span>
              </div>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '800', color: 'var(--text)' }}>{a.title}</h3>
            <p style={{ margin: '0 0 16px', fontSize: '13.5px', color: 'var(--text-2)', lineHeight: 1.65 }}>{a.desc}</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: a.color + '12', border: `1px solid ${a.color}20` }}>
                <Users size={12} color={a.color} />
                <span style={{ fontSize: '12px', fontWeight: '700', color: a.color }}>{a.impact}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div className="pulse" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#15803d' }} />
                <span style={{ fontSize: '11px', color: '#15803d', fontWeight: '700' }}>Active</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>Next: {a.nextEvent}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Volunteer CTA */}
      <div style={{ borderRadius: '18px', background: 'linear-gradient(135deg, #0d3c55, #14a1af)', padding: '40px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '48px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '900', color: 'white' }}>Want to volunteer or donate?</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Become a TechieRide member to participate. Anyone can donate.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/donate')}
            style={{ padding: '12px 24px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Heart size={15} /> Donate
          </button>
          <button onClick={() => navigate('/register')}
            style={{ padding: '12px 24px', borderRadius: '10px', background: 'white', border: 'none', color: 'var(--primary)', fontSize: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px' }}>
            Join TechieRide <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
