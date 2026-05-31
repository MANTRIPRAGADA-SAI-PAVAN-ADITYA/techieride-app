import { useState } from 'react'
import { Heart, CheckCircle, Plus, Users, Calendar, ArrowRight } from 'lucide-react'
import { activities, announcements, participations } from '../../data/mockData'

export default function Activities({ user }) {
  const [rsvpd, setRsvpd] = useState(new Set(
    activities.filter(a => a.rsvps?.includes(user.id)).map(a => a.id)
  ))
  const myParts = participations.filter(p => p.memberId === user.id && p.status === 'completed')

  const toggleRsvp = (id) => setRsvpd(prev => {
    const n = new Set(prev)
    n.has(id) ? n.delete(id) : n.add(id)
    return n
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '820px' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '900', color: 'var(--text)' }}>NGO Activities</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>TechieRide welfare initiatives — sign up to volunteer</p>
      </div>

      {announcements.filter(a => !a.pinned).slice(0, 2).map(ann => (
        <div key={ann.id} style={{ padding: '12px 16px', borderRadius: '11px', background: 'var(--bg)', border: '1.5px solid var(--border)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '16px' }}>📢</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', marginBottom: '2px' }}>{ann.title}</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{ann.body}</div>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>{ann.date}</span>
        </div>
      ))}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '18px' }}>
        {activities.map(a => {
          const joined = rsvpd.has(a.id)
          return (
            <div key={a.id} className="card" style={{ borderRadius: '18px', padding: '22px', border: joined ? `1.5px solid ${a.color}35` : undefined }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span style={{ fontSize: '34px', lineHeight: 1 }}>{a.icon}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', padding: '3px 9px', borderRadius: '20px', background: a.color + '14', color: a.color, border: `1px solid ${a.color}22` }}>{a.category}</span>
                  {joined && <span className="tag tag-green" style={{ fontSize: '9px' }}><CheckCircle size={9} /> Joined</span>}
                </div>
              </div>
              <h3 style={{ margin: '0 0 7px', fontSize: '17px', fontWeight: '800', color: 'var(--text)' }}>{a.title}</h3>
              <p style={{ margin: '0 0 14px', fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.65 }}>{a.desc}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: 'var(--text-muted)' }}><Users size={11} />{a.rsvps.length} signed up</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: 'var(--text-muted)' }}><Calendar size={11} />Next: {a.nextEvent}</div>
                <span style={{ fontSize: '11.5px', fontWeight: '700', color: a.color, background: a.bg, padding: '2px 9px', borderRadius: '20px' }}>{a.impact}</span>
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '14px', padding: '8px 11px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border-soft)' }}>
                <strong style={{ color: 'var(--text-2)' }}>Needed:</strong> {a.participantsNeeded}
              </div>
              <button onClick={() => toggleRsvp(a.id)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', border: joined ? `1.5px solid ${a.color}30` : 'none', background: joined ? `${a.color}12` : a.color, color: joined ? a.color : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.18s' }}>
                {joined ? <><CheckCircle size={14} /> Signed Up — Click to Leave</> : <><Plus size={14} /> Sign Up to Volunteer</>}
              </button>
            </div>
          )
        })}
      </div>

      {myParts.length > 0 && (
        <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <CheckCircle size={15} color="var(--primary)" /> My Participation History
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {myParts.map(p => {
              const act = activities.find(a => a.id === p.activityId)
              return (
                <div key={p.id} style={{ display: 'flex', gap: '12px', padding: '11px 13px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border-soft)', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>{act?.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{p.activityTitle}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>{p.date} · {p.role}</div>
                    {p.note && <div style={{ fontSize: '11.5px', color: 'var(--text-2)', marginTop: '2px', fontStyle: 'italic' }}>{p.note}</div>}
                  </div>
                  <span className="tag tag-green" style={{ fontSize: '10px' }}>Completed</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
