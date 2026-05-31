// ─── MEMBERS ────────────────────────────────────────────────────────────────
export const members = [
  { id:'TR1001', name:'Rajesh Kumar',   phone:'+91 98765 43210', email:'rajesh@gmail.com',  area:'Kondapur',      referredBy:'TR0001', joinDate:'2024-01-15', status:'active',   isRider:true,  isSeekerActive:false, vehicle:{ make:'Maruti Swift Dzire', reg:'TS 09 AB 1234', color:'White',  seats:3 }, activitiesJoined:['A001','A002','A003'], notes:'' },
  { id:'TR1002', name:'Priya Mehta',    phone:'+91 87654 32109', email:'priya@gmail.com',   area:'Madhapur',      referredBy:'TR1001', joinDate:'2024-02-20', status:'active',   isRider:false, isSeekerActive:true,  vehicle:null, activitiesJoined:['A003','A006'], notes:'' },
  { id:'TR1003', name:'Vikram Singh',   phone:'+91 76543 21098', email:'vikram@gmail.com',  area:'Gachibowli',    referredBy:'TR1001', joinDate:'2024-03-10', status:'active',   isRider:true,  isSeekerActive:true,  vehicle:{ make:'Honda City',         reg:'TS 10 CD 5678', color:'Silver', seats:3 }, activitiesJoined:['A001','A004','A005'], notes:'' },
  { id:'TR1004', name:'Anita Reddy',    phone:'+91 65432 10987', email:'anita@gmail.com',   area:'Hitech City',   referredBy:'TR1002', joinDate:'2024-03-22', status:'active',   isRider:false, isSeekerActive:true,  vehicle:null, activitiesJoined:['A002','A006'], notes:'' },
  { id:'TR1005', name:'Suresh Babu',    phone:'+91 54321 09876', email:'suresh@gmail.com',  area:'Ameerpet',      referredBy:'TR1003', joinDate:'2024-04-05', status:'active',   isRider:true,  isSeekerActive:false, vehicle:{ make:'Hyundai Creta',       reg:'TS 08 EF 9012', color:'Grey',   seats:4 }, activitiesJoined:['A003','A004','A005'], notes:'' },
  { id:'TR1006', name:'Deepika Sharma', phone:'+91 43210 98765', email:'deepika@gmail.com', area:'Secunderabad',  referredBy:'TR1001', joinDate:'2024-04-18', status:'active',   isRider:false, isSeekerActive:true,  vehicle:null, activitiesJoined:['A001','A002'], notes:'' },
  { id:'TR1007', name:'Arjun Nair',     phone:'+91 32109 87654', email:'arjun@gmail.com',   area:'KPHB',          referredBy:'TR1005', joinDate:'2024-05-01', status:'active',   isRider:true,  isSeekerActive:true,  vehicle:{ make:'Tata Nexon',          reg:'TS 07 GH 3456', color:'Blue',   seats:3 }, activitiesJoined:['A002','A003'], notes:'' },
  { id:'TR1008', name:'Meena Kumari',   phone:'+91 21098 76543', email:'meena@gmail.com',   area:'Kukatpally',    referredBy:'TR1006', joinDate:'2024-05-14', status:'inactive', isRider:false, isSeekerActive:false, vehicle:null, activitiesJoined:[], notes:'Moved out of Hyderabad' },
  { id:'TR1009', name:'Rohit Verma',    phone:'+91 10987 65432', email:'rohit@gmail.com',   area:'LB Nagar',      referredBy:'TR1007', joinDate:'2024-06-03', status:'active',   isRider:true,  isSeekerActive:false, vehicle:{ make:'Kia Seltos',          reg:'TS 11 IJ 7890', color:'Red',    seats:4 }, activitiesJoined:['A004','A005','A006'], notes:'' },
  { id:'TR1010', name:'Kavita Rao',     phone:'+91 90876 54321', email:'kavita@gmail.com',  area:'Uppal',         referredBy:'TR1003', joinDate:'2024-06-20', status:'active',   isRider:false, isSeekerActive:true,  vehicle:null, activitiesJoined:['A001','A003'], notes:'' },
  { id:'TR1011', name:'Sanjay Gupta',   phone:'+91 89765 43210', email:'sanjay@gmail.com',  area:'Banjara Hills', referredBy:'TR1009', joinDate:'2024-07-08', status:'active',   isRider:true,  isSeekerActive:false, vehicle:{ make:'MG Hector',           reg:'TS 06 KL 1234', color:'White',  seats:4 }, activitiesJoined:['A002','A005'], notes:'' },
  { id:'TR1012', name:'Lavanya Iyer',   phone:'+91 78654 32109', email:'lavanya@gmail.com', area:'Jubilee Hills', referredBy:'TR1010', joinDate:'2024-07-25', status:'active',   isRider:false, isSeekerActive:true,  vehicle:null, activitiesJoined:['A006'], notes:'' },
]

// ─── PENDING MEMBER REQUESTS ─────────────────────────────────────────────────
export const pendingRequests = [
  { id:'REQ001', name:'Nikhil Sharma',  phone:'+91 99001 22334', email:'nikhil@gmail.com',  area:'Madhapur',     referredBy:'TR1001', referrerName:'Rajesh Kumar',  requestDate:'2026-05-28', wantsToBeRider:true,  vehicle:{ make:'Maruti Baleno', reg:'TS 09 XY 7788', color:'Silver', seats:3 } },
  { id:'REQ002', name:'Swetha Patel',   phone:'+91 88112 33445', email:'swetha@gmail.com',  area:'Kondapur',     referredBy:'TR1003', referrerName:'Vikram Singh',  requestDate:'2026-05-27', wantsToBeRider:false, vehicle:null },
  { id:'REQ003', name:'Kiran Babu',     phone:'+91 77223 44556', email:'kiran@gmail.com',   area:'Gachibowli',   referredBy:'TR1005', referrerName:'Suresh Babu',   requestDate:'2026-05-26', wantsToBeRider:true,  vehicle:{ make:'Toyota Fortuner', reg:'TS 08 ZA 1122', color:'Black',  seats:5 } },
  { id:'REQ004', name:'Divya Krishnan', phone:'+91 66334 55667', email:'divya@gmail.com',   area:'Kukatpally',   referredBy:'TR1007', referrerName:'Arjun Nair',    requestDate:'2026-05-25', wantsToBeRider:false, vehicle:null },
]

// ─── RIDES ───────────────────────────────────────────────────────────────────
export const rides = [
  { id:'R001', riderId:'TR1001', riderName:'Rajesh Kumar',  riderPhone:'+91 98765 43210', vehicle:'Maruti Swift Dzire (White) • TS 09 AB 1234', origin:'Kondapur',   destination:'Secunderabad',route:'Kondapur - Madhapur - Hitech City - Ameerpet - Secunderabad',              date:'2026-06-01', time:'09:00', seatsTotal:3, seatsFilled:1, notes:'AC on, no smoking',           status:'open',   seekers:['TR1002'],        recurring:false, recurrDays:[] },
  { id:'R002', riderId:'TR1003', riderName:'Vikram Singh',  riderPhone:'+91 76543 21098', vehicle:'Honda City (Silver) • TS 10 CD 5678',         origin:'Gachibowli', destination:'LB Nagar',     route:'Gachibowli - Botanical Garden - Tolichowki - Mehdipatnam - Attapur - LB Nagar', date:'2026-06-01', time:'08:30', seatsTotal:3, seatsFilled:2, notes:'Punctual pickup',             status:'open',   seekers:['TR1004','TR1010'], recurring:false, recurrDays:[] },
  { id:'R003', riderId:'TR1005', riderName:'Suresh Babu',   riderPhone:'+91 54321 09876', vehicle:'Hyundai Creta (Grey) • TS 08 EF 9012',        origin:'Ameerpet',   destination:'Uppal',        route:'Ameerpet - SR Nagar - Balkampet - Nagole - Uppal',                          date:'2026-06-02', time:'09:15', seatsTotal:4, seatsFilled:1, notes:'Early morning, quiet ride',   status:'open',   seekers:['TR1006'],        recurring:false, recurrDays:[] },
  { id:'R004', riderId:'TR1007', riderName:'Arjun Nair',    riderPhone:'+91 32109 87654', vehicle:'Tata Nexon (Blue) • TS 07 GH 3456',           origin:'KPHB',       destination:'Hitech City',  route:'KPHB - Kukatpally - Balanagar - Miyapur - Hitech City',                     date:'2026-06-01', time:'08:00', seatsTotal:3, seatsFilled:0, notes:'Flexible ±10 mins',           status:'open',   seekers:[],                recurring:false, recurrDays:[] },
  { id:'R005', riderId:'TR1009', riderName:'Rohit Verma',   riderPhone:'+91 10987 65432', vehicle:'Kia Seltos (Red) • TS 11 IJ 7890',            origin:'LB Nagar',   destination:'Gachibowli',   route:'LB Nagar - Dilsukhnagar - Koti - Nampally - Lakdikapul - Gachibowli',       date:'2026-06-02', time:'10:00', seatsTotal:4, seatsFilled:2, notes:'WhatsApp coordinate pickup',  status:'open',   seekers:['TR1002','TR1012'], recurring:false, recurrDays:[] },
  // Recurring rides
  { id:'R006', riderId:'TR1001', riderName:'Rajesh Kumar',  riderPhone:'+91 98765 43210', vehicle:'Maruti Swift Dzire (White) • TS 09 AB 1234', origin:'Kondapur',   destination:'Secunderabad',route:'Kondapur - Madhapur - Ameerpet - Secunderabad',                              date:'2026-06-03', time:'09:00', seatsTotal:3, seatsFilled:0, notes:'Regular Mon–Fri ride',        status:'open',   seekers:[],                recurring:true,  recurrDays:['Mon','Tue','Wed','Thu','Fri'] },
  { id:'R007', riderId:'TR1011', riderName:'Sanjay Gupta',  riderPhone:'+91 89765 43210', vehicle:'MG Hector (White) • TS 06 KL 1234',           origin:'Banjara Hills', destination:'Hitech City', route:'Banjara Hills - Jubilee Hills - Madhapur - Hitech City',                  date:'2026-06-03', time:'08:45', seatsTotal:4, seatsFilled:1, notes:'Weekend ride too',            status:'open',   seekers:['TR1012'],        recurring:true,  recurrDays:['Mon','Wed','Fri'] },
  // Past rides
  { id:'R008', riderId:'TR1001', riderName:'Rajesh Kumar',  riderPhone:'+91 98765 43210', vehicle:'Maruti Swift Dzire (White) • TS 09 AB 1234', origin:'Kondapur',   destination:'Secunderabad',route:'Kondapur - Madhapur - Ameerpet - Secunderabad',                              date:'2026-05-28', time:'09:00', seatsTotal:3, seatsFilled:2, notes:'',                           status:'completed', seekers:['TR1002','TR1004'], recurring:false, recurrDays:[] },
]

// ─── RIDE REQUESTS ────────────────────────────────────────────────────────────
export const rideRequests = [
  { id:'RQ001', rideId:'R001', seekerId:'TR1002', seekerName:'Priya Mehta',  requestDate:'2026-05-29', status:'approved', pickupPoint:'Madhapur Metro' },
  { id:'RQ002', rideId:'R004', seekerId:'TR1010', seekerName:'Kavita Rao',   requestDate:'2026-05-29', status:'pending',  pickupPoint:'KPHB Colony Gate' },
  { id:'RQ003', rideId:'R006', seekerId:'TR1004', seekerName:'Anita Reddy',  requestDate:'2026-05-30', status:'pending',  pickupPoint:'Hitech City signal' },
  { id:'RQ004', rideId:'R002', seekerId:'TR1006', seekerName:'Deepika Sharma', requestDate:'2026-05-28', status:'declined', pickupPoint:'Gachibowli circle' },
]

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────
export const activities = [
  { id:'A001', title:'Village Ride',      category:'Education',      icon:'🏫', color:'#0d7a86', bg:'rgba(20,161,175,0.08)',   desc:'Drive to support selected Government schools — Career Guidance, Personality Development, and donating school lab and sports equipment.',         date:'Ongoing',       status:'active',    impact:'12 schools',   participantsNeeded:'Drivers + Volunteers', rsvps:['TR1001','TR1003','TR1006'], nextEvent:'2026-06-01' },
  { id:'A002', title:'Prakruthi',         category:'Environment',    icon:'🌿', color:'#15803d', bg:'rgba(34,197,94,0.08)',    desc:'Awareness camps on No Polythene usage, Water Harvesting, Plantation, Home Gardening and Organic Gardening across Hyderabad.',               date:'Monthly',       status:'active',    impact:'500+ people',  participantsNeeded:'All welcome',          rsvps:['TR1001','TR1004','TR1006','TR1007','TR1011'], nextEvent:'2026-06-07' },
  { id:'A003', title:'Blood Donations',   category:'Healthcare',     icon:'🩸', color:'#b91c1c', bg:'rgba(239,68,68,0.08)',    desc:'Blood donation drives on need basis. TechieRide members provide free carpools to donation camps for all volunteers.',                        date:'On need basis', status:'active',    impact:'120+ units',   participantsNeeded:'Donors + Drivers',     rsvps:['TR1001','TR1002','TR1005','TR1007','TR1010'], nextEvent:'2026-06-05' },
  { id:'A004', title:'Tribal Support',    category:'Community',      icon:'🤝', color:'#b45309', bg:'rgba(245,158,11,0.08)',   desc:'Supporting Tribes of Palvancha with help of local doctors — providing basic needs including staples, clothes and medicines.',               date:'Quarterly',     status:'active',    impact:'3 villages',   participantsNeeded:'Volunteers + Donors',  rsvps:['TR1003','TR1005','TR1009'], nextEvent:'2026-06-15' },
  { id:'A005', title:'Free Water Camp',   category:'Community',      icon:'💧', color:'#0369a1', bg:'rgba(14,165,233,0.08)',   desc:'Summer water camps running 70+ days, supplying mineral water and healthy buttermilk — serving nearly 2,000–3,000 litres daily.',                date:'Every Summer',  status:'active',    impact:'3k litres/day', participantsNeeded:'Volunteers',          rsvps:['TR1003','TR1005','TR1009','TR1011'], nextEvent:'2026-06-01' },
  { id:'A006', title:'VidyaNidhi',        category:'Education',      icon:'🎓', color:'#6d28d9', bg:'rgba(139,92,246,0.08)',   desc:'Supporting Higher Education for Talented Individuals from Financially Challenged Backgrounds through funding and mentorship.',               date:'Year-round',    status:'active',    impact:'18 students',  participantsNeeded:'Mentors + Donors',     rsvps:['TR1002','TR1004','TR1009','TR1012'], nextEvent:'2026-06-10' },
]

// ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────
export const announcements = [
  { id:1, title:'New Members: Please Complete Your Profile',        body:'All members who joined in May 2026 must update their area and contact details.',                                              date:'2026-05-25', pinned:true  },
  { id:2, title:'Village Ride — Govt School Drive This Sunday',     body:'Visiting Saraswathi Govt School, Medchal on 1st June. Volunteer drivers needed. Contact TR1001.',                           date:'2026-05-22', pinned:false },
  { id:3, title:'Free Water Camp Starting June 1st',                body:'Our annual summer water camp kicks off at Ameerpet Metro. Morning shift 7–10 AM. All welcome!',                            date:'2026-05-20', pinned:false },
  { id:4, title:'Carpooling Route: Gachibowli ↔ Secunderabad Active', body:'Regular riders now available on this corridor. Seekers check the Carpooling tab.',                                      date:'2026-05-18', pinned:false },
]

// ─── PARTICIPATIONS ───────────────────────────────────────────────────────────
export const participations = [
  { id:'P001', memberId:'TR1001', activityId:'A003', activityTitle:'Blood Donation Drive',        role:'Driver + Donor', date:'2026-04-15', status:'completed', note:'Drove 3 volunteers to camp' },
  { id:'P002', memberId:'TR1001', activityId:'A001', activityTitle:'Village Ride – Medchal',      role:'Driver',         date:'2026-03-22', status:'completed', note:'Carried sports equipment' },
  { id:'P003', memberId:'TR1001', activityId:'A002', activityTitle:'Prakruthi – Plantation Drive',role:'Volunteer',      date:'2026-02-10', status:'completed', note:'Planted 15 saplings at KPHB' },
  { id:'P004', memberId:'TR1001', activityId:'A001', activityTitle:'Village Ride – Medchal',      role:'Driver',         date:'2026-06-01', status:'upcoming',  note:'Saraswathi Govt School visit' },
  { id:'P005', memberId:'TR1001', activityId:'A005', activityTitle:'Free Water Camp',             role:'Volunteer',      date:'2026-06-01', status:'upcoming',  note:'Morning shift 7–10 AM' },
]

// ─── ANALYTICS DATA ───────────────────────────────────────────────────────────
export const memberGrowth = [
  { month:'Aug 24', count:3 }, { month:'Sep 24', count:5 },
  { month:'Oct 24', count:6 }, { month:'Nov 24', count:7 },
  { month:'Dec 24', count:8 }, { month:'Jan 25', count:9 },
  { month:'Feb 25', count:9 }, { month:'Mar 25', count:10 },
  { month:'Apr 25', count:11 },{ month:'May 25', count:11 },
  { month:'Jun 25', count:12 },{ month:'Jul 25', count:12 },
]

export const ridesPerMonth = [
  { month:'Oct 24', rides:4 },{ month:'Nov 24', rides:6 },
  { month:'Dec 24', rides:5 },{ month:'Jan 25', rides:9 },
  { month:'Feb 25', rides:11},{ month:'Mar 25', rides:14 },
  { month:'Apr 25', rides:12},{ month:'May 25', rides:18 },
  { month:'Jun 25', rides:7 },
]

export const activityParticipation = activities.map(a => ({
  name: a.title.split(' ')[0], count: a.rsvps.length, color: a.color
}))

export const co2ByMonth = [
  { month:'Jan 25', kg:28 },{ month:'Feb 25', kg:34 },
  { month:'Mar 25', kg:42 },{ month:'Apr 25', kg:38 },
  { month:'May 25', kg:51 },{ month:'Jun 25', kg:17 },
]

// ─── ADMIN ACTIVITY LOG ───────────────────────────────────────────────────────
export const adminLog = [
  { id:1, action:'Approved member',    detail:'TR1012 Lavanya Iyer (ref: TR1010)', by:'Admin', time:'2024-07-25 10:30' },
  { id:2, action:'Approved member',    detail:'TR1011 Sanjay Gupta (ref: TR1009)',  by:'Admin', time:'2024-07-08 09:15' },
  { id:3, action:'Deactivated member', detail:'TR1008 Meena Kumari — moved out',    by:'Admin', time:'2024-06-01 14:00' },
  { id:4, action:'Closed ride',        detail:'R008 Kondapur → Secunderabad',       by:'Admin', time:'2026-05-28 20:00' },
  { id:5, action:'Posted announcement',detail:'"Free Water Camp Starting June 1st"',by:'Admin', time:'2026-05-20 11:00' },
  { id:6, action:'Added activity',     detail:'VidyaNidhi — Education drive',       by:'Admin', time:'2025-01-10 09:00' },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export const generateTRId = (allIds) => {
  const nums = allIds.map(id => parseInt(id.replace('TR',''))).filter(n => !isNaN(n))
  const next = Math.max(...nums, 1012) + 1
  return `TR${String(next).padStart(4,'0')}`
}

export const exportCSV = (data, filename) => {
  if (!data.length) return
  const keys = Object.keys(data[0])
  const csv = [keys.join(','), ...data.map(r => keys.map(k => `"${String(r[k]??'').replace(/"/g,'""')}"`).join(','))].join('\n')
  const blob = new Blob([csv], { type:'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click()
}
