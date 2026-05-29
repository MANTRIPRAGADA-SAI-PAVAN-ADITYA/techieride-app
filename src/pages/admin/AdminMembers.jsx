import { useState } from 'react'
import { members as initialMembers, generateTRId } from '../../data/mockData'
import { Plus, Search, UserCheck, UserX, Car, Eye, X, Check } from 'lucide-react'

const inputStyle = { width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.35)', borderRadius: '10px', padding: '10px 13px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }
const label = (txt) => <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '5px', fontWeight: '600', letterSpacing: '0.4px', textTransform: 'uppercase' }}>{txt}</label>

const emptyForm = { name: '', phone: '', email: '', area: '', referredBy: '', isRider: false, isSeekerActive: false, vehicleMake: '', vehicleReg: '', vehicleColor: '', vehicleSeats: 3 }

export default function AdminMembers() {
  const [members, setMembers] = useState(initialMembers)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAdd, setShowAdd] = useState(false)
  const [viewMember, setViewMember] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')

  const inp = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const filtered = members.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q) || m.area.toLowerCase().includes(q) || m.referredBy.toLowerCase().includes(q)
    const matchStatus = filterStatus === 'all' || m.status === filterStatus
    return matchSearch && matchStatus
  })

  const toggleStatus = (id) => setMembers(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m))

  const addMember = () => {
    if (!form.name || !form.phone || !form.area || !form.referredBy) { setFormError('Name, phone, area and referrer are required'); return }
    const refExists = members.find(m => m.id === form.referredBy.toUpperCase())
    if (!refExists) { setFormError(`Referrer ${form.referredBy.toUpperCase()} not found`); return }
    const newId = generateTRId(members.map(m => m.id))
    const newMember = {
      id: newId, name: form.name, phone: form.phone, email: form.email,
      area: form.area, referredBy: form.referredBy.toUpperCase(),
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active', isRider: form.isRider, isSeekerActive: form.isSeekerActive,
      vehicle: form.isRider ? { make: form.vehicleMake, reg: form.vehicleReg.toUpperCase(), color: form.vehicleColor, seats: form.vehicleSeats } : null,
    }
    setMembers(prev => [newMember, ...prev])
    setForm(emptyForm)
    setFormError('')
    setShowAdd(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: '#f1f5f9' }}>Members</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Reference-only membership · {members.length} total · {members.filter(m => m.status === 'active').length} active</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}
          style={{ padding: '10px 18px', borderRadius: '11px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <Plus size={15} /> Add Member
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={14} color="#475569" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, TR ID, area…"
            style={{ ...inputStyle, paddingLeft: '34px', borderRadius: '11px' }} />
        </div>
        {['all', 'active', 'inactive'].map(f => (
          <button key={f} onClick={() => setFilterStatus(f)}
            style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', background: filterStatus === f ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'rgba(30,41,59,0.6)', border: filterStatus === f ? 'none' : '1px solid rgba(71,85,105,0.25)', color: filterStatus === f ? 'white' : '#64748b', textTransform: 'capitalize', transition: 'all 0.15s' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass" style={{ borderRadius: '16px', border: '1px solid rgba(148,163,184,0.08)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 90px 100px 90px 100px 80px', gap: '0', padding: '11px 16px', background: 'rgba(15,23,42,0.6)', borderBottom: '1px solid rgba(148,163,184,0.07)' }}>
          {['TR ID', 'Name / Area', 'Phone', 'Referred by', 'Joined', 'Role', 'Actions'].map(h => (
            <div key={h} style={{ fontSize: '11px', fontWeight: '700', color: '#475569', letterSpacing: '0.4px', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>
        {filtered.map((m, i) => (
          <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 90px 100px 90px 100px 80px', gap: '0', padding: '12px 16px', borderBottom: i < filtered.length - 1 ? '1px solid rgba(148,163,184,0.05)' : 'none', alignItems: 'center', background: m.status === 'inactive' ? 'rgba(248,113,113,0.02)' : 'transparent', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = m.status === 'inactive' ? 'rgba(248,113,113,0.02)' : 'transparent'}>
            <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: '700', color: '#38bdf8' }}>{m.id}</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>{m.name}</div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '1px' }}>{m.area}</div>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{m.phone.slice(-10)}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#94a3b8' }}>{m.referredBy}</div>
            <div style={{ fontSize: '11px', color: '#475569' }}>{m.joinDate}</div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {m.isRider && <span className="tag tag-blue" style={{ fontSize: '9px', padding: '2px 6px' }}>Rider</span>}
              {m.isSeekerActive && <span className="tag tag-green" style={{ fontSize: '9px', padding: '2px 6px' }}>Seeker</span>}
              {!m.isRider && !m.isSeekerActive && <span className="tag tag-amber" style={{ fontSize: '9px', padding: '2px 6px' }}>Member</span>}
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setViewMember(m)} title="View" style={{ padding: '5px', borderRadius: '7px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.15)', color: '#38bdf8', cursor: 'pointer' }}><Eye size={13} /></button>
              <button onClick={() => toggleStatus(m.id)} title={m.status === 'active' ? 'Deactivate' : 'Activate'} style={{ padding: '5px', borderRadius: '7px', background: m.status === 'active' ? 'rgba(248,113,113,0.1)' : 'rgba(74,222,128,0.1)', border: m.status === 'active' ? '1px solid rgba(248,113,113,0.15)' : '1px solid rgba(74,222,128,0.15)', color: m.status === 'active' ? '#f87171' : '#4ade80', cursor: 'pointer' }}>
                {m.status === 'active' ? <UserX size={13} /> : <UserCheck size={13} />}
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '32px', textAlign: 'center', color: '#475569', fontSize: '14px' }}>No members found</div>
        )}
      </div>

      {/* Add Member Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div className="glass" style={{ borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '560px', border: '1px solid rgba(56,189,248,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: '#f1f5f9' }}>Add New Member</h3>
              <button onClick={() => { setShowAdd(false); setFormError('') }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>

            {formError && <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', color: '#f87171', fontSize: '13px' }}>{formError}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>{label('Full Name *')}<input value={form.name} onChange={e => inp('name', e.target.value)} placeholder="Full name" style={inputStyle} /></div>
                <div>{label('Phone *')}<input value={form.phone} onChange={e => inp('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" style={inputStyle} /></div>
                <div>{label('Email')}<input value={form.email} onChange={e => inp('email', e.target.value)} placeholder="email@example.com" style={inputStyle} /></div>
                <div>{label('Area in Hyderabad *')}<input value={form.area} onChange={e => inp('area', e.target.value)} placeholder="Kondapur, Gachibowli…" style={inputStyle} /></div>
                <div style={{ gridColumn: '1/-1' }}>
                  {label('Referred by (TR ID) *')}
                  <input value={form.referredBy} onChange={e => inp('referredBy', e.target.value.toUpperCase())} placeholder="TR1001" style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: '1px' }} />
                </div>
              </div>

              <div style={{ padding: '14px', background: 'rgba(15,23,42,0.5)', borderRadius: '12px', border: '1px solid rgba(148,163,184,0.07)' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Roles</div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {[
                    { key: 'isRider', label: '🚗 Rider (offers rides)' },
                    { key: 'isSeekerActive', label: '🔍 Seeker (joins rides)' },
                  ].map(r => (
                    <label key={r.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: form[r.key] ? '#e2e8f0' : '#64748b' }}>
                      <input type="checkbox" checked={form[r.key]} onChange={e => inp(r.key, e.target.checked)}
                        style={{ width: '15px', height: '15px', accentColor: '#0ea5e9' }} />
                      {r.label}
                    </label>
                  ))}
                </div>
              </div>

              {form.isRider && (
                <div style={{ padding: '14px', background: 'rgba(56,189,248,0.04)', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.1)' }}>
                  <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vehicle Details</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>{label('Make & Model')}<input value={form.vehicleMake} onChange={e => inp('vehicleMake', e.target.value)} placeholder="Maruti Swift Dzire" style={inputStyle} /></div>
                    <div>{label('Reg No.')}<input value={form.vehicleReg} onChange={e => inp('vehicleReg', e.target.value.toUpperCase())} placeholder="TS 09 AB 1234" style={{ ...inputStyle, fontFamily: 'monospace' }} /></div>
                    <div>{label('Color')}<input value={form.vehicleColor} onChange={e => inp('vehicleColor', e.target.value)} placeholder="White" style={inputStyle} /></div>
                    <div>{label('Pool seats')}<select value={form.vehicleSeats} onChange={e => inp('vehicleSeats', +e.target.value)} style={inputStyle}>{[1,2,3,4].map(n=><option key={n} value={n}>{n}</option>)}</select></div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button onClick={() => { setShowAdd(false); setFormError('') }} style={{ flex: 1, padding: '11px', borderRadius: '11px', background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(71,85,105,0.25)', color: '#94a3b8', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button className="btn-primary" onClick={addMember} style={{ flex: 2, padding: '11px', borderRadius: '11px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
                  <Check size={15} /> Add Member & Assign ID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Member Modal */}
      {viewMember && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div className="glass" style={{ borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '420px', border: '1px solid rgba(56,189,248,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#f1f5f9' }}>Member Details</h3>
              <button onClick={() => setViewMember(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: 'white' }}>
                {viewMember.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: '17px', fontWeight: '700', color: '#f1f5f9' }}>{viewMember.name}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#38bdf8', fontWeight: '700' }}>{viewMember.id}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                ['Phone', viewMember.phone],
                ['Email', viewMember.email],
                ['Area', viewMember.area],
                ['Referred By', viewMember.referredBy],
                ['Joined', viewMember.joinDate],
                ['Status', viewMember.status],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 12px', borderRadius: '9px', background: 'rgba(15,23,42,0.5)' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{k}</span>
                  <span style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '500', textTransform: viewMember.status === v ? 'capitalize' : 'none' }}>{v}</span>
                </div>
              ))}
              {viewMember.vehicle && (
                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.1)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Car size={15} color="#38bdf8" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>{viewMember.vehicle.make} · {viewMember.vehicle.color}</div>
                    <div style={{ fontSize: '11px', color: '#475569', fontFamily: 'monospace' }}>{viewMember.vehicle.reg} · {viewMember.vehicle.seats} seats</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
