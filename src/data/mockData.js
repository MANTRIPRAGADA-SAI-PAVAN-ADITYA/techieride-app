export const members = [
  { id: 'TR1001', name: 'Rajesh Kumar',    phone: '+91 98765 43210', email: 'rajesh@gmail.com',  area: 'Kondapur',       referredBy: 'TR0001', joinDate: '2024-01-15', status: 'active',   isRider: true,  isSeekerActive: false, vehicle: { make: 'Maruti Swift Dzire', reg: 'TS 09 AB 1234', color: 'White',  seats: 3 } },
  { id: 'TR1002', name: 'Priya Mehta',     phone: '+91 87654 32109', email: 'priya@gmail.com',   area: 'Madhapur',       referredBy: 'TR1001', joinDate: '2024-02-20', status: 'active',   isRider: false, isSeekerActive: true,  vehicle: null },
  { id: 'TR1003', name: 'Vikram Singh',    phone: '+91 76543 21098', email: 'vikram@gmail.com',  area: 'Gachibowli',     referredBy: 'TR1001', joinDate: '2024-03-10', status: 'active',   isRider: true,  isSeekerActive: true,  vehicle: { make: 'Honda City', reg: 'TS 10 CD 5678', color: 'Silver', seats: 3 } },
  { id: 'TR1004', name: 'Anita Reddy',     phone: '+91 65432 10987', email: 'anita@gmail.com',   area: 'Hitech City',    referredBy: 'TR1002', joinDate: '2024-03-22', status: 'active',   isRider: false, isSeekerActive: true,  vehicle: null },
  { id: 'TR1005', name: 'Suresh Babu',     phone: '+91 54321 09876', email: 'suresh@gmail.com',  area: 'Ameerpet',       referredBy: 'TR1003', joinDate: '2024-04-05', status: 'active',   isRider: true,  isSeekerActive: false, vehicle: { make: 'Hyundai Creta', reg: 'TS 08 EF 9012', color: 'Grey',   seats: 4 } },
  { id: 'TR1006', name: 'Deepika Sharma',  phone: '+91 43210 98765', email: 'deepika@gmail.com', area: 'Secunderabad',   referredBy: 'TR1001', joinDate: '2024-04-18', status: 'active',   isRider: false, isSeekerActive: true,  vehicle: null },
  { id: 'TR1007', name: 'Arjun Nair',      phone: '+91 32109 87654', email: 'arjun@gmail.com',   area: 'KPHB',           referredBy: 'TR1005', joinDate: '2024-05-01', status: 'active',   isRider: true,  isSeekerActive: true,  vehicle: { make: 'Tata Nexon', reg: 'TS 07 GH 3456', color: 'Blue',   seats: 3 } },
  { id: 'TR1008', name: 'Meena Kumari',    phone: '+91 21098 76543', email: 'meena@gmail.com',   area: 'Kukatpally',     referredBy: 'TR1006', joinDate: '2024-05-14', status: 'inactive', isRider: false, isSeekerActive: false, vehicle: null },
  { id: 'TR1009', name: 'Rohit Verma',     phone: '+91 10987 65432', email: 'rohit@gmail.com',   area: 'LB Nagar',       referredBy: 'TR1007', joinDate: '2024-06-03', status: 'active',   isRider: true,  isSeekerActive: false, vehicle: { make: 'Kia Seltos', reg: 'TS 11 IJ 7890', color: 'Red',    seats: 4 } },
  { id: 'TR1010', name: 'Kavita Rao',      phone: '+91 90876 54321', email: 'kavita@gmail.com',  area: 'Uppal',          referredBy: 'TR1003', joinDate: '2024-06-20', status: 'active',   isRider: false, isSeekerActive: true,  vehicle: null },
  { id: 'TR1011', name: 'Sanjay Gupta',    phone: '+91 89765 43210', email: 'sanjay@gmail.com',  area: 'Banjara Hills',  referredBy: 'TR1009', joinDate: '2024-07-08', status: 'active',   isRider: true,  isSeekerActive: false, vehicle: { make: 'MG Hector', reg: 'TS 06 KL 1234', color: 'White',  seats: 4 } },
  { id: 'TR1012', name: 'Lavanya Iyer',    phone: '+91 78654 32109', email: 'lavanya@gmail.com', area: 'Jubilee Hills',  referredBy: 'TR1010', joinDate: '2024-07-25', status: 'active',   isRider: false, isSeekerActive: true,  vehicle: null },
]

export const rides = [
  {
    id: 'R001', riderId: 'TR1001', riderName: 'Rajesh Kumar', riderPhone: '+91 98765 43210',
    vehicle: 'Maruti Swift Dzire (White) • TS 09 AB 1234',
    origin: 'Kondapur', destination: 'Secunderabad',
    route: 'Kondapur - Madhapur - Hitech City - Ameerpet - Secunderabad',
    date: '2026-05-30', time: '09:00', seatsTotal: 3, seatsFilled: 1,
    notes: 'AC on, no smoking, music allowed', status: 'open',
    seekers: ['TR1002'],
  },
  {
    id: 'R002', riderId: 'TR1003', riderName: 'Vikram Singh', riderPhone: '+91 76543 21098',
    vehicle: 'Honda City (Silver) • TS 10 CD 5678',
    origin: 'Gachibowli', destination: 'LB Nagar',
    route: 'Gachibowli - Botanical Garden - Tolichowki - Mehdipatnam - Attapur - LB Nagar',
    date: '2026-05-30', time: '08:30', seatsTotal: 3, seatsFilled: 2,
    notes: 'Comfortable ride, punctual pickup', status: 'open',
    seekers: ['TR1004', 'TR1010'],
  },
  {
    id: 'R003', riderId: 'TR1005', riderName: 'Suresh Babu', riderPhone: '+91 54321 09876',
    vehicle: 'Hyundai Creta (Grey) • TS 08 EF 9012',
    origin: 'Ameerpet', destination: 'Uppal',
    route: 'Ameerpet - SR Nagar - Balkampet - Nagole - Uppal',
    date: '2026-05-31', time: '09:15', seatsTotal: 4, seatsFilled: 1,
    notes: 'Early morning ride, prefer quiet commute', status: 'open',
    seekers: ['TR1006'],
  },
  {
    id: 'R004', riderId: 'TR1007', riderName: 'Arjun Nair', riderPhone: '+91 32109 87654',
    vehicle: 'Tata Nexon (Blue) • TS 07 GH 3456',
    origin: 'KPHB', destination: 'Hitech City',
    route: 'KPHB - Kukatpally - Balanagar - Miyapur - Hitech City',
    date: '2026-05-30', time: '08:00', seatsTotal: 3, seatsFilled: 0,
    notes: 'Flexible on pickup time ±10 mins', status: 'open',
    seekers: [],
  },
  {
    id: 'R005', riderId: 'TR1009', riderName: 'Rohit Verma', riderPhone: '+91 10987 65432',
    vehicle: 'Kia Seltos (Red) • TS 11 IJ 7890',
    origin: 'LB Nagar', destination: 'Gachibowli',
    route: 'LB Nagar - Dilsukhnagar - Koti - Nampally - Lakdikapul - Gachibowli',
    date: '2026-05-31', time: '10:00', seatsTotal: 4, seatsFilled: 2,
    notes: 'Will coordinate pickup points on WhatsApp', status: 'open',
    seekers: ['TR1002', 'TR1012'],
  },
]

export const activities = [
  {
    id: 'A001', title: 'Free Rides for Blood Donors', category: 'Healthcare',
    icon: '🩸', color: '#f87171', bg: 'rgba(248,113,113,0.08)',
    desc: 'TechieRide volunteers offer free carpools to members attending blood donation camps across Hyderabad. Over 120 donors facilitated in 2024.',
    date: 'Ongoing', status: 'active', impact: '120+ donors helped',
  },
  {
    id: 'A002', title: 'School Run Initiative', category: 'Education',
    icon: '📚', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)',
    desc: 'Safe carpools provided for children in underprivileged areas to reach school daily. Running in partnership with 3 NGOs in Hyderabad.',
    date: 'Every Weekday', status: 'active', impact: '45 children daily',
  },
  {
    id: 'A003', title: 'Green Pledge Drive', category: 'Environment',
    icon: '🌱', color: '#4ade80', bg: 'rgba(74,222,128,0.08)',
    desc: 'Members pledge to carpool at least 3 days a week. Track your CO₂ savings and compete on our green leaderboard.',
    date: 'May–Jun 2026', status: 'active', impact: '2.1 tons CO₂ saved',
  },
  {
    id: 'A004', title: 'Senior Citizen Hospital Rides', category: 'Healthcare',
    icon: '🏥', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)',
    desc: 'Connecting elderly residents with volunteer drivers for hospital visits and medical appointments. No charges, pure community service.',
    date: 'Weekends', status: 'active', impact: '60+ seniors assisted',
  },
  {
    id: 'A005', title: 'Women Safety Carpool Network', category: 'Safety',
    icon: '🛡️', color: '#fb923c', bg: 'rgba(251,146,60,0.08)',
    desc: 'Verified female-only carpool network for women travelling late night shifts or early morning commutes in Hyderabad.',
    date: 'Year-round', status: 'active', impact: '200+ women served',
  },
  {
    id: 'A006', title: 'Flood Relief Logistics (2024)', category: 'Disaster Relief',
    icon: '🚨', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',
    desc: 'During Hyderabad floods, TechieRide members coordinated 80+ volunteer vehicles to deliver relief supplies to affected areas.',
    date: 'Oct 2024', status: 'completed', impact: '80 vehicles, 500+ families',
  },
]

export const announcements = [
  { id: 1, title: 'New Members: Please Complete Your Profile', body: 'All new members who joined in May 2026 must update their area and contact details.', date: '2026-05-25', pinned: true },
  { id: 2, title: 'Carpooling Route: Gachibowli ↔ Secunderabad Now Active', body: 'We now have regular riders on the Gachibowli–Secunderabad corridor. Seekers please check the Carpooling page.', date: '2026-05-20', pinned: false },
  { id: 3, title: 'Green Pledge Drive — Join Now', body: 'Sign up for our May–June Green Pledge Drive and earn a certificate from TechieRide NGO.', date: '2026-05-10', pinned: false },
]

export const generateTRId = (allIds) => {
  const nums = allIds.map(id => parseInt(id.replace('TR', ''))).filter(n => !isNaN(n))
  const next = Math.max(...nums) + 1
  return `TR${String(next).padStart(4, '0')}`
}
