import { useState } from 'react'
import { Calendar, Clock, Car, Plus, Trash2, Edit2, Check, Repeat } from 'lucide-react'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const initSchedules = [
  { id: 1, name: 'Morning Commute', from: 'Sector 62, Noida', to: 'Cyber City, Gurugram', time: '09:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], vehicle: 'shared', active: true },
  { id: 2, name: 'Evening Return', from: 'Cyber City, Gurugram', to: 'Sector 62, Noida', time: '18:30', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], vehicle: 'shared', active: true },
  { id: 3, name: 'Weekend Trip', from: 'Home', to: 'Noida Office', time: '10:00', days: ['Sat'], vehicle: 'solo', active: false },
]

export default function Schedule() {
  const [schedules, setSchedules] = useState(initSchedules)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', from: '', to: '', time: '09:00', days: [], vehicle: 'shared' })

  const toggle = (id) => setSchedules(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
  const remove = (id) => setSchedules(prev => prev.filter(s => s.id !== id))

  const addSchedule = () => {
    if (!form.name || !form.from || !form.to || !form.days.length) return
    setSchedules(prev => [...prev, { ...form, id: Date.now() }])
    setForm({ name: '', from: '', to: '', time: '09:00', days: [], vehicle: 'shared' })
    setShowForm(false)
  }

  const toggleDay = (d) => setForm(f => ({
    ...f, days: f.days.includes(d) ? f.days.filter(x => x !== d) : [...f.days, d]
  }))

  const inputStyle = { width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '10px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '700', color: '#f1f5f9' }}>Schedule</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Set recurring rides for your weekly commute</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)} style={{ padding: '10px 18px', borderRadius: '12px', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <Plus size={16} /> Add Schedule
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="glass" style={{ borderRadius: '18px', padding: '24px', border: '1px solid rgba(56,189,248,0.15)' }}>
          <h3 style={{ margin: '0 0 18px', fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>New Recurring Schedule</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>Schedule Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Morning Office Commute" style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>From</label>
                <input value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))} placeholder="Pickup location" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>To</label>
                <input value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))} placeholder="Drop location" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>Pickup Time</label>
                <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: '500' }}>Vehicle Type</label>
                <select value={form.vehicle} onChange={e => setForm(f => ({ ...f, vehicle: e.target.value }))} style={inputStyle}>
                  <option value="shared">Shared Cab</option>
                  <option value="solo">Solo Ride</option>
                  <option value="exec">Executive</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: '500' }}>Repeat on days</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {days.map(d => (
                  <button key={d} type="button" onClick={() => toggleDay(d)} style={{ width: '40px', height: '40px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', background: form.days.includes(d) ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'rgba(30,41,59,0.6)', border: form.days.includes(d) ? 'none' : '1px solid rgba(71,85,105,0.3)', color: form.days.includes(d) ? 'white' : '#64748b', transition: 'all 0.15s' }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '11px', borderRadius: '11px', background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(71,85,105,0.3)', color: '#94a3b8', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button className="btn-primary" onClick={addSchedule} style={{ flex: 2, padding: '11px', borderRadius: '11px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
                <Check size={15} /> Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedules list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {schedules.map(s => (
          <div key={s.id} className="glass card-hover" style={{ borderRadius: '16px', padding: '20px', border: `1px solid ${s.active ? 'rgba(56,189,248,0.12)' : 'rgba(148,163,184,0.07)'}`, opacity: s.active ? 1 : 0.6, transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: s.active ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'rgba(30,41,59,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Repeat size={20} color={s.active ? 'white' : '#475569'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#f1f5f9' }}>{s.name}</span>
                  <span className={s.active ? 'tag tag-green' : 'tag tag-amber'}>{s.active ? 'Active' : 'Paused'}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>
                  {s.from} → {s.to}
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={12} /> {s.time}</span>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}><Car size={12} /> {s.vehicle === 'shared' ? 'Shared' : s.vehicle === 'solo' ? 'Solo' : 'Executive'}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {days.map(d => (
                    <div key={d} style={{ width: '32px', height: '28px', borderRadius: '7px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.days.includes(d) ? 'rgba(56,189,248,0.12)' : 'rgba(15,23,42,0.5)', color: s.days.includes(d) ? '#38bdf8' : '#334155', border: `1px solid ${s.days.includes(d) ? 'rgba(56,189,248,0.2)' : 'rgba(71,85,105,0.15)'}` }}>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => toggle(s.id)} style={{ padding: '8px 14px', borderRadius: '10px', background: s.active ? 'rgba(251,191,36,0.1)' : 'rgba(34,197,94,0.1)', border: s.active ? '1px solid rgba(251,191,36,0.2)' : '1px solid rgba(34,197,94,0.2)', color: s.active ? '#fbbf24' : '#4ade80', fontSize: '12px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {s.active ? 'Pause' : 'Enable'}
                </button>
                <button onClick={() => remove(s.id)} style={{ padding: '8px', borderRadius: '10px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
