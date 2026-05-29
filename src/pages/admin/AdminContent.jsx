import { useState } from 'react'
import { activities as initialActivities, announcements as initialAnnouncements } from '../../data/mockData'
import { Plus, Edit2, Trash2, Check, X, Pin, Megaphone, Heart } from 'lucide-react'

const inputStyle = { width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.35)', borderRadius: '10px', padding: '10px 13px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }
const lbl = (txt) => <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '5px', fontWeight: '600', letterSpacing: '0.4px', textTransform: 'uppercase' }}>{txt}</label>

const CATEGORIES = ['Healthcare', 'Education', 'Environment', 'Safety', 'Disaster Relief', 'Community']
const CAT_COLORS = { Healthcare: '#f87171', Education: '#38bdf8', Environment: '#4ade80', Safety: '#fb923c', 'Disaster Relief': '#fbbf24', Community: '#a78bfa' }

export default function AdminContent() {
  const [actTab, setActTab] = useState('activities')
  const [activities, setActivities] = useState(initialActivities)
  const [announcements, setAnnouncements] = useState(initialAnnouncements)

  // Activity form
  const [showActForm, setShowActForm] = useState(false)
  const [editAct, setEditAct] = useState(null)
  const [actForm, setActForm] = useState({ title: '', category: 'Community', icon: '🤝', desc: '', date: '', impact: '', status: 'active' })

  // Announcement form
  const [showAnnForm, setShowAnnForm] = useState(false)
  const [annForm, setAnnForm] = useState({ title: '', body: '', pinned: false })

  const openActForm = (act) => {
    if (act) { setEditAct(act.id); setActForm({ title: act.title, category: act.category, icon: act.icon, desc: act.desc, date: act.date, impact: act.impact, status: act.status }) }
    else { setEditAct(null); setActForm({ title: '', category: 'Community', icon: '🤝', desc: '', date: '', impact: '', status: 'active' }) }
    setShowActForm(true)
  }

  const saveActivity = () => {
    if (!actForm.title || !actForm.desc) return
    const c = actForm.category
    if (editAct) {
      setActivities(prev => prev.map(a => a.id === editAct ? { ...a, ...actForm, color: CAT_COLORS[c] || '#94a3b8', bg: (CAT_COLORS[c] || '#94a3b8') + '12' } : a))
    } else {
      setActivities(prev => [...prev, { id: 'A' + Date.now(), ...actForm, color: CAT_COLORS[c] || '#94a3b8', bg: (CAT_COLORS[c] || '#94a3b8') + '12' }])
    }
    setShowActForm(false)
  }

  const deleteActivity = (id) => setActivities(prev => prev.filter(a => a.id !== id))
  const toggleActStatus = (id) => setActivities(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'completed' : 'active' } : a))

  const saveAnnouncement = () => {
    if (!annForm.title || !annForm.body) return
    setAnnouncements(prev => [{ id: Date.now(), ...annForm, date: new Date().toISOString().split('T')[0] }, ...prev])
    setAnnForm({ title: '', body: '', pinned: false })
    setShowAnnForm(false)
  }

  const deleteAnn = (id) => setAnnouncements(prev => prev.filter(a => a.id !== id))
  const togglePin = (id) => setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '820px' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: '#f1f5f9' }}>NGO Content</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Manage welfare activities and member announcements</p>
      </div>

      {/* Sub-tab */}
      <div style={{ display: 'flex', gap: '0', background: 'rgba(15,23,42,0.8)', borderRadius: '13px', padding: '4px', border: '1px solid rgba(71,85,105,0.2)', width: 'fit-content' }}>
        {[{ id: 'activities', label: '❤️ Activities' }, { id: 'announcements', label: '📢 Announcements' }].map(t => (
          <button key={t.id} onClick={() => setActTab(t.id)}
            style={{ padding: '9px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', border: 'none', background: actTab === t.id ? 'linear-gradient(135deg,#8b5cf6,#6366f1)' : 'transparent', color: actTab === t.id ? 'white' : '#64748b', transition: 'all 0.15s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ACTIVITIES TAB */}
      {actTab === 'activities' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>{activities.length} total · {activities.filter(a => a.status === 'active').length} active</span>
            <button className="btn-primary" onClick={() => openActForm(null)}
              style={{ padding: '9px 16px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={14} /> Add Activity
            </button>
          </div>

          {activities.map(a => {
            const c = CAT_COLORS[a.category] || '#94a3b8'
            return (
              <div key={a.id} className="glass" style={{ borderRadius: '14px', padding: '16px 18px', border: `1px solid ${c}15`, display: 'flex', gap: '14px', alignItems: 'center' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{a.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#f1f5f9' }}>{a.title}</span>
                    <span className="tag" style={{ background: c + '15', color: c, border: `1px solid ${c}20`, fontSize: '10px' }}>{a.category}</span>
                    <span className={`tag ${a.status === 'active' ? 'tag-green' : 'tag-amber'}`} style={{ fontSize: '10px' }}>{a.status}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.desc}</div>
                  <div style={{ fontSize: '11px', color: c, fontWeight: '600' }}>{a.impact} · {a.date}</div>
                </div>
                <div style={{ display: 'flex', gap: '7px', flexShrink: 0 }}>
                  <button onClick={() => toggleActStatus(a.id)} title={a.status === 'active' ? 'Mark completed' : 'Reactivate'}
                    style={{ padding: '6px 10px', borderRadius: '8px', background: a.status === 'active' ? 'rgba(251,191,36,0.1)' : 'rgba(74,222,128,0.1)', border: a.status === 'active' ? '1px solid rgba(251,191,36,0.2)' : '1px solid rgba(74,222,128,0.2)', color: a.status === 'active' ? '#fbbf24' : '#4ade80', cursor: 'pointer', fontSize: '11px', fontWeight: '600' }}>
                    {a.status === 'active' ? 'Complete' : 'Reactivate'}
                  </button>
                  <button onClick={() => openActForm(a)} style={{ padding: '6px', borderRadius: '8px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.15)', color: '#38bdf8', cursor: 'pointer' }}><Edit2 size={13} /></button>
                  <button onClick={() => deleteActivity(a.id)} style={{ padding: '6px', borderRadius: '8px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)', color: '#f87171', cursor: 'pointer' }}><Trash2 size={13} /></button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ANNOUNCEMENTS TAB */}
      {actTab === 'announcements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>{announcements.length} announcements</span>
            <button className="btn-primary" onClick={() => setShowAnnForm(true)}
              style={{ padding: '9px 16px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={14} /> New Announcement
            </button>
          </div>

          {showAnnForm && (
            <div className="glass" style={{ borderRadius: '14px', padding: '18px', border: '1px solid rgba(167,139,250,0.15)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>{lbl('Title')}<input value={annForm.title} onChange={e => setAnnForm(f => ({ ...f, title: e.target.value }))} placeholder="Announcement title" style={inputStyle} /></div>
                <div>{lbl('Body')}<textarea value={annForm.body} onChange={e => setAnnForm(f => ({ ...f, body: e.target.value }))} placeholder="Announcement message…" rows={3} style={{ ...inputStyle, resize: 'vertical' }} /></div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#94a3b8' }}>
                  <input type="checkbox" checked={annForm.pinned} onChange={e => setAnnForm(f => ({ ...f, pinned: e.target.checked })) } style={{ accentColor: '#8b5cf6', width: '14px', height: '14px' }} />
                  Pin this announcement
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setShowAnnForm(false)} style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(71,85,105,0.25)', color: '#94a3b8', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                  <button className="btn-primary" onClick={saveAnnouncement} style={{ flex: 2, padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Check size={14} /> Publish
                  </button>
                </div>
              </div>
            </div>
          )}

          {announcements.map(a => (
            <div key={a.id} style={{ padding: '14px 16px', borderRadius: '13px', background: a.pinned ? 'rgba(251,191,36,0.04)' : 'rgba(15,23,42,0.5)', border: `1px solid ${a.pinned ? 'rgba(251,191,36,0.12)' : 'rgba(148,163,184,0.07)'}`, display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#e2e8f0', marginBottom: '4px' }}>{a.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '6px' }}>{a.body}</div>
                <div style={{ fontSize: '11px', color: '#334155' }}>{a.date} {a.pinned && <span style={{ color: '#fbbf24', marginLeft: '8px', fontWeight: '600' }}>📌 Pinned</span>}</div>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button onClick={() => togglePin(a.id)} title={a.pinned ? 'Unpin' : 'Pin'}
                  style={{ padding: '6px', borderRadius: '8px', background: a.pinned ? 'rgba(251,191,36,0.12)' : 'rgba(30,41,59,0.6)', border: `1px solid ${a.pinned ? 'rgba(251,191,36,0.2)' : 'rgba(71,85,105,0.2)'}`, color: a.pinned ? '#fbbf24' : '#64748b', cursor: 'pointer' }}>
                  <Pin size={13} />
                </button>
                <button onClick={() => deleteAnn(a.id)} style={{ padding: '6px', borderRadius: '8px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)', color: '#f87171', cursor: 'pointer' }}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity Form Modal */}
      {showActForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div className="glass" style={{ borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '500px', border: '1px solid rgba(167,139,250,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#f1f5f9' }}>{editAct ? 'Edit' : 'Add'} Activity</h3>
              <button onClick={() => setShowActForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '10px' }}>
                <div>{lbl('Icon')}<input value={actForm.icon} onChange={e => setActForm(f => ({ ...f, icon: e.target.value }))} style={{ ...inputStyle, textAlign: 'center', fontSize: '20px' }} /></div>
                <div>{lbl('Title')}<input value={actForm.title} onChange={e => setActForm(f => ({ ...f, title: e.target.value }))} placeholder="Activity title" style={inputStyle} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>{lbl('Category')}<select value={actForm.category} onChange={e => setActForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
                <div>{lbl('Status')}<select value={actForm.status} onChange={e => setActForm(f => ({ ...f, status: e.target.value }))} style={inputStyle}><option value="active">Active</option><option value="completed">Completed</option></select></div>
                <div>{lbl('Date / Period')}<input value={actForm.date} onChange={e => setActForm(f => ({ ...f, date: e.target.value }))} placeholder="Ongoing / May 2026" style={inputStyle} /></div>
                <div>{lbl('Impact')}<input value={actForm.impact} onChange={e => setActForm(f => ({ ...f, impact: e.target.value }))} placeholder="120+ helped" style={inputStyle} /></div>
              </div>
              <div>{lbl('Description')}<textarea value={actForm.desc} onChange={e => setActForm(f => ({ ...f, desc: e.target.value }))} rows={3} placeholder="What does this initiative do?" style={{ ...inputStyle, resize: 'vertical' }} /></div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button onClick={() => setShowActForm(false)} style={{ flex: 1, padding: '11px', borderRadius: '11px', background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(71,85,105,0.25)', color: '#94a3b8', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button className="btn-primary" onClick={saveActivity} style={{ flex: 2, padding: '11px', borderRadius: '11px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
                  <Check size={15} /> {editAct ? 'Save Changes' : 'Add Activity'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
