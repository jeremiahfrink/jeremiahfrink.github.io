/* ============================================================
   ISTELive 26 — Dell K-12 Strategist Guide
   EDIT THIS FILE to update the guide. You should never need to
   touch index.html to change content.
   ============================================================ */

/* --- Shared team password. CHANGE THIS to whatever the team shares. --- */
const ACCESS_CODE = "istedell26";

/* --- Conference basics --- */
const CONF = {
  name: "ISTELive 26",
  dates: "June 28 – July 1, 2026",
  city: "Orlando, FL",
  startISO: "2026-06-28T00:00:00",
  endISO:   "2026-07-01T23:59:59",
};

/* --- The four conference days. Drives the Now panel + day tabs. --- */
const DAYS = [
  { key:"sun", tab:"Sun", full:"Sunday, June 28", date:"2026-06-28",
    roomHours:"Closed — Build It Here special event",
    expo:"Closed",
    mainstage:"Opening Mainstage · 3:00–4:30 PM",
    lunch:"",
    meetings:"12:00–5:00 PM", meetStart:"12:00", meetEnd:"17:00",
    note:"" },
  { key:"mon", tab:"Mon", full:"Monday, June 29", date:"2026-06-29",
    roomHours:"8:00 AM–5:00 PM",
    expo:"9:00 AM–5:00 PM",
    mainstage:"",
    lunch:"11:30 AM–12:30 PM",
    meetings:"9:00 AM–5:00 PM", meetStart:"09:00", meetEnd:"17:00",
    note:"" },
  { key:"tue", tab:"Tue", full:"Tuesday, June 30", date:"2026-06-30",
    roomHours:"8:00 AM–5:00 PM",
    expo:"9:30 AM–5:00 PM",
    mainstage:"Tuesday Mainstage · 8:15–9:30 AM",
    lunch:"12:30–1:00 PM",
    meetings:"9:00 AM–5:00 PM", meetStart:"09:00", meetEnd:"17:00",
    note:"Character Day — wear your theme-park gear" },
  { key:"wed", tab:"Wed", full:"Wednesday, July 1", date:"2026-07-01",
    roomHours:"8:00 AM–2:00 PM",
    expo:"8:30 AM–1:00 PM",
    mainstage:"Closing Mainstage · 1:15–2:30 PM",
    lunch:"",
    meetings:"9:00 AM–2:00 PM", meetStart:"09:00", meetEnd:"14:00",
    note:"" },
];

/* --- Streams = the color-coded "lines" on the schedule. --- */
const STREAMS = {
  "dell-room":  { short:"Dell Room",  label:"Dell Room · W306AB", color:"#0672CB" },
  "dell-hyatt": { short:"Hyatt Gulf", label:"Dell · Hyatt Gulf",  color:"#00447C" },
  "dell-event": { short:"Dell Event", label:"Dell Event",         color:"#C8761A" },
  "partner":    { short:"Partner",    label:"Partner Event",       color:"#7A4FBF" },
  "iste":       { short:"ISTE",       label:"ISTE Program",        color:"#5A6B7C" },
};

/* --- Spaces = the columns in the laptop grid + the "By room" groups on phone.
   Each space owns one or more streams. --- */
const SPACES = [
  { key:"main",   label:"Main Stage",      sub:"W306AB",                 streams:["dell-room"] },
  { key:"oneone", label:"1:1 Room",        sub:"Hyatt Gulf",             streams:["dell-hyatt"], showMeetings:true },
  { key:"around", label:"Around the Show", sub:"Partner · ISTE · Events", streams:["partner","iste","dell-event"], light:true },
];

/* --- Team names: power the "my sessions" quick-pick chips. --- */
const TEAM = ["Jeremiah","Nekia","Katina","Marlo","Matt","Gerri","Snow","Keya"];

/* --- THE SCHEDULE ---------------------------------------------------
   Each entry: day, start/end (24h "HH:MM" for sorting), time (label),
   title, stream, where, who, desc, link {label,url}.
   To add a session: copy a block, change the fields, done.
-------------------------------------------------------------------- */
const SCHEDULE = [

  /* ---------- SUNDAY, JUNE 28 ---------- */
  { id:"su-summit", day:"sun", start:"09:00", end:"14:00", time:"9:00 AM–2:00 PM",
    title:"Solutions Summit", stream:"iste",
    where:"OCCC West · W110AB", who:"",
    desc:"ISTE's edtech-leader summit: best practices, new ideas, and networking the day before the show opens.", link:null },

  { id:"su-tea", day:"sun", start:"12:30", end:"14:30", time:"12:30–2:30 PM",
    title:"ISTE Women's High Tea Party", stream:"partner",
    where:"Ritz-Carlton Orlando, Grande Lakes · Napoli", who:"Hosted by ClassLink · Dell · MagicSchool",
    desc:"Co-hosted reception. Dell is a named host alongside ClassLink and MagicSchool.",
    link:{label:"Event landing page", url:"https://www.classlink.com/events/iste-2026-tea-social"} },

  { id:"su-build", day:"sun", start:"13:00", end:"14:30", time:"1:00–2:30 PM",
    title:"Build It Here. Launch It There: Design Your Next Student Program", stream:"dell-room",
    where:"W306AB", who:"Nekia / Jeremiah",
    desc:"In a fast, playful design sprint, you start from what students need, then build and pitch a one-page Student Program blueprint focused on your area — AI, data, coding, esports, student leadership, and more. Work solo or team up. Leave with a student program your school can actually run. Real models like Student TechCrew, Girls Who Game, and Data Dunkers show what's possible. The strongest pitches earn Dell Education Team support for a 2026–27 pilot. Design, Build, LAUNCH!",
    link:null },

  { id:"su-mainstage", day:"sun", start:"15:00", end:"16:30", time:"3:00–4:30 PM",
    title:"Opening Mainstage", stream:"iste",
    where:"OCCC West", who:"", desc:"Conference opening keynote.", link:null },

  { id:"su-intel", day:"sun", start:"15:00", end:"18:30", time:"3:00–6:30 PM",
    title:"Intel — Skills for Innovation Community Meetup", stream:"partner",
    where:"Shark Bar, Pointe Orlando", who:"Intel",
    desc:"Intel's community meetup at ISTE.", link:{label:"Contact Jeremiah if interested", url:"#"} },

  { id:"su-welcome", day:"sun", start:"16:30", end:"17:30", time:"4:30–5:30 PM",
    title:"Welcome Reception", stream:"iste",
    where:"OCCC West", who:"", desc:"ISTE's opening-night welcome reception.", link:null },

  { id:"su-msreception", day:"sun", start:"18:00", end:"20:00", time:"6:00–8:00 PM",
    title:"Microsoft Partner Reception", stream:"partner",
    where:"The Hampton Social · 9101 International Dr", who:"Microsoft",
    desc:"", link:{label:"Register", url:"https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR4rSEX_WUiFLul-y1nHxAChUMTNUTFU2V1VFUjhSRDA4WDFTSVdQSzNQTy4u"} },

  { id:"su-cxo", day:"sun", start:"18:30", end:"20:30", time:"6:30–8:30 PM",
    title:"CxO Dinner", stream:"partner",
    where:"Capital Grille", who:"Hosted by Absolute",
    desc:"", link:{label:"Contact Jennifer Hebert", url:"#"} },

  /* ---------- MONDAY, JUNE 29 ---------- */
  { id:"mo-logics", day:"mon", start:"07:30", end:"08:30", time:"7:30–8:30 AM",
    title:"Meet with Logics Academy (Partner)", stream:"partner",
    where:"", who:"The team",
    desc:"Breakfast meeting with Logics Academy. Location TBD — see Katina.",
    link:{label:"See Katina", url:"#"} },

  { id:"mo-pancakes", day:"mon", start:"08:00", end:"09:30", time:"8:00–9:30 AM",
    title:"Microsoft EDU Partner Breakfast — \"Products & Pancakes!\"", stream:"partner",
    where:"Microsoft Partner Room · 309AB", who:"Microsoft",
    desc:"", link:{label:"Register", url:"https://forms.office.com/r/ZqDgQ94kzH"} },

  { id:"mo-ms1", day:"mon", start:"08:30", end:"09:30", time:"8:30–9:30 AM",
    title:"Pull Back the Curtain on AI in Your District", stream:"dell-room",
    where:"W306AB", who:"Geri Gillespy (Msft) / Jeremiah",
    desc:"What does it actually take to make AI work across a district? This session goes behind the scenes to explore the connected systems thinking that turns AI potential into real outcomes for staff and students. Using Microsoft as the foundation, we'll look at how intentional platform connections reduce silos and unlock better experiences across operations, leadership, and learning. Come ready to rethink how all the pieces fit together.", link:null },

  { id:"mo-expo", day:"mon", start:"09:00", end:"17:00", time:"9:00 AM–5:00 PM",
    title:"Expo / Solutions Hub open", stream:"iste",
    where:"OCCC West", who:"", desc:"Exhibit hall open all day.", link:null },

  { id:"mo-aischools", day:"mon", start:"09:30", end:"10:30", time:"9:30–10:30 AM",
    title:"AI in Schools: From Idea to Impact", stream:"dell-room",
    where:"W306AB", who:"Katina",
    desc:"Move beyond AI hype to real, responsible impact. Discover how districts are implementing AI across leadership, learning, technology, professional learning, and trust. Walk away with concrete use cases, patterns, and resources to make AI work practically, sustainably, and in a human-centered way for your context.",
    link:null },

  { id:"mo-cyber", day:"mon", start:"10:30", end:"11:30", time:"10:30–11:30 AM",
    title:"Cybersecurity 101 for Schools: Protecting Systems, Students, and Staff", stream:"dell-room",
    where:"W306AB", who:"Marlo",
    desc:"New to cybersecurity? Start here with practical, beginner-friendly strategies to protect your school or district. Learn the essentials of password management, multi-factor authentication, and security updates to strengthen cyber wellness, safeguard student data, and create a safer digital environment.",
    link:null },

  { id:"mo-ailit", day:"mon", start:"11:30", end:"12:30", time:"11:30 AM–12:30 PM",
    title:"AI Literacy in Action: Preparing Students for an AI-Driven World", stream:"dell-room",
    where:"W306AB", who:"Nekia + Snow",
    desc:"Empower students to thrive in an AI-driven world. Explore hands-on, standards-aligned strategies that build critical thinking, ethical use, and real-world application across subjects, ready for immediate use in the classroom.",
    link:null },

  { id:"mo-future", day:"mon", start:"11:30", end:"12:30", time:"11:30 AM–12:30 PM",
    title:"Future of Education: Leading Through What's Next", stream:"dell-hyatt",
    where:"Hyatt Regency · Gulf Conference Room", who:"The team",
    desc:"Education is at an inflection point. This think tank brings K–12 leaders together to explore the shifts ahead — how students learn, educators teach, and institutions operate within the next five years. A peer-driven conversation, facilitated with Dell, designed to surface the trends, challenges, and moves that position institutions for what's next.",
    link:null },

  { id:"mo-lunch", day:"mon", start:"11:30", end:"12:30", time:"11:30 AM–12:30 PM",
    title:"Lunch break", stream:"iste",
    where:"", who:"", desc:"ISTE lunch break.", link:null },

  { id:"mo-assess", day:"mon", start:"12:30", end:"13:30", time:"12:30–1:30 PM",
    title:"From Completion to Competency: Assessment in the Age of AI", stream:"dell-room",
    where:"W306AB", who:"Jeremiah",
    desc:"When AI can generate answers, write papers, and even explain its thinking, what should we assess? Explore and develop strategies for designing assignments and assessments that capture real learning, encourage productive thinking, and develop the future-facing competencies students need beyond school.",
    link:null },

  { id:"mo-gwg", day:"mon", start:"13:30", end:"14:30", time:"1:30–2:30 PM",
    title:"Girls Who Game: Where Play Builds Confidence and Future Skills", stream:"dell-room",
    where:"W306AB", who:"Katina",
    desc:"Game-based learning can ignite STEM confidence, belonging, collaboration, creativity, and problem-solving. Discover how districts use Girls Who Game to expand access, elevate student voice and agency, and create engaging pathways into future-ready STEM and technology skills. Game on!",
    link:null },

  { id:"mo-media", day:"mon", start:"14:15", end:"14:45", time:"2:15–2:45 PM",
    title:"Media Intro: Jeremy and David at Integrate This! Podcast", stream:"dell-room",
    where:"W306AB", who:"Jeremiah, Marlo, Tom Kane",
    desc:"Media introduction with the Integrate This! Podcast.", link:null },

  { id:"mo-vibe", day:"mon", start:"14:30", end:"15:30", time:"2:30–3:30 PM",
    title:"The Vibe Coding Superintendent", stream:"dell-room",
    where:"W306AB", who:"Matt",
    desc:"What happens when a district starts asking \"What if?\" and builds applications that help. Explore how vibe coding is in reach of anyone in the district, and hear how one superintendent used the skill to impact his district.",
    link:null },

  { id:"mo-gov", day:"mon", start:"15:30", end:"16:30", time:"3:30–4:30 PM",
    title:"From AI Tools to AI Systems: Building a District Governance Model", stream:"dell-room",
    where:"W306AB", who:"Matt",
    desc:"Move beyond experimentation to systemwide implementation. Learn how districts design AI governance frameworks, define human-in-the-loop practices, and balance innovation, equity, and risk. Examine practical examples, identify implementation moves, and leave with next steps aligned to ISTE priorities.",
    link:null },

  { id:"mo-epcot", day:"mon", start:"20:00", end:"22:00", time:"8:00–10:00 PM",
    title:"Customer Appreciation Event — EPCOT's Mexico Vista", stream:"dell-event",
    where:"EPCOT's Mexico Vista", who:"Dell",
    desc:"An exclusive evening for customers: light bites, great conversation, and a prime view of the nighttime fireworks. Capacity 250 — encourage customers to register early.",
    link:{label:"Registration link", url:"https://events.dell.com/event/9864ed59-8c9e-47df-8ade-71c3fd3f0c14/regProcessStep1"} },

  /* ---------- TUESDAY, JUNE 30 ---------- */
  { id:"tu-mainstage", day:"tue", start:"08:15", end:"09:30", time:"8:15–9:30 AM",
    title:"Tuesday Mainstage", stream:"iste",
    where:"OCCC West", who:"", desc:"Tuesday morning keynote.", link:null },

  { id:"tu-expo", day:"tue", start:"09:30", end:"17:00", time:"9:30 AM–5:00 PM",
    title:"Expo / Solutions Hub open", stream:"iste",
    where:"OCCC West", who:"", desc:"Exhibit hall open.", link:null },

  { id:"tu-ms2", day:"tue", start:"10:00", end:"11:00", time:"10:00–11:00 AM",
    title:"Start with the Learner and Let the Tools Follow", stream:"dell-room",
    where:"W306AB", who:"Geri Gillespy (Msft) / Jeremiah",
    desc:"Great AI integration in schools starts with one question: who are we really designing for? This session centers the learner and explores how educators and instructional coaches can use Microsoft tools and resources to support teaching, reflection, and differentiation. Every student in the room belongs here, including those with diverse learning needs and those who need additional support. Expect practical ideas, honest conversation, and strategies you can bring back to your classroom and team right away.", link:null },

  { id:"tu-google", day:"tue", start:"10:00", end:"11:00", time:"10:00–11:00 AM",
    title:"Empowering Excellence: Navigating the Google Ecosystem for K12 Success", stream:"dell-hyatt",
    where:"Hyatt Regency · Gulf Conference Room", who:"Matt Spears",
    desc:"An interactive customer advisory session for K12 decision-makers: how leading districts use Google technology to drive measurable outcomes, and the support frameworks needed to sustain momentum. Share your vision, help influence the roadmap, and explore what it means to be fully supported in a Dell and Google environment.",
    link:null },

  { id:"tu-wellness", day:"tue", start:"11:00", end:"12:00", time:"11:00 AM–12:00 PM",
    title:"Student Wellness in a Digital World: Designing for Belonging and Balance", stream:"dell-room",
    where:"W306AB", who:"Marlo",
    desc:"Discover how schools can create learning environments that nurture student mental health, foster belonging, and promote healthy digital habits. Explore practical, student-centered strategies to strengthen wellbeing, build inclusive communities, and support balance in an always-connected world.",
    link:null },

  { id:"tu-dunkers", day:"tue", start:"12:00", end:"13:00", time:"12:00–1:00 PM",
    title:"Data Dunkers: Slam-Dunk Data Science for Students", stream:"dell-room",
    where:"W306AB", who:"Katina",
    desc:"Turn basketball, movement, teamwork, and student-generated stats into a powerful gateway to data science. See how students collect, analyze, and communicate data while building math skills, collaboration, AI literacy, and the durable skills they need to thrive.",
    link:null },

  { id:"tu-lunch", day:"tue", start:"12:30", end:"13:00", time:"12:30–1:00 PM",
    title:"Lunch break", stream:"iste",
    where:"", who:"", desc:"ISTE lunch break.", link:null },

  { id:"tu-aieverywhere", day:"tue", start:"13:00", end:"14:00", time:"1:00–2:00 PM",
    title:"AI is Everywhere! Now What? A Practical Planning Session to Build District Capacity", stream:"dell-room",
    where:"W306AB", who:"Jeremiah",
    desc:"AI is moving fast, but schools still need to keep what matters most at the center. Successful implementation starts with people, not technology. Review how districts build capacity across the system while keeping learning, relationships, and student development central. Leave with your own plan for building capacity.",
    link:null },

  { id:"tu-cte", day:"tue", start:"14:00", end:"15:00", time:"2:00–3:00 PM",
    title:"Future-Ready Graduates: Building Workforce Pathways Through CTE & STEM", stream:"dell-room",
    where:"W306AB", who:"Nekia + Keya",
    desc:"Discover how leading districts build scalable CTE and STEM pathways aligned to workforce needs and student passions. Explore real-world examples, actionable strategies, and ready-to-use next steps to bring Prepare and Empower to life in your classroom or district.",
    link:null },

  { id:"tu-digcit", day:"tue", start:"15:00", end:"16:00", time:"3:00–4:00 PM",
    title:"Digital Citizenship in the Age of AI and Misinformation", stream:"dell-room",
    where:"W306AB", who:"Marlo",
    desc:"Empower students to become informed, responsible, and confident digital citizens in a world shaped by AI and misinformation. Explore classroom-ready strategies that help learners evaluate information critically, engage safely and ethically online, and navigate AI-generated content with confidence.",
    link:null },

  { id:"tu-voice", day:"tue", start:"16:00", end:"17:00", time:"4:00–5:00 PM",
    title:"Student Voice to Civic Action: Empowering Learners as Changemakers", stream:"dell-room",
    where:"W306AB", who:"Nekia + Discovery Education",
    desc:"Ready to turn student ideas into real-world impact? Discover how to amplify student voice and transform it into meaningful civic action. Explore inspiring examples, uncover practical strategies you can use right away, and map out clear next steps.",
    link:null },

  { id:"tu-google-social", day:"tue", start:"17:00", end:"19:30", time:"5:00–7:30 PM",
    title:"Google for Education After School Partner Social — 90s-themed mixer", stream:"partner",
    where:"Tin Roof, Orlando", who:"Google for Education",
    desc:"", link:{label:"Register", url:"https://notifications.googleapis.com/email/redirect?t=AFG8qyXgsJh_yir_DjBR36dQwH0BVW8ULLjF6xBMYGA5jwUW5ofecI-5bK6upPekdwGQzzfBDCJi09T_lNwa92CAAxSEGqDkn91JAhkkhy0oF7jIRg4ACLuYq7_kg8tCrkiV6gYhTMfLlrUmpymMbBcqzTmjB97hjT25GPfTDeIPEcpXiuFzzOXq14z3zQ9U7YiLJOi01N9hywWAV6K_N7eXJx5zXYsOTgnJ3tfxkUvUrqW8TvaukgehE5WIAGjcJ3V7ACK2X92i1gehZn-HfoBVx75YNg-OCHLF0efcz4P2TozXb_cd_W5L6f4aGMt0Og&r=eJwFwUEKwCAMBMAXaaCHHvoblUUD1kiy2O93ZpA7HhGPs_OnHN2sT-Rmr-BgMWQX54KnhonqhWorFSYNYurBdf-IvhoL&s=ALHZ2r6e-D9IB2patUAXIFVy4Pq__"} },

  { id:"tu-canam", day:"tue", start:"17:30", end:"19:30", time:"5:30–7:30 PM",
    title:"35th Can/Am Reception · ISTE 2026", stream:"partner",
    where:"Hyatt Regency Orlando · Lounge and Patio", who:"Hosted by MindShare Learning Technology",
    desc:"",
    link:{label:"Register on Eventbrite", url:"https://www.eventbrite.com/e/35th-canam-reception-iste-2026-tickets-1989605123483"} },

  /* ---------- WEDNESDAY, JULY 1 ---------- */
  { id:"we-expo", day:"wed", start:"08:30", end:"13:00", time:"8:30 AM–1:00 PM",
    title:"Expo / Solutions Hub open", stream:"iste",
    where:"OCCC West", who:"", desc:"Final day — hall closes at 1:00 PM ahead of the Closing Mainstage.", link:null },

  { id:"we-laptop", day:"wed", start:"09:00", end:"11:00", time:"9:00–11:00 AM",
    title:"What If the Laptop Could Run AI All on Its Own?", stream:"dell-room",
    where:"W306AB", who:"Jeremiah / Snow",
    desc:"What becomes possible when the laptop runs the AI itself — no cloud required? This closing session is about honest exploration. Get hands-on with what AI PCs can already do when the work stays on the device: faster, more private, ready even offline. Scout where it genuinely fits your school, and just as honestly where it does not. Find a real fit, and you can apply to join Intel's AI Ready Schools program.",
    link:null },

  { id:"we-closing", day:"wed", start:"13:15", end:"14:30", time:"1:15–2:30 PM",
    title:"Closing Mainstage", stream:"iste",
    where:"OCCC West", who:"", desc:"Conference closing keynote.", link:null },
];

/* --- Dell at ISTE — at-a-glance facts for the Logistics page. --- */
const PRESENCE = [
  { l:"Sponsorship", v:"Gold Sponsor" },
  { l:"Vendor partner", v:"Microsoft" },
  { l:"Our room", v:"W306AB · OCCC West" },
  { l:"1:1 meetings", v:"Hyatt Gulf · book via Jiffle" },
  { l:"Customer event", v:"EPCOT Mexico Vista · Mon 8–10 PM" },
  { l:"Dates", v:"June 28 – July 1, 2026" },
];

/* --- Venues --- */
const VENUES = [
  { name:"Sponsor Room — W306AB",
    where:"Orange County Convention Center · West Building",
    hours:"Mon & Tue 8:00 AM–5:00 PM · Wed 8:00 AM–2:00 PM · Sun closed (special event)",
    note:"Our hub — a main stage for thought-leadership sessions, a curated K-12 product and solutions showcase, and a drop-in zone for customer conversations." },
  { name:"Meeting Room — Hyatt Gulf",
    where:"Hyatt Regency Orlando · Gulf Conference Room · Conference Level (cap. 20)",
    hours:"Sun 12–5 · Mon 9–5 · Tue 9–5 · Wed 9–2",
    note:"One-on-one district meetings (book via Jiffle, which opens June 1 — all requests reviewed before approval), plus the Future of Education think tank and the Google advisory session." },
];

/* --- Key contacts. Add a phone/email in 'detail' as you get them. --- */
/* Contact detail intentionally blank for now — add phone/email later if wanted. */
const CONTACTS = [
  { name:"Kelsey", role:"On-site escalation — first call if something breaks", detail:"" },
  { name:"April Silva", role:"Customer meetings (with Lucy Howland)", detail:"" },
  { name:"Lucy Howland", role:"Customer meetings", detail:"" },
  { name:"Jennifer Hebert", role:"CxO Dinner host (Sun)", detail:"" },
];

/* --- Key links --- */
const LINKS = [
  { label:"Jiffle — request a customer meeting", note:"Opens June 1 · all requests reviewed",
    url:"https://delltechnologies.jifflenow.com/app/login#meeting_list" },
  { label:"Customer Appreciation registration (EPCOT)", note:"Mon 8–10 PM · cap 250 · register early",
    url:"https://events.dell.com/event/9864ed59-8c9e-47df-8ade-71c3fd3f0c14/regProcessStep1" },
  { label:"Customer landing page / agenda", note:"",
    url:"https://events.dell.com/event/9864ed59-8c9e-47df-8ade-71c3fd3f0c14/ISTEagenda" },
  { label:"Customer invitation", note:"",
    url:"https://dell.sharepoint.com/:u:/s/NAFieldExperiential9/IQAXP2M8TD34S6UqefxQuR-2Aa2EXDTyxe3VktTsUfVfb70" },
  { label:"ISTE internal site (SharePoint)", note:"Bookmark this",
    url:"https://dell.sharepoint.com/sites/na-sled-marketing/SitePages/ISTE-2026.aspx" },
  { label:"Dell Attendee Sheet", note:"Who's coming from Dell",
    url:"https://dell-my.sharepoint.com/:x:/r/personal/lucy_howland_dell_com/Documents/ISTE%20Dell%20Attendee%20Tracking.xlsx?d=wa2378854a61a4046bc6eb90ae8fb3412&csf=1&web=1&e=aNUgBg&nav=MTVfe0NDNkIyNTc3LTQ3NkItNDAzRi05RTIzLTQwQ0JDNDgxNEYzOH0" },
  { label:"ISTE program search (full session catalog)", note:"",
    url:"https://conference.iste.org/2026/program/search" },
];

/* --- Meeting guidance (shown as a collapsible card in Logistics) --- */
const MEETING_GUIDE = {
  why: [
    "Differentiate Dell as a strategic partner, not just a vendor",
    "Influence executive decision-makers (superintendent, CFO, cabinet)",
    "Shift the conversation from price/specs to outcomes and impact",
    "Re-engage or reposition Dell where momentum is weak",
    "Support large or high-visibility opportunities with executive engagement",
    "Secure clear next steps and decision alignment",
  ],
  postpone: [
    "Unclear district priorities or budget uncertainty",
    "Leadership transitions (superintendent / board changes)",
    "Active competitive procurement processes",
    "Unresolved vendor / device performance issues",
  ],
  bring: [
    "Key desired outcome of the meeting",
    "District demographics — enrollment, growth, community profile",
    "Strategic context — 3–5 year plan, metrics, upcoming initiatives",
    "Infrastructure — current tech maturity and digital learning capability",
    "Financial — budget cycles, funding sources, procurement process",
    "Current and past Dell partnership — programs, purchase power",
  ],
  contact: "Questions on customer meetings: April Silva & Lucy Howland.",
};

/* --- A couple of loose notes that don't sit on the clock --- */
const NOTES = [
  "Meet Michelle from Logics Academy — flexible (breakfast / lunch / dinner). Coordinate with Katina.",
];
