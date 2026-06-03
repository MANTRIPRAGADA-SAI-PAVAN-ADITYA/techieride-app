import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Car, Users, Leaf, Heart, ArrowRight, CheckCircle, Shield, MapPin, ChevronDown, ChevronUp, MessageCircle, Star, Globe, Phone, Mail, Quote } from 'lucide-react'
import { activities } from '../../data/mockData'

// ─── DATA ────────────────────────────────────────────────────────────────────

const BENEFITS = [
  { icon: '🚗', title: 'Save ₹2,000–5,000/month',     desc: 'Split fuel costs with fellow commuters on your exact route. Most members save significantly vs. solo driving or cabs.' },
  { icon: '🌍', title: 'Reduce your carbon footprint', desc: 'Every shared ride removes a car off Hyderabad roads. Members together save hundreds of kg of CO₂ every month.' },
  { icon: '🤝', title: 'Build real friendships',        desc: 'Carpooling daily with colleagues turns strangers into lifelong friends. Our members regularly describe it as their best work perk.' },
  { icon: '❤️',  title: 'Give back to society',         desc: 'Your savings fund school visits, water camps, tribal support and more. Being a member = being part of something bigger.' },
  { icon: '🔒', title: 'Safe, verified community',      desc: 'Every member is personally referred and approved. You always know who you\'re riding with — no strangers.' },
  { icon: '📅', title: 'Flexible — ride on your terms', desc: 'Post a ride when you want, join when you need. No daily obligation. Works around your schedule.' },
]

const TESTIMONIALS = [
  { name: 'Srinivas R.', area: 'Kondapur → Hitech City', since: 'Member since 2022', text: 'I was sceptical at first — carpooling with people I barely knew. Six months later, my carpool group became my closest friends at work. And I\'m saving ₹3,500 every month!', avatar: 'SR', rating: 5 },
  { name: 'Ananya K.', area: 'Madhapur → Secunderabad', since: 'Member since 2023', text: 'As a woman commuting at odd hours, safety was my top concern. TechieRide\'s reference-only model meant I only rode with people my colleague personally vouched for. Complete peace of mind.', avatar: 'AK', rating: 5 },
  { name: 'Prasad M.', area: 'KPHB → Gachibowli', since: 'Member since 2021', text: 'I joined for the carpooling but stayed for the NGO work. Being part of the Village Ride and seeing those school kids\' faces — that\'s priceless. I had no idea a carpool group could do this much good.', avatar: 'PM', rating: 5 },
  { name: 'Divya S.', area: 'LB Nagar → Hitech City', since: 'Member since 2023', text: 'The onboarding process was smooth. My colleague referred me, I filled the form, and within 3 days I had my TR ID and was already in a carpool. Genuinely the best decision for my daily commute.', avatar: 'DS', rating: 5 },
]

const FAQS = [
  { q: 'Do I need to be an IT professional to join?', a: 'Not at all! While TechieRide was started by techies, we welcome anyone from any profession. If you live in Hyderabad and want to carpool while contributing to community welfare, you belong here.' },
  { q: 'How does carpooling work? Is it free?', a: 'You either post a ride (if you have a vehicle) or join someone else\'s ride on your route. Members typically split petrol costs fairly — usually ₹50–150 per day depending on distance. There\'s no platform fee. TechieRide is a community, not a business.' },
  { q: 'I don\'t know any TechieRide member. How do I get referred?', a: 'Message us on WhatsApp (+91 98765 43210) or fill the "Join Us" form. We\'ll connect you with an active member near your area who can refer you after a brief chat. We want everyone to have a fair chance to join.' },
  { q: 'Is it safe? How do you verify members?', a: 'Every single member is personally referred by an existing member who vouches for them. Admin reviews each application. You\'ll always know the full name, contact number and TR ID of whoever you\'re riding with. Many members have been riding together for 3+ years.' },
  { q: 'What happens after I submit the join form?', a: 'The admin team reviews your form (usually within 2–3 working days). If approved, you receive your unique TR ID (e.g. TR1045) via call/WhatsApp. You then get access to the member portal where you can find rides or post your own.' },
  { q: 'Can I join just for the NGO activities without carpooling?', a: 'Absolutely. Membership covers both carpooling and NGO participation. You choose what you want to be part of — some members only join welfare activities and don\'t use carpooling at all. Both are equally valued.' },
  { q: 'How do I donate if I\'m not a member?', a: 'Anyone can donate! Click "Donate" in the navigation. Your donation directly funds specific activities like school visits, water camps, or tribal support. You can choose exactly where your money goes.' },
]

const IMPACT_STORIES = [
  { emoji: '🏫', title: 'Saraswathi Govt School, Medchal', sub: 'Sports equipment + career guidance session', tag: 'Village Ride', color: '#0d7a86' },
  { emoji: '💧', title: '3,000 litres served daily', sub: 'Summer water camp at Ameerpet Metro, 70+ days', tag: 'Water Camp', color: '#0369a1' },
  { emoji: '🩸', title: '120+ blood units donated', sub: 'Regular drives at blood banks across Hyderabad', tag: 'Blood Drive', color: '#b91c1c' },
  { emoji: '🌱', title: 'Plantation at KPHB Colony', sub: '200 saplings planted by TechieRide volunteers', tag: 'Prakruthi', color: '#15803d' },
]

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderRadius: '12px', border: `1.5px solid ${open ? 'var(--primary)' : 'var(--border)'}`, overflow: 'hidden', transition: 'border-color 0.2s', marginBottom: '10px' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: open ? 'var(--primary-light)' : 'var(--surface)', border: 'none', cursor: 'pointer', gap: '12px', textAlign: 'left' }}>
        <span style={{ fontSize: '14.5px', fontWeight: '700', color: open ? 'var(--primary-dark)' : 'var(--text)', flex: 1 }}>{q}</span>
        {open ? <ChevronUp size={16} color="var(--primary)" style={{ flexShrink: 0 }} /> : <ChevronDown size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
      </button>
      {open && (
        <div style={{ padding: '0 20px 16px', background: 'var(--surface)' }}>
          <div style={{ height: '1px', background: 'var(--border)', marginBottom: '14px' }} />
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.7' }}>{a}</p>
        </div>
      )}
    </div>
  )
}

// ─── MAIN LANDING PAGE ───────────────────────────────────────────────────────

export default function Landing({ onLoginClick }) {
  const navigate = useNavigate()
  const WA_LINK = 'https://wa.me/919876543210?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20joining%20TechieRide.'

  return (
    <div style={{ color: 'var(--text)' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #0d3c55 0%, #14a1af 100%)', padding: '72px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '24px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.9)', fontWeight: '600', letterSpacing: '0.3px' }}>Registered NGO · 1947/2016 · Hyderabad · Since 2014</span>
          </div>

          <h1 style={{ margin: '0 0 18px', fontSize: '50px', fontWeight: '900', color: 'white', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Your daily commute can<br />
            <span style={{ color: '#7de8f0' }}>change lives.</span>
          </h1>
          <p style={{ margin: '0 0 16px', fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, maxWidth: '600px', margin: '0 auto 16px' }}>
            TechieRide is a Hyderabad community that turns daily commutes into carpools — saving money, cutting emissions, and funding welfare drives for schools, blood camps, water distribution and more.
          </p>
          <p style={{ margin: '0 0 36px', fontSize: '14px', color: 'rgba(255,255,255,0.65)', fontWeight: '500' }}>
            Open to everyone in Hyderabad. No prior connection required to enquire.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              style={{ padding: '14px 28px', borderRadius: '10px', background: '#25D366', color: 'white', fontSize: '15px', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '9px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              <MessageCircle size={18} /> Chat with us on WhatsApp
            </a>
            <button onClick={() => navigate('/register')}
              style={{ padding: '14px 28px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '15px', fontWeight: '700', border: '2px solid rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '9px' }}>
              <Users size={17} /> Get Involved <ArrowRight size={15} />
            </button>
          </div>

          {/* Social proof strip */}
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '-6px' }}>
              {['SR', 'AK', 'PM', 'DS', 'RK'].map((a, i) => (
                <div key={a} style={{ width: '32px', height: '32px', borderRadius: '50%', background: `hsl(${190 + i * 20}, 60%, 45%)`, border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', color: 'white', marginLeft: i > 0 ? '-8px' : '0', zIndex: 5 - i }}>
                  {a}
                </div>
              ))}
            </div>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginLeft: '8px' }}>
              <strong style={{ color: 'white' }}>12+ members</strong> actively carpooling & volunteering
            </span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#fbbf24" color="#fbbf24" />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ─────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {[
            { value: '12+', label: 'Trusted Members', sub: 'Personally verified community', icon: '🤝' },
            { value: '6',   label: 'Welfare Drives',  sub: 'Active right now',              icon: '❤️' },
            { value: '900+',label: 'Lives Touched',   sub: 'Through our activities',        icon: '🙌' },
            { value: '10yr', label: 'Years Running',  sub: 'Consistent since 2014',         icon: '🏆' },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: '28px 20px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontSize: '30px', fontWeight: '900', color: 'var(--primary)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', marginTop: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '3px' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS — WHY JOIN ───────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>WHY JOIN</div>
            <h2 style={{ margin: '0 0 12px', fontSize: '36px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px' }}>What you get as a TechieRide member</h2>
            <p style={{ margin: '0 auto', fontSize: '15px', color: 'var(--text-muted)', maxWidth: '520px' }}>More than a carpool. A community that saves you money, builds friendships, and makes a real difference.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '18px' }}>
            {BENEFITS.map(b => (
              <div key={b.title} className="card" style={{ padding: '22px', borderRadius: '15px', display: 'flex', gap: '14px' }}>
                <div style={{ fontSize: '28px', flexShrink: 0, lineHeight: 1 }}>{b.icon}</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', marginBottom: '6px' }}>{b.title}</div>
                  <div style={{ fontSize: '13.5px', color: 'var(--text-2)', lineHeight: 1.65 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL STORIES / IMPACT ────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>REAL IMPACT</div>
            <h2 style={{ margin: '0 0 12px', fontSize: '36px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px' }}>Stories from the ground</h2>
            <p style={{ margin: '0 auto', fontSize: '15px', color: 'var(--text-muted)', maxWidth: '520px' }}>These aren't just numbers — each one is a real event our members showed up for.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '48px' }}>
            {IMPACT_STORIES.map(s => (
              <div key={s.title} className="card" style={{ padding: '22px', borderRadius: '15px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{s.emoji}</div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: s.color, background: s.color + '12', border: `1px solid ${s.color}25`, padding: '3px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>{s.tag}</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', marginBottom: '5px' }}>{s.title}</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/activities')}
              style={{ padding: '12px 26px', borderRadius: '10px', background: 'var(--primary)', color: 'white', fontSize: '14px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={16} /> See All Our Activities
            </button>
            <button onClick={() => navigate('/donate')}
              style={{ padding: '12px 26px', borderRadius: '10px', background: 'transparent', border: '1.5px solid var(--primary)', color: 'var(--primary)', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Fund an Activity <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>MEMBER VOICES</div>
            <h2 style={{ margin: '0 0 12px', fontSize: '36px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px' }}>What our members say</h2>
            <p style={{ margin: '0 auto', fontSize: '15px', color: 'var(--text-muted)', maxWidth: '480px' }}>Don't take our word for it — hear from people already in the community.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card" style={{ padding: '24px', borderRadius: '16px', position: 'relative' }}>
                <Quote size={28} color="var(--primary)" style={{ opacity: 0.15, position: 'absolute', top: '18px', right: '18px' }} />
                <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <p style={{ margin: '0 0 18px', fontSize: '13.5px', color: 'var(--text-2)', lineHeight: 1.7, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="primary-gradient" style={{ width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: 'white', flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)' }}>{t.name}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{t.area}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--primary)', fontWeight: '600' }}>{t.since}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO JOIN ──────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>JOINING PROCESS</div>
          <h2 style={{ margin: '0 0 12px', fontSize: '36px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px' }}>How to become a member</h2>
          <p style={{ margin: '0 auto 48px', fontSize: '15px', color: 'var(--text-muted)', maxWidth: '540px' }}>
            Our reference-only model exists to keep the community safe and trustworthy — not to make it exclusive.
            <strong style={{ color: 'var(--text-2)' }}> If you don't know a member yet, message us and we'll connect you.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '36px' }}>
            {[
              { step: '01', icon: '💬', title: 'Message us on WhatsApp',  desc: 'Not sure who to ask? Chat with us directly. We\'ll introduce you to a member near your area who can refer you.', time: '~1 day' },
              { step: '02', icon: '📋', title: 'Fill the join form',      desc: 'Submit your details, your commute route, and your referrer\'s TR ID. Takes under 3 minutes.', time: '3 minutes' },
              { step: '03', icon: '✅', title: 'Admin approves you',      desc: 'Our admin team verifies your application and referral. You\'ll get a call/WhatsApp confirmation.', time: '2–3 days' },
              { step: '04', icon: '🎉', title: 'Get your TR ID & start',  desc: 'Your unique member ID (e.g. TR1045) is assigned. Log in and start carpooling + joining activities!', time: 'Same day' },
            ].map((h, i) => (
              <div key={h.step} className="card" style={{ padding: '24px', borderRadius: '15px', textAlign: 'left', position: 'relative' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{h.icon}</div>
                <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--primary)', marginBottom: '6px', letterSpacing: '1px' }}>STEP {h.step} · {h.time}</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', marginBottom: '8px' }}>{h.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/919876543210?text=Hi!%20I%27d%20like%20to%20join%20TechieRide." target="_blank" rel="noopener noreferrer"
              style={{ padding: '14px 28px', borderRadius: '10px', background: '#25D366', color: 'white', fontSize: '15px', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '9px', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}>
              <MessageCircle size={18} /> WhatsApp Us to Start
            </a>
            <button onClick={() => navigate('/register')}
              style={{ padding: '14px 28px', borderRadius: '10px', background: 'var(--primary)', color: 'white', fontSize: '15px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '9px' }}>
              <Users size={17} /> Submit Join Form
            </button>
          </div>
          <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
            No commitment required to enquire. We're happy to answer any questions first.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>FAQ</div>
            <h2 style={{ margin: '0 0 10px', fontSize: '36px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px' }}>Frequently asked questions</h2>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-muted)' }}>Everything you need to know before joining.</p>
          </div>
          {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          <div style={{ marginTop: '28px', padding: '20px 24px', borderRadius: '14px', background: 'var(--primary-light)', border: '1.5px solid rgba(20,161,175,0.25)', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <MessageCircle size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', marginBottom: '3px' }}>Still have questions?</div>
              <div style={{ fontSize: '13px', color: 'var(--text-2)' }}>Message us on WhatsApp — we typically reply within an hour.</div>
            </div>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              style={{ padding: '10px 20px', borderRadius: '9px', background: '#25D366', color: 'white', fontSize: '13px', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              <MessageCircle size={14} /> Chat Now
            </a>
          </div>
        </div>
      </section>

      {/* ── DONATE CTA ───────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, #0d3c55, #14a1af)', textAlign: 'center' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <Heart size={40} color="rgba(255,255,255,0.8)" style={{ marginBottom: '18px' }} />
          <h2 style={{ margin: '0 0 14px', fontSize: '34px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>Can't join yet? You can still help.</h2>
          <p style={{ margin: '0 0 16px', fontSize: '16px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>
            Even a donation of ₹100 funds a school visit, contributes to a water camp, or supports a student's education through VidyaNidhi.
          </p>
          <p style={{ margin: '0 0 32px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
            100% of your donation goes to activities. TechieRide has zero overhead costs.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/donate')}
              style={{ padding: '14px 32px', borderRadius: '10px', background: 'white', color: 'var(--primary)', fontSize: '15px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
              <Heart size={17} /> Donate Now <ArrowRight size={15} />
            </button>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              style={{ padding: '14px 28px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '15px', fontWeight: '700', border: '2px solid rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle size={16} /> Ask Before Donating
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
