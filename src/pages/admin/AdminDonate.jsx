import { useState } from 'react'
import { DollarSign, Heart, CheckCircle, TrendingUp, Download } from 'lucide-react'
import { activities, exportCSV } from '../../data/mockData'

const donations = [
  { id: 'D001', name: 'Rajesh Kumar',  amount: 500,  purpose: 'Village Ride', date: '2026-05-28', status: 'confirmed', memberId: 'TR1001' },
  { id: 'D002', name: 'Priya Mehta',   amount: 1000, purpose: 'VidyaNidhi',   date: '2026-05-25', status: 'confirmed', memberId: 'TR1002' },
  { id: 'D003', name: 'Anonymous',     amount: 250,  purpose: 'General Fund', date: '2026-05-22', status: 'confirmed', memberId: null },
  { id: 'D004', name: 'Vikram Singh',  amount: 500,  purpose: 'Free Water Camp', date: '2026-05-20', status: 'confirmed', memberId: 'TR1003' },
  { id: 'D005', name: 'Suresh Babu',   amount: 2500, purpose: 'General Fund', date: '2026-05-15', status: 'confirmed', memberId: 'TR1005' },
  { id: 'D006', name: 'External Donor',amount: 5000, purpose: 'Blood Donations', date: '2026-05-10', status: 'pending',   memberId: null },
]

const activityFunds = activities.map(a => ({
  ...a,
  raised: donations.filter(d => d.purpose === a.title && d.status === 'confirmed').reduce((s, d) => s + d.amount, 0),
  goal: [25000, 15000, 10000, 20000, 18000, 30000][activities.indexOf(a)] || 10000,
}))

export default function AdminDonate() {
  const [filter, setFilter] = useState('all')

  const confirmed = donations.filter(d => d.status === 'confirmed')
  const totalRaised = confirmed.reduce((s, d) => s + d.amount, 0)
  const thisMonth = confirmed.filter(d => d.date.startsWith('2026-05')).reduce((s, d) => s + d.amount, 0)
  const filtered = filter === 'all' ? donations : donations.filter(d => d.status === filter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 3px', fontSize: '22px', fontWeight: '900', color: 'var(--text)' }}>Donations</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>Manage donations for NGO activities and general fund</p>
        </div>
        <button className="btn-outline" onClick={() => exportCSV(donations, 'techieride-donations.csv')}
          style={{ padding: '9px 16px', borderRadius: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        {[
          { label: 'Total Raised', value: `₹${totalRaised.toLocaleString()}`, icon: DollarSign, color: 'var(--primary)' },
          { label: 'This Month',   value: `₹${thisMonth.toLocaleString()}`,   icon: TrendingUp, color: '#15803d' },
          { label: 'Total Donors', value: donations.length,                   icon: Heart,      color: '#b91c1c' },
          { label: 'Pending',      value: donations.filter(d => d.status === 'pending').length, icon: CheckCircle, color: '#b45309' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '16px', borderRadius: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{s.label}</span>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: s.color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.icon size={13} color={s.color} /></div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Activity fund progress */}
      <div className="card" style={{ borderRadius: '16px', padding: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', marginBottom: '16px' }}>Activity Fund Progress</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {activityFunds.map(a => {
            const pct = Math.min(100, Math.round((a.raised / a.goal) * 100))
            return (
              <div key={a.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '7px' }}>{a.icon} {a.title}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>₹{a.raised.toLocaleString()} / ₹{a.goal.toLocaleString()} <strong style={{ color: a.color }}>({pct}%)</strong></span>
                </div>
                <div style={{ height: '7px', borderRadius: '4px', background: 'var(--bg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: a.color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Donations table */}
      <div className="card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)' }}>All Donations</span>
          <div style={{ display: 'flex', gap: '0', background: 'var(--bg)', borderRadius: '9px', padding: '3px', border: '1px solid var(--border)' }}>
            {['all', 'confirmed', 'pending'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '5px 12px', borderRadius: '7px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', border: 'none', background: filter === f ? 'var(--primary)' : 'transparent', color: filter === f ? 'white' : 'var(--text-muted)', textTransform: 'capitalize', transition: 'all 0.15s' }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: '10px 18px 5px', background: 'var(--bg)', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 80px 160px 110px 80px', gap: '0' }}>
          {['Donor', 'Amount', 'Purpose', 'Date', 'Status'].map(h => (
            <div key={h} style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px', paddingBottom: '6px' }}>{h}</div>
          ))}
        </div>
        {filtered.map((d, i) => (
          <div key={d.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 160px 110px 80px', gap: '0', padding: '11px 18px', borderBottom: i < filtered.length - 1 ? '1px solid var(--border-soft)' : 'none', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{d.name}</div>
              {d.memberId && <div style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--primary)', fontWeight: '700' }}>{d.memberId}</div>}
            </div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary)' }}>₹{d.amount.toLocaleString()}</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-2)' }}>{d.purpose}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{d.date}</div>
            <span className={`tag ${d.status === 'confirmed' ? 'tag-green' : 'tag-amber'}`} style={{ fontSize: '10px', textTransform: 'capitalize' }}>{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
