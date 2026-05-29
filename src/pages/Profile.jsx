import { useState } from 'react'
import { User, Phone, Mail, MapPin, Car, Edit2, Check, Camera, Shield, Users } from 'lucide-react'
import { members } from '../data/mockData'

export default function Profile({ user, setUser }) {
  const memberData = members.find(m => m.id === user.id) || {}
  const referrer = members.find(m => m.id === memberData.referredBy)

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user.name,
    phone: memberData.phone || '',
    email: memberData.email || '',
    area: memberData.area || '',
  })
  const [saved, setSaved] = useState(false)
  const [notifs, setNotifs] = useState({ rideUpdates: true, newRides: true, announcements: true, sms: false })

  const save = () => {
    setSaved(true)
    setEditing(false)
    setUser({ ...user, name: form.name })
    setTimeout(() => setSaved(false), 2500)
  }

  const inp = { width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '10px', padding: '10px 13px', color: '#f1f5f9', fontSize: '14px' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '680px' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: '#f1f5f9' }}>My Profile</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Your TechieRide membership details</p>
      </div>

      {saved && (
        <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '12px', padding: '11px 16px', color: '#4ade80', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={15} /> Profile updated
        </div>
      )}

      {/* Identity card */}
      <div className="glass" style={{ borderRadius: '18px', padding: '24px', border: '1px solid rgba(148,163,184,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <div className="gradient-bg" style={{ width: '72px', height: '72px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800', color: 'white' }}>
              {user.avatar}
            </div>
            <button style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderRadius: '50%', background: '#1e293b', border: '2px solid #0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}>
              <Camera size={11} />
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#f1f5f9' }}>{form.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: '800', color: '#38bdf8', background: 'rgba(56,189,248,0.08)', padding: '3px 12px', borderRadius: '8px', border: '1px solid rgba(56,189,248,0.15)' }}>
                {user.id}
              </div>
              {memberData.isRider && <span className="tag tag-blue" style={{ fontSize: '11px' }}>🚗 Rider</span>}
              {memberData.isSeekerActive && <span className="tag tag-green" style={{ fontSize: '11px' }}>🔍 Seeker</span>}
            </div>
          </div>
          <button onClick={() => editing ? save() : setEditing(true)}
            style={{ padding: '9px 16px', borderRadius: '10px', background: editing ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'rgba(56,189,248,0.1)', border: editing ? 'none' : '1px solid rgba(56,189,248,0.2)', color: editing ? 'white' : '#38bdf8', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {editing ? <><Check size={14} /> Save</> : <><Edit2 size={14} /> Edit</>}
          </button>
        </div>

        {/* Membership info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', padding: '14px', background: 'rgba(15,23,42,0.5)', borderRadius: '12px' }}>
          {[
            { label: 'Member Since', value: memberData.joinDate || '—', icon: Shield },
            { label: 'Referred By', value: referrer ? `${referrer.name} (${referrer.id})` : memberData.referredBy || '—', icon: Users },
            { label: 'Status', value: memberData.status || 'active', icon: User },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Icon size={13} color="#475569" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '10px', color: '#475569', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{label}</div>
                <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500', marginTop: '2px', textTransform: 'capitalize' }}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal info */}
      <div className="glass" style={{ borderRadius: '16px', padding: '22px', border: '1px solid rgba(148,163,184,0.08)' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '7px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          <User size={14} /> Personal Information
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {[
            { label: 'Full Name', key: 'name', icon: User, placeholder: 'Your full name' },
            { label: 'Phone', key: 'phone', icon: Phone, placeholder: '+91 XXXXX XXXXX' },
            { label: 'Email', key: 'email', icon: Mail, placeholder: 'your@email.com' },
            { label: 'Area (Hyderabad)', key: 'area', icon: MapPin, placeholder: 'e.g. Kondapur' },
          ].map(({ label, key, icon: Icon, placeholder }) => (
            <div key={key}>
              <label style={{ display: 'block', fontSize: '11px', color: '#475569', marginBottom: '5px', fontWeight: '600', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
                {label}
              </label>
              {editing ? (
                <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} style={inp} />
              ) : (
                <div style={{ fontSize: '14px', fontWeight: '500', color: form[key] ? '#e2e8f0' : '#334155', padding: '4px 0' }}>
                  {form[key] || '—'}
                </div>
              )}
            </div>
          ))}
        </div>
        {editing && (
          <button onClick={() => setEditing(false)} style={{ marginTop: '14px', padding: '8px 16px', borderRadius: '10px', background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(71,85,105,0.25)', color: '#94a3b8', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </div>

      {/* Vehicle (if rider) */}
      {memberData.vehicle && (
        <div className="glass" style={{ borderRadius: '16px', padding: '22px', border: '1px solid rgba(56,189,248,0.1)' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#38bdf8', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '7px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <Car size={14} /> My Vehicle
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {[
              { label: 'Make & Model', value: memberData.vehicle.make },
              { label: 'Reg. No.', value: memberData.vehicle.reg },
              { label: 'Colour', value: memberData.vehicle.color },
              { label: 'Pool Seats', value: `${memberData.vehicle.seats} seats` },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'rgba(15,23,42,0.5)', borderRadius: '10px', padding: '12px' }}>
                <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notification prefs */}
      <div className="glass" style={{ borderRadius: '16px', padding: '22px', border: '1px solid rgba(148,163,184,0.08)' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Notification Preferences</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { key: 'rideUpdates', label: 'Ride status updates', desc: 'When your requested ride is accepted or updated' },
            { key: 'newRides', label: 'New rides in your area', desc: 'When a new carpool is posted near you' },
            { key: 'announcements', label: 'Announcements', desc: 'NGO news and community updates' },
            { key: 'sms', label: 'SMS alerts', desc: 'Rider contact info via SMS' },
          ].map(({ key, label, desc }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '11px', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(148,163,184,0.05)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#e2e8f0' }}>{label}</div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{desc}</div>
              </div>
              <div onClick={() => setNotifs(n => ({ ...n, [key]: !n[key] }))}
                style={{ width: '42px', height: '23px', borderRadius: '12px', background: notifs[key] ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'rgba(71,85,105,0.3)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                <div style={{ width: '17px', height: '17px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: notifs[key] ? '22px' : '3px', transition: 'left 0.2s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
