import { useState } from 'react'
import { User, Phone, Mail, MapPin, Car, Edit2, Check, Shield, Users, Heart, TrendingUp, Leaf, Star, Download, ChevronRight } from 'lucide-react'
import { members, activities, rides, participations } from '../data/mockData'

function TRIdCard({ member, user }) {
  const print = () => {
    const w = window.open('', '_blank')
    w.document.write(`<html><body style="font-family:sans-serif;padding:24px;background:#f0f9fb">
      <div style="border:3px solid #14a1af;border-radius:16px;padding:24px;max-width:380px;background:white">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          <div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#14a1af,#0d3c55);display:flex;align-items:center;justify-content:center;color:white;font-size:18px;font-weight:800">${user.avatar}</div>
          <div><div style="font-size:20px;font-weight:800;color:#0d2b36">${member.name}</div><div style="font-family:monospace;font-size:16px;color:#14a1af;font-weight:800">${member.id}</div></div>
        </div>
        <table style="width:100%;font-size:13px;border-collapse:collapse">
          ${[['Area',member.area],['Phone',member.phone],['Joined',member.joinDate],['Reg No.','1947/2016'],['Referred By',member.referredBy]].map(([k,v])=>`<tr><td style="padding:5px 0;color:#5a8595;font-weight:600">${k}</td><td style="padding:5px 0;color:#0d2b36;font-weight:500">${v}</td></tr>`).join('')}
        </table>
        <div style="margin-top:14px;padding:8px 12px;background:rgba(20,161,175,0.08);border-radius:8px;font-size:11px;color:#0d7a86;text-align:center;font-weight:700">TechieRide NGO · for a better society · Hyderabad</div>
      </div></body></html>`)
    w.document.close(); w.print()
  }

  return (
    <div style={{ borderRadius:'16px', overflow:'hidden', border:'2.5px solid var(--primary)', background:'var(--surface)', position:'relative' }}>
      {/* Top stripe */}
      <div style={{ height:'6px', background:'linear-gradient(90deg, var(--primary), #0d3c55)' }}/>
      <div style={{ padding:'20px 22px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px' }}>
          <div className="primary-gradient" style={{ width:'54px', height:'54px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', fontWeight:'800', color:'white', flexShrink:0 }}>
            {user.avatar}
          </div>
          <div>
            <div style={{ fontSize:'18px', fontWeight:'800', color:'var(--text)' }}>{member.name}</div>
            <div style={{ fontFamily:'monospace', fontSize:'16px', color:'var(--primary)', fontWeight:'800', letterSpacing:'1px', marginTop:'2px' }}>{member.id}</div>
          </div>
          <button onClick={print}
            style={{ marginLeft:'auto', padding:'7px 13px', borderRadius:'9px', background:'var(--primary-light)', border:'1.5px solid rgba(20,161,175,0.3)', color:'var(--primary-dark)', fontSize:'12px', fontWeight:'700', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}>
            <Download size={13}/> Print ID
          </button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'7px' }}>
          {[['📍 Area', member.area],['📞 Phone', member.phone],['📅 Joined', member.joinDate],['🏛️ Reg No.', '1947/2016']].map(([k,v]) => (
            <div key={k} style={{ padding:'8px 11px', borderRadius:'9px', background:'var(--bg)', border:'1.5px solid var(--border-soft)' }}>
              <div style={{ fontSize:'10px', color:'var(--text-muted)', fontWeight:'700', marginBottom:'2px' }}>{k}</div>
              <div style={{ fontSize:'12.5px', color:'var(--text)', fontWeight:'600' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:'10px', padding:'8px 12px', borderRadius:'9px', background:'var(--primary-light)', border:'1.5px solid rgba(20,161,175,0.2)', textAlign:'center' }}>
          <span style={{ fontSize:'11px', color:'var(--primary-dark)', fontWeight:'700' }}>TechieRide NGO · for a better society · Hyderabad</span>
        </div>
      </div>
    </div>
  )
}

export default function Profile({ user, setUser }) {
  const member     = members.find(m => m.id === user.id) || {}
  const referrer   = members.find(m => m.id === member.referredBy)
  const referred   = members.filter(m => m.referredBy === user.id)
  const myActivities = activities.filter(a => a.rsvps?.includes(user.id))
  const myRides    = rides.filter(r => r.riderId === user.id || r.seekers?.includes(user.id))
  const myParts    = participations.filter(p => p.memberId === user.id)

  const [editing, setEditing]   = useState(false)
  const [form, setForm]         = useState({ name:user.name, phone:member.phone||'', email:member.email||'', area:member.area||'' })
  const [saved, setSaved]       = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [notifs, setNotifs]     = useState({ rideUpdates:true, newRides:true, announcements:true, sms:false })

  const save = () => { setSaved(true); setEditing(false); setUser({...user, name:form.name}); setTimeout(()=>setSaved(false),2500) }

  const INP = { width:'100%', background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:'10px', padding:'10px 13px', color:'var(--text)', fontSize:'13.5px', fontFamily:'inherit', outline:'none', boxSizing:'border-box' }

  const tabs = ['info','activity','stats']

  const stats = [
    { label:'Pools Joined',   value: myRides.filter(r=>r.seekers?.includes(user.id)).length, icon:Users,    color:'var(--primary)' },
    { label:'Rides Offered',  value: myRides.filter(r=>r.riderId===user.id).length,           icon:Car,      color:'#15803d' },
    { label:'Activities',     value: myActivities.length,                                      icon:Heart,    color:'#b91c1c' },
    { label:'Members Referred',value: referred.length,                                         icon:Users,    color:'#6d28d9' },
    { label:'CO₂ Saved (est)',value:'~18 kg',                                                  icon:Leaf,     color:'#0369a1' },
    { label:'NGO Score',      value:`${Math.min(100, myActivities.length*15 + myRides.length*5 + referred.length*10)}/100`, icon:Star, color:'#b45309' },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px', maxWidth:'680px' }}>
      <div>
        <h1 style={{ margin:'0 0 3px', fontSize:'21px', fontWeight:'800', color:'var(--text)' }}>My Profile</h1>
        <p style={{ margin:0, color:'var(--text-muted)', fontSize:'13px' }}>Your TechieRide membership details</p>
      </div>

      {saved && (
        <div style={{ padding:'11px 16px', borderRadius:'11px', background:'rgba(34,197,94,0.08)', border:'1.5px solid rgba(34,197,94,0.25)', color:'#15803d', fontSize:'13px', display:'flex', alignItems:'center', gap:'7px' }}>
          <Check size={14}/> Profile updated
        </div>
      )}

      {/* TR ID Card */}
      <TRIdCard member={member} user={user}/>

      {/* Tab nav */}
      <div style={{ display:'flex', gap:'0', background:'var(--bg)', borderRadius:'12px', padding:'3px', border:'1.5px solid var(--border)' }}>
        {[['info','👤 Personal'],['activity','❤️ Activity'],['stats','📊 My Stats']].map(([id,label])=>(
          <button key={id} onClick={()=>setActiveTab(id)}
            style={{ flex:1, padding:'9px 8px', borderRadius:'10px', fontSize:'12px', fontWeight:'700', cursor:'pointer', border:'none', background: activeTab===id?'var(--primary)':'transparent', color: activeTab===id?'white':'var(--text-muted)', transition:'all 0.15s' }}>
            {label}
          </button>
        ))}
      </div>

      {/* INFO TAB */}
      {activeTab==='info' && (
        <>
          <div className="card" style={{ borderRadius:'16px', padding:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
              <span style={{ fontSize:'13px', fontWeight:'700', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'6px', textTransform:'uppercase', letterSpacing:'0.5px' }}><User size={13}/>Personal Info</span>
              <button onClick={()=>editing?save():setEditing(true)}
                style={{ padding:'7px 14px', borderRadius:'9px', background:editing?'rgba(34,197,94,0.1)':'var(--primary-light)', border:editing?'1.5px solid rgba(34,197,94,0.3)':'1.5px solid rgba(20,161,175,0.25)', color:editing?'#15803d':'var(--primary-dark)', fontSize:'12px', fontWeight:'700', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}>
                {editing?<><Check size={13}/>Save</>:<><Edit2 size={13}/>Edit</>}
              </button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              {[{label:'Full Name',key:'name',icon:User,ph:'Your name'},{label:'Phone',key:'phone',icon:Phone,ph:'+91 XXXXX XXXXX'},{label:'Email',key:'email',icon:Mail,ph:'email@example.com'},{label:'Area (Hyd)',key:'area',icon:MapPin,ph:'Kondapur…'}].map(({label,key,icon:Icon,ph})=>(
                <div key={key}>
                  <label style={{ display:'block', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.3px', display:'flex', alignItems:'center', gap:'4px' }}><Icon size={10}/>{label}</label>
                  {editing
                    ? <input value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} style={INP}/>
                    : <div style={{ fontSize:'13.5px', color:form[key]?'var(--text)':'var(--text-muted)', fontWeight:'500', padding:'4px 0' }}>{form[key]||'—'}</div>}
                </div>
              ))}
            </div>
            {editing && <button onClick={()=>setEditing(false)} style={{ marginTop:'12px', padding:'7px 14px', borderRadius:'9px', background:'var(--bg)', border:'1.5px solid var(--border)', color:'var(--text-muted)', fontSize:'12px', fontWeight:'600', cursor:'pointer' }}>Cancel</button>}
          </div>

          {/* Vehicle */}
          {member.vehicle && (
            <div className="card" style={{ borderRadius:'16px', padding:'18px', border:'1.5px solid rgba(20,161,175,0.2)' }}>
              <div style={{ fontSize:'12px', fontWeight:'700', color:'var(--primary-dark)', marginBottom:'12px', display:'flex', alignItems:'center', gap:'6px', textTransform:'uppercase', letterSpacing:'0.5px' }}><Car size={13}/>My Vehicle</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:'9px' }}>
                {[['Make',member.vehicle.make],['Reg. No.',member.vehicle.reg],['Colour',member.vehicle.color],['Pool Seats',member.vehicle.seats+' seats']].map(([l,v])=>(
                  <div key={l} style={{ padding:'10px 12px', borderRadius:'9px', background:'var(--bg)', border:'1.5px solid var(--border-soft)' }}>
                    <div style={{ fontSize:'10px', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.3px', marginBottom:'3px' }}>{l}</div>
                    <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referral chain */}
          <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
            <div style={{ fontSize:'12px', fontWeight:'700', color:'var(--text-muted)', marginBottom:'12px', display:'flex', alignItems:'center', gap:'6px', textTransform:'uppercase', letterSpacing:'0.5px' }}><Shield size={13}/>Referral Chain</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {referrer && (
                <div style={{ padding:'10px 13px', borderRadius:'10px', background:'var(--bg)', border:'1.5px solid var(--border)', display:'flex', alignItems:'center', gap:'10px' }}>
                  <div style={{ fontSize:'11px', color:'var(--text-muted)', fontWeight:'700', textTransform:'uppercase', width:'80px', flexShrink:0 }}>Referred by</div>
                  <ChevronRight size={13} color="var(--text-muted)"/>
                  <span style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)' }}>{referrer.name}</span>
                  <span style={{ fontFamily:'monospace', fontSize:'11px', color:'var(--primary)', fontWeight:'800', marginLeft:'auto' }}>{referrer.id}</span>
                </div>
              )}
              <div style={{ padding:'10px 13px', borderRadius:'10px', background:'var(--primary-light)', border:'1.5px solid rgba(20,161,175,0.25)', display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ fontSize:'11px', color:'var(--primary-dark)', fontWeight:'700', textTransform:'uppercase', width:'80px', flexShrink:0 }}>You</div>
                <ChevronRight size={13} color="var(--primary)"/>
                <span style={{ fontFamily:'monospace', fontSize:'13px', fontWeight:'800', color:'var(--primary)' }}>{user.id}</span>
              </div>
              {referred.length > 0 && (
                <div style={{ padding:'10px 13px', borderRadius:'10px', background:'var(--bg)', border:'1.5px solid var(--border)' }}>
                  <div style={{ fontSize:'11px', color:'var(--text-muted)', fontWeight:'700', textTransform:'uppercase', marginBottom:'8px' }}>You referred ({referred.length})</div>
                  <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
                    {referred.map(m=>(
                      <div key={m.id} style={{ padding:'4px 11px', borderRadius:'20px', background:'var(--surface)', border:'1.5px solid var(--border)', fontSize:'12px', color:'var(--text-2)' }}>
                        {m.name} <span style={{ fontFamily:'monospace', color:'var(--primary)', fontWeight:'700' }}>{m.id}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notification prefs */}
          <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
            <div style={{ fontSize:'12px', fontWeight:'700', color:'var(--text-muted)', marginBottom:'12px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Notification Preferences</div>
            {[{key:'rideUpdates',label:'Ride status updates',desc:'When your request is accepted or updated'},{key:'newRides',label:'New rides near you',desc:'When a carpool is posted in your area'},{key:'announcements',label:'NGO announcements',desc:'Community news and event alerts'},{key:'sms',label:'SMS alerts',desc:'Rider contact details via SMS'}].map(({key,label,desc})=>(
              <div key={key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 13px', borderRadius:'10px', background:'var(--bg)', border:'1.5px solid var(--border-soft)', marginBottom:'7px' }}>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:'600', color:'var(--text)' }}>{label}</div>
                  <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:'2px' }}>{desc}</div>
                </div>
                <div onClick={()=>setNotifs(n=>({...n,[key]:!n[key]}))}
                  style={{ width:'42px', height:'23px', borderRadius:'12px', background:notifs[key]?'var(--primary)':'var(--border)', cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
                  <div style={{ width:'17px', height:'17px', borderRadius:'50%', background:'white', position:'absolute', top:'3px', left:notifs[key]?'22px':'3px', transition:'left 0.2s' }}/>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ACTIVITY TAB */}
      {activeTab==='activity' && (
        <>
          <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
            <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'12px', display:'flex', alignItems:'center', gap:'7px' }}><Heart size={14} color="#b91c1c"/>NGO Activities Joined ({myActivities.length})</div>
            {myActivities.length===0 ? <div style={{ fontSize:'13px', color:'var(--text-muted)', padding:'16px', textAlign:'center' }}>No activities joined yet. Go to Activities to join!</div>
              : myActivities.map(a=>(
                <div key={a.id} style={{ padding:'12px 14px', borderRadius:'11px', background:a.bg, border:`1.5px solid ${a.color}20`, marginBottom:'8px', display:'flex', gap:'10px', alignItems:'center' }}>
                  <span style={{ fontSize:'22px', flexShrink:0 }}>{a.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)' }}>{a.title}</div>
                    <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:'2px' }}>{a.category} · {a.date} · {a.rsvps.length} members signed up</div>
                  </div>
                  <span style={{ fontSize:'11px', fontWeight:'700', color:a.color, padding:'3px 9px', borderRadius:'20px', background:a.bg, border:`1.5px solid ${a.color}25` }}>{a.impact}</span>
                </div>
              ))}
          </div>

          <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
            <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'12px', display:'flex', alignItems:'center', gap:'7px' }}><Car size={14} color="var(--primary)"/>My Carpool Participation</div>
            {myRides.length===0 ? <div style={{ fontSize:'13px', color:'var(--text-muted)', padding:'16px', textAlign:'center' }}>No rides yet.</div>
              : myRides.map(r=>(
                <div key={r.id} style={{ padding:'11px 13px', borderRadius:'10px', background:'var(--bg)', border:'1.5px solid var(--border-soft)', marginBottom:'7px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'6px' }}>
                  <div>
                    <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)' }}>{r.origin} → {r.destination}</div>
                    <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:'2px' }}>{r.date} · {r.riderId===user.id?'🚗 You drove':'🔍 You joined'}</div>
                  </div>
                  <span className={`tag ${r.status==='open'?'tag-green':'tag-blue'}`} style={{ fontSize:'10px' }}>{r.status}</span>
                </div>
              ))}
          </div>
        </>
      )}

      {/* STATS TAB */}
      {activeTab==='stats' && (
        <>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px' }}>
            {stats.map(s=>(
              <div key={s.label} className="card" style={{ borderRadius:'13px', padding:'16px', textAlign:'center' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:s.color+'18', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px' }}>
                  <s.icon size={16} color={s.color}/>
                </div>
                <div style={{ fontSize:'22px', fontWeight:'800', color:'var(--text)', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:'4px', fontWeight:'600' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Participation history */}
          {myParts.length > 0 && (
            <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
              <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'12px' }}>Activity History</div>
              {myParts.map(p=>{
                const act = activities.find(a=>a.id===p.activityId)
                return (
                  <div key={p.id} style={{ display:'flex', gap:'10px', padding:'10px 12px', borderRadius:'10px', background: p.status==='upcoming'?'var(--primary-light)':'var(--bg)', border:`1.5px solid ${p.status==='upcoming'?'rgba(20,161,175,0.2)':'var(--border-soft)'}`, marginBottom:'7px' }}>
                    <span style={{ fontSize:'18px', flexShrink:0, lineHeight:1, marginTop:'1px' }}>{act?.icon||'✅'}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'13px', fontWeight:'600', color:'var(--text)' }}>{p.activityTitle}</div>
                      <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:'2px' }}>{p.date} · {p.role}</div>
                      {p.note && <div style={{ fontSize:'11px', color:'var(--text-2)', marginTop:'2px', fontStyle:'italic' }}>{p.note}</div>}
                    </div>
                    <span className={`tag ${p.status==='upcoming'?'tag-blue':'tag-green'}`} style={{ fontSize:'10px', alignSelf:'flex-start' }}>{p.status}</span>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
