import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, Car, Heart, Leaf, TrendingUp, ArrowRight, Clock,
  AlertCircle, CheckCircle, XCircle, Megaphone, Send, Activity,
  UserPlus, BarChart3, RefreshCw
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import {
  members, rides, activities, announcements, pendingRequests,
  adminLog, memberGrowth, ridesPerMonth, activityParticipation, co2ByMonth
} from '../../data/mockData'

const T = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:'10px', padding:'9px 13px', fontSize:'12px', boxShadow:'var(--shadow)' }}>
      <div style={{ color:'var(--text-muted)', marginBottom:'4px' }}>{label}</div>
      {payload.map((p,i) => <div key={i} style={{ color: p.color, fontWeight:'700' }}>{p.name}: {p.value}</div>)}
    </div>
  )
}

export default function AdminPanel() {
  const navigate = useNavigate()
  const [broadcast, setBroadcast] = useState('')
  const [sent, setSent] = useState(false)
  const [reqs, setReqs] = useState(pendingRequests)

  const activeMembers = members.filter(m => m.status === 'active')
  const openRides     = rides.filter(r => r.status === 'open')
  const activeActs    = activities.filter(a => a.status === 'active')

  const approveReq = (id) => {
    setReqs(prev => prev.filter(r => r.id !== id))
  }
  const rejectReq = (id) => setReqs(prev => prev.filter(r => r.id !== id))

  const sendBroadcast = () => {
    if (!broadcast.trim()) return
    setSent(true); setBroadcast('')
    setTimeout(() => setSent(false), 3000)
  }

  const statCards = [
    { label:'Total Members',   value: members.length,      sub:`${activeMembers.length} active`, icon:Users,      color:'var(--primary)',  path:'/admin/members' },
    { label:'Open Rides',      value: openRides.length,    sub:'in Hyderabad',                   icon:Car,        color:'#15803d',         path:'/admin/rides'   },
    { label:'NGO Activities',  value: activeActs.length,   sub:'running now',                    icon:Heart,      color:'#b91c1c',         path:'/admin/content' },
    { label:'Pending Approvals',value: reqs.length,        sub:'need action',                    icon:UserPlus,   color:'#b45309',         path:'/admin/members' },
    { label:'Total Rides (All)',value: rides.length,        sub:'ever posted',                    icon:TrendingUp, color:'#6d28d9',         path:'/admin/rides'   },
    { label:'CO₂ Saved (Est)', value:'210 kg',             sub:'community (May)',                icon:Leaf,       color:'#0369a1',         path:'/admin/rides'   },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
      <div>
        <h1 style={{ margin:'0 0 3px', fontSize:'21px', fontWeight:'800', color:'var(--text)' }}>Admin Overview</h1>
        <p style={{ margin:0, color:'var(--text-muted)', fontSize:'13px' }}>TechieRide NGO · Hyderabad · Reg. 1947/2016</p>
      </div>

      {/* Stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:'12px' }}>
        {statCards.map(s => (
          <div key={s.label} className="card card-hover" onClick={() => navigate(s.path)}
            style={{ padding:'16px', borderRadius:'14px', cursor:'pointer' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
              <span style={{ fontSize:'11px', color:'var(--text-muted)', fontWeight:'600' }}>{s.label}</span>
              <div style={{ width:'30px', height:'30px', borderRadius:'9px', background: s.color+'18', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <s.icon size={14} color={s.color} />
              </div>
            </div>
            <div style={{ fontSize:'26px', fontWeight:'800', color:'var(--text)', lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:'11px', color: s.color, marginTop:'4px', fontWeight:'600' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Pending approvals */}
      {reqs.length > 0 && (
        <div className="card" style={{ borderRadius:'16px', padding:'18px', border:'1.5px solid rgba(245,158,11,0.3)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'14px' }}>
            <AlertCircle size={16} color="#b45309" />
            <span style={{ fontSize:'14px', fontWeight:'700', color:'var(--text)' }}>Pending Member Approvals</span>
            <span className="tag tag-amber">{reqs.length} waiting</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'9px' }}>
            {reqs.map(r => (
              <div key={r.id} style={{ padding:'12px 14px', borderRadius:'12px', background:'var(--bg)', border:'1.5px solid var(--border)', display:'flex', gap:'12px', alignItems:'center', flexWrap:'wrap' }}>
                <div className="primary-gradient" style={{ width:'36px', height:'36px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:'800', color:'white', flexShrink:0 }}>
                  {r.name.split(' ').map(w=>w[0]).join('')}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'2px' }}>{r.name}</div>
                  <div style={{ fontSize:'11px', color:'var(--text-muted)' }}>
                    {r.area} · {r.phone} · Ref by: <strong style={{ color:'var(--primary)' }}>{r.referrerName} ({r.referredBy})</strong>
                  </div>
                  {r.wantsToBeRider && (
                    <div style={{ fontSize:'11px', color:'var(--text-2)', marginTop:'2px' }}>
                      🚗 Wants to be Rider · {r.vehicle?.make} {r.vehicle?.reg}
                    </div>
                  )}
                </div>
                <div style={{ fontSize:'11px', color:'var(--text-muted)', flexShrink:0, marginRight:'8px' }}>
                  <Clock size={10} style={{ display:'inline', marginRight:'3px' }} />{r.requestDate}
                </div>
                <div style={{ display:'flex', gap:'7px', flexShrink:0 }}>
                  <button onClick={() => approveReq(r.id)}
                    style={{ padding:'7px 14px', borderRadius:'9px', background:'rgba(34,197,94,0.1)', border:'1.5px solid rgba(34,197,94,0.3)', color:'#15803d', fontSize:'12px', fontWeight:'700', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}>
                    <CheckCircle size={13}/> Approve
                  </button>
                  <button onClick={() => rejectReq(r.id)}
                    style={{ padding:'7px 14px', borderRadius:'9px', background:'rgba(239,68,68,0.08)', border:'1.5px solid rgba(239,68,68,0.2)', color:'#b91c1c', fontSize:'12px', fontWeight:'700', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}>
                    <XCircle size={13}/> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
        {/* Member growth */}
        <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
          <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'4px', display:'flex', alignItems:'center', gap:'7px' }}>
            <Users size={14} color="var(--primary)" /> Member Growth
          </div>
          <div style={{ fontSize:'11px', color:'var(--text-muted)', marginBottom:'14px' }}>Cumulative members over time</div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={memberGrowth} margin={{ left:-20, bottom:0 }}>
              <defs>
                <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25}/>
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false} interval={2}/>
              <YAxis tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<T/>}/>
              <Area type="monotone" dataKey="count" name="Members" stroke="var(--primary)" strokeWidth={2} fill="url(#mg)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Rides per month */}
        <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
          <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'4px', display:'flex', alignItems:'center', gap:'7px' }}>
            <Car size={14} color="#15803d" /> Rides Per Month
          </div>
          <div style={{ fontSize:'11px', color:'var(--text-muted)', marginBottom:'14px' }}>Total carpool rides posted</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={ridesPerMonth} margin={{ left:-20, bottom:0 }}>
              <XAxis dataKey="month" tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false} interval={1}/>
              <YAxis tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<T/>}/>
              <Bar dataKey="rides" name="Rides" fill="#15803d" radius={[4,4,0,0]} fillOpacity={0.8}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CO2 savings */}
        <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
          <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'4px', display:'flex', alignItems:'center', gap:'7px' }}>
            <Leaf size={14} color="#0369a1" /> CO₂ Saved (kg)
          </div>
          <div style={{ fontSize:'11px', color:'var(--text-muted)', marginBottom:'14px' }}>Estimated CO₂ reduction via carpooling</div>
          <ResponsiveContainer width="100%" height={170}>
            <LineChart data={co2ByMonth} margin={{ left:-20, bottom:0 }}>
              <XAxis dataKey="month" tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<T/>}/>
              <Line type="monotone" dataKey="kg" name="CO₂ (kg)" stroke="#0369a1" strokeWidth={2.5} dot={{ fill:'#0369a1', r:3 }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Activity participation */}
        <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
          <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'4px', display:'flex', alignItems:'center', gap:'7px' }}>
            <Heart size={14} color="#b91c1c" /> Activity Participation
          </div>
          <div style={{ fontSize:'11px', color:'var(--text-muted)', marginBottom:'14px' }}>Members signed up per activity</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={activityParticipation} layout="vertical" margin={{ left:10, right:10 }}>
              <XAxis type="number" tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="name" tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false} width={55}/>
              <Tooltip content={<T/>}/>
              <Bar dataKey="count" name="Members" radius={[0,4,4,0]}>
                {activityParticipation.map((e,i) => <Cell key={i} fill={e.color} fillOpacity={0.8}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row: activity RSVP summary + broadcast + admin log */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'16px' }}>
        {/* Activity RSVPs */}
        <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
          <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'12px', display:'flex', alignItems:'center', gap:'7px' }}>
            <Heart size={14} color="#b91c1c" /> Activity RSVPs
          </div>
          {activities.map(a => (
            <div key={a.id} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'8px 10px', borderRadius:'9px', background:'var(--bg)', marginBottom:'6px', border:'1.5px solid var(--border-soft)' }}>
              <span style={{ fontSize:'18px', flexShrink:0 }}>{a.icon}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'12px', fontWeight:'600', color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.title}</div>
                <div style={{ fontSize:'10px', color:'var(--text-muted)' }}>Next: {a.nextEvent}</div>
              </div>
              <div style={{ fontSize:'13px', fontWeight:'800', color: a.color, flexShrink:0 }}>{a.rsvps.length}</div>
            </div>
          ))}
          <button className="btn-outline" onClick={() => navigate('/admin/content')}
            style={{ width:'100%', padding:'9px', marginTop:'6px', fontSize:'12px', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px' }}>
            Manage <ArrowRight size={12}/>
          </button>
        </div>

        {/* Broadcast */}
        <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
          <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'6px', display:'flex', alignItems:'center', gap:'7px' }}>
            <Megaphone size={14} color="var(--primary)" /> Broadcast to All Members
          </div>
          <div style={{ fontSize:'11px', color:'var(--text-muted)', marginBottom:'12px' }}>Push an announcement to all {members.filter(m=>m.status==='active').length} active members</div>
          {sent && (
            <div style={{ padding:'10px 12px', borderRadius:'9px', background:'rgba(34,197,94,0.1)', border:'1.5px solid rgba(34,197,94,0.25)', color:'#15803d', fontSize:'12px', fontWeight:'700', marginBottom:'10px', display:'flex', alignItems:'center', gap:'6px' }}>
              <CheckCircle size={13}/> Sent to all members!
            </div>
          )}
          <textarea value={broadcast} onChange={e => setBroadcast(e.target.value)}
            placeholder="Type your message here…" rows={5}
            style={{ width:'100%', background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:'10px', padding:'10px 12px', color:'var(--text)', fontSize:'13px', resize:'none', boxSizing:'border-box', fontFamily:'inherit', outline:'none', marginBottom:'10px' }}/>
          <button className="btn-primary" onClick={sendBroadcast} disabled={!broadcast.trim()}
            style={{ width:'100%', padding:'10px', fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center', gap:'7px' }}>
            <Send size={14}/> Send Broadcast
          </button>
        </div>

        {/* Admin log */}
        <div className="card" style={{ borderRadius:'16px', padding:'18px' }}>
          <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text)', marginBottom:'12px', display:'flex', alignItems:'center', gap:'7px' }}>
            <Activity size={14} color="var(--primary)" /> Recent Admin Actions
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'7px' }}>
            {adminLog.map(l => (
              <div key={l.id} style={{ padding:'9px 11px', borderRadius:'9px', background:'var(--bg)', border:'1.5px solid var(--border-soft)' }}>
                <div style={{ fontSize:'12px', fontWeight:'600', color:'var(--text)' }}>{l.action}</div>
                <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:'2px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{l.detail}</div>
                <div style={{ fontSize:'10px', color:'var(--text-muted)', marginTop:'2px' }}><Clock size={9} style={{ display:'inline', marginRight:'3px' }}/>{l.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
