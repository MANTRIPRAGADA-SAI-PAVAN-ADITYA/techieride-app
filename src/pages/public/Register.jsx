import { useState } from 'react'
import { CheckCircle, User, Phone, Mail, MapPin, Car, Info, ArrowRight } from 'lucide-react'
import { members } from '../../data/mockData'

const HYD = ['Hitech City','Gachibowli','Kondapur','Madhapur','Jubilee Hills','Banjara Hills','Ameerpet','Secunderabad','KPHB','Kukatpally','LB Nagar','Uppal','Dilsukhnagar','Mehdipatnam','Miyapur','Begumpet','Nampally']

const INP = { width:'100%', background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:'10px', padding:'11px 14px', color:'var(--text)', fontSize:'14px', fontFamily:'inherit', outline:'none', boxSizing:'border-box' }
const LBL = ({children}) => <label style={{ display:'block', fontSize:'11px', color:'var(--text-muted)', marginBottom:'5px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.5px' }}>{children}</label>

export default function Register() {
  const [step, setStep]     = useState(1)
  const [form, setForm]     = useState({ name:'', phone:'', email:'', area:'', referrerId:'', wantsToRide:false, vehicleMake:'', vehicleReg:'', vehicleSeats:3, message:'' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const validateStep1 = () => {
    if (!form.name || !form.phone || !form.area) { setError('Please fill all required fields'); return false }
    setError(''); return true
  }
  const validateStep2 = () => {
    const ref = members.find(m => m.id === form.referrerId.toUpperCase())
    if (!ref) { setError(`Member ${form.referrerId.toUpperCase()} not found. Ask your referrer for their exact TR ID.`); return false }
    if (ref.status !== 'active') { setError('Referrer is not an active member.'); return false }
    setError(''); return true
  }

  const submit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) return (
    <div style={{ maxWidth:'520px', margin:'64px auto', padding:'0 24px', textAlign:'center' }}>
      <div className="card" style={{ borderRadius:'20px', padding:'48px 36px' }}>
        <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'rgba(20,161,175,0.12)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <CheckCircle size={34} color="var(--primary)" />
        </div>
        <h2 style={{ margin:'0 0 10px', fontSize:'24px', fontWeight:'900', color:'var(--text)' }}>Application Submitted!</h2>
        <p style={{ margin:'0 0 20px', fontSize:'15px', color:'var(--text-2)', lineHeight:1.6 }}>
          Thank you, <strong>{form.name}</strong>. Your membership request has been sent for admin review. You'll be notified once approved and your TR ID is assigned.
        </p>
        <div style={{ padding:'14px', borderRadius:'11px', background:'var(--primary-light)', border:'1px solid rgba(20,161,175,0.25)', fontSize:'13px', color:'var(--primary-dark)', lineHeight:1.5 }}>
          Referred by: <strong>{form.referrerId.toUpperCase()}</strong><br/>
          Average approval time: 2–3 business days
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth:'620px', margin:'0 auto', padding:'48px 24px' }}>
      <div style={{ marginBottom:'36px', textAlign:'center' }}>
        <h1 style={{ margin:'0 0 10px', fontSize:'34px', fontWeight:'900', color:'var(--text)', letterSpacing:'-0.5px' }}>Apply for Membership</h1>
        <p style={{ margin:0, color:'var(--text-muted)', fontSize:'15px' }}>TechieRide is a reference-only community. You must be referred by an existing member.</p>
      </div>

      {/* Steps */}
      <div style={{ display:'flex', gap:'0', alignItems:'center', marginBottom:'36px' }}>
        {['Your Details','Referral','Confirm'].map((s,i) => (
          <div key={s} style={{ display:'flex', alignItems:'center', flex: i<2?1:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ width:'30px', height:'30px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:'800', background: step>i?'var(--primary)':'var(--bg)', color: step>i?'white':'var(--text-muted)', border: step===i+1?'2px solid var(--primary)':'2px solid var(--border)', transition:'all 0.2s' }}>
                {step>i+1?<CheckCircle size={14}/>:i+1}
              </div>
              <span style={{ fontSize:'13px', fontWeight: step===i+1?'700':'400', color: step===i+1?'var(--primary)':step>i+1?'var(--text-2)':'var(--text-muted)', whiteSpace:'nowrap' }}>{s}</span>
            </div>
            {i<2 && <div style={{ flex:1, height:'1.5px', background:step>i+1?'var(--primary)':'var(--border)', margin:'0 12px', transition:'background 0.3s' }}/>}
          </div>
        ))}
      </div>

      <div className="card" style={{ borderRadius:'18px', padding:'28px' }}>
        {error && <div style={{ padding:'11px 14px', borderRadius:'9px', background:'rgba(239,68,68,0.08)', border:'1.5px solid rgba(239,68,68,0.2)', color:'#b91c1c', fontSize:'13px', marginBottom:'16px', display:'flex', alignItems:'center', gap:'7px' }}><Info size={13}/>{error}</div>}

        {step===1 && (
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <h3 style={{ margin:'0 0 4px', fontSize:'17px', fontWeight:'800', color:'var(--text)' }}>Personal Details</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              <div><LBL>Full Name *</LBL><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your full name" style={INP}/></div>
              <div><LBL>Phone *</LBL><input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+91 XXXXX XXXXX" style={INP}/></div>
              <div><LBL>Email</LBL><input value={form.email} onChange={e=>set('email',e.target.value)} placeholder="email@example.com" style={INP}/></div>
              <div>
                <LBL>Area in Hyderabad *</LBL>
                <select value={form.area} onChange={e=>set('area',e.target.value)} style={INP}>
                  <option value="">Select area…</option>
                  {HYD.map(a=><option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <label style={{ display:'flex', alignItems:'flex-start', gap:'10px', padding:'14px', borderRadius:'11px', background:'var(--bg)', border:'1.5px solid var(--border)', cursor:'pointer' }}>
              <input type="checkbox" checked={form.wantsToRide} onChange={e=>set('wantsToRide',e.target.checked)} style={{ marginTop:'2px', accentColor:'var(--primary)', width:'15px', height:'15px', flexShrink:0 }}/>
              <div>
                <div style={{ fontSize:'13.5px', fontWeight:'700', color:'var(--text)' }}>🚗 I want to be a Rider (I have a vehicle)</div>
                <div style={{ fontSize:'12px', color:'var(--text-muted)', marginTop:'2px' }}>Riders can post rides and offer seats. Leave unchecked if you only want to join existing rides (Seeker).</div>
              </div>
            </label>
            {form.wantsToRide && (
              <div style={{ padding:'16px', borderRadius:'12px', background:'var(--primary-light)', border:'1.5px solid rgba(20,161,175,0.25)' }}>
                <div style={{ fontSize:'12px', fontWeight:'700', color:'var(--primary-dark)', marginBottom:'10px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Vehicle Details</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                  <div><LBL>Make & Model</LBL><input value={form.vehicleMake} onChange={e=>set('vehicleMake',e.target.value)} placeholder="Maruti Swift Dzire" style={INP}/></div>
                  <div><LBL>Reg. No.</LBL><input value={form.vehicleReg} onChange={e=>set('vehicleReg',e.target.value.toUpperCase())} placeholder="TS 09 AB 1234" style={{ ...INP, fontFamily:'monospace' }}/></div>
                  <div><LBL>Pool seats available</LBL><select value={form.vehicleSeats} onChange={e=>set('vehicleSeats',+e.target.value)} style={INP}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} seat{n>1?'s':''}</option>)}</select></div>
                </div>
              </div>
            )}
            <button className="btn-primary" onClick={()=>validateStep1()&&setStep(2)} style={{ padding:'12px', borderRadius:'11px', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', gap:'7px', marginTop:'4px' }}>
              Continue <ArrowRight size={15}/>
            </button>
          </div>
        )}

        {step===2 && (
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            <h3 style={{ margin:'0 0 4px', fontSize:'17px', fontWeight:'800', color:'var(--text)' }}>Referral Details</h3>
            <div style={{ padding:'13px 16px', borderRadius:'10px', background:'rgba(245,158,11,0.07)', border:'1.5px solid rgba(245,158,11,0.2)', fontSize:'13px', color:'var(--text-2)', display:'flex', gap:'9px', alignItems:'flex-start' }}>
              <Info size={14} color="#b45309" style={{ flexShrink:0, marginTop:'1px' }}/>
              <span>You must be referred by an existing TechieRide member. Ask them for their <strong>TR ID</strong> (format: TR1001). We will verify with your referrer.</span>
            </div>
            <div>
              <LBL>Referrer's TR ID *</LBL>
              <input value={form.referrerId} onChange={e=>set('referrerId',e.target.value.toUpperCase())} placeholder="TR1001" style={{ ...INP, fontFamily:'monospace', letterSpacing:'2px', fontWeight:'800', fontSize:'16px', textAlign:'center' }}/>
            </div>
            <div>
              <LBL>Why do you want to join? (optional)</LBL>
              <textarea value={form.message} onChange={e=>set('message',e.target.value)} rows={3} placeholder="Tell us about yourself and your interest in TechieRide…" style={{ ...INP, resize:'vertical', minHeight:'70px' }}/>
            </div>
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={()=>setStep(1)} style={{ flex:1, padding:'12px', borderRadius:'11px', background:'var(--bg)', border:'1.5px solid var(--border)', color:'var(--text-muted)', fontSize:'14px', fontWeight:'600', cursor:'pointer' }}>Back</button>
              <button className="btn-primary" onClick={()=>validateStep2()&&setStep(3)} style={{ flex:2, padding:'12px', borderRadius:'11px', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', gap:'7px' }}>
                Review <ArrowRight size={15}/>
              </button>
            </div>
          </div>
        )}

        {step===3 && (
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <h3 style={{ margin:'0 0 4px', fontSize:'17px', fontWeight:'800', color:'var(--text)' }}>Review & Submit</h3>
            <div style={{ background:'var(--bg)', borderRadius:'12px', padding:'18px', display:'flex', flexDirection:'column', gap:'10px', border:'1px solid var(--border)' }}>
              {[['Name', form.name],['Phone', form.phone],['Email', form.email||'—'],['Area', form.area],['Role', form.wantsToRide?'Rider + Seeker':'Seeker only'],['Vehicle', form.wantsToRide?`${form.vehicleMake} · ${form.vehicleReg}`:'N/A'],['Referred By', form.referrerId.toUpperCase()]].map(([k,v])=>(
                <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'9px', borderBottom:'1px solid var(--border-soft)' }}>
                  <span style={{ fontSize:'12.5px', color:'var(--text-muted)', fontWeight:'600' }}>{k}</span>
                  <span style={{ fontSize:'13.5px', fontWeight:'600', color:'var(--text)' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:'12px 14px', borderRadius:'10px', background:'var(--primary-light)', border:'1px solid rgba(20,161,175,0.25)', fontSize:'13px', color:'var(--primary-dark)', lineHeight:1.5 }}>
              Your request will be reviewed by a TechieRide admin. Once approved, you'll receive your unique TR ID (e.g. <strong>TR1013</strong>).
            </div>
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={()=>setStep(2)} style={{ flex:1, padding:'12px', borderRadius:'11px', background:'var(--bg)', border:'1.5px solid var(--border)', color:'var(--text-muted)', fontSize:'14px', fontWeight:'600', cursor:'pointer' }}>Back</button>
              <button className="btn-primary" onClick={submit} disabled={loading} style={{ flex:2, padding:'12px', borderRadius:'11px', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', gap:'7px' }}>
                {loading ? <div className="spinner"/> : <><CheckCircle size={15}/>Submit Application</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
