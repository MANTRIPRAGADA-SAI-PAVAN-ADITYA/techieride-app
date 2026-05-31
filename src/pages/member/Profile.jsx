import { useState } from 'react'
import { User, Phone, Mail, MapPin, Car, Edit2, Check, Shield, Users, Heart, Leaf, Star, Download, ChevronRight } from 'lucide-react'
import { members, activities, rides, participations } from '../../data/mockData'

export default function Profile({ user, setUser }) {
  const member   = members.find(m => m.id === user.id) || {}
  const referrer = members.find(m => m.id === member.referredBy)
  const referred = members.filter(m => m.referredBy === user.id)
  const myActs   = activities.filter(a => a.rsvps?.includes(user.id))
  const myRides  = rides.filter(r => r.riderId === user.id || r.seekers?.includes(user.id))
  const myParts  = participations.filter(p => p.memberId === user.id)

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user.name, phone: member.phone || '', email: member.email || '', area: member.area || '' })
  const [saved, setSaved] = useState(false)
  const [notifs, setNotifs] = useState({ rideUpdates: true, newRides: true, announcements: true, sms: false })

  const save = () => { setSaved(true); setEditing(false); setUser({ ...user, name: form.name }); setTimeout(() => setSaved(false), 2500) }

  const INP = { width: '100%', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '10px 13px', color: 'var(--text)', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }

  const co2 = myRides.length * 3
  const ngoScore = Math.min(100, myActs.length * 15 + myRides.length * 5 + referred.length * 10)

  const printCard = () => {
    const w = window.open('', '_blank')
    w.document.write(`<html><body style="font-family:sans-serif;padding:24px;background:#f0f9fb"><div style="border:3px solid #14a1af;border-radius:16px;padding:24px;max-width:380px;background:white"><div style="height:6px;background:linear-gradient(90deg,#14a1af,#0d3c55);border-radius:3px;margin-bottom:20px"></div><div style="display:flex;align-items:center;gap:12px;margin-bottom:16px"><div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#14a1af,#0d3c55);display:flex;align-items:center;justify-content:center;color:white;font-size:18px;font-weight:800">${user.avatar}</div><div><div style="font-size:20px;font-weight:800;color:#0d2b36">${member.name}</div><div style="font-family:monospace;font-size:15px;color:#14a1af;font-weight:800;letter-spacing:1px">${member.id}</div></div></div><table style="width:100%;font-size:13px;border-collapse:collapse">${[['Area', member.area], ['Phone', member.phone], ['Joined', member.joinDate], ['Role', user.isRider ? 'Rider + Seeker' : 'Seeker/Member'], ['Referred By', member.referredBy]].map(([k, v]) => `<tr><td style="padding:5px 0;color:#5a8595;font-weight:600;width:40%">${k}</td><td style="padding:5px 0;color:#0d2b36;font-weight:500">${v}</td></tr>`).join('')}</table><div style="margin-top:14px;padding:8px 12px;background:rgba(20,161,175,0.08);border-radius:8px;font-size:11px;color:#0d7a86;text-align:center;font-weight:700">TechieRide NGO · for a better society · Reg. 1947/2016</div></div></body></html>`)
    w.print()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px' }}>
      <div>
        <h1 style={{ margin: '0 0 3px', fontSize: '22px', fontWeight: '900', color: 'var(--text)' }}>My Profile</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>Your TechieRide membership card and settings</p>
      </div>

      {saved && <div style={{ padding: '11px 16px', borderRadius: '11px', background: 'rgba(34,197,94,0.08)', border: '1.5px solid rgba(34,197,94,0.25)', color: '#15803d', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '7px' }}><Check size={14} /> Profile saved</div>}

      {/* TR ID Card */}
      <div className="card" style={{ borderRadius: '18px', overflow: 'hidden', border: '2px solid var(--primary)' }}>
        <div style={{ height: '6px', background: 'linear-gradient(90deg, var(--primary), #0d3c55)' }} />
        <div style={{ padding: '22px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
            <div className="primary-gradient" style={{ width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800', color: 'white', flexShrink: 0 }}>{user.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '19px', fontWeight: '900', color: 'var(--text)' }}>{member.name}</div>
              <div style={{ fontFamily: 'monospace', fontSize: '17px', color: 'var(--primary)', fontWeight: '800', letterSpacing: '1.5px', marginTop: '2px' }}>{member.id}</div>
              <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
                {user.isRider && <span className="tag tag-blue" style={{ fontSize: '10px' }}>🚗 Rider</span>}
                {user.isSeekerActive && <span className="tag tag-green" style={{ fontSize: '10px' }}>🔍 Seeker</span>}
                {!user.isRider && !user.isSeekerActive && <span className="tag tag-amber" style={{ fontSize: '10px' }}>Member</span>}
              </div>
            </div>
            <button onClick={printCard} style={{ padding: '8px 14px', borderRadius: '9px', background: 'var(--primary-light)', border: '1.5px solid rgba(20,161,175,0.3)', color: 'var(--primary-dark)', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Download size={13} /> Print ID
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '12px' }}>
            {[['📍 Area', member.area], ['📞 Phone', member.phone], ['📅 Joined', member.joinDate], ['🏛️ Reg. No.', '1947/2016']].map(([k, v]) => (
              <div key={k} style={{ padding: '9px 11px', borderRadius: '9px', background: 'var(--bg)', border: '1px solid var(--border-soft)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '2px' }}>{k}</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text)', fontWeight: '600' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '8px 14px', borderRadius: '9px', background: 'var(--primary-light)', border: '1px solid rgba(20,161,175,0.2)', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--primary-dark)', fontWeight: '700' }}>TechieRide NGO · for a better society · Hyderabad · Reg. 1947/2016</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {[
          { label: 'Total Rides',  value: myRides.length,  color: 'var(--primary)', icon: Car },
          { label: 'Activities',   value: myActs.length,   color: '#b91c1c',         icon: Heart },
          { label: 'CO₂ Saved',    value: `${co2}kg`,      color: '#0369a1',         icon: Leaf },
          { label: 'Referred',     value: referred.length, color: '#6d28d9',         icon: Users },
          { label: 'Poolmates',    value: new Set([...rides.filter(r => r.riderId === user.id).flatMap(r => r.seekers), ...rides.filter(r => r.seekers?.includes(user.id)).map(r => r.riderId)].filter(id => id !== user.id)).size, color: '#15803d', icon: Users },
          { label: 'NGO Score',    value: `${ngoScore}/100`, color: '#b45309',       icon: Star },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '14px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: s.color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
              <s.icon size={15} color={s.color} />
            </div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--text)', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '3px', fontWeight: '600' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Edit info */}
      <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '7px' }}><User size={13} color="var(--primary)" />Personal Information</span>
          <button onClick={() => editing ? save() : setEditing(true)}
            style={{ padding: '7px 13px', borderRadius: '9px', background: editing ? 'rgba(34,197,94,0.1)' : 'var(--primary-light)', border: editing ? '1.5px solid rgba(34,197,94,0.3)' : '1.5px solid rgba(20,161,175,0.25)', color: editing ? '#15803d' : 'var(--primary-dark)', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            {editing ? <><Check size={13} />Save</> : <><Edit2 size={13} />Edit</>}
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[{ label: 'Full Name', key: 'name', icon: User }, { label: 'Phone', key: 'phone', icon: Phone }, { label: 'Email', key: 'email', icon: Mail }, { label: 'Area', key: 'area', icon: MapPin }].map(({ label, key, icon: Icon }) => (
            <div key={key}>
              <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: '4px' }}><Icon size={10} />{label}</label>
              {editing ? <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={INP} /> : <div style={{ fontSize: '13.5px', color: form[key] ? 'var(--text)' : 'var(--text-muted)', fontWeight: '500', padding: '4px 0' }}>{form[key] || '—'}</div>}
            </div>
          ))}
        </div>
        {editing && <button onClick={() => setEditing(false)} style={{ marginTop: '12px', padding: '7px 14px', borderRadius: '9px', background: 'var(--bg)', border: '1.5px solid var(--border)', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>}
      </div>

      {/* Referral chain */}
      <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '13px', display: 'flex', alignItems: 'center', gap: '7px' }}><Shield size={13} color="var(--primary)" />Referral Chain</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {referrer && (
            <div style={{ padding: '10px 13px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', width: '75px', flexShrink: 0 }}>Referred by</span>
              <ChevronRight size={12} color="var(--text-muted)" />
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', flex: 1 }}>{referrer.name}</span>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--primary)', fontWeight: '800' }}>{referrer.id}</span>
            </div>
          )}
          <div style={{ padding: '10px 13px', borderRadius: '10px', background: 'var(--primary-light)', border: '1.5px solid rgba(20,161,175,0.25)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', color: 'var(--primary-dark)', fontWeight: '700', width: '75px', flexShrink: 0 }}>You</span>
            <ChevronRight size={12} color="var(--primary)" />
            <span style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '900', color: 'var(--primary)', flex: 1 }}>{user.id}</span>
          </div>
          {referred.length > 0 && (
            <div style={{ padding: '10px 13px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '8px' }}>You referred ({referred.length})</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {referred.map(m => (
                  <div key={m.id} style={{ padding: '4px 11px', borderRadius: '20px', background: 'var(--surface)', border: '1.5px solid var(--border)', fontSize: '12px', color: 'var(--text-2)' }}>
                    {m.name} <span style={{ fontFamily: 'monospace', color: 'var(--primary)', fontWeight: '800' }}>{m.id}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification prefs */}
      <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '13px' }}>Notification Preferences</div>
        {[{ key: 'rideUpdates', label: 'Ride updates', desc: 'When requests are accepted or updated' }, { key: 'newRides', label: 'New rides near you', desc: 'When carpools are posted in your area' }, { key: 'announcements', label: 'NGO announcements', desc: 'Community news and events' }, { key: 'sms', label: 'SMS alerts', desc: 'Rider contact details via SMS' }].map(({ key, label, desc }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 13px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border-soft)', marginBottom: '7px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{desc}</div>
            </div>
            <div onClick={() => setNotifs(n => ({ ...n, [key]: !n[key] }))}
              style={{ width: '42px', height: '22px', borderRadius: '11px', background: notifs[key] ? 'var(--primary)' : 'var(--border)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: notifs[key] ? '23px' : '3px', transition: 'left 0.2s' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
