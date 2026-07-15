import React, { useState, useMemo } from "react";
import {
  Dumbbell, Calendar, Users, QrCode, TrendingUp, CreditCard,
  MapPin, Bell, Lock, ChevronRight, X, Check, Plus, Clock,
  Flame, Apple, ClipboardList, BarChart3, UserCog, LogOut,
  Search, Filter, AlertCircle, CheckCircle2
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

/* ------------------------------------------------------------------ */
/* DESIGN TOKENS                                                       */
/* ink: near-black navy   chalk: warm off-white   volt: electric lime  */
/* ember: warm red-orange  steel: slate blue-grey                      */
/* ------------------------------------------------------------------ */
const T = {
  ink: "#12181B",
  ink2: "#1B2328",
  chalk: "#F3F1EA",
  volt: "#C8FF3D",
  ember: "#FF5A36",
  steel: "#3A4750",
  slate: "#8B96A0",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
`;

/* ------------------------------------------------------------------ */
/* MOCK DATA                                                           */
/* ------------------------------------------------------------------ */
const BRANCHES = ["Koregaon Park", "Baner", "Viman Nagar"];

const TRAINERS = [
  { id: "t1", name: "Aditi Rao", specialty: "Strength & Conditioning", branch: "Koregaon Park", clients: 18, rating: 4.9 },
  { id: "t2", name: "Kabir Shah", specialty: "HIIT / Fat Loss", branch: "Baner", clients: 22, rating: 4.8 },
  { id: "t3", name: "Meera Nair", specialty: "Yoga & Mobility", branch: "Koregaon Park", clients: 15, rating: 5.0 },
  { id: "t4", name: "Rohan Desai", specialty: "Powerlifting", branch: "Viman Nagar", clients: 12, rating: 4.7 },
];

const CLASSES = [
  { id: "c1", name: "Sunrise HIIT", trainer: "Kabir Shah", day: "Mon", time: "06:00 AM", duration: 45, cap: 20, booked: 20, branch: "Baner", type: "HIIT" },
  { id: "c2", name: "Power Lifting Lab", trainer: "Rohan Desai", day: "Mon", time: "07:00 AM", duration: 60, cap: 12, booked: 9, branch: "Viman Nagar", type: "Strength" },
  { id: "c3", name: "Flow Yoga", trainer: "Meera Nair", day: "Tue", time: "06:30 AM", duration: 60, cap: 25, booked: 14, branch: "Koregaon Park", type: "Yoga" },
  { id: "c4", name: "Strength Foundations", trainer: "Aditi Rao", day: "Tue", time: "05:30 PM", duration: 50, cap: 16, booked: 16, branch: "Koregaon Park", type: "Strength" },
  { id: "c5", name: "Metabolic Burn", trainer: "Kabir Shah", day: "Wed", time: "06:00 PM", duration: 45, cap: 20, booked: 11, branch: "Baner", type: "HIIT" },
  { id: "c6", name: "Deadlift Deep Dive", trainer: "Rohan Desai", day: "Thu", time: "07:00 AM", duration: 60, cap: 12, booked: 6, branch: "Viman Nagar", type: "Strength" },
  { id: "c7", name: "Restorative Yoga", trainer: "Meera Nair", day: "Fri", time: "06:30 PM", duration: 45, cap: 25, booked: 20, branch: "Koregaon Park", type: "Yoga" },
  { id: "c8", name: "Saturday Sweat", trainer: "Kabir Shah", day: "Sat", time: "08:00 AM", duration: 50, cap: 20, booked: 20, branch: "Baner", type: "HIIT" },
];

const LOCKERS = Array.from({ length: 24 }, (_, i) => ({
  id: `L-${String(i + 1).padStart(2, "0")}`,
  status: i % 5 === 0 ? "free" : i % 7 === 0 ? "maintenance" : "occupied",
  member: i % 5 === 0 ? null : i % 7 === 0 ? null : `Member ${i + 1}`,
}));

const MEMBERS = [
  { id: "m1", name: "Priya Kulkarni", plan: "Elite Annual", branch: "Koregaon Park", status: "Active", renews: "2026-08-14", streak: 12 },
  { id: "m2", name: "Arjun Mehta", plan: "Standard Monthly", branch: "Baner", status: "Active", renews: "2026-07-20", streak: 4 },
  { id: "m3", name: "Sneha Iyer", plan: "Elite Annual", branch: "Viman Nagar", status: "Grace Period", renews: "2026-07-09", streak: 30 },
  { id: "m4", name: "Yash Patil", plan: "Basic Monthly", branch: "Koregaon Park", status: "Active", renews: "2026-07-28", streak: 2 },
  { id: "m5", name: "Fatima Sheikh", plan: "Standard Monthly", branch: "Baner", status: "Cancelled", renews: "-", streak: 0 },
];

const PROGRESS = [
  { week: "W1", weight: 78, benchPress: 40 },
  { week: "W2", weight: 77.4, benchPress: 42 },
  { week: "W3", weight: 76.9, benchPress: 45 },
  { week: "W4", weight: 76.2, benchPress: 47 },
  { week: "W5", weight: 75.8, benchPress: 50 },
  { week: "W6", weight: 75.1, benchPress: 52 },
];

const REVENUE = [
  { month: "Feb", revenue: 412000, members: 210 },
  { month: "Mar", revenue: 438000, members: 224 },
  { month: "Apr", revenue: 455000, members: 233 },
  { month: "May", revenue: 471000, members: 241 },
  { month: "Jun", revenue: 498000, members: 252 },
  { month: "Jul", revenue: 512000, members: 260 },
];

const CLASS_POPULARITY = [
  { name: "HIIT", value: 34 },
  { name: "Strength", value: 29 },
  { name: "Yoga", value: 22 },
  { name: "Cardio", value: 15 },
];
const PIE_COLORS = [T.volt, T.ember, "#5EC8FF", T.slate];

const WORKOUT_PLAN = {
  title: "Hypertrophy Block — Week 6",
  assignedBy: "Aditi Rao",
  days: [
    { day: "Mon", focus: "Push", items: ["Bench Press 4x8", "Incline DB Press 3x10", "Cable Fly 3x12", "Triceps Rope 3x15"] },
    { day: "Wed", focus: "Pull", items: ["Deadlift 4x6", "Lat Pulldown 3x10", "Seated Row 3x12", "Barbell Curl 3x12"] },
    { day: "Fri", focus: "Legs", items: ["Back Squat 4x8", "Leg Press 3x12", "Walking Lunge 3x10/side", "Calf Raise 4x15"] },
  ],
};

const NUTRITION_PLAN = {
  title: "Lean Muscle — 2,400 kcal",
  assignedBy: "Aditi Rao",
  macros: { protein: "180g", carbs: "260g", fat: "70g" },
  meals: ["Breakfast: Oats + eggs + banana", "Lunch: Grilled chicken, rice, salad", "Snack: Greek yogurt + almonds", "Dinner: Paneer/fish, veggies, quinoa"],
};

export default function GymApp() {
  const [role, setRole] = useState("member");
  return (
    <div style={{ background: T.ink, minHeight: "100vh", color: T.chalk, fontFamily: "Inter, sans-serif" }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; }
        .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .mono { font-family: 'Space Mono', monospace; }
        ::selection { background: ${T.volt}; color: ${T.ink}; }
        .scrollhide::-webkit-scrollbar { height: 6px; }
        .scrollhide::-webkit-scrollbar-thumb { background: ${T.steel}; border-radius: 4px; }
        button { font-family: inherit; }
        a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible {
          outline: 2px solid ${T.volt}; outline-offset: 2px;
        }
      `}</style>
      <TopBar role={role} setRole={setRole} />
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 20px 80px" }}>
        {role === "member" && <MemberPortal />}
        {role === "trainer" && <TrainerPortal />}
        {role === "admin" && <AdminPortal />}
      </div>
    </div>
  );
}

function TopBar({ role, setRole }) {
  const roles = [
    { id: "member", label: "Member", icon: Dumbbell },
    { id: "trainer", label: "Trainer", icon: ClipboardList },
    { id: "admin", label: "Admin", icon: UserCog },
  ];
  return (
    <div style={{ borderBottom: `2px solid ${T.ink2}`, position: "sticky", top: 0, background: T.ink, zIndex: 20 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: T.volt, display: "grid", placeItems: "center" }}>
            <Dumbbell size={20} color={T.ink} strokeWidth={2.5} />
          </div>
          <span className="display" style={{ fontSize: 26, lineHeight: 1 }}>IRONGRID</span>
          <span className="mono" style={{ fontSize: 10, color: T.slate, marginLeft: 4 }}>GYM OS</span>
        </div>
        <div style={{ display: "flex", gap: 4, background: T.ink2, padding: 4, borderRadius: 10 }}>
          {roles.map((r) => {
            const active = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                  borderRadius: 7, border: "none", cursor: "pointer",
                  background: active ? T.volt : "transparent",
                  color: active ? T.ink : T.slate,
                  fontWeight: 700, fontSize: 13, transition: "all .15s",
                }}
              >
                <r.icon size={15} /> {r.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ n, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <span className="mono" style={{ fontSize: 11, color: T.volt, border: `1px solid ${T.volt}`, borderRadius: 4, padding: "2px 6px" }}>{n}</span>
      <h2 className="display" style={{ fontSize: 24, margin: 0, letterSpacing: "0.03em" }}>{children}</h2>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: T.ink2, border: `1px solid #232C31`, borderRadius: 14, padding: 20, ...style }}>
      {children}
    </div>
  );
}

function Pill({ children, color = T.slate, bg = "transparent", border }) {
  return (
    <span className="mono" style={{ fontSize: 11, padding: "3px 9px", borderRadius: 999, color, background: bg, border: border || `1px solid ${color}55`, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

/* ================================================================== */
/* MEMBER PORTAL                                                       */
/* ================================================================== */
function MemberPortal() {
  const [tab, setTab] = useState("dashboard");
  const [bookings, setBookings] = useState(["c3", "c5"]);
  const [waitlist, setWaitlist] = useState([]);
  const [dayFilter, setDayFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [logs, setLogs] = useState(PROGRESS);
  const [newWeight, setNewWeight] = useState("");
  const [toast, setToast] = useState(null);

  const me = MEMBERS[0];

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  function toggleBook(cls) {
    const isBooked = bookings.includes(cls.id);
    if (isBooked) {
      setBookings(bookings.filter((id) => id !== cls.id));
      showToast(`Booking cancelled — ${cls.name}`);
      return;
    }
    const full = cls.booked >= cls.cap && !waitlist.includes(cls.id);
    if (full) {
      setWaitlist([...waitlist, cls.id]);
      showToast(`Class full — added to waitlist for ${cls.name}`);
    } else {
      setBookings([...bookings, cls.id]);
      showToast(`Booked — ${cls.name}`);
    }
  }

  const filteredClasses = CLASSES.filter(
    (c) => (dayFilter === "All" || c.day === dayFilter) && (typeFilter === "All" || c.type === typeFilter)
  );

  const days = ["All", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const types = ["All", "HIIT", "Strength", "Yoga"];

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "schedule", label: "Book Classes" },
    { id: "progress", label: "Progress" },
    { id: "plans", label: "Workout & Nutrition" },
    { id: "checkin", label: "QR Check-In" },
    { id: "billing", label: "Billing" },
  ];

  return (
    <div>
      <MemberTabs tab={tab} setTab={setTab} tabs={tabs} />
      {tab === "dashboard" && (
        <div style={{
          position:"relative", overflow:"hidden", marginBottom:20, padding:"22px 24px",
          borderRadius:18, border:"1px solid rgba(200,255,61,.18)",
          background:"linear-gradient(110deg, rgba(200,255,61,.10), rgba(27,35,40,.78) 48%, rgba(94,200,255,.06))",
          boxShadow:"0 20px 55px rgba(0,0,0,.22)"
        }}>
          <div style={{position:"absolute",width:180,height:180,borderRadius:"50%",right:-45,top:-90,background:"rgba(200,255,61,.10)",filter:"blur(12px)"}} />
          <div className="mono" style={{fontSize:10,color:T.volt,letterSpacing:2,textTransform:"uppercase"}}>Your performance hub</div>
          <div className="display" style={{fontSize:"clamp(28px,4vw,46px)",lineHeight:1,marginTop:7}}>STRONGER EVERY SESSION.</div>
          <div style={{color:T.slate,fontSize:12.5,marginTop:8,maxWidth:540}}>Track your streak, reserve classes, follow your plan and keep moving forward.</div>
        </div>
      )}
      {toast && <ToastBar text={toast} />}

      {tab === "dashboard" && (
        <div>
          <SectionLabel n="01">Welcome back, {me.name.split(" ")[0]}</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginBottom: 20 }}>
            <StatBlock label="Day streak" value={me.streak} suffix="" icon={Flame} accent={T.ember} />
            <StatBlock label="Classes booked" value={bookings.length} suffix="" icon={Calendar} accent={T.volt} />
            <StatBlock label="Membership" value={me.plan} isText icon={Dumbbell} accent="#5EC8FF" />
            <StatBlock label="Renews" value={me.renews} isText icon={Clock} accent={T.slate} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
            <Card>
              <h3 className="display" style={{ fontSize: 20, marginTop: 0 }}>Upcoming classes</h3>
              {bookings.length === 0 && <EmptyNote text="No classes booked yet. Head to Book Classes to reserve your spot." />}
              {bookings.map((id) => {
                const c = CLASSES.find((x) => x.id === id);
                return <ClassRow key={id} cls={c} compact />;
              })}
            </Card>
            <Card>
              <h3 className="display" style={{ fontSize: 20, marginTop: 0 }}>Notifications</h3>
              <NotifRow icon={Bell} text="Sunrise HIIT starts in 18 hrs — gear up." tone={T.volt} />
              <NotifRow icon={AlertCircle} text="Auto-renewal charges ₹2,499 on Jul 20." tone={T.ember} />
              <NotifRow icon={CheckCircle2} text="Trainer Aditi updated your workout plan." tone="#5EC8FF" />
            </Card>
          </div>
        </div>
      )}

      {tab === "schedule" && (
        <div>
          <SectionLabel n="02">Class schedule</SectionLabel>
          <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
            <FilterGroup label="Day" options={days} value={dayFilter} onChange={setDayFilter} />
            <FilterGroup label="Type" options={types} value={typeFilter} onChange={setTypeFilter} />
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {filteredClasses.map((c) => {
              const full = c.booked >= c.cap;
              const booked = bookings.includes(c.id);
              const onWaitlist = waitlist.includes(c.id);
              return (
                <Card key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 54, textAlign: "center" }}>
                      <div className="display" style={{ fontSize: 22, color: T.volt, lineHeight: 1 }}>{c.day}</div>
                      <div className="mono" style={{ fontSize: 10, color: T.slate }}>{c.time}</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: T.slate }}>{c.trainer} · {c.branch} · {c.duration} min</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Pill color={full ? T.ember : T.volt}>{c.booked}/{c.cap} spots{onWaitlist ? " · waitlisted" : ""}</Pill>
                    <button
                      onClick={() => toggleBook(c)}
                      style={{
                        borderRadius: 8, padding: "9px 16px", fontWeight: 800, fontSize: 12,
                        cursor: "pointer", background: booked ? "transparent" : full ? T.steel : T.volt,
                        color: booked ? T.ember : full ? T.chalk : T.ink,
                        border: booked ? `1px solid ${T.ember}` : "none",
                      }}
                    >
                      {booked ? "Cancel" : full ? "Join waitlist" : "Book class"}
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {tab === "progress" && (
        <div>
          <SectionLabel n="03">Fitness progress</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 10 }}>
                <h3 className="display" style={{ fontSize: 20, margin: 0 }}>Bodyweight &amp; bench press trend</h3>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    placeholder="Log today's weight (kg)"
                    style={{ background: T.ink, border: `1px solid ${T.steel}`, borderRadius: 8, padding: "8px 10px", color: T.chalk, fontSize: 12, width: 190 }}
                  />
                  <button
                    onClick={() => {
                      if (!newWeight) return;
                      setLogs([...logs, { week: `W${logs.length + 1}`, weight: parseFloat(newWeight), benchPress: logs[logs.length - 1].benchPress }]);
                      setNewWeight("");
                      showToast("Progress logged!");
                    }}
                    style={{ background: T.volt, color: T.ink, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
                  >
                    Log
                  </button>
                </div>
              </div>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                  <LineChart data={logs}>
                    <CartesianGrid stroke="#232C31" />
                    <XAxis dataKey="week" stroke={T.slate} fontSize={12} />
                    <YAxis stroke={T.slate} fontSize={12} />
                    <Tooltip contentStyle={{ background: T.ink, border: `1px solid ${T.steel}` }} />
                    <Line type="monotone" dataKey="weight" stroke={T.volt} strokeWidth={3} dot={{ r: 4 }} name="Weight (kg)" />
                    <Line type="monotone" dataKey="benchPress" stroke={T.ember} strokeWidth={3} dot={{ r: 4 }} name="Bench (kg)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "plans" && (
        <div>
          <SectionLabel n="04">Workout &amp; nutrition plans</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <ClipboardList size={18} color={T.volt} />
                <h3 className="display" style={{ fontSize: 20, margin: 0 }}>{WORKOUT_PLAN.title}</h3>
              </div>
              <div style={{ fontSize: 12, color: T.slate, marginBottom: 14 }}>Assigned by {WORKOUT_PLAN.assignedBy}</div>
              {WORKOUT_PLAN.days.map((d) => (
                <div key={d.day} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: T.volt }}>{d.day} — {d.focus}</div>
                  <ul style={{ margin: "6px 0 0", paddingLeft: 18, fontSize: 13, color: T.chalk, lineHeight: 1.7 }}>
                    {d.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </Card>
            <Card>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Apple size={18} color={T.ember} />
                <h3 className="display" style={{ fontSize: 20, margin: 0 }}>{NUTRITION_PLAN.title}</h3>
              </div>
              <div style={{ fontSize: 12, color: T.slate, marginBottom: 14 }}>Assigned by {NUTRITION_PLAN.assignedBy}</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                <Pill color="#5EC8FF">Protein {NUTRITION_PLAN.macros.protein}</Pill>
                <Pill color={T.volt}>Carbs {NUTRITION_PLAN.macros.carbs}</Pill>
                <Pill color={T.ember}>Fat {NUTRITION_PLAN.macros.fat}</Pill>
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.9 }}>
                {NUTRITION_PLAN.meals.map((m) => <li key={m}>{m}</li>)}
              </ul>
            </Card>
          </div>
        </div>
      )}

      {tab === "checkin" && (
        <div>
          <SectionLabel n="05">QR check-in</SectionLabel>
          <Card style={{ maxWidth: 380, textAlign: "center", margin: "0 auto" }}>
            <QRMock id={me.id} />
            <div style={{ marginTop: 14, fontWeight: 700 }}>{me.name}</div>
            <div style={{ fontSize: 12, color: T.slate, marginTop: 4 }}>Show this code at the {me.branch} front desk scanner to check in. Refreshes every 60 seconds for security.</div>
          </Card>
        </div>
      )}

      {tab === "billing" && (
        <div>
          <SectionLabel n="06">Billing &amp; renewal</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card>
              <h3 className="display" style={{ fontSize: 20, marginTop: 0 }}>Current plan</h3>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{me.plan}</div>
              <div style={{ fontSize: 12, color: T.slate, margin: "6px 0 16px" }}>Next auto-charge: {me.renews} · ₹2,499 via Razorpay</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button style={{ background: T.volt, color: T.ink, border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>Update payment method</button>
                <button style={{ background: "transparent", border: `1px solid ${T.ember}`, color: T.ember, borderRadius: 8, padding: "10px 16px", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>Cancel &amp; prorate refund</button>
              </div>
            </Card>
            <Card>
              <h3 className="display" style={{ fontSize: 20, marginTop: 0 }}>Payment history</h3>
              {[["Jun 20", "₹2,499", "Paid"], ["May 20", "₹2,499", "Paid"], ["Apr 20", "₹2,499", "Paid"]].map((row) => (
                <div key={row[0]} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #232C31", fontSize: 13 }}>
                  <span>{row[0]}</span><span className="mono">{row[1]}</span><Pill color={T.volt}>{row[2]}</Pill>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function MemberTabs({ tab, setTab, tabs }) {
  return (
    <div className="scrollhide" style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 22, paddingBottom: 4 }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            padding: "9px 16px", borderRadius: 999, border: `1px solid ${tab === t.id ? T.volt : "#2A3338"}`,
            background: tab === t.id ? "rgba(200,255,61,0.08)" : "transparent",
            color: tab === t.id ? T.volt : T.slate, fontWeight: 700, fontSize: 12.5,
            cursor: "pointer", whiteSpace: "nowrap",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function StatBlock({ label, value, suffix, icon: Icon, accent, isText }) {
  return (
    <Card style={{ padding: "16px 18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 11, color: T.slate, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
        <Icon size={16} color={accent} />
      </div>
      <div className={isText ? "" : "mono"} style={{ fontSize: isText ? 17 : 30, fontWeight: isText ? 700 : 400, color: accent, marginTop: 6, lineHeight: 1 }}>
        {value}{suffix}
      </div>
    </Card>
  );
}

function ClassRow({ cls, compact }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #232C31" }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{cls.name}</div>
        <div style={{ fontSize: 11.5, color: T.slate }}>{cls.day} · {cls.time} · {cls.trainer}</div>
      </div>
      {!compact && <Pill color={T.volt}>{cls.booked}/{cls.cap}</Pill>}
      {compact && <ChevronRight size={16} color={T.slate} />}
    </div>
  );
}

function NotifRow({ icon: Icon, text, tone }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid #232C31", fontSize: 12.5 }}>
      <Icon size={15} color={tone} style={{ marginTop: 2, flexShrink: 0 }} />
      <span>{text}</span>
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
      <span style={{ fontSize: 11, color: T.slate, marginRight: 2 }}>{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          style={{
            padding: "6px 11px", borderRadius: 7, fontSize: 11.5, fontWeight: 700, cursor: "pointer",
            border: `1px solid ${value === o ? T.volt : "#2A3338"}`,
            background: value === o ? T.volt : "transparent",
            color: value === o ? T.ink : T.slate,
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function EmptyNote({ text }) {
  return (
    <div style={{ padding: "20px 0", color: T.slate, fontSize: 13, textAlign: "center", border: "1px dashed #2A3338", borderRadius: 10 }}>
      {text}
    </div>
  );
}

function ToastBar({ text }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: T.volt, color: T.ink, padding: "10px 20px", borderRadius: 999,
      fontWeight: 700, fontSize: 13, zIndex: 50, boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    }}>
      {text}
    </div>
  );
}

function QRMock({ id }) {
  const size = 11;
  const cells = useMemo(() => {
    let seed = id.charCodeAt(0) * 7 + 13;
    const arr = [];
    for (let i = 0; i < size * size; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      arr.push(seed / 233280 > 0.52);
    }
    return arr;
  }, [id]);
  return (
    <div style={{ display: "inline-grid", gridTemplateColumns: `repeat(${size}, 12px)`, gap: 2, background: T.chalk, padding: 14, borderRadius: 12 }}>
      {cells.map((on, i) => (
        <div key={i} style={{ width: 12, height: 12, background: on ? T.ink : T.chalk }} />
      ))}
    </div>
  );
}

/* ================================================================== */
/* TRAINER PORTAL                                                      */
/* ================================================================== */
function TrainerPortal() {
  const trainer = TRAINERS[0];
  const [selectedMember, setSelectedMember] = useState(MEMBERS[0].id);
  const [workoutDraft, setWorkoutDraft] = useState("Back Squat 4x8\nRomanian Deadlift 3x10\nWalking Lunge 3x12/side");
  const [nutritionDraft, setNutritionDraft] = useState("2,300 kcal · Protein 170g / Carbs 240g / Fat 65g");
  const [saved, setSaved] = useState(null);

  const myClasses = CLASSES.filter((c) => c.trainer === trainer.name);
  const roster = MEMBERS.filter((m) => m.status !== "Cancelled");

  return (
    <div>
      <SectionLabel n="01">Trainer profile</SectionLabel>
      <Card style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: T.volt, display: "grid", placeItems: "center", flexShrink: 0 }}>
            <span className="display" style={{ fontSize: 26, color: T.ink }}>{trainer.name[0]}</span>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17 }}>{trainer.name}</div>
            <div style={{ fontSize: 12.5, color: T.slate }}>{trainer.specialty} · {trainer.branch}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          <MiniStat label="Clients" value={trainer.clients} />
          <MiniStat label="Rating" value={trainer.rating} />
          <MiniStat label="Classes/wk" value={myClasses.length} />
        </div>
      </Card>

      <SectionLabel n="02">Assigned classes</SectionLabel>
      <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
        {myClasses.map((c) => (
          <Card key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: T.slate }}>{c.day} · {c.time} · {c.branch}</div>
            </div>
            <Pill color={c.booked >= c.cap ? T.ember : T.volt}>{c.booked}/{c.cap} booked</Pill>
          </Card>
        ))}
      </div>

      <SectionLabel n="03">Assign workout &amp; nutrition plan</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.5fr", gap: 16 }}>
        <Card>
          <h3 className="display" style={{ fontSize: 18, marginTop: 0 }}>Client roster</h3>
          {roster.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMember(m.id)}
              style={{
                padding: "9px 10px", borderRadius: 8, cursor: "pointer", marginBottom: 4,
                background: selectedMember === m.id ? "rgba(200,255,61,0.08)" : "transparent",
                border: `1px solid ${selectedMember === m.id ? T.volt : "transparent"}`,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: T.slate }}>{m.plan}</div>
            </div>
          ))}
        </Card>
        <Card>
          <h3 className="display" style={{ fontSize: 18, marginTop: 0 }}>
            Editing plan for {MEMBERS.find((m) => m.id === selectedMember)?.name}
          </h3>
          <label style={{ fontSize: 12, color: T.slate, display: "block", marginBottom: 6 }}>Workout routine</label>
          <textarea
            value={workoutDraft}
            onChange={(e) => setWorkoutDraft(e.target.value)}
            rows={4}
            style={{ width: "100%", background: T.ink, border: `1px solid ${T.steel}`, borderRadius: 8, color: T.chalk, padding: 10, fontSize: 13, marginBottom: 14, resize: "vertical" }}
          />
          <label style={{ fontSize: 12, color: T.slate, display: "block", marginBottom: 6 }}>Nutrition plan</label>
          <textarea
            value={nutritionDraft}
            onChange={(e) => setNutritionDraft(e.target.value)}
            rows={2}
            style={{ width: "100%", background: T.ink, border: `1px solid ${T.steel}`, borderRadius: 8, color: T.chalk, padding: 10, fontSize: 13, marginBottom: 14, resize: "vertical" }}
          />
          <button
            onClick={() => { setSaved(Date.now()); setTimeout(() => setSaved(null), 2200); }}
            style={{ background: T.volt, color: T.ink, border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 800, fontSize: 12.5, cursor: "pointer" }}
          >
            Save &amp; notify member
          </button>
          {saved && <span style={{ marginLeft: 12, color: T.volt, fontSize: 12.5, fontWeight: 700 }}>✓ Plan pushed to member app</span>}
        </Card>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="display" style={{ fontSize: 24, color: T.volt, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10.5, color: T.slate, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
    </div>
  );
}

/* ================================================================== */
/* ADMIN PORTAL                                                        */
/* ================================================================== */
function AdminPortal() {
  const [branch, setBranch] = useState("All Branches");
  const [tab, setTab] = useState("overview");
  const [search, setSearch] = useState("");

  const branchOptions = ["All Branches", ...BRANCHES];
  const filteredMembers = MEMBERS.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  const tabs = [
    { id: "overview", label: "Analytics" },
    { id: "members", label: "Members" },
    { id: "classes", label: "Classes" },
    { id: "trainers", label: "Trainers" },
    { id: "lockers", label: "Lockers" },
  ];

  const totalRevenue = REVENUE[REVENUE.length - 1].revenue;
  const activeMembers = MEMBERS.filter((m) => m.status === "Active").length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
        <SectionLabel n="ADMIN">Multi-branch dashboard</SectionLabel>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MapPin size={15} color={T.slate} />
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            style={{ background: T.ink2, border: `1px solid ${T.steel}`, color: T.chalk, borderRadius: 8, padding: "8px 10px", fontSize: 12.5 }}
          >
            {branchOptions.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <MemberTabs tab={tab} setTab={setTab} tabs={tabs} />

      {tab === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
            <StatBlock label="Monthly revenue" value={`₹${(totalRevenue / 1000).toFixed(0)}K`} icon={CreditCard} accent={T.volt} isText />
            <StatBlock label="Active members" value={activeMembers} icon={Users} accent="#5EC8FF" />
            <StatBlock label="Branches" value={BRANCHES.length} icon={MapPin} accent={T.ember} />
            <StatBlock label="Avg. class fill" value="83%" icon={BarChart3} accent={T.slate} isText />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
            <Card>
              <h3 className="display" style={{ fontSize: 18, marginTop: 0 }}>Revenue &amp; membership growth</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <BarChart data={REVENUE}>
                    <CartesianGrid stroke="#232C31" />
                    <XAxis dataKey="month" stroke={T.slate} fontSize={12} />
                    <YAxis stroke={T.slate} fontSize={12} />
                    <Tooltip contentStyle={{ background: T.ink, border: `1px solid ${T.steel}` }} />
                    <Bar dataKey="revenue" fill={T.volt} radius={[4, 4, 0, 0]} name="Revenue (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h3 className="display" style={{ fontSize: 18, marginTop: 0 }}>Class popularity</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={CLASS_POPULARITY} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
                      {CLASS_POPULARITY.map((entry, i) => <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: T.ink, border: `1px solid ${T.steel}` }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "members" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, background: T.ink2, borderRadius: 8, padding: "8px 12px", maxWidth: 320 }}>
            <Search size={14} color={T.slate} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members..."
              style={{ background: "transparent", border: "none", color: T.chalk, fontSize: 13, outline: "none", width: "100%" }}
            />
          </div>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <TableHeader cols={["Member", "Plan", "Branch", "Status", "Renews", "Streak"]} />
            {filteredMembers.map((m) => (
              <div key={m.id} style={{ display: "grid", gridTemplateColumns: "1.4fr 1.2fr 1fr 1fr 1fr 0.7fr", padding: "12px 16px", borderBottom: "1px solid #232C31", fontSize: 13, alignItems: "center" }}>
                <span style={{ fontWeight: 700 }}>{m.name}</span>
                <span style={{ color: T.slate }}>{m.plan}</span>
                <span style={{ color: T.slate }}>{m.branch}</span>
                <StatusPill status={m.status} />
                <span className="mono" style={{ fontSize: 11.5 }}>{m.renews}</span>
                <span style={{ color: T.volt }}>{m.streak}d</span>
              </div>
            ))}
          </Card>
        </div>
      )}

      {tab === "classes" && (
        <div style={{ display: "grid", gap: 10 }}>
          {CLASSES.map((c) => (
            <Card key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: T.slate }}>{c.trainer} · {c.day} {c.time} · {c.branch}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 120, height: 6, background: "#232C31", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(100, (c.booked / c.cap) * 100)}%`, height: "100%", background: c.booked >= c.cap ? T.ember : T.volt }} />
                </div>
                <span className="mono" style={{ fontSize: 12 }}>{c.booked}/{c.cap}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "trainers" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {TRAINERS.map((t) => (
            <Card key={t.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: T.volt, display: "grid", placeItems: "center" }}>
                  <span className="display" style={{ fontSize: 18, color: T.ink }}>{t.name[0]}</span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 11.5, color: T.slate }}>{t.branch}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: T.slate, marginBottom: 10 }}>{t.specialty}</div>
              <div style={{ display: "flex", gap: 16 }}>
                <MiniStat label="Clients" value={t.clients} />
                <MiniStat label="Rating" value={t.rating} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "lockers" && (
        <div>
          <div style={{ display: "flex", gap: 16, marginBottom: 16, fontSize: 12 }}>
            <LegendDot color={T.volt} label="Free" />
            <LegendDot color={T.steel} label="Occupied" />
            <LegendDot color={T.ember} label="Maintenance" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 10 }}>
            {LOCKERS.map((l) => {
              const color = l.status === "free" ? T.volt : l.status === "maintenance" ? T.ember : T.steel;
              return (
                <div key={l.id} style={{ border: `1px solid ${color}`, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                  <Lock size={16} color={color} />
                  <div className="mono" style={{ fontSize: 11, marginTop: 4 }}>{l.id}</div>
                  <div style={{ fontSize: 9.5, color: T.slate, marginTop: 2 }}>{l.member || l.status}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function TableHeader({ cols }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.2fr 1fr 1fr 1fr 0.7fr", padding: "10px 16px", background: "#171F23", fontSize: 11, color: T.slate, textTransform: "uppercase", letterSpacing: "0.05em" }}>
      {cols.map((c) => <span key={c}>{c}</span>)}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    Active: T.volt,
    "Grace Period": T.ember,
    Cancelled: T.slate,
  };
  return <Pill color={map[status] || T.slate}>{status}</Pill>;
}

function LegendDot({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
      <span style={{ color: T.slate }}>{label}</span>
    </div>
  );
}
