import { useNavigate } from 'react-router-dom'
import { Car, Users, Leaf, Heart, ArrowRight, CheckCircle, Shield, MapPin, Star, Globe } from 'lucide-react'
import { activities } from '../../data/mockData'

const IMPACT = [
  { value: '12+', label: 'Active Members', icon: Users, color: 'var(--primary)' },
  { value: '6',   label: 'Welfare Drives', icon: Heart, color: '#b91c1c' },
  { value: '900+', label: 'Lives Touched', icon: Globe, color: '#6d28d9' },
  { value: '210kg', label: 'CO₂ Saved',   icon: Leaf,  color: '#15803d' },
]

const HOW = [
  { step: '01', title: 'Get Referred',    desc: 'Connect with an existing TechieRide member. Only members can refer new members to the community.' },
  { step: '02', title: 'Submit Request',  desc: 'Fill out the membership form with your details and your referrer\'s TR ID. Our admin team reviews your application.' },
  { step: '03', title: 'Get Approved',    desc: 'Once approved you receive your unique TR ID, gaining full access to carpooling and NGO activities.' },
]

export default function Landing({ onLoginClick }) {
  const navigate = useNavigate()

  return (
    <div style={{ color: 'var(--text)' }}>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg, #0d3c55 0%, #14a1af 100%)', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)' }} />
        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '24px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '600', letterSpacing: '0.5px' }}>NGO · Reg. 1947/2016 · Hyderabad</span>
          </div>
          <h1 style={{ margin: '0 0 16px', fontSize: '52px', fontWeight: '900', color: 'white', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Commute Together,<br />
            <span style={{ color: '#7de8f0' }}>Build Together.</span>
          </h1>
          <p style={{ margin: '0 0 36px', fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 36px' }}>
            TechieRide is a Hyderabad NGO uniting techies through carpooling and community welfare — reducing traffic, emissions, and costs while building a better society.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/register')}
              style={{ padding: '14px 28px', borderRadius: '10px', background: 'white', color: 'var(--primary)', fontSize: '15px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
              <Users size={17} /> Apply for Membership <ArrowRight size={16} />
            </button>
            <button onClick={() => navigate('/donate')}
              style={{ padding: '14px 28px', borderRadius: '10px', background: 'transparent', color: 'white', fontSize: '15px', fontWeight: '700', border: '2px solid rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={16} /> Support Our Mission
            </button>
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {IMPACT.map((s, i) => (
            <div key={s.label} style={{ padding: '28px 20px', textAlign: 'center', borderRight: i < IMPACT.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: s.color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <s.icon size={20} color={s.color} />
              </div>
              <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '500' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>ABOUT TECHIERIDE</div>
            <h2 style={{ margin: '0 0 20px', fontSize: '36px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px', lineHeight: 1.2 }}>A community of techies, for a better society</h2>
            <p style={{ margin: '0 0 16px', fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.7 }}>
              Founded in <strong>2014</strong> by a group of IT professionals in Hyderabad, TechieRide began with a simple idea: why not share rides to work? That seed grew into a registered NGO with welfare programs spanning education, healthcare, environment, and community support.
            </p>
            <p style={{ margin: '0 0 28px', fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.7 }}>
              Our financial model is unique — members save money by carpooling, and voluntarily channel those savings into social impact activities.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Community carpooling across Hyderabad',
                'Six active social welfare drives',
                'Reference-only membership for trust & safety',
                'Funded by member savings and voluntary donations',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-2)' }}>
                  <CheckCircle size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { label: 'Mission',    value: 'Build a better society through community action', icon: Globe,  color: 'var(--primary)' },
              { label: 'Funding',    value: 'Carpool savings + voluntary member donations',    icon: Heart,  color: '#b91c1c' },
              { label: 'Focus',      value: 'Students, youth, underprivileged communities',    icon: Users,  color: '#6d28d9' },
              { label: 'Trust',      value: 'Reference-only membership since 2014',            icon: Shield, color: '#0369a1' },
            ].map(c => (
              <div key={c.label} className="card" style={{ padding: '20px', borderRadius: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: c.color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <c.icon size={18} color={c.color} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>{c.label}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.5 }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section style={{ padding: '72px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>WELFARE ACTIVITIES</div>
            <h2 style={{ margin: '0 0 12px', fontSize: '36px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px' }}>What we do for society</h2>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto' }}>Every initiative is volunteer-driven and funded by our community's carpool savings and donations.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {activities.map(a => (
              <div key={a.id} className="card" style={{ borderRadius: '16px', padding: '24px', border: `1px solid ${a.color}18`, transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '32px', lineHeight: 1 }}>{a.icon}</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', background: a.color + '14', color: a.color, border: `1px solid ${a.color}25` }}>{a.category}</span>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '17px', fontWeight: '800', color: 'var(--text)' }}>{a.title}</h3>
                <p style={{ margin: '0 0 16px', fontSize: '13.5px', color: 'var(--text-2)', lineHeight: 1.6 }}>{a.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: a.color, background: a.bg, padding: '4px 10px', borderRadius: '20px' }}>{a.impact}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{a.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button onClick={() => useNavigate()('/activities')}
              style={{ padding: '12px 28px', borderRadius: '10px', background: 'transparent', border: '1.5px solid var(--primary)', color: 'var(--primary)', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              View All Activities <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CARPOOLING INFO ── */}
      <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>CARPOOLING SERVICE</div>
              <h2 style={{ margin: '0 0 20px', fontSize: '34px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px', lineHeight: 1.2 }}>Share your commute.<br />Save money. Save the planet.</h2>
              <p style={{ margin: '0 0 24px', fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.7 }}>
                TechieRide's carpooling network connects verified members across Hyderabad. Riders post their route and schedule; seekers find and join rides that match their commute.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: 'Hyderabad only', sub: 'Focused local network' },
                  { label: 'Verified members', sub: 'Reference-based trust' },
                  { label: 'CO₂ reduction', sub: 'Track your impact' },
                  { label: 'Cost savings', sub: 'Split fuel costs fairly' },
                ].map(c => (
                  <div key={c.label} style={{ padding: '14px', borderRadius: '11px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', marginBottom: '2px' }}>{c.label}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{c.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px', padding: '14px 18px', borderRadius: '11px', background: 'var(--primary-light)', border: '1px solid rgba(20,161,175,0.25)' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary-dark)' }}>🔒 Members-only access</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-2)', marginTop: '3px' }}>Carpooling is available exclusively to verified TechieRide members. Apply for membership to get started.</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { step: '🚗', title: 'Post a Ride', desc: 'Riders share their vehicle, route (with stops), date and time. Seekers find and join.', color: 'var(--primary)' },
                { step: '🔍', title: 'Find a Ride', desc: 'Browse available rides, see the full route, and request to join. Coordinate pickup with the rider.', color: '#15803d' },
                { step: '↻',  title: 'Recurring Rides', desc: 'Post weekly repeating rides so regular commuters can join your pool permanently.', color: '#6d28d9' },
              ].map(c => (
                <div key={c.title} style={{ padding: '18px', borderRadius: '13px', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: c.color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{c.step}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', marginBottom: '4px' }}>{c.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.5 }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO JOIN ── */}
      <section style={{ padding: '72px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>MEMBERSHIP</div>
          <h2 style={{ margin: '0 0 12px', fontSize: '36px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px' }}>How to become a member</h2>
          <p style={{ margin: '0 auto 48px', fontSize: '15px', color: 'var(--text-muted)', maxWidth: '500px' }}>TechieRide is a reference-only community. Every member is personally vouched for by an existing member.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', textAlign: 'left' }}>
            {HOW.map((h, i) => (
              <div key={h.step} className="card" style={{ padding: '28px', borderRadius: '16px', position: 'relative' }}>
                <div style={{ fontSize: '42px', fontWeight: '900', color: 'var(--primary)', opacity: 0.12, lineHeight: 1, marginBottom: '16px', fontFamily: 'monospace' }}>{h.step}</div>
                <h3 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: '800', color: 'var(--text)' }}>{h.title}</h3>
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-2)', lineHeight: 1.6 }}>{h.desc}</p>
              </div>
            ))}
          </div>
          <button onClick={() => useNavigate()('/register')}
            style={{ marginTop: '40px', padding: '14px 32px', borderRadius: '10px', background: 'var(--primary)', color: 'white', fontSize: '15px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Apply for Membership <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── DONATE CTA ── */}
      <section style={{ padding: '64px 24px', background: 'linear-gradient(135deg, #0d3c55, #14a1af)', textAlign: 'center' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <Heart size={36} color="rgba(255,255,255,0.8)" style={{ marginBottom: '16px' }} />
          <h2 style={{ margin: '0 0 14px', fontSize: '34px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>Support our welfare activities</h2>
          <p style={{ margin: '0 0 32px', fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
            Your donation funds school visits, blood donation drives, tribal support, water camps and more. Every rupee goes directly to community impact.
          </p>
          <button onClick={() => useNavigate()('/donate')}
            style={{ padding: '14px 32px', borderRadius: '10px', background: 'white', color: 'var(--primary)', fontSize: '15px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
            <Heart size={17} /> Donate Now <ArrowRight size={16} />
          </button>
        </div>
      </section>

    </div>
  )
}
