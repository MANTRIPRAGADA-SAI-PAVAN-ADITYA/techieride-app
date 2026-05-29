export const members = [
  { id: 'TR1001', name: 'Rajesh Kumar',   phone: '+91 98765 43210', email: 'rajesh@gmail.com',  area: 'Kondapur',      referredBy: 'TR0001', joinDate: '2024-01-15', status: 'active',   isRider: true,  isSeekerActive: false, vehicle: { make: 'Maruti Swift Dzire', reg: 'TS 09 AB 1234', color: 'White',  seats: 3 } },
  { id: 'TR1002', name: 'Priya Mehta',    phone: '+91 87654 32109', email: 'priya@gmail.com',   area: 'Madhapur',      referredBy: 'TR1001', joinDate: '2024-02-20', status: 'active',   isRider: false, isSeekerActive: true,  vehicle: null },
  { id: 'TR1003', name: 'Vikram Singh',   phone: '+91 76543 21098', email: 'vikram@gmail.com',  area: 'Gachibowli',    referredBy: 'TR1001', joinDate: '2024-03-10', status: 'active',   isRider: true,  isSeekerActive: true,  vehicle: { make: 'Honda City', reg: 'TS 10 CD 5678', color: 'Silver', seats: 3 } },
  { id: 'TR1004', name: 'Anita Reddy',    phone: '+91 65432 10987', email: 'anita@gmail.com',   area: 'Hitech City',   referredBy: 'TR1002', joinDate: '2024-03-22', status: 'active',   isRider: false, isSeekerActive: true,  vehicle: null },
  { id: 'TR1005', name: 'Suresh Babu',    phone: '+91 54321 09876', email: 'suresh@gmail.com',  area: 'Ameerpet',      referredBy: 'TR1003', joinDate: '2024-04-05', status: 'active',   isRider: true,  isSeekerActive: false, vehicle: { make: 'Hyundai Creta', reg: 'TS 08 EF 9012', color: 'Grey',   seats: 4 } },
  { id: 'TR1006', name: 'Deepika Sharma', phone: '+91 43210 98765', email: 'deepika@gmail.com', area: 'Secunderabad',  referredBy: 'TR1001', joinDate: '2024-04-18', status: 'active',   isRider: false, isSeekerActive: true,  vehicle: null },
  { id: 'TR1007', name: 'Arjun Nair',     phone: '+91 32109 87654', email: 'arjun@gmail.com',   area: 'KPHB',          referredBy: 'TR1005', joinDate: '2024-05-01', status: 'active',   isRider: true,  isSeekerActive: true,  vehicle: { make: 'Tata Nexon', reg: 'TS 07 GH 3456', color: 'Blue',   seats: 3 } },
  { id: 'TR1008', name: 'Meena Kumari',   phone: '+91 21098 76543', email: 'meena@gmail.com',   area: 'Kukatpally',    referredBy: 'TR1006', joinDate: '2024-05-14', status: 'inactive', isRider: false, isSeekerActive: false, vehicle: null },
  { id: 'TR1009', name: 'Rohit Verma',    phone: '+91 10987 65432', email: 'rohit@gmail.com',   area: 'LB Nagar',      referredBy: 'TR1007', joinDate: '2024-06-03', status: 'active',   isRider: true,  isSeekerActive: false, vehicle: { make: 'Kia Seltos', reg: 'TS 11 IJ 7890', color: 'Red',    seats: 4 } },
  { id: 'TR1010', name: 'Kavita Rao',     phone: '+91 90876 54321', email: 'kavita@gmail.com',  area: 'Uppal',         referredBy: 'TR1003', joinDate: '2024-06-20', status: 'active',   isRider: false, isSeekerActive: true,  vehicle: null },
  { id: 'TR1011', name: 'Sanjay Gupta',   phone: '+91 89765 43210', email: 'sanjay@gmail.com',  area: 'Banjara Hills', referredBy: 'TR1009', joinDate: '2024-07-08', status: 'active',   isRider: true,  isSeekerActive: false, vehicle: { make: 'MG Hector', reg: 'TS 06 KL 1234', color: 'White',  seats: 4 } },
  { id: 'TR1012', name: 'Lavanya Iyer',   phone: '+91 78654 32109', email: 'lavanya@gmail.com', area: 'Jubilee Hills', referredBy: 'TR1010', joinDate: '2024-07-25', status: 'active',   isRider: false, isSeekerActive: true,  vehicle: null },
]

export const rides = [
  { id: 'R001', riderId: 'TR1001', riderName: 'Rajesh Kumar', riderPhone: '+91 98765 43210', vehicle: 'Maruti Swift Dzire (White) • TS 09 AB 1234', origin: 'Kondapur', destination: 'Secunderabad', route: 'Kondapur - Madhapur - Hitech City - Ameerpet - Secunderabad', date: '2026-05-30', time: '09:00', seatsTotal: 3, seatsFilled: 1, notes: 'AC on, no smoking, music allowed', status: 'open', seekers: ['TR1002'] },
  { id: 'R002', riderId: 'TR1003', riderName: 'Vikram Singh',  riderPhone: '+91 76543 21098', vehicle: 'Honda City (Silver) • TS 10 CD 5678',         origin: 'Gachibowli', destination: 'LB Nagar',      route: 'Gachibowli - Botanical Garden - Tolichowki - Mehdipatnam - Attapur - LB Nagar', date: '2026-05-30', time: '08:30', seatsTotal: 3, seatsFilled: 2, notes: 'Comfortable ride, punctual pickup', status: 'open', seekers: ['TR1004', 'TR1010'] },
  { id: 'R003', riderId: 'TR1005', riderName: 'Suresh Babu',   riderPhone: '+91 54321 09876', vehicle: 'Hyundai Creta (Grey) • TS 08 EF 9012',        origin: 'Ameerpet',   destination: 'Uppal',        route: 'Ameerpet - SR Nagar - Balkampet - Nagole - Uppal', date: '2026-05-31', time: '09:15', seatsTotal: 4, seatsFilled: 1, notes: 'Early morning, prefer quiet commute', status: 'open', seekers: ['TR1006'] },
  { id: 'R004', riderId: 'TR1007', riderName: 'Arjun Nair',    riderPhone: '+91 32109 87654', vehicle: 'Tata Nexon (Blue) • TS 07 GH 3456',           origin: 'KPHB',       destination: 'Hitech City',  route: 'KPHB - Kukatpally - Balanagar - Miyapur - Hitech City', date: '2026-05-30', time: '08:00', seatsTotal: 3, seatsFilled: 0, notes: 'Flexible pickup time ±10 mins', status: 'open', seekers: [] },
  { id: 'R005', riderId: 'TR1009', riderName: 'Rohit Verma',   riderPhone: '+91 10987 65432', vehicle: 'Kia Seltos (Red) • TS 11 IJ 7890',            origin: 'LB Nagar',   destination: 'Gachibowli',   route: 'LB Nagar - Dilsukhnagar - Koti - Nampally - Lakdikapul - Gachibowli', date: '2026-05-31', time: '10:00', seatsTotal: 4, seatsFilled: 2, notes: 'Will coordinate pickup on WhatsApp', status: 'open', seekers: ['TR1002', 'TR1012'] },
]

// Real activities from techieride.in/our-activities/
export const activities = [
  {
    id: 'A001', title: 'Village Ride', category: 'Education',
    icon: '🏫', color: '#0d7a86', bg: 'rgba(20,161,175,0.08)',
    desc: 'Drive to support selected Government schools — Career Guidance, Personality Development, and donating required school lab and sports equipment.',
    date: 'Ongoing', status: 'active', impact: '12 schools supported',
    participantsNeeded: 'Drivers + Volunteers',
  },
  {
    id: 'A002', title: 'Prakruthi', category: 'Environment',
    icon: '🌿', color: '#15803d', bg: 'rgba(34,197,94,0.08)',
    desc: 'Awareness camps on No Polythene usage, Water Harvesting, Plantation, Home Gardening and Organic Gardening across Hyderabad.',
    date: 'Monthly', status: 'active', impact: '500+ participants',
    participantsNeeded: 'All members welcome',
  },
  {
    id: 'A003', title: 'Blood Donations', category: 'Healthcare',
    icon: '🩸', color: '#b91c1c', bg: 'rgba(239,68,68,0.08)',
    desc: 'Organising blood donation drives on need basis. TechieRide members provide free carpools to donation camps for all volunteers.',
    date: 'On need basis', status: 'active', impact: '120+ units donated',
    participantsNeeded: 'Donors + Drivers',
  },
  {
    id: 'A004', title: 'Tribal Support', category: 'Community',
    icon: '🤝', color: '#b45309', bg: 'rgba(245,158,11,0.08)',
    desc: 'Supporting Tribes of Palvancha with help of local doctors — providing basic needs including staples, clothes and medicines.',
    date: 'Quarterly', status: 'active', impact: '3 tribal villages',
    participantsNeeded: 'Volunteers + Donors',
  },
  {
    id: 'A005', title: 'Free Water Camp', category: 'Community',
    icon: '💧', color: '#0369a1', bg: 'rgba(14,165,233,0.08)',
    desc: 'Summer water camps running 70+ days, supplying mineral water and healthy buttermilk — serving nearly 2,000–3,000 litres daily.',
    date: 'Every Summer', status: 'active', impact: '3k litres/day',
    participantsNeeded: 'Volunteers',
  },
  {
    id: 'A006', title: 'VidyaNidhi', category: 'Education',
    icon: '🎓', color: '#6d28d9', bg: 'rgba(139,92,246,0.08)',
    desc: 'Supporting Higher Education for Talented Individuals from Financially Challenged Backgrounds through funding and mentorship.',
    date: 'Year-round', status: 'active', impact: '18 students funded',
    participantsNeeded: 'Mentors + Donors',
  },
]

export const announcements = [
  { id: 1, title: 'New Members: Please Complete Your Profile', body: 'All members who joined in May 2026 must update their area and contact details in the app.', date: '2026-05-25', pinned: true },
  { id: 2, title: 'Village Ride — Govt School Drive This Sunday', body: 'We are visiting Saraswathi Govt School, Medchal on 1st June. Volunteer drivers needed. Contact TR1001.', date: '2026-05-22', pinned: false },
  { id: 3, title: 'Free Water Camp Starting June 1st', body: 'Our annual summer water camp kicks off at Ameerpet Metro. Morning shift 7–10 AM. All welcome!', date: '2026-05-20', pinned: false },
  { id: 4, title: 'Carpooling Route: Gachibowli ↔ Secunderabad Active', body: 'Regular riders now available on this corridor. Seekers check the Carpooling tab.', date: '2026-05-18', pinned: false },
]

// Member participations in activities
export const participations = [
  { id: 'P001', memberId: 'TR1001', activityId: 'A003', activityTitle: 'Blood Donation Drive', role: 'Driver + Donor', date: '2026-04-15', status: 'completed', note: 'Drove 3 volunteers to camp' },
  { id: 'P002', memberId: 'TR1001', activityId: 'A001', activityTitle: 'Village Ride – Medchal School', role: 'Driver', date: '2026-03-22', status: 'completed', note: 'Carried sports equipment' },
  { id: 'P003', memberId: 'TR1001', activityId: 'A002', activityTitle: 'Prakruthi – Plantation Drive', role: 'Volunteer', date: '2026-02-10', status: 'completed', note: 'Planted 15 saplings at KPHB' },
  { id: 'P004', memberId: 'TR1001', activityId: 'A001', activityTitle: 'Village Ride – Medchal School', role: 'Driver', date: '2026-06-01', status: 'upcoming', note: 'Saraswathi Govt School visit' },
]

export const generateTRId = (allIds) => {
  const nums = allIds.map(id => parseInt(id.replace('TR', ''))).filter(n => !isNaN(n))
  const next = Math.max(...nums) + 1
  return `TR${String(next).padStart(4, '0')}`
}
