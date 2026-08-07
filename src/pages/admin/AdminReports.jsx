import { useState } from 'react'
import { members, rides, activities, participations } from '../../data/mockData'
import { Download, FileText, Users, Car, Heart, DollarSign, Printer, CheckCircle } from 'lucide-react'

const donations = [
  { id:'D001', name:'Rajesh Kumar',   amount:500,  purpose:'Village Ride',     date:'2026-05-28', status:'confirmed', memberId:'TR1001' },
  { id:'D002', name:'Priya Mehta',    amount:1000, purpose:'VidyaNidhi',        date:'2026-05-25', status:'confirmed', memberId:'TR1002' },
  { id:'D003', name:'Anonymous',      amount:250,  purpose:'General Fund',      date:'2026-05-22', status:'confirmed', memberId:null    },
  { id:'D004', name:'Vikram Singh',   amount:500,  purpose:'Free Water Camp',   date:'2026-05-20', status:'confirmed', memberId:'TR1003' },
  { id:'D005', name:'Suresh Babu',    amount:2500, purpose:'General Fund',      date:'2026-05-15', status:'confirmed', memberId:'TR1005' },
  { id:'D006', name:'External Donor', amount:5000, purpose:'Blood Donations',   date:'2026-05-10', status:'pending',   memberId:null    },
]

function exportCSV(data, filename) {
  if (!data.length) return
  const keys = Object.keys(data[0])
  const rows = data.map(r => keys.map(k => `"${String(r[k] ?? '').replace(/"/g, '""')}"`).join(','))
  const csv = [keys.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click()
}

function ReportCard({ icon: Icon, color, title, description, onExport, onPrint, exportLabel = 'Download CSV', printLabel = 'Print / PDF', count }) {
  const [done, setDone] = useState(false)
  const handleExport = () => { onExport(); setDone(true); setTimeout(() => setDone(false), 2000) }
  return (
    <div className="card" style={{ borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={20} color={color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {title}
            {count !== undefined && <span style={{ padding: '2px 9px', borderRadius: '20px', background: color + '18', color, fontSize: '11px', fontWeight: '700' }}>{count} records</span>}
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{description}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={handleExport}
          style={{ padding: '9px 16px', borderRadius: '10px', background: done ? 'rgba(34,197,94,0.1)' : color + '14', border: `1.5px solid ${done ? 'rgba(34,197,94,0.3)' : color + '40'}`, color: done ? '#15803d' : color, fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
          {done ? <CheckCircle size={13} /> : <Download size={13} />}
          {done ? 'Downloaded!' : exportLabel}
        </button>
        {onPrint && (
          <button onClick={onPrint}
            style={{ padding: '9px 16px', borderRadius: '10px', background: 'var(--bg)', border: '1.5px solid var(--border)', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Printer size={13} /> {printLabel}
          </button>
        )}
      </div>
    </div>
  )
}

export default function AdminReports() {
  const printRideReport = () => {
    const rows = rides.map(r => `
      <tr>
        <td>${r.id}</td><td>${r.riderName}</td>
        <td>${r.origin} → ${r.destination}</td>
        <td>${r.date}</td><td>${r.seatsTotal}</td>
        <td>${r.seatsFilled}</td><td>${r.status}</td>
        <td>${r.seekers?.join(', ') || '—'}</td>
      </tr>`).join('')

    const totalRides   = rides.length
    const openRides    = rides.filter(r => r.status === 'open').length
    const completedRides = rides.filter(r => r.status === 'completed').length
    const totalSeats   = rides.reduce((s, r) => s + r.seatsFilled, 0)
    const co2Saved     = (totalSeats * 2.4).toFixed(1)

    const html = `<!DOCTYPE html><html><head><title>TechieRide – Monthly Ride Report</title>
      <style>
        body{font-family:sans-serif;padding:32px;color:#111}
        h1{color:#14a1af;margin-bottom:4px}
        .meta{color:#666;font-size:13px;margin-bottom:24px}
        .kpis{display:flex;gap:24px;margin-bottom:28px}
        .kpi{background:#f0fafa;border:1.5px solid #14a1af30;border-radius:10px;padding:14px 20px;min-width:100px}
        .kpi-val{font-size:26px;font-weight:900;color:#14a1af}
        .kpi-lbl{font-size:11px;color:#666;margin-top:2px}
        table{width:100%;border-collapse:collapse;font-size:12px}
        th{background:#0d3c55;color:white;padding:8px 10px;text-align:left;font-size:11px}
        td{padding:8px 10px;border-bottom:1px solid #e5e7eb}
        tr:nth-child(even) td{background:#f9fafb}
        .footer{margin-top:32px;font-size:11px;color:#999;border-top:1px solid #e5e7eb;padding-top:12px}
      </style>
    </head><body>
      <h1>TechieRide – Ride Activity Report</h1>
      <div class="meta">Generated: ${new Date().toLocaleString('en-IN')} · Hyderabad, India</div>
      <div class="kpis">
        <div class="kpi"><div class="kpi-val">${totalRides}</div><div class="kpi-lbl">Total Rides</div></div>
        <div class="kpi"><div class="kpi-val">${openRides}</div><div class="kpi-lbl">Open Rides</div></div>
        <div class="kpi"><div class="kpi-val">${completedRides}</div><div class="kpi-lbl">Completed</div></div>
        <div class="kpi"><div class="kpi-val">${totalSeats}</div><div class="kpi-lbl">Seats Filled</div></div>
        <div class="kpi"><div class="kpi-val">${co2Saved} kg</div><div class="kpi-lbl">CO₂ Saved</div></div>
      </div>
      <table>
        <thead><tr><th>Ride ID</th><th>Rider</th><th>Route</th><th>Date</th><th>Total Seats</th><th>Filled</th><th>Status</th><th>Seekers</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="footer">TechieRide NGO · Hyderabad · contact@techieride.in · +91 98765 43210</div>
    </body></html>`

    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
    w.print()
  }

  const printAttendance = (activityId) => {
    const activity = activities.find(a => a.id === activityId)
    if (!activity) return
    const parts = participations.filter(p => p.activityId === activityId)
    const rsvpMembers = activity.rsvps.map(id => members.find(m => m.id === id)).filter(Boolean)

    const rows = rsvpMembers.map(m => {
      const part = parts.find(p => p.memberId === m.id)
      return `<tr>
        <td>${m.id}</td><td>${m.name}</td><td>${m.phone}</td><td>${m.area}</td>
        <td>${part ? part.role : 'RSVP only'}</td>
        <td>${part?.status === 'completed' ? '✓ Attended' : '—'}</td>
        <td></td>
      </tr>`
    }).join('')

    const html = `<!DOCTYPE html><html><head><title>Attendance – ${activity.title}</title>
      <style>
        body{font-family:sans-serif;padding:32px;color:#111}
        h1{color:#14a1af;margin-bottom:4px}
        .meta{color:#666;font-size:13px;margin-bottom:24px}
        table{width:100%;border-collapse:collapse;font-size:12px}
        th{background:#0d3c55;color:white;padding:8px 10px;text-align:left;font-size:11px}
        td{padding:10px 10px;border-bottom:1px solid #e5e7eb;min-height:30px}
        tr:nth-child(even) td{background:#f9fafb}
        .footer{margin-top:32px;font-size:11px;color:#999;border-top:1px solid #e5e7eb;padding-top:12px}
      </style>
    </head><body>
      <h1>${activity.icon} ${activity.title} — Attendance Sheet</h1>
      <div class="meta">Next event: ${activity.nextEvent} · ${activity.participantsNeeded}</div>
      <table>
        <thead><tr><th>TR ID</th><th>Name</th><th>Phone</th><th>Area</th><th>Role</th><th>Attended</th><th>Sign</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="footer">TechieRide NGO · Hyderabad · ${rsvpMembers.length} RSVP'd</div>
    </body></html>`

    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
    w.print()
  }

  const [selectedActivity, setSelectedActivity] = useState(activities[0]?.id || '')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '900', color: 'var(--text)' }}>Reports & Exports</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>Download or print structured reports for all NGO operations</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Member CSV */}
        <ReportCard
          icon={Users} color="var(--primary)" title="Member List"
          description="All members with TR ID, name, role, area, join date, ride count, activity participation, and referral chain."
          count={members.length}
          onExport={() => exportCSV(members.map(m => ({
            'TR ID': m.id, Name: m.name, Phone: m.phone, Email: m.email, Area: m.area,
            Status: m.status, Rider: m.isRider ? 'Yes' : 'No', Seeker: m.isSeekerActive ? 'Yes' : 'No',
            'Referred By': m.referredBy, 'Join Date': m.joinDate, Moderator: m.isModerator ? 'Yes' : 'No',
            'Activities Joined': m.activitiesJoined?.length || 0,
            Vehicle: m.vehicle ? `${m.vehicle.make} (${m.vehicle.reg})` : 'None',
            Notes: m.notes || '',
          })), 'techieride-members.csv')}
          exportLabel="Download Member CSV"
        />

        {/* Ride Report */}
        <ReportCard
          icon={Car} color="#0369a1" title="Monthly Ride Report"
          description="All rides with routes, riders, seekers, seat fill rate, and CO₂ saved calculation. Opens a print-ready PDF."
          count={rides.length}
          onExport={() => exportCSV(rides.map(r => ({
            'Ride ID': r.id, Rider: r.riderName, Phone: r.riderPhone, Origin: r.origin,
            Destination: r.destination, Route: r.route, Date: r.date, Time: r.time,
            'Total Seats': r.seatsTotal, 'Seats Filled': r.seatsFilled, Status: r.status,
            Recurring: r.recurring ? 'Yes' : 'No', Notes: r.notes || '',
          })), 'techieride-rides.csv')}
          onPrint={printRideReport}
          exportLabel="Download Rides CSV"
          printLabel="Print Ride Report PDF"
        />

        {/* Activity Attendance */}
        <div className="card" style={{ borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#15803d18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Heart size={20} color="#15803d" />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', marginBottom: '4px' }}>Activity Attendance Sheet</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Per-activity sheet with RSVP list, roles, and attendance sign-off column. Printable for field use.</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select value={selectedActivity} onChange={e => setSelectedActivity(e.target.value)}
              style={{ padding: '9px 13px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '13px', cursor: 'pointer', flex: 1, minWidth: '200px' }}>
              {activities.map(a => (
                <option key={a.id} value={a.id}>{a.icon} {a.title} ({a.rsvps.length} RSVPs)</option>
              ))}
            </select>
            <button onClick={() => exportCSV(
              (activities.find(a => a.id === selectedActivity)?.rsvps || []).map(id => {
                const m = members.find(m => m.id === id)
                const p = participations.find(p => p.memberId === id && p.activityId === selectedActivity)
                return { 'TR ID': id, Name: m?.name || '', Phone: m?.phone || '', Area: m?.area || '', Role: p?.role || 'RSVP', Status: p?.status || 'pending', Note: p?.note || '' }
              }),
              `attendance-${selectedActivity}.csv`
            )} style={{ padding: '9px 16px', borderRadius: '10px', background: '#15803d18', border: '1.5px solid #15803d40', color: '#15803d', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={13} /> CSV
            </button>
            <button onClick={() => printAttendance(selectedActivity)}
              style={{ padding: '9px 16px', borderRadius: '10px', background: 'var(--bg)', border: '1.5px solid var(--border)', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Printer size={13} /> Print Sheet
            </button>
          </div>
        </div>

        {/* Donations CSV */}
        <ReportCard
          icon={DollarSign} color="#b45309" title="Donations Ledger"
          description="Full donation history with donor name, TR ID, amount, purpose, date, and status. For treasurer records."
          count={donations.length}
          onExport={() => exportCSV(donations.map(d => ({
            'Donation ID': d.id, Donor: d.name, 'TR ID': d.memberId || 'External',
            Amount: `₹${d.amount}`, Purpose: d.purpose, Date: d.date, Status: d.status,
          })), 'techieride-donations.csv')}
          exportLabel="Download Donations CSV"
        />

      </div>

      {/* Summary */}
      <div className="card" style={{ borderRadius: '14px', padding: '18px 20px', display: 'flex', gap: '24px', flexWrap: 'wrap', background: 'var(--primary-light)', border: '1.5px solid rgba(20,161,175,0.2)' }}>
        {[
          ['Total Members', members.length],
          ['Total Rides', rides.length],
          ['Total Activities', activities.length],
          ['Total Donations', `₹${donations.reduce((s,d)=>d.status==='confirmed'?s+d.amount:s,0).toLocaleString()}`],
        ].map(([label, val]) => (
          <div key={label}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>{label}</div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary)' }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
