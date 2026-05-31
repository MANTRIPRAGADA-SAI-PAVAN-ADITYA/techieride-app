import { useState } from 'react'
import { members as initialMembers, pendingRequests as initialPending, activities, rides, participations, generateTRId, exportCSV } from '../../data/mockData'
import { Plus, Search, UserCheck, UserX, Car, Eye, X, Check, Download, ChevronDown, ChevronUp, Heart, Clock, AlertCircle, CheckCircle, XCircle, Phone, Mail, MapPin, Users } from 'lucide-react'

const inp = { width:'100%', background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:'10px', padding:'10px 13px', color:'var(--text)', fontSize:'13px', boxSizing:'border-box', fontFamily:'inherit', outline:'none' }
const lbl = (txt) => <label style={{ display:'block', fontSize:'11px', color:'var(--text-muted)', marginBottom:'5px', fontWeight:'700', letterSpacing:'0.4px', textTransform:'uppercase' }}>{txt}</label>

const emptyForm = { name:'', phone:'', email:'', area:'', referredBy:'', isRider:false, isSeekerActive:false, vehicleMake:'', vehicleReg:'', vehicleColor:'', vehicleSeats:3, notes:'' }

function MemberDetailModal({ member, onClose }) {
  const memberRides    = rides.filter(r => r.riderId === member.id || r.seekers?.includes(member.id))
  const memberActs     = activities.filter(a => a.rsvps?.includes(member.id))
  const memberParts    = participations.filter(p => p.memberId === member.id)
  const referredMembers = initialMembers.filter(m => m.referredBy === member.id)
  const referrer       = initialMembers.find(m => m.id === member.referredBy)

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:300, padding:'16px' }}>
      <div className="card" style={{ borderRadius:'20px', width:'100%', maxWidth:'580px', maxHeight:'90vh', overflowY:'auto', padding:'24px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
          <h3 style={{ margin:0, fontSize:'16px', fontWeight:'800', color:'var(--text)' }}>Member Details</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)' }}><X size={20}/></button>
        </div>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:'14px', padding:'16px', background:'var(--bg)', borderRadius:'13px', marginBottom:'16px', border:'1.5px solid var(--border)' }}>
          <div className="primary-gradient" style={{ width:'52px', height:'52px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:'800', color:'white', flexShrink:0 }}>
            {member.name.split(' ').map(w=>w[0]).join('')}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:'17px', fontWeight:'800', color:'var(--text)' }}>{member.name}</div>
            <div style={{ fontFamily:'monospace', fontSize:'14px', color:'var(--primary)', fontWeight:'800', background:'var(--primary-light)', display:'inline-block', padding:'2px 10px', borderRadius:'6px', marginTop:'3px' }}>{member.id}</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div className={`tag ${member.status==='active'?'tag-green':'tag-red'}`} style={{ marginBottom:'5px' }}>{member.status}</div>
            <div style={{ display:'flex', gap:'4px', justifyContent:'flex-end', flexWrap:'wrap' }}>
              {member.isRider && <span className="tag tag-blue" style={{ fontSize:'10px' }}>🚗 Rider</span>}
              {member.isSeekerActive && <span className="tag tag-green" style={{ fontSize:'10px' }}>🔍 Seeker</span>}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'14px' }}>
          {[
            { label:'Phone', value:member.phone, icon:Phone },
            { label:'Email', value:member.email, icon:Mail },
            { label:'Area',  value:member.area,  icon:MapPin },
            { label:'Joined',value:member.joinDate, icon:Clock },
            { label:'Referred By', value: referrer ? `${referrer.name} (${member.referredBy})` : member.referredBy, icon:Users },
            { label:'Notes', value:member.notes || '—', icon:AlertCircle },
          ].map(({ label, value, icon:Icon }) => (
            <div key={label} style={{ padding:'10px 12px', borderRadius:'10px', background:'var(--bg)', border:'1.5px solid var(--border-soft)' }}>
              <div style={{ fontSize:'10px', color:'var(--text-muted)', fontWeight:'700', textTransform:'uppercase', marginBottom:'3px', display:'flex', alignItems:'center', gap:'4px' }}><Icon size={10}/>{label}</div>
              <div style={{ fontSize:'12.5px', color:'var(--text)', fontWeight:'500' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Vehicle */}
        {member.vehicle && (
          <div style={{ padding:'12px 14px', borderRadius:'11px', background:'var(--primary-light)', border:'1.5px solid rgba(20,161,175,0.25)', display:'flex', gap:'10px', alignItems:'center', marginBottom:'14px' }}>
            <Car size={16} color="var(--primary)" style={{ flexShrink:0 }}/>
            <div>
              <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)' }}>{member.vehicle.make} · {member.vehicle.color}</div>
              <div style={{ fontSize:'11px', color:'var(--text-muted)', fontFamily:'monospace', marginTop:'2px' }}>{member.vehicle.reg} · {member.vehicle.seats} pool seats</div>
            </div>
          </div>
        )}

        {/* Referral chain */}
        {referredMembers.length > 0 && (
          <div style={{ marginBottom:'14px' }}>
            <div style={{ fontSize:'12px', fontWeight:'700', color:'var(--text-muted)', marginBottom:'8px', display:'flex', alignItems:'center', gap:'6px' }}><Users size={12}/>Referred {referredMembers.length} member{referredMembers.length>1?'s':''}</div>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
              {referredMembers.map(m => (
                <div key={m.id} style={{ padding:'5px 11px', borderRadius:'20px', background:'var(--bg)', border:'1.5px solid var(--border)', fontSize:'12px', color:'var(--text-2)' }}>
                  {m.name} <span style={{ fontFamily:'monospace', color:'var(--primary)', fontWeight:'700' }}>{m.id}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        <div style={{ marginBottom:'14px' }}>
          <div style={{ fontSize:'12px', fontWeight:'700', color:'var(--text-muted)', marginBottom:'8px', display:'flex', alignItems:'center', gap:'6px' }}><Heart size={12}/>Activities Joined ({memberActs.length})</div>
          {memberActs.length === 0 ? <div style={{ fontSize:'12px', color:'var(--text-muted)', padding:'8px 12px', background:'var(--bg)', borderRadius:'9px' }}>No activities joined yet</div>
            : <div style={{ display:'flex', gap:'5px', flexWrap:'wrap' }}>
              {memberActs.map(a => (
                <div key={a.id} style={{ padding:'4px 10px', borderRadius:'20px', background:a.bg, border:`1.5px solid ${a.color}30`, fontSize:'12px', color:a.color, fontWeight:'700' }}>
                  {a.icon} {a.title}
                </div>
              ))}
            </div>}
        </div>

        {/* Rides */}
        <div>
          <div style={{ fontSize:'12px', fontWeight:'700', color:'var(--text-muted)', marginBottom:'8px', display:'flex', alignItems:'center', gap:'6px' }}><Car size={12}/>Rides ({memberRides.length})</div>
          {memberRides.length === 0 ? <div style={{ fontSize:'12px', color:'var(--text-muted)', padding:'8px 12px', background:'var(--bg)', borderRadius:'9px' }}>No rides posted or joined</div>
            : memberRides.map(r => (
              <div key={r.id} style={{ padding:'9px 12px', borderRadius:'9px', background:'var(--bg)', border:'1.5px solid var(--border-soft)', marginBottom:'5px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:'12px', fontWeight:'600', color:'var(--text)' }}>{r.origin} → {r.destination}</div>
                  <div style={{ fontSize:'11px', color:'var(--text-muted)' }}>{r.date} · {r.riderId===member.id?'🚗 Driver':'🔍 Seeker'}</div>
                </div>
                <span className={`tag ${r.status==='open'?'tag-green':'tag-blue'}`} style={{ fontSize:'10px' }}>{r.status}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default function AdminMembers() {
  const [members, setMembers]   = useState(initialMembers)
  const [pending, setPending]   = useState(initialPending)
  const [search, setSearch]     = useState('')
  const [tab, setTab]           = useState('active')
  const [showAdd, setShowAdd]   = useState(false)
  const [viewMember, setViewMember] = useState(null)
  const [form, setForm]         = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [expanded, setExpanded] = useState(null)

  const set = (k,v) => setForm(f => ({...f,[k]:v}))

  const byStatus = (s) => members.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q) || m.area.toLowerCase().includes(q)
    return matchSearch && m.status === s
  })

  const filteredPending = pending.filter(p => {
    const q = search.toLowerCase()
    return !q || p.name.toLowerCase().includes(q) || p.area.toLowerCase().includes(q)
  })

  const toggleStatus = (id) => setMembers(prev => prev.map(m => m.id===id ? {...m, status: m.status==='active'?'inactive':'active'} : m))

  const approvePending = (req) => {
    const newId = generateTRId(members.map(m=>m.id))
    const newMember = {
      id:newId, name:req.name, phone:req.phone, email:req.email,
      area:req.area, referredBy:req.referredBy,
      joinDate: new Date().toISOString().split('T')[0],
      status:'active', isRider:req.wantsToBeRider, isSeekerActive:false,
      vehicle:req.wantsToBeRider ? req.vehicle : null,
      activitiesJoined:[], notes:''
    }
    setMembers(prev => [newMember, ...prev])
    setPending(prev => prev.filter(p => p.id !== req.id))
  }
  const rejectPending = (id) => setPending(prev => prev.filter(p => p.id !== id))

  const addMember = () => {
    if (!form.name || !form.phone || !form.area || !form.referredBy) { setFormError('Name, phone, area and referrer TR ID are required'); return }
    const refOk = members.find(m => m.id === form.referredBy.toUpperCase())
    if (!refOk) { setFormError(`Referrer ${form.referredBy.toUpperCase()} not found`); return }
    const newId = generateTRId(members.map(m=>m.id))
    setMembers(prev => [{ id:newId, name:form.name, phone:form.phone, email:form.email, area:form.area,
      referredBy:form.referredBy.toUpperCase(), joinDate:new Date().toISOString().split('T')[0],
      status:'active', isRider:form.isRider, isSeekerActive:form.isSeekerActive,
      vehicle:form.isRider?{make:form.vehicleMake,reg:form.vehicleReg.toUpperCase(),color:form.vehicleColor,seats:form.vehicleSeats}:null,
      activitiesJoined:[], notes:form.notes }, ...prev])
    setForm(emptyForm); setFormError(''); setShowAdd(false)
  }

  const tabs = [
    { id:'active',   label:`Active (${members.filter(m=>m.status==='active').length})` },
    { id:'inactive', label:`Inactive (${members.filter(m=>m.status==='inactive').length})` },
    { id:'pending',  label:`Pending Approval (${pending.length})`, alert: pending.length > 0 },
  ]

  const displayList = tab==='pending' ? filteredPending : byStatus(tab)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
      {viewMember && <MemberDetailModal member={viewMember} onClose={() => setViewMember(null)}/>}

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <h1 style={{ margin:'0 0 3px', fontSize:'21px', fontWeight:'800', color:'var(--text)' }}>Members</h1>
          <p style={{ margin:0, color:'var(--text-muted)', fontSize:'13px' }}>Reference-only · {members.length} total · {members.filter(m=>m.status==='active').length} active · {pending.length} pending</p>
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          <button className="btn-outline" onClick={() => exportCSV(members.map(({ vehicle,...m }) => m), 'techieride-members.csv')}
            style={{ padding:'9px 16px', borderRadius:'11px', fontSize:'13px', display:'flex', alignItems:'center', gap:'6px' }}>
            <Download size={14}/> Export CSV
          </button>
          <button className="btn-primary" onClick={() => setShowAdd(true)}
            style={{ padding:'9px 16px', borderRadius:'11px', fontSize:'13px', display:'flex', alignItems:'center', gap:'6px' }}>
            <Plus size={14}/> Add Member
          </button>
        </div>
      </div>

      {/* Search + tabs */}
      <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ position:'relative', flex:1, minWidth:'200px' }}>
          <Search size={13} color="var(--text-muted)" style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)' }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, TR ID, area…"
            style={{ ...inp, paddingLeft:'34px', borderRadius:'11px' }}/>
        </div>
        <div style={{ display:'flex', gap:'0', background:'var(--bg)', borderRadius:'11px', padding:'3px', border:'1.5px solid var(--border)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding:'7px 14px', borderRadius:'9px', fontSize:'12px', fontWeight:'700', cursor:'pointer', border:'none', background: tab===t.id?'var(--primary)':'transparent', color: tab===t.id?'white':'var(--text-muted)', transition:'all 0.15s', display:'flex', alignItems:'center', gap:'5px', whiteSpace:'nowrap' }}>
              {t.alert && tab!==t.id && <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#b45309', flexShrink:0 }}/>}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* PENDING TAB */}
      {tab==='pending' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {filteredPending.length===0 && <div style={{ textAlign:'center', padding:'40px', color:'var(--text-muted)', fontSize:'14px' }}>No pending requests 🎉</div>}
          {filteredPending.map(r => (
            <div key={r.id} className="card" style={{ borderRadius:'14px', padding:'16px 18px', border:'1.5px solid rgba(245,158,11,0.2)' }}>
              <div style={{ display:'flex', gap:'12px', alignItems:'flex-start', flexWrap:'wrap' }}>
                <div className="primary-gradient" style={{ width:'42px', height:'42px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', fontWeight:'800', color:'white', flexShrink:0 }}>
                  {r.name.split(' ').map(w=>w[0]).join('')}
                </div>
                <div style={{ flex:1, minWidth:'200px' }}>
                  <div style={{ fontSize:'14px', fontWeight:'700', color:'var(--text)', marginBottom:'3px' }}>{r.name}</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px' }}>
                    {[['📍 Area',r.area],['📞 Phone',r.phone],['📧 Email',r.email||'—'],['👤 Referred by',`${r.referrerName} (${r.referredBy})`]].map(([k,v])=>(
                      <div key={k} style={{ fontSize:'11px', color:'var(--text-muted)' }}><span style={{ fontWeight:'700' }}>{k}: </span>{v}</div>
                    ))}
                  </div>
                  {r.wantsToBeRider && r.vehicle && (
                    <div style={{ marginTop:'7px', padding:'7px 10px', borderRadius:'8px', background:'var(--primary-light)', border:'1.5px solid rgba(20,161,175,0.2)', fontSize:'11px', color:'var(--primary-dark)', display:'flex', alignItems:'center', gap:'7px' }}>
                      <Car size={12}/> {r.vehicle.make} · {r.vehicle.color} · {r.vehicle.reg} · {r.vehicle.seats} seats
                    </div>
                  )}
                  <div style={{ fontSize:'10px', color:'var(--text-muted)', marginTop:'5px' }}><Clock size={9} style={{ display:'inline', marginRight:'3px' }}/>Requested: {r.requestDate}</div>
                </div>
                <div style={{ display:'flex', gap:'7px', flexShrink:0, alignSelf:'center' }}>
                  <button onClick={() => approvePending(r)}
                    style={{ padding:'9px 16px', borderRadius:'10px', background:'rgba(34,197,94,0.1)', border:'1.5px solid rgba(34,197,94,0.3)', color:'#15803d', fontSize:'13px', fontWeight:'700', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}>
                    <CheckCircle size={14}/> Approve & Assign ID
                  </button>
                  <button onClick={() => rejectPending(r.id)}
                    style={{ padding:'9px 12px', borderRadius:'10px', background:'rgba(239,68,68,0.08)', border:'1.5px solid rgba(239,68,68,0.2)', color:'#b91c1c', fontSize:'13px', fontWeight:'700', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}>
                    <XCircle size={14}/> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ACTIVE / INACTIVE TAB — table */}
      {tab !== 'pending' && (
        <div className="card" style={{ borderRadius:'16px', overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'110px 1fr 85px 110px 85px 90px 80px', gap:0, padding:'10px 16px', background:'var(--bg)', borderBottom:'1.5px solid var(--border)' }}>
            {['TR ID','Name / Area','Phone','Referred By','Joined','Role','Actions'].map(h => (
              <div key={h} style={{ fontSize:'10px', fontWeight:'700', color:'var(--text-muted)', letterSpacing:'0.5px', textTransform:'uppercase' }}>{h}</div>
            ))}
          </div>
          {displayList.length===0 && <div style={{ padding:'32px', textAlign:'center', color:'var(--text-muted)', fontSize:'13px' }}>No members found</div>}
          {displayList.map((m,i) => (
            <div key={m.id}
              style={{ display:'grid', gridTemplateColumns:'110px 1fr 85px 110px 85px 90px 80px', gap:0, padding:'11px 16px', borderBottom: i<displayList.length-1?'1.5px solid var(--border-soft)':'none', alignItems:'center', background:'transparent', transition:'background 0.15s', cursor:'default' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--bg)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{ fontFamily:'monospace', fontSize:'12px', fontWeight:'800', color:'var(--primary)' }}>{m.id}</div>
              <div>
                <div style={{ fontSize:'13px', fontWeight:'600', color:'var(--text)' }}>{m.name}</div>
                <div style={{ fontSize:'11px', color:'var(--text-muted)' }}>{m.area}</div>
              </div>
              <div style={{ fontSize:'11px', color:'var(--text-muted)' }}>{m.phone.slice(-10)}</div>
              <div style={{ fontFamily:'monospace', fontSize:'11px', color:'var(--text-2)' }}>{m.referredBy}</div>
              <div style={{ fontSize:'11px', color:'var(--text-muted)' }}>{m.joinDate.slice(2)}</div>
              <div style={{ display:'flex', gap:'3px', flexWrap:'wrap' }}>
                {m.isRider && <span className="tag tag-blue" style={{ fontSize:'9px', padding:'2px 6px' }}>Rider</span>}
                {m.isSeekerActive && <span className="tag tag-green" style={{ fontSize:'9px', padding:'2px 6px' }}>Seeker</span>}
                {!m.isRider && !m.isSeekerActive && <span className="tag tag-amber" style={{ fontSize:'9px', padding:'2px 6px' }}>Member</span>}
              </div>
              <div style={{ display:'flex', gap:'5px' }}>
                <button onClick={()=>setViewMember(m)} title="View full details"
                  style={{ padding:'5px 7px', borderRadius:'7px', background:'var(--primary-light)', border:'1.5px solid rgba(20,161,175,0.2)', color:'var(--primary)', cursor:'pointer' }}><Eye size={12}/></button>
                <button onClick={()=>toggleStatus(m.id)} title={m.status==='active'?'Deactivate':'Activate'}
                  style={{ padding:'5px 7px', borderRadius:'7px', background: m.status==='active'?'rgba(239,68,68,0.08)':'rgba(34,197,94,0.1)', border: m.status==='active'?'1.5px solid rgba(239,68,68,0.2)':'1.5px solid rgba(34,197,94,0.3)', color: m.status==='active'?'#b91c1c':'#15803d', cursor:'pointer' }}>
                  {m.status==='active'?<UserX size={12}/>:<UserCheck size={12}/>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Member Modal */}
      {showAdd && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, padding:'16px' }}>
          <div className="card" style={{ borderRadius:'20px', padding:'26px', width:'100%', maxWidth:'540px', maxHeight:'90vh', overflowY:'auto' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
              <h3 style={{ margin:0, fontSize:'16px', fontWeight:'800', color:'var(--text)' }}>Add New Member</h3>
              <button onClick={()=>{setShowAdd(false);setFormError('')}} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)' }}><X size={20}/></button>
            </div>
            {formError && <div style={{ background:'rgba(239,68,68,0.08)', border:'1.5px solid rgba(239,68,68,0.2)', borderRadius:'10px', padding:'10px 13px', marginBottom:'14px', color:'#b91c1c', fontSize:'13px' }}>{formError}</div>}
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <div>{lbl('Full Name *')}<input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Full name" style={inp}/></div>
                <div>{lbl('Phone *')}<input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+91 XXXXX XXXXX" style={inp}/></div>
                <div>{lbl('Email')}<input value={form.email} onChange={e=>set('email',e.target.value)} placeholder="email@example.com" style={inp}/></div>
                <div>{lbl('Area (Hyderabad) *')}<input value={form.area} onChange={e=>set('area',e.target.value)} placeholder="Kondapur, Gachibowli…" style={inp}/></div>
                <div style={{ gridColumn:'1/-1' }}>
                  {lbl('Referred by (TR ID) *')}
                  <input value={form.referredBy} onChange={e=>set('referredBy',e.target.value.toUpperCase())} placeholder="TR1001" style={{ ...inp, fontFamily:'monospace', letterSpacing:'1.5px', fontWeight:'700' }}/>
                </div>
                <div style={{ gridColumn:'1/-1' }}>
                  {lbl('Notes (optional)')}
                  <input value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Any notes about this member" style={inp}/>
                </div>
              </div>
              <div style={{ padding:'13px', background:'var(--bg)', borderRadius:'11px', border:'1.5px solid var(--border)' }}>
                <div style={{ fontSize:'11px', color:'var(--text-muted)', fontWeight:'700', marginBottom:'9px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Roles</div>
                <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
                  {[{key:'isRider',label:'🚗 Rider (offers rides)'},{key:'isSeekerActive',label:'🔍 Seeker (joins rides)'}].map(r=>(
                    <label key={r.key} style={{ display:'flex', alignItems:'center', gap:'7px', cursor:'pointer', fontSize:'13px', color:'var(--text-2)', fontWeight:'500' }}>
                      <input type="checkbox" checked={form[r.key]} onChange={e=>set(r.key,e.target.checked)} style={{ width:'15px', height:'15px', accentColor:'var(--primary)' }}/>
                      {r.label}
                    </label>
                  ))}
                </div>
              </div>
              {form.isRider && (
                <div style={{ padding:'13px', background:'var(--primary-light)', borderRadius:'11px', border:'1.5px solid rgba(20,161,175,0.2)' }}>
                  <div style={{ fontSize:'11px', color:'var(--primary-dark)', fontWeight:'700', marginBottom:'9px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Vehicle Details</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'9px' }}>
                    <div>{lbl('Make & Model')}<input value={form.vehicleMake} onChange={e=>set('vehicleMake',e.target.value)} placeholder="Maruti Swift Dzire" style={inp}/></div>
                    <div>{lbl('Reg. No.')}<input value={form.vehicleReg} onChange={e=>set('vehicleReg',e.target.value.toUpperCase())} placeholder="TS 09 AB 1234" style={{ ...inp, fontFamily:'monospace' }}/></div>
                    <div>{lbl('Colour')}<input value={form.vehicleColor} onChange={e=>set('vehicleColor',e.target.value)} placeholder="White" style={inp}/></div>
                    <div>{lbl('Pool seats')}<select value={form.vehicleSeats} onChange={e=>set('vehicleSeats',+e.target.value)} style={inp}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}</select></div>
                  </div>
                </div>
              )}
              <div style={{ display:'flex', gap:'10px', marginTop:'4px' }}>
                <button onClick={()=>{setShowAdd(false);setFormError('')}} style={{ flex:1, padding:'11px', borderRadius:'11px', background:'var(--bg)', border:'1.5px solid var(--border)', color:'var(--text-muted)', fontSize:'13px', fontWeight:'600', cursor:'pointer' }}>Cancel</button>
                <button className="btn-primary" onClick={addMember} style={{ flex:2, padding:'11px', borderRadius:'11px', fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center', gap:'7px' }}>
                  <Check size={14}/> Add & Generate TR ID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
