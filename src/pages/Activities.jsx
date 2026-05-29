import { activities, announcements } from '../data/mockData'
import { Globe, Megaphone, ArrowRight, Users } from 'lucide-react'

const categoryColors = {
  Healthcare: '#f87171', Education: '#38bdf8', Environment: '#4ade80',
  Safety: '#fb923c', 'Disaster Relief': '#fbbf24', Community: '#a78bfa',
}

export default function Activities() {
  const active = activities.filter(a => a.status === 'active')
  const completed = activities.filter(a => a.status === 'completed')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '820px' }}>
      {/* Hero */}
      <div style={{ borderRadius: '20px', background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(56,189,248,0.08) 100%)', border: '1px solid rgba(74,222,128,0.15)', padding: '28px 32px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Globe size={26} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: '800', color: '#f1f5f9' }}>TechieRide NGO — Social Welfare</h2>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
            Beyond carpooling, TechieRide is a registered NGO running welfare initiatives across Hyderabad.
            Our community members volunteer time, vehicles, and resources to make a real difference.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
          {[
            { v: '12+', l: 'Active Members' },
            { v: '6',   l: 'Running Drives' },
            { v: '900+', l: 'People Helped' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#4ade80' }}>{s.v}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Megaphone size={16} color="#fbbf24" />
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9' }}>Announcements</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {announcements.map(a => (
            <div key={a.id} style={{ padding: '14px 18px', borderRadius: '13px', background: a.pinned ? 'rgba(251,191,36,0.06)' : 'rgba(15,23,42,0.5)', border: `1px solid ${a.pinned ? 'rgba(251,191,36,0.15)' : 'rgba(148,163,184,0.07)'}`, display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              {a.pinned && <span style={{ fontSize: '14px', flexShrink: 0 }}>📌</span>}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: a.pinned ? '#fbbf24' : '#e2e8f0', marginBottom: '3px' }}>{a.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>{a.body}</div>
                <div style={{ fontSize: '11px', color: '#334155', marginTop: '5px' }}>{a.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active drives */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9' }}>Active Initiatives</span>
          <span className="tag tag-green">{active.length} live</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {active.map(a => {
            const c = categoryColors[a.category] || '#94a3b8'
            return (
              <div key={a.id} className="glass card-hover" style={{ borderRadius: '18px', padding: '22px', border: `1px solid ${c}18` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ fontSize: '34px' }}>{a.icon}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                    <span className="tag" style={{ background: c + '15', color: c, border: `1px solid ${c}25`, fontSize: '10px' }}>{a.category}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{a.date}</span>
                  </div>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', color: '#f1f5f9' }}>{a.title}</h3>
                <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>{a.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 12px', background: c + '12', borderRadius: '20px', border: `1px solid ${c}20` }}>
                    <Users size={12} color={c} />
                    <span style={{ fontSize: '12px', color: c, fontWeight: '700' }}>{a.impact}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div className="pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: '600' }}>Active</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✅</span> Past Initiatives
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {completed.map(a => {
              const c = categoryColors[a.category] || '#94a3b8'
              return (
                <div key={a.id} style={{ padding: '16px 18px', borderRadius: '14px', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(148,163,184,0.07)', display: 'flex', gap: '14px', alignItems: 'center', opacity: 0.85 }}>
                  <span style={{ fontSize: '28px', flexShrink: 0 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#e2e8f0' }}>{a.title}</span>
                      <span className="tag" style={{ background: c + '12', color: c, border: `1px solid ${c}20`, fontSize: '10px' }}>{a.category}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{a.desc}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: c }}>{a.impact}</div>
                    <div style={{ fontSize: '11px', color: '#334155', marginTop: '2px' }}>{a.date}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Volunteer CTA */}
      <div style={{ borderRadius: '18px', background: 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(99,102,241,0.08) 100%)', border: '1px solid rgba(56,189,248,0.12)', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#f1f5f9', marginBottom: '5px' }}>Want to Volunteer for an Initiative?</div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Contact any admin member or reach us at our WhatsApp group to get involved.</div>
        </div>
        <button className="btn-primary" style={{ padding: '11px 22px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Get Involved <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
