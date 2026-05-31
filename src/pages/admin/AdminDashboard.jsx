import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Car, Heart, Leaf, TrendingUp, ArrowRight, AlertCircle, CheckCircle, XCircle, Clock, Activity, Send, UserPlus, BarChart3, DollarSign } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { members, rides, activities, pendingRequests, adminLog, memberGrowth, ridesPerMonth, activityParticipation, co2ByMonth, announcements } from '../../data/mockData'

const CT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '9px', padding: '8px 12px', fontSize: '12px', boxShadow: 'var(--shadow)' }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: '3px', fontWeight: '600' }}>{label}</div>
      {payload.map((p, i) => <div key={i} style={{ color: p.color, fontWeight: '700' }}>{p.name}: {p.value}</div>)}
    </div>
  )
}

function StatCard({ label, value, sub, icon: Icon, color, path, alert }) {
  const navigate = useNavigate()
  return (
    <div className="card card-hover" onClick={() => path && navigate(path)}
      style={{ padding: '18px', borderRadius: '14px', cursor: path ? 'pointer' : 'default', border: alert ? `1.5px solid ${color}30` : undefined }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</span>
        <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={15} color={color} />
        </div>
      </div>
      <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '11.5px', color: alert ? color : 'var(--text-muted)', marginTop: '5px', fontWeight: alert ? '700' : '500' }}>{sub}</div>
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [reqs, setReqs] = useState(pendingRequests)
  const [broadcast, setBroadcast] = useState('')
  const [sent, setSent] = useState(false)

  const active  = members.filter(m => m.status === 'active')
  const riders  = members.filter(m => m.isRider)
  const seekers = members.filter(m => m.isSeekerActive)
  const open    = rides.filter(r => r.status === 'open')
  const activeActs = activities.filter(a => a.status === 'active')

  const approveMember = (req) => setReqs(p => p.filter(r => r.id !== req.id))
  const rejectMember  = (id)  => setReqs(p => p.filter(r => r.id !== id))
  const sendBroadcast = () => { if (!broadcast.trim()) return; setSent(true); setBroadcast(''); setTimeout(() => setSent(false), 3000) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h1 style={{ margin: '0 0 3px', fontSize: '22px', fontWeight: '900', color: 'var(--text)' }}>Admin Dashboard</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>TechieRide NGO · Hyderabad · Reg. 1947/2016 · Full diagnostic view</p>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '12px' }}>
        <StatCard label="Total Members"    value={members.length}      sub={`${active.length} active · ${members.length - active.length} inactive`} icon={Users}      color="var(--primary)" path="/admin/members" />
        <StatCard label="Riders"           value={riders.length}       sub="can post rides"               icon={Car}        color="#15803d"  path="/admin/rides" />
        <StatCard label="Seekers"          value={seekers.length}      sub="can join rides"               icon={Users}      color="#6d28d9"  path="/admin/rides" />
        <StatCard label="Open Rides"       value={open.length}         sub="active in Hyderabad"          icon={TrendingUp} color="#0369a1"  path="/admin/rides" />
        <StatCard label="NGO Activities"   value={activeActs.length}   sub="running now"                  icon={Heart}      color="#b91c1c"  path="/admin/content" />
        <StatCard label="Pending Approvals" value={reqs.length}        sub={reqs.length > 0 ? "Need action!" : "All clear"} icon={UserPlus} color="#b45309" path="/admin/members" alert={reqs.length > 0} />
      </div>

      {/* Pending approvals */}
      {reqs.length > 0 && (
        <div className="card" style={{ borderRadius: '16px', padding: '20px', border: '1.5px solid rgba(245,158,11,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <AlertCircle size={16} color="#b45309" />
            <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)' }}>Pending Member Approvals</span>
            <span className="tag tag-amber">{reqs.length} waiting</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {reqs.map(r => (
              <div key={r.id} style={{ padding: '13px 15px', borderRadius: '12px', background: 'var(--bg)', border: '1.5px solid var(--border)', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="primary-gradient" style={{ width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                  {r.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)', marginBottom: '2px' }}>{r.name}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {r.area} · Ref: <strong style={{ color: 'var(--primary)' }}>{r.referrerName} ({r.referredBy})</strong> · {r.requestDate}
                  </div>
                  {r.wantsToBeRider && r.vehicle && (
                    <div style={{ fontSize: '11px', color: 'var(--text-2)', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Car size={10} /> {r.vehicle.make} · {r.vehicle.reg} · {r.vehicle.seats} seats
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '7px' }}>
                  <button onClick={() => approveMember(r)}
                    style={{ padding: '8px 14px', borderRadius: '9px', background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.3)', color: '#15803d', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <CheckCircle size={13} /> Approve
                  </button>
                  <button onClick={() => rejectMember(r.id)}
                    style={{ padding: '8px 12px', borderRadius: '9px', background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.2)', color: '#b91c1c', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <XCircle size={13} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '3px' }}>Member Growth</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>Cumulative active members</div>
          <ResponsiveContainer width="100%" height={165}>
            <AreaChart data={memberGrowth} margin={{ left: -20 }}>
              <defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.22} /><stop offset="100%" stopColor="var(--primary)" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CT />} />
              <Area type="monotone" dataKey="count" name="Members" stroke="var(--primary)" strokeWidth={2.5} fill="url(#mg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '3px' }}>Rides Per Month</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>Total carpool rides posted</div>
          <ResponsiveContainer width="100%" height={165}>
            <BarChart data={ridesPerMonth} margin={{ left: -20 }}>
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CT />} />
              <Bar dataKey="rides" name="Rides" fill="var(--primary)" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '3px' }}>CO₂ Saved (kg)</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>Estimated community impact</div>
          <ResponsiveContainer width="100%" height={165}>
            <LineChart data={co2ByMonth} margin={{ left: -20 }}>
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CT />} />
              <Line type="monotone" dataKey="kg" name="CO₂ (kg)" stroke="#15803d" strokeWidth={2.5} dot={{ fill: '#15803d', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '3px' }}>Activity RSVPs</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>Members signed up per drive</div>
          <ResponsiveContainer width="100%" height={165}>
            <BarChart data={activityParticipation} layout="vertical" margin={{ left: 8, right: 10 }}>
              <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} width={52} />
              <Tooltip content={<CT />} />
              <Bar dataKey="count" name="Members" radius={[0, 4, 4, 0]}>
                {activityParticipation.map((e, i) => <Cell key={i} fill={e.color} fillOpacity={0.85} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row: Member table + Broadcast + Log */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '16px' }}>

        {/* Recent members */}
        <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)' }}>Recent Members</span>
            <button onClick={() => navigate('/admin/members')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>All <ArrowRight size={11} /></button>
          </div>
          {[...members].sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate)).slice(0, 6).map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 10px', borderRadius: '9px', background: 'var(--bg)', marginBottom: '6px', border: '1px solid var(--border-soft)' }}>
              <div className="primary-gradient" style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                {m.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{m.area} · {m.joinDate}</div>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: '800', color: 'var(--primary)' }}>{m.id}</span>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: m.status === 'active' ? '#15803d' : '#b91c1c', flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* Broadcast */}
        <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '5px' }}>📢 Broadcast</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>Push message to all {active.length} active members</div>
          {sent && <div style={{ padding: '9px 12px', borderRadius: '9px', background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.25)', color: '#15803d', fontSize: '12px', fontWeight: '700', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={13} /> Sent!</div>}
          <textarea value={broadcast} onChange={e => setBroadcast(e.target.value)} placeholder="Type announcement…" rows={6}
            style={{ width: '100%', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '10px 12px', color: 'var(--text)', fontSize: '13px', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none', marginBottom: '10px' }} />
          <button className="btn-primary" onClick={sendBroadcast} disabled={!broadcast.trim()}
            style={{ width: '100%', padding: '10px', borderRadius: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Send size={13} /> Send
          </button>
        </div>

        {/* Admin log */}
        <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={13} color="var(--primary)" /> Activity Log
          </div>
          {adminLog.map(l => (
            <div key={l.id} style={{ padding: '9px 11px', borderRadius: '9px', background: 'var(--bg)', border: '1px solid var(--border-soft)', marginBottom: '6px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>{l.action}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.detail}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={9} />{l.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
