// Content for the Build It Here sprint companion. Edit copy here.
const PHASES = [
  {
    id: "open", tab: "Open", color: "--open",
    mode: `set the stakes · pick your launch pad · ~11 min`,
    title: `You are here to design, not to listen.`,
    lede: `In the next 90 minutes your team builds a student program your school could actually run, the kind of thing students could be doing next semester. You are building a program, not buying a product. The boldest ideas earn Dell support to pilot for real.`,
    body: `<div class="block"><div class="callout action"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span class="verb">Form your team</span><span class="callout-sub">~3 min</span></div><div class="callout-body"><ul class="steps"><li>Get into a team of <b>3 to 4</b>, then pick a name and a notetaker.</li><li>Skim the four launch pads below and notice which could fit your students. You will choose your move in Ideate.</li></ul></div></div></div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>Four launch pads · adopt, remix, shrink, or beat</div>
<div class="cards">
<div class="card"><h4>Student TechCrew</h4><div class="role">student-run · service · career-facing</div><p>Students earn certification and run a help desk, supporting peers and staff with their devices.</p><p class="role">Grows: troubleshooting, customer service, career readiness.</p><div class="meta-row"><span class="tag">scale: club → course</span><span class="tag lane">lane: tech</span></div><a class="card-link" href="https://www.dell.com/en-us/lp/student-tech-crew" target="_blank" rel="noopener">Explore the program &rarr;</a></div>
<div class="card"><h4>Girls Who Game</h4><div class="role">team challenge · confidence · STEM</div><p>Teams take on game-based design challenges that build confidence and STEM problem-solving.</p><p class="role">Grows: collaboration, creativity, leadership.</p><div class="meta-row"><span class="tag">scale: club / cohort</span><span class="tag lane">lane: esports / coding</span></div><a class="card-link" href="https://www.dell.com/en-us/lp/dt/girls-who-game" target="_blank" rel="noopener">Explore the program &rarr;</a></div>
<div class="card"><h4>Data Dunkers</h4><div class="role">data + play · grades 5–12</div><p>Students dig into real NBA and WNBA data with notebooks to find and tell data stories. Drops into a math class.</p><p class="role">Grows: data literacy, coding, storytelling.</p><div class="meta-row"><span class="tag">scale: one-shot → course</span><span class="tag lane">lane: data</span></div><a class="card-link" href="https://datadunkers.ca/" target="_blank" rel="noopener">Explore the program &rarr;</a></div>
<div class="card"><h4>Localized Builds</h4><div class="role">your community · your need</div><p>Short, local design challenges or maker builds tied to a real need in your own school or town.</p><p class="role">Grows: design thinking, problem solving, student agency.</p><div class="meta-row"><span class="tag">scale: one-shot / short</span><span class="tag lane">lane: maker</span></div></div>
</div>
<p class="role" style="margin-top:13px">Each one runs at more than one scale. You will choose how to use them in Ideate. Invent your own is always on the table.</p>
</div>`
  },
  {
    id: "frame", tab: "Frame", color: "--frame",
    mode: `empathize + define · broad to narrow · ~18 min`,
    title: `Start with the student, and the future they are walking into.`,
    lede: `Before you design a single thing, ground in a real learner and the world they are heading into. Open wide and fast, then close onto one sharp outcome the whole design answers to.`,
    body: `<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>It already exists · the future is the present</div>
<ul class="steps">
<li><b>AI is already an everyday study partner.</b> Not coming. In your students' pockets, on tonight's homework.</li>
<li><b>AI agents now do multi-step work, not just chat.</b> They book, research, and operate software start to finish.</li>
<li><b>The laptop runs AI on its own, offline.</b> The AI PC keeps it on the device, no cloud.</li>
<li><b>Robotaxis carry paying riders right now,</b> including here in Orlando.</li>
</ul>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>Futures signals · the world they will meet</div><details class="deeper"><summary>Go deeper: the four futures signals<span class="cnt">futures read</span></summary><div class="deeper-body"><p>A quick read on the world your students are walking into. Use it to sharpen who they need to become.</p><div class="grid2">
<div class="minicard"><h4>Work is being rewritten</h4><ul><li>People work alongside AI, not instead of it.</li><li>The decisive skill is knowing when to use the tools and when to lean on human judgment.</li></ul></div>
<div class="minicard"><h4>Knowing is not enough</h4><ul><li>Information is everywhere; the edge is asking good questions and checking what comes back.</li><li>Data and evidence shape everyday decisions.</li></ul></div>
<div class="minicard"><h4>Careers are projects, not titles</h4><ul><li>Students will reinvent their work repeatedly.</li><li>Collaboration, communication, and agency travel across every path.</li></ul></div>
<div class="minicard"><h4>The local still matters</h4><ul><li>Real problems show up in their own school and town.</li><li>Identity and community belong at the center, not the margins.</li></ul></div>
</div></div></details>
</div>
<div class="block">
<div class="callout action"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg><span class="verb">Ask yourselves</span><span class="callout-sub">broad, then narrow · talk it out</span></div><div class="callout-body">
<ul class="steps">
<li><span class="narrow">broad</span>What world are your students walking into? Name one thing that will be true of work, learning, or life that they will have to meet.</li>
<li><span class="narrow">broad</span>Picture one real student. A face, not a category. What do they already make, do, or care about, and where do they struggle?</li>
<li><span class="narrow">narrow</span>Hold that student next to that future. What is the one thing they need to grow in themselves that they do not have yet?</li>
</ul>
</div></div>
<details class="deeper"><summary>Go deeper: ground your goals and your realities<span class="cnt">framing method</span></summary>
<div class="deeper-body">
<p>The strongest programs are shaped around your classroom before a single activity is chosen. Pause on three questions: what do I want students to gain, how does this connect to what I already teach, and what real-world constraints will shape my plan.</p>
<h5>Step 1 · Define your goals</h5>
<p class="small">When students finish, what do you want them to walk away with?</p>
<ul><li>Confidence that they can build and make sense of things themselves.</li><li>Teamwork and persistence through challenge-based work.</li><li>Awareness of careers and pathways they had not pictured.</li><li>Deeper skills in your subject (reasoning, analysis, communication).</li></ul>
<h5>Step 2 · Connect to your students and curriculum</h5>
<ul><li><b>Math:</b> ratios, percentages, statistics, interpreting results.</li><li><b>CS / Tech:</b> coding concepts, tools, visualization, problem-solving.</li><li><b>General skills:</b> communication, collaboration, critical thinking.</li><li><b>Career readiness:</b> decision-making, applied work, role models.</li></ul>
<h5>Step 3 · Identify your realities</h5>
<table class="dtable"><tr><th>Reality</th><th>What to weigh</th></tr>
<tr><td>Time</td><td>Two half-days, one full day, after school, or short recurring blocks.</td></tr>
<tr><td>Space</td><td>A classroom, a lab, a shared space, the outdoors, or flexible setups.</td></tr>
<tr><td>Tech</td><td>1:1 devices, shared devices, limited connectivity.</td></tr>
<tr><td>Support</td><td>Solo, with a co-teacher, or with a partner or coach.</td></tr></table>
<p class="small">These three steps feed your outcome line directly: the goal becomes "students can / are becoming," the realities become your constraint.</p>
</div>
</details>
</div>
<div class="block">
<div class="callout capture"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 14l2 2 4-4"/></svg><span class="verb">Capture &rarr; Blueprint</span><span class="callout-sub">Section 1 · your outcome</span></div><div class="callout-body">
<p class="cap-lead">Define the outcome, the sharp line everything answers to.</p>
<ul class="steps">
<li>By the end of this program, our students can <b>______</b> and are becoming <b>______</b>.</li>
<li>The one constraint we will design around: <b>______</b></li>
<li>We will know it is working when we see <b>______</b></li>
</ul>
<p class="role">Could that line be any school's outcome? If yes, it is not done. Make it yours.</p>
<button class="bp-jump" data-bpfield="outcome">Write it in the Blueprint &rarr;</button>
</div></div>
</div>`
  },
  {
    id: "ideate", tab: "Ideate", color: "--ideate",
    mode: `pick your move · ~12 min`,
    title: `Two ways to go: adapt an existing program, or invent your own.`,
    lede: `With four models in hand and a sharp outcome on the table, this is a constrained choice, not a blank brainstorm. Adapting is not the lesser path. A sharp version of a proven program beats a shaky original, and shrinking is a win.`,
    body: `<div class="block"><div class="callout action"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/></svg><span class="verb">Decide: pick your move</span><span class="callout-sub">~5 min</span></div><div class="callout-body"><ul class="steps"><li><b>Adapt</b> one of the four. Adopt it as is, remix two, or shrink one to a single challenge.</li><li>Or <b>invent</b> your own to serve your outcome.</li><li>Use the scale ladder and adaptation grid below to shape the choice.</li></ul></div></div></div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>Ways to generate ideas · if you’re inventing</div>
<p class="role" style="margin-bottom:10px">Adapting a launch pad? Skip this. Inventing your own? These beat a blank-page brainstorm.</p>
<details class="deeper"><summary>Go deeper: five ways to generate ideas<span class="cnt">beyond brainstorming</span></summary>
<div class="deeper-body">
<ul>
<li><b>Brainwriting</b> — everyone writes ideas silently, then passes the page on to build on. Surfaces quiet voices and moves fast.</li>
<li><b>SCAMPER</b> — remix an existing idea by asking: Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse.</li>
<li><b>Worst possible idea</b> — design the worst program you can, then flip what makes it bad to find what good looks like.</li>
<li><b>Mind mapping</b> — put the problem in the center and branch outward; surfaces unexpected connections.</li>
<li><b>Reverse brainstorming</b> — ask “how could we make this worse?” then invert the answers.</li>
</ul>
<div class="links">
<a href="https://www.indeed.com/career-advice/career-development/idea-generation-techniques-besides-brainstorming" target="_blank" rel="noopener">18 idea-generation techniques<span class="note">beyond brainstorming</span></a>
<a href="https://www.teamly.com/blog/ideation-techniques/" target="_blank" rel="noopener">11 ideation techniques<span class="note">with how-tos</span></a>
</div>
</div>
</details>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>The scale ladder · pick the size that fits your outcome</div>
<table class="ladder">
<tr><th>Program type</th><th>What it is</th><th>A real example</th></tr>
<tr><td>One-shot challenge</td><td>Hours to a day, a single sitting</td><td>An afternoon data day; a one-day device-repair clinic; an AI prompt-a-thon</td></tr>
<tr><td>Short series</td><td>A few sessions</td><td>A four-week after-school maker sprint; a three-session AI ethics circle</td></tr>
<tr><td>Club or cohort</td><td>Ongoing, no credit, voluntary</td><td>A TechCrew help desk; a Girls Who Game team; a student AI advisory corps</td></tr>
<tr><td>Embedded in a class</td><td>Inside an existing course</td><td>Data work in a math unit; an AI-fluency module in ELA</td></tr>
<tr><td>For-credit course</td><td>A formal course</td><td>A semester applied-AI elective; a CTE pathway course</td></tr>
</table>
<details class="deeper"><summary>Go deeper: choose a format with eyes open<span class="cnt">full decision guide</span></summary>
<div class="deeper-body">
<p><b>You are choosing a packaging, not a different curriculum.</b> The same core program can run at any of these scales. What changes is pacing, facilitation, and depth, not the heart of the work.</p>
<table class="dtable">
<tr><th>Format</th><th>Best for</th><th>Time</th><th>Consider if you want…</th></tr>
<tr><td>One-shot / launch</td><td>First-timers, building excitement</td><td>Hours to 1 day</td><td>A reliable launch with minimal prep and strong engagement right away.</td></tr>
<tr><td>Unit (embedded series)</td><td>Deeper curricular ties</td><td>1–3 weeks of periods</td><td>More processing time and continuity inside your regular schedule.</td></tr>
<tr><td>Hack-a-thon</td><td>Clubs, events, high-energy rooms</td><td>1 day to multi-day</td><td>High energy, collaboration, and fast iteration around a clear challenge.</td></tr>
<tr><td>Embedded lessons</td><td>Ongoing integration</td><td>Scattered across the term</td><td>Steady, low-stakes exposure without carving out big blocks.</td></tr>
<tr><td>Club or cohort</td><td>Voluntary, ongoing engagement</td><td>Across the year</td><td>Student ownership, leadership, and community over time.</td></tr>
<tr><td>Project / course</td><td>Older students, capstones</td><td>Weeks to months</td><td>Independent inquiry, student-driven analysis, and applied projects.</td></tr>
</table>
<p class="tip">What students walk away with shifts by format: one-shot gives the full arc start to finish; a unit builds deeper skills through repetition; a hack-a-thon builds teamwork and fast iteration; embedded lessons build steady skills over time; a club or cohort builds ownership and leadership; a project builds independent, student-driven inquiry.</p>
<h5>Quick guide</h5>
<ul>
<li>Short on time? → One-shot.</li>
<li>Want ongoing exposure? → Embedded lessons.</li>
<li>Looking for excitement? → Hack-a-thon.</li>
<li>Want curricular connections? → Unit.</li>
<li>Ready for deep inquiry? → Project or course.</li>
</ul>
<p class="tip">Decide on three things at once: your goal (spark excitement or build long-term skills), your context (short bursts or a longer block), and your students (new to this, or ready for independent work).</p>
</div>
</details>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>The adaptation grid · reshape a launch pad to fit your students</div>
<div class="grid2">
<div class="minicard"><h4>Age &amp; grade</h4><ul><li>Younger: shorter activities, simpler materials, more movement.</li><li>Older: extended challenges, deeper analysis, project work.</li></ul></div>
<div class="minicard"><h4>Subject lens</h4><ul><li>Lean into the subject that connects most naturally.</li><li>You do not have to cover every lens.</li></ul></div>
<div class="minicard"><h4>Tech &amp; resources</h4><ul><li>Low tech: capture on paper, project as a class.</li><li>Shared or 1:1: roles and rotation, or independent extension.</li></ul></div>
<div class="minicard"><h4>Student readiness</h4><ul><li>New: pre-built starters and small wins.</li><li>Experienced: extend, debug, and mentor peers.</li></ul></div>
<div class="minicard"><h4>Diverse needs &amp; SEL</h4><ul><li>Multiple entry points: movement, visuals, build, talk.</li><li>Flexible grouping and roles that play to strengths.</li></ul></div>
<div class="minicard"><h4>Relevance &amp; representation</h4><ul><li>Use examples and role models that reflect your students.</li><li>Invite local questions and community data.</li></ul></div>
</div>
<details class="deeper"><summary>Go deeper: the full adaptation strategies<span class="cnt">every lens · concrete moves</span></summary>
<div class="deeper-body">
<p class="small">The core of a program stays the same: a hook, real student work, exploration, reflection, and celebration. What you adjust is complexity, pacing, and scaffolding so every student can get in.</p>
<h5>Age &amp; grade level</h5>
<table class="dtable">
<tr><th>Adapting for</th><th>Example strategies</th></tr>
<tr><td>Younger (upper elementary / early middle)</td><td>Shorten segments to 10–15 minutes. Use simplified materials and smaller datasets. Prioritize movement and hands-on collection. Scaffold the technical step with pre-built starters and fill-in-the-blank edits. Keep reflection verbal or visual.</td></tr>
<tr><td>Older (upper middle / high school)</td><td>Extend into full periods or projects. Let students design their own variations. Introduce larger, real-world materials. Encourage independent exploration. Ask for written reflections tied to standards.</td></tr>
<tr><td>Mixed-age (after school / club)</td><td>Use flexible grouping; pair older students as mentors. Keep hands-on tasks accessible while offering stretch goals. Provide multiple reflection options. Make teamwork and perseverance the shared theme.</td></tr>
</table>
<h5>Subject lens</h5>
<table class="dtable">
<tr><th>Lens</th><th>Example strategies</th></tr>
<tr><td>Movement / PE</td><td>Make movement and teamwork the entry point. Collect simple performance data. Keep the technical layer light with pre-built outputs. Celebrate effort and persistence.</td></tr>
<tr><td>Math</td><td>Focus on data literacy and math connections (ratios, percentages, mean, median, mode). Have students compute simple summaries before using tools. Link outputs to math concepts.</td></tr>
<tr><td>Computer Science / Tech</td><td>Highlight coding and problem-solving. Let students edit and extend the build. Use open-ended tasks for persistence and debugging. Let advanced students push further.</td></tr>
<tr><td>Career / CTE</td><td>Frame around real applications and careers. Connect to career clusters. Have students present as if to a client or community leader. Spotlight role models.</td></tr>
</table>
<p class="tip">Each lens highlights a different strength. Lean into the one that connects most naturally to your course; you do not have to cover them all.</p>
<h5>Tech &amp; resources</h5>
<table class="dtable">
<tr><th>Setting</th><th>Example strategies</th></tr>
<tr><td>Low-tech (limited / no devices)</td><td>Record data on paper. Enter class data into one device and project it. Use printed outputs instead of live tools. Emphasize movement, teamwork, and verbal reflection.</td></tr>
<tr><td>Shared devices (2–4 per group)</td><td>Assign roles (collector, builder, presenter) and rotate them. Have one student drive while others suggest. Use collaborative tools before importing.</td></tr>
<tr><td>1:1 devices</td><td>Each student collects and works their own. Encourage exploration beyond the base task. Provide optional extensions for fast finishers. Allow individual reflections.</td></tr>
<tr><td>Unreliable connectivity</td><td>Pre-download what you can for offline use. Work from local files. Keep a low-tech backup ready in case the connection drops.</td></tr>
</table>
<p class="tip">Your tech setup does not decide whether you can run a program, only how much independent exploration is possible. Every version still hits the core.</p>
<h5>Student readiness</h5>
<table class="dtable">
<tr><th>Adapting for</th><th>Example strategies</th></tr>
<tr><td>New to the work</td><td>Use pre-built starters with minimal edits. Model changes step by step. Celebrate small wins. Pair students with buddies for support.</td></tr>
<tr><td>Experienced</td><td>Encourage extending and customizing. Introduce troubleshooting challenges. Use open-ended tasks for creativity. Let them mentor peers.</td></tr>
<tr><td>Varied comfort levels</td><td>Scaffold with worked examples and vocabulary support. Offer multiple entry points. Allow verbal or visual explanations. Pair confident students with peers.</td></tr>
<tr><td>Anxious about the work</td><td>Start with approachable, low-stakes activities to build confidence. Demo as a whole class before individual work. Normalize mistakes and celebrate effort over perfection.</td></tr>
</table>
<h5>Diverse needs &amp; approaches</h5>
<table class="dtable">
<tr><th>Adapting for</th><th>Example strategies</th></tr>
<tr><td>Social-emotional learning</td><td>Set norms around perseverance, teamwork, and respect. Build in celebration moments. Recognize persistence as much as success.</td></tr>
<tr><td>Special education needs</td><td>Provide multiple entry points (movement, visuals, build). Use flexible grouping. Break tasks into smaller chunks with clear checkpoints. Use peer success partners.</td></tr>
<tr><td>English / multilingual learners</td><td>Use visuals, gestures, and numbers as universal entry points. Provide vocabulary cards with icons. Pair students strategically. Allow verbal or visual reflections.</td></tr>
<tr><td>Cultural relevance &amp; representation</td><td>Use data, examples, and role models that reflect students' communities. Invite students to bring local figures, questions, and datasets.</td></tr>
<tr><td>Varied learning styles</td><td>Rotate between movement, building, discussion, and reflection. Give students choice in how they present findings.</td></tr>
<tr><td>Different physical abilities</td><td>Offer multiple ways to participate and show learning. Let students choose roles that fit their comfort. Adapt physical tasks. Emphasize shared success over individual performance.</td></tr>
</table>
</div>
</details>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>Program as building blocks · you do not need them all</div>
<div class="cards">
<div class="card"><h4>Orientation</h4><p>Set the stage. A quick hook that shows the topic is everywhere and gets students in.</p></div>
<div class="card"><h4>Core challenge</h4><p>The active engagement. The hands-on work where students do the real thing.</p></div>
<div class="card"><h4>Reflection &amp; extension</h4><p>Deepen the impact. A pitch, a critique, a connection to careers or community.</p></div>
</div>
<details class="deeper"><summary>Go deeper: how to pick and combine components<span class="cnt">the building-block method</span></summary>
<div class="deeper-body">
<p>Think of your program as flexible building blocks, not a fixed script. You do not need to use them all. Pick the ones that align with your goals and context, then arrange them into a flow.</p>
<h5>Orientation (set the stage)</h5>
<ul><li>An icebreaker that shows the topic is everywhere in students' lives.</li><li>A short "notice and wonder" that surfaces students' own questions.</li><li>A real-world or career hook that connects the work to people who do it.</li></ul>
<h5>Core challenge (the active work)</h5>
<ul><li>The hands-on task where students collect, build, or make the real thing.</li><li>A problem-solving challenge that rewards persistence and teamwork.</li><li>A first "aha" where the tool or concept clicks.</li></ul>
<h5>Reflection &amp; extension (deepen the impact)</h5>
<ul><li>A short pitch or recommendation backed by what students made.</li><li>A reflection that connects the work to goals or personal growth.</li><li>An extension for fast finishers or a connection to careers and community.</li></ul>
<h5>Ready activities you can borrow</h5>
<ul>
<li><b>Data in everyday life</b> — students brainstorm where data already shows up for them (playlists, scores, weather, views), then turn it into questions worth chasing. <a href="https://docs.google.com/document/d/1YkTE-1TnGjiwf6dErO4zzm4H2L5to7MC8curlqqi0-4/edit" target="_blank" rel="noopener">activity doc &rarr;</a></li>
<li><b>Line-up and noticing data</b> — a no-tech icebreaker: students line up by a trait, then read what the line shows about data. <a href="https://docs.google.com/document/d/1Ui7c2PI0s7KUY7SQ4z2TU4xnpv7MEzH8wejXjdCC1go/edit?usp=sharing" target="_blank" rel="noopener">activity doc &rarr;</a></li>
<li><b>Student data pitch</b> — teams turn their data into a short, evidence-backed recommendation and pitch it.</li>
<li><b>Explore your data with AI</b> — students ask an AI tool what patterns it sees in their dataset, then check its answers for accuracy and bias. Builds data and AI literacy at once.</li>
<li><b>Beat the AI</b> — students predict an outcome, compare it against an AI&#39;s prediction, and discuss who was closer and why.</li>
</ul>
<p class="tip">One strong orientation plus one core challenge is already a complete program. Add reflection and extension when time and goals allow.</p>
</div>
</details>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>AI as a partner to think with · you steer, it drafts</div>
<p class="role" style="margin:-2px 0 12px">Four ready prompts. Copy one, fill the bracketed parts with your own context, then go back and forth until it fits your students.</p>
<div class="prompt">
<div class="prompt-top"><span class="name">Adapt an activity for your students</span><button class="copy" data-target="p1">Copy</button></div>
<pre id="p1">### Context: Our group is practicing <b>[subject/topic]</b> and will run an activity called <b>[name of activity]</b>. It currently involves <b>[what students usually do]</b>. This version needs <b>[adjustment needed]</b>.
### Role: Act as an instructional designer and pedagogical expert specializing in scaffolding and Universal Design for Learning (UDL).
### Action: Analyze the original activity and modify the instructions and tasks to <b>[adjustment needed]</b>. Focus on <b>[specific focus of the adjustments]</b>.
### Format: A side-by-side comparison table. Column 1: original task. Column 2: adjusted version. Column 3: a brief explanation of why the change matters.
### Target: <b>[age / grade level]</b> students who are <b>[any specific barriers, e.g. English language learners, or "completely new to the concept"]</b>.</pre>
</div>
<div class="prompt">
<div class="prompt-top"><span class="name">Create reflection prompts</span><button class="copy" data-target="p2">Copy</button></div>
<pre id="p2">### Context: We just finished an activity on <b>[topic / activity]</b>. I want to help students move from just "completing" the work to "processing" the experience. I need questions that spark deeper thinking, not yes/no answers.
### Role: Act as a metacognitive coach and educational psychologist specializing in reflective learning and a growth-mindset philosophy.
### Action: Generate 10 high-quality reflection questions, categorized into three tiers:
  - Process reflection (How did they solve problems? What strategies worked?)
  - Emotional / attitudinal reflection (How did they feel? What surprised them?)
  - Application / connection (How does this relate to their life or other subjects?)
### Format: A numbered list grouped by the three tiers, plus a brief Pro-Tip for facilitating a 5-minute "turn and talk" using them.
### Target: <b>[grade level]</b> students. Language should be <b>[simple and relatable / academic and rigorous]</b> for their age.</pre>
</div>
<div class="prompt">
<div class="prompt-top"><span class="name">Anticipate where students will struggle</span><button class="copy" data-target="p3">Copy</button></div>
<pre id="p3">### Context: I am preparing to facilitate an activity on <b>[concept / skill]</b>. It involves <b>[description of the activity]</b>. I want to anticipate challenges and be ready to support students through them.
### Role: Act as a veteran master teacher and instructional coach with 20 years of experience in pedagogical best practice.
### Action: Identify three specific pain points where students are most likely to struggle. For each, give:
  - The "Why": the common misconception or cognitive-load issue.
  - The "Check": one question I can ask to check for understanding.
  - The "Bridge": a concrete just-in-time support (a visual, an analogy, or a simplified step).
### Format: A "Teacher's Troubleshooting Guide" table with headers: Potential Challenge | The "Check" | The "Bridge".
### Target: <b>[grade level]</b> students. Make the "Bridge" strategies developmentally appropriate for their age and prior knowledge.</pre>
</div>
<div class="prompt">
<div class="prompt-top"><span class="name">Design extensions for fast finishers</span><button class="copy" data-target="p4">Copy</button></div>
<pre id="p4">### Context: I have a diverse group where some students finish the core work much faster than others. The current activity focuses on <b>[topic / standard]</b>. I need extensions that deepen understanding or allow creative application, not just "extra work."
### Role: Act as a gifted-and-talented education specialist and curriculum developer known for engaging, self-directed choice boards and anchor activities.
### Action: Generate three distinct extension options based on the lesson. Each should activate higher-order thinking and allow for learning transfer.
### Format: A clean, student-facing "menu card." For each option include: 1) a catchy title, 2) a two-sentence mini-challenge, 3) a short discussion topic to use with a peer.
### Target: <b>[grade level]</b> students who have mastered the basic concept and are ready for independent, high-interest challenges.</pre>
</div>
<div class="guardrail"><b>Keep it a conversation.</b> Review every suggestion with your own judgment, push back, and keep what is yours. Never share student names or any personally identifiable information with an AI tool.</div>
</div>
<div class="block"><div class="callout capture"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 14l2 2 4-4"/></svg><span class="verb">Capture &rarr; Blueprint</span><span class="callout-sub">Section 2 · name + concept</span></div><div class="callout-body"><p class="cap-lead">Name it, then say what it is in one line.</p><ul class="steps"><li><b>[Name]</b> is a <b>[scale]</b> program where students <b>[do what]</b> so they can <b>[outcome]</b>.</li></ul><button class="bp-jump" data-bpfield="concept">Write it in the Blueprint &rarr;</button></div></div></div>`
  },
  {
    id: "prototype", tab: "Prototype", color: "--prototype",
    mode: `build to think · ~25 min · the heart`,
    title: `Make something they can react to.`,
    lede: `A prototype is anything a person can interact with. You are not writing a plan, you are making a rough thing someone can respond to. The act of building surfaces the design and changes it, so capture on the Blueprint as you go and let the plan move.`,
    body: `<div class="block"><div class="callout action"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg><span class="verb">Sketch a prototype</span><span class="callout-sub">build to think · rough &amp; fast · ~10 min</span></div><div class="callout-body"><ul class="steps"><li>Pick <b>one</b> form from the menu below that tests your scariest unknown.</li><li>Make it rough. Minutes and cents, not polish. If the build shows the plan will not work, change the plan.</li></ul></div></div></div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>The prototype menu · pick the one form that tests your scariest unknown</div>
<div class="grid2">
<div class="minicard"><h4>Would anyone want this?</h4><ul><li>A recruitment brochure or flyer with a real "sign up here"</li><li>A landing page outline: headline, who it is for, one call to action</li><li>A pitch poster</li></ul></div>
<div class="minicard"><h4>What is the experience? <span style="color:var(--prototype)">(start here)</span></h4><ul><li>A storyboard of one student's journey, panel by panel <b>(default)</b></li><li>A mock interview with a "graduate," filmed or role-played</li><li>A short "in action" scene the team acts out</li></ul></div>
<div class="minicard"><h4>How does it run?</h4><ul><li>A program-at-a-glance map across the sessions or weeks</li><li>A role-play of day one</li><li>A resources-needed sketch</li></ul></div>
<div class="minicard"><h4>Rules of the build</h4><ul><li>Pick one form, not three.</li><li>Rough and fast over polished. Minutes and cents.</li><li>If the build shows the plan will not work, change the plan.</li></ul></div>
</div>
<p class="role" style="margin-top:10px">The mock interview is the sharpest gut-check: if the imaginary graduate cannot say who they became, the outcome is not real yet.</p>
<details class="deeper"><summary>Go deeper: weigh these before you commit<span class="cnt">things to consider</span></summary>
<div class="deeper-body">
<p>Before you lock the build, weigh what will make it work for your students.</p>
<table class="dtable">
<tr><th>Factor</th><th>What to weigh</th></tr>
<tr><td>Time available</td><td>Quick win: a ready-to-run activity. Longer option: let students shape more of it themselves.</td></tr>
<tr><td>Student readiness</td><td>Novices need highly scaffolded starting points. Advanced students can handle more open, messier work and make their own decisions.</td></tr>
<tr><td>Curriculum fit</td><td>Where does this align naturally? Science, social studies, math, CTE, ELA.</td></tr>
<tr><td>Tech access</td><td>Hands-on tools or a simpler entry point? Check connectivity and access to the sites and tools in advance.</td></tr>
<tr><td>Student relevance</td><td>Which issues matter most to your students, global or local? The right hook is what drives engagement.</td></tr>
</table>
<p class="tip">Start small and model the process together, build in student choice, and plan for messy reality (filters, smaller samples, or a clean version you provide).</p>
</div>
</details>
</div>
<div class="block">
<div class="callout capture"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 14l2 2 4-4"/></svg><span class="verb">Capture &rarr; Blueprint</span><span class="callout-sub">Sections 3 to 5 · the build</span></div><div class="callout-body"><p class="cap-lead">As you build, capture the program. Two passes: what students do and who leads, then what it takes to run.</p><ul class="steps"><li><b>What students actually do</b>, week to week or across the afternoon. <button class="bp-jump sm" data-bpfield="activities">Section 3 &rarr;</button></li><li><b>Who runs it, and how students lead.</b> <button class="bp-jump sm" data-bpfield="leads">Section 4 &rarr;</button></li><li><b>What it takes to run it</b>: places, people, hardware, software, time. <button class="bp-jump sm" data-bpfield="resources">Section 5 &rarr;</button></li></ul></div></div>
<details class="deeper"><summary>Go deeper: what it takes to actually run it<span class="cnt">run-it checklist</span></summary>
<div class="deeper-body">
<p>Your resources section gets real here. This is what running it actually asks for, before, during, and after.</p>
<h5>Before</h5>
<ul><li>Confirm who is participating and how many.</li><li>Check that your tools and sites work on your network, and have students try in advance.</li><li>Confirm start and end times, including any breaks.</li><li>Line up a reliable connection, and a projector, screen, power, and sound if you need them.</li><li>Create a shared space (a class site or folder) for links and student submissions.</li><li>Make sure you have the devices and the physical space your activity needs.</li><li>Introduce key vocabulary and a "where do we already see this?" warm-up.</li></ul>
<h5>During</h5>
<ul><li>Engage with students as they work, and support them through the challenge.</li><li>Keep any partners or co-facilitators in the loop.</li><li>Collect work into the shared space as you go.</li></ul>
<h5>After</h5>
<ul><li>Gather any remaining submissions.</li><li>Celebrate with your students.</li><li>Capture feedback while it is fresh, what worked and what you would change.</li></ul>
</div>
</details>
<details class="deeper"><summary>Go deeper: pull it together into a full plan<span class="cnt">plan + agenda options</span></summary>
<div class="deeper-body">
<p>When you are ready to move from sketch to a plan you can rely on, pull these pieces into one place. Treat it as a roadmap to guide you, not a script to lock you in, and share it with colleagues, a co-teacher, or a tech coach so everyone is aligned.</p>
<h5>What your plan should include</h5>
<ul><li><b>Goals</b> — what students should achieve.</li><li><b>Model &amp; agenda</b> — which format, and how time is structured.</li><li><b>Core activities</b> — which components you selected.</li><li><b>Adaptations</b> — adjustments for age, subject, readiness, or diverse needs.</li><li><b>Assessment</b> — how you will know it worked.</li><li><b>Logistics</b> — setup, grouping, and materials.</li><li><b>Support team</b> — who else helps on the day.</li></ul>
<h5>Agenda options</h5>
<table class="dtable">
<tr><th>Shape</th><th>How it runs</th></tr>
<tr><td>Single block (2–3 hrs)</td><td>One fast arc: hook, core challenge, make something, share. Best when you can secure space and devices in one window.</td></tr>
<tr><td>Two half-days</td><td>Day one: get started and hit the first "aha." Day two: deeper work, reflection, and celebration.</td></tr>
<tr><td>One full day (event)</td><td>High-energy launch where everything happens at once. Best for special events or kick-off days.</td></tr>
<tr><td>Across class periods</td><td>Shorter segments across a week or more. Great where daily exposure reinforces skills.</td></tr>
</table>
<p class="tip">Always open with something active, keep working sessions short with breaks to share, build in celebration at the end of each session, and be realistic: fewer things done well beats a rushed everything.</p>
</div>
</details>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>If your program is a student inquiry project</div>
<p style="font-size:16px;max-width:64ch">Some teams will design a project where students chase their own questions. That work has its own arc.</p>
<details class="deeper"><summary>Go deeper: the project cycle, Ask to Share<span class="cnt">coaching guide</span></summary>
<div class="deeper-body">
<p>Strong projects grow from curiosity and move through a full cycle: Ask, Collect, Analyze, Conclude, Share. Adapt or simplify the steps to fit your schedule and grade level.</p>
<h5>Ask · define a question that matters</h5>
<ul><li>Start with empathy: have students talk to peers, family, or community about what they notice or care about.</li><li>Connect to context: school, sports, health, environment, culture, things with visible or measurable data.</li><li>Narrow with the "Goldilocks" test: not too broad, not too small.</li></ul>
<p class="tip">Coaching: post draft questions on a wall or board and invite peers to comment on clarity and relevance before moving on.</p>
<h5>Collect · gather the right data</h5>
<ul><li>Choose a type: primary (collected by the class) or secondary (trusted open sources).</li><li>Plan tools: surveys, tally charts, observation logs, or existing datasets. Keep it ethical: no personal identifiers, consent first.</li><li>Check reliability and record context (when, where, what might affect results).</li></ul>
<p class="tip">Coaching: assign "data stewards" to verify entries and keep a clean dataset before analysis.</p>
<h5>Analyze · look for patterns and meaning</h5>
<ul><li>Organize and check for missing or strange values.</li><li>Visualize with more than one chart type to reveal different insights.</li><li>Use AI as a partner to think with ("what trends do you see?"), then verify before trusting it.</li><li>Compare and question: what surprises them, where bias might appear, who the data could help.</li></ul>
<p class="tip">Coaching: model curiosity by thinking aloud over a sample graph; it normalizes uncertainty and iteration.</p>
<h5>Conclude &amp; share · tell the story behind the numbers</h5>
<ul><li>Interpret: what supports or challenges the original question.</li><li>Reflect on impact: who benefits, what next steps a community could take.</li><li>Choose a format: infographic, short video, slide deck, or mini-report.</li><li>Credit sources and collaborators.</li></ul>
<p class="tip">Coaching: host a "data expo" or gallery walk where students present to peers, families, or community guests. Celebration reinforces purpose and pride.</p>
<h5>Keep in mind</h5>
<ul><li><b>Purpose and connection:</b> start with a question that matters to students and their community.</li><li><b>Feasible data:</b> encourage data they can actually access, not just web searches.</li><li><b>Iteration and reflection:</b> projects evolve through testing, visualizing, and rethinking.</li><li><b>Collaboration and voice:</b> support teams to represent their own perspectives and cultures.</li></ul>
</div>
</details>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>Real programs, real schools · proof it can be done</div>
<div class="snap">
<div class="snapcard"><div class="scale">one-shot · AI</div><h4>Day of AI</h4><p>Free, age-appropriate AI literacy from MIT RAISE, run in 30-minute to one-hour blocks. Students explore how AI works and create with it, as designers, not just users.</p><a class="go" href="https://dayofai.org" rel="noopener" target="_blank">dayofai.org →</a></div>
<div class="snapcard"><div class="scale">club → course · career</div><h4>Student-run help desk</h4><p>Burlington High School's "genius bar," one of the nation's first, and Bethlehem CSD's lobby help desk where students are the first line of IT support and earn certifications.</p><a class="go" href="https://bhshelpdesk.com" rel="noopener" target="_blank">bhshelpdesk.com →</a></div>
<div class="snapcard"><div class="scale">club / cohort · esports</div><h4>NASEF scholastic esports</h4><p>Free, state-approved curriculum where students run the club, serve on committees, and explore career pathways from analytics to event management. UC Irvine documented STEM gains.</p><a class="go" href="https://www.nasef.org" rel="noopener" target="_blank">nasef.org →</a></div>
<div class="snapcard"><div class="scale">project · community data</div><h4>The MFNERC data story</h4><p>A culturally grounded data project with the Manitoba First Nations Education Resource Centre. The model for small, local, identity-relevant student inquiry.</p><a class="go" data-dell-link="" href="#">add link →</a></div>
<div class="snapcard"><div class="scale">cohort · AI · national</div><h4>ISTE AI Innovator Challenge</h4><p>Student teams design a responsible solution with generative AI through a design sprint, then pitch it in a three-minute video. A national challenge with a 15-lesson studio and ready-made rubrics.</p><a class="go" href="https://iste-ascd.org/ai-innovator" rel="noopener" target="_blank">iste-ascd.org →</a></div>
</div>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>Challenges and hack-a-thons · run one, or borrow one</div>
<p style="font-size:16px;max-width:64ch">A challenge is one of the most flexible shapes a program can take. Two ways to run it. A <b>real-world challenge</b> is a single class or multi-day sprint around a theme you set. A <b>hack-a-thon</b> is a time-boxed event where teams dive into open data and pitch what they find. Themes can be sports, health, environment, or social impact, anchored by a question students care about, like "which strategy gives us the best chance?" or "how can data help our school cut waste?"</p>
<p class="prompt-q" style="margin-top:18px">Ready-made challenges you can open and try</p>
<p class="role" style="margin:-4px 0 10px">Each opens in your browser. Good to look at for structure, or to hand to students.</p>
<div class="links">
<a href="https://colab.research.google.com/github/Data-Dunkers/lessons/blob/main/challenges/open-data-intro.ipynb" target="_blank" rel="noopener">Open Data<span class="note">use your own city&#39;s open data</span></a>
<a href="https://colab.research.google.com/github/Data-Dunkers/lessons/blob/main/challenges/gapminder.ipynb" target="_blank" rel="noopener">Gapminder<span class="note">global development data</span></a>
<a href="https://colab.research.google.com/github/Data-Dunkers/lessons/blob/main/challenges/data-challenges.ipynb" target="_blank" rel="noopener">Data Challenges<span class="note">simplified: pets, Pok&eacute;mon, music</span></a>
<a href="https://colab.research.google.com/github/Data-Dunkers/lessons/blob/main/challenges/music-intro.ipynb" target="_blank" rel="noopener">Music<span class="note">Spotify data</span></a>
<a href="https://colab.research.google.com/github/callysto/hackathon/blob/master/HackathonNotebooks/Pets/pets-intro.ipynb" target="_blank" rel="noopener">Pets<span class="note">beginner-friendly</span></a>
<a href="https://colab.research.google.com/github/Data-Dunkers/lessons/blob/main/challenges/pokemon-intro.ipynb" target="_blank" rel="noopener">Pok&eacute;mon<span class="note">beginner-friendly</span></a>
<a href="https://colab.research.google.com/github/Data-Dunkers/lessons/blob/main/challenges/baseball-pitch-introduction.ipynb" target="_blank" rel="noopener">Baseball Pitches<span class="note">sports analytics</span></a>
<a href="https://www.impactedvisors.org/assets/Puzzle-Breakdown.html" target="_blank" rel="noopener">A challenge, solved step by step<span class="note">walkthrough</span></a>
</div>
<details class="deeper"><summary>Go deeper: bigger challenge collections<span class="cnt">notebook libraries</span></summary>
<div class="deeper-body">
<p>Open-ended collections to pull a challenge from, or remix into your own.</p>
<div class="links">
<a href="https://github.com/callysto/hackathon/blob/master/SustainabilityOnMars/CuriosityTrack/challenge-0.ipynb" target="_blank" rel="noopener">Bringing Pets to Mars<span class="note">sustainability scenario</span></a>
<a href="https://github.com/callysto/Indigenous-culture-through-math-and-code" target="_blank" rel="noopener">Indigenous Culture through Math and Code</a>
<a href="https://github.com/callysto/curriculum-notebooks" target="_blank" rel="noopener">Curriculum Notebooks Collection</a>
<a href="https://github.com/callysto/interesting-problems" target="_blank" rel="noopener">Interesting Problems</a>
<a href="https://github.com/callysto/data-viz-of-the-week" target="_blank" rel="noopener">Data Visualization Examples</a>
</div>
</div>
</details>
<details class="deeper"><summary>Go deeper: more challenges and hack-a-thons out there<span class="cnt">beyond this guide</span></summary>
<div class="deeper-body">
<p>Free, mostly K&ndash;12-friendly programs students can enter, or that you can model your own challenge on.</p>
<div class="links">
<a href="https://www.kaggle.com/" target="_blank" rel="noopener">Kaggle<span class="note">open datasets, beginner competitions, free courses</span></a>
<a href="https://www.drivendata.org/competitions/" target="_blank" rel="noopener">DrivenData<span class="note">data challenges with real social impact</span></a>
<a href="https://skewthescript.org/data-science-challenge" target="_blank" rel="noopener">Skew The Script: Data Science Challenge<span class="note">free, classroom-ready, intro to R</span></a>
<a href="https://globalyouth.wharton.upenn.edu/competitions/data-science/" target="_blank" rel="noopener">Wharton HS Data Science Competition<span class="note">free, team-based, sports analytics</span></a>
<a href="https://live.stemfellowship.org/big-data-and-ai-inquiry-and-experiential-learning/big-data-courses/high-school-big-data-challenge-2/" target="_blank" rel="noopener">STEM Fellowship HS Data Challenge<span class="note">no coding required, sustainability</span></a>
<a href="https://www.spaceappschallenge.org/" target="_blank" rel="noopener">NASA Space Apps Challenge<span class="note">global hackathon, open NASA data</span></a>
<a href="https://www.mlh.com/high-school-administrator-hackathon-guide" target="_blank" rel="noopener">Major League Hacking<span class="note">league, plus a guide to running a hackathon</span></a>
<a href="https://hackclub.com/" target="_blank" rel="noopener">Hack Club<span class="note">nonprofit network and HS hackathon directory</span></a>
</div>
</div>
</details>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>What good looks like · assessment</div>
<div class="minicard" style="background:var(--fog)">
<h4>Assessment is about growth, not grades</h4>
<p style="font-size:14.5px;color:#36424f;margin:0">Capture what students can do, how they persist, and the insight they reach. Lead with performance and reflection over tests.</p>
</div>
<details class="deeper"><summary>Go deeper: ways to assess, and a full task to model<span class="cnt">menu + GRASPS exemplar</span></summary>
<div class="deeper-body">
<h5>Ways to assess student learning</h5>
<ul>
<li><b>Performance tasks:</b> evaluate how well students collect, organize, and use what they make. Watch teamwork. Use checklists for participation and persistence.</li>
<li><b>Student reflections:</b> quick writes ("one thing I learned, one question I still have"), portfolio entries, or verbal circle shares.</li>
<li><b>Storytelling:</b> ask students to explain what their work shows and what it means, presented as if to a coach, client, or analyst.</li>
<li><b>Rubrics &amp; checklists:</b> keep it simple, effort, persistence, accuracy, interpretation, teamwork. Focus on growth, not technical perfection.</li>
</ul>
<h5>A real performance task you can model</h5>
<p class="small">This is a GRASPS task: it names the goal, the role, the audience, the situation, the product, and the success criteria. Use the shape; swap the content for your program.</p>
<table class="dtable">
<tr><td>Goal</td><td>Build and defend a 3-player starting lineup for a new expansion team within a $750,000 salary cap that can compete for a championship in year one.</td></tr>
<tr><td>Role</td><td>A junior data analyst on a small analytics team making data-driven roster recommendations.</td></tr>
<tr><td>Audience</td><td>The general manager and ownership group, who know the game but need your data to decide.</td></tr>
<tr><td>Situation</td><td>The league is expanding. Your team must build the inaugural roster within budget, using current player statistics. First you must figure out: in a 3-on-3 game, which stats actually translate to winning?</td></tr>
<tr><td>Product</td><td>Three things: a brief statistical rationale (the 2–3 stats that matter most), a 3–5 slide data-story deck with at least two visualizations and a one-sentence headline insight, and a 5-minute live pitch with 2 minutes of Q&amp;A that includes every team member.</td></tr>
</table>
<h5>Success criteria, in "I can" statements</h5>
<ul>
<li><b>Data analysis:</b> I can identify 2–3 stats that predict success and explain why each matters; calculate and compare them across players; and name patterns that shaped our picks.</li>
<li><b>Visualization &amp; communication:</b> I can make at least two clear, correctly-typed, labeled visualizations and build a deck that tells a clear data story from finding to recommendation.</li>
<li><b>Problem-solving:</b> I can write one headline insight tied to our decisions, and recommend a roster within the cap with every pick justified by data.</li>
<li><b>Technical execution:</b> I can use a data tool to organize, calculate, and visualize.</li>
<li><b>Collaboration:</b> I can describe my specific contribution and deliver a confident pitch with Q&amp;A.</li>
</ul>
</div>
</details>
</div>`
  },
  {
    id: "test", tab: "Test", color: "--testc",
    mode: `the critical friend · ~11 min`,
    title: `Put it in front of another team. Show, don't tell.`,
    lede: `Pair with the team next to you and trade feedback both ways. The goal is a design that survives someone else's eyes, not a polished pitch.`,
    body: `<div class="block">
<div class="callout action"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg><span class="verb">Critique with another team</span><span class="callout-sub">show, don't tell · trade both ways</span></div><div class="callout-body"><div class="proto">
<div class="row"><span class="n"></span><span>Show, don't tell. The maker team shows the prototype and says almost nothing. The friend reacts to what they see.</span><span class="time">~1 min</span></div>
<div class="row"><span class="n"></span><span>Warm. What is working, what is strong, what lands.</span><span class="time">~1–2 min</span></div>
<div class="row"><span class="n"></span><span>Cool, through the green-light lens below. Name what is not yet a clear yes.</span><span class="time">~2–3 min</span></div>
<div class="row"><span class="n"></span><span>Leave them one sharp "I wonder…" the team has to answer next.</span><span class="time">~1 min</span></div>
</div></div></div>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>The four green-light checks · the feedback lens</div>
<ul class="checks">
<li><span class="k">Real?</span><span class="t">It solves a problem your students or school actually have.</span></li>
<li><span class="k">Theirs?</span><span class="t">Students are the point, not the prop. Real skills, real voice, and where you can, they help run it.</span></li>
<li><span class="k">Safe &amp; fair?</span><span class="t">Age-appropriate, protects student data, open to every student.</span></li>
<li><span class="k">Can we run it?</span><span class="t">Realistic for your setting, and it could keep going past the first session.</span></li>
</ul>
<p class="role" style="margin-top:10px">"Theirs?" is the one most programs fail. If you pulled the students out, would it still be your program? It should not be.</p>
</div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>A simple, transparent rubric · growth over polish</div>
<p style="font-size:15.5px;max-width:64ch">If you want one lens for the whole thing, share it before you build and keep it single-point.</p>
<details class="deeper"><summary>Go deeper: the five-dimension rubric<span class="cnt">single-point criteria</span></summary>
<div class="deeper-body">
<table class="dtable">
<tr><th>Dimension</th><th>What a strong version looks like</th></tr>
<tr><td>Question &amp; relevance</td><td>Clear, actionable, and meaningful to the context.</td></tr>
<tr><td>Use of evidence</td><td>Appropriate sources, basic cleaning, and fit-for-purpose visuals.</td></tr>
<tr><td>Insight</td><td>One credible conclusion tied to evidence that acknowledges its limits.</td></tr>
<tr><td>Communication</td><td>A concise story, readable visuals, every voice included.</td></tr>
<tr><td>Teamwork</td><td>Shared roles, respectful collaboration, iterative improvement.</td></tr>
</table>
<p class="tip">Focus on growth and engagement, not technical perfection. The point is whether students can work with the ideas, not whether the output is flawless.</p>
</div>
</details>
</div>`
  },
  {
    id: "revise", tab: "Revise", color: "--testc",
    mode: `act on the feedback · ~6 min`,
    title: `Make one change that matters.`,
    lede: `You do not have time to rebuild, and you should not. Pick the one or two changes that most improve your program, starting with the "I wonder" your friend left you. Update your prototype and your Blueprint.`,
    body: `<div class="block"><div class="callout action"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg><span class="verb">Revise</span><span class="callout-sub">one change that matters · ~6 min</span></div><div class="callout-body">
<ul class="steps">
<li><b>Answer the question.</b> What is the smallest change that addresses your friend's "I wonder"?</li>
<li><b>Update the Blueprint.</b> Change the field the feedback touched, not the whole thing.</li>
<li><b>Name it for what it is.</b> Revising after feedback is the skill, not a sign the first idea was wrong. It is the whole game.</li>
</ul>
</div></div></div>`
  },
  {
    id: "share", tab: "Share", color: "--share",
    mode: `spotlight + commit · ~7 min`,
    title: `Spotlight a few, then everyone commits.`,
    lede: `The deep feedback already happened with your critical friend, so this is light. Read the room: lightning pitches if the group is small, pair-shares or a gallery walk if it is large, so every team is seen without burning the clock.`,
    body: `<div class="block"><div class="callout action"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98"/><path d="M15.41 6.51l-6.82 3.98"/></svg><span class="verb">Spotlight, then commit</span><span class="callout-sub">read the room · ~7 min</span></div><div class="callout-body"><ul class="steps"><li>A few teams share: your name and the one line, about 60 seconds each.</li><li>Pick a format below that fits your group size, then everyone commits.</li></ul></div></div></div>
<div class="block">
<div class="block-label"><span class="mtag ref">Reference</span>Showcase formats · pick one or two</div>
<div class="cards">
<div class="card"><h4>Lightning talks</h4><p>60–90 seconds: the question, one visual, the team's number-one move.</p></div>
<div class="card"><h4>Gallery walk</h4><p>Post a one-pager and a sketch; peers circulate with "I notice / I wonder / next step."</p></div>
<div class="card"><h4>Coach's huddle</h4><p>Small groups present to a rotating panel for quick questions and feedback cards.</p></div>
<div class="card"><h4>Community pitch</h4><p>Invite a counselor, a CTE teacher, or a local partner to hear two-minute pitches.</p></div>
</div>
<details class="deeper"><summary>Go deeper: run a real showcase<span class="cnt">artifacts · recognition · logistics · equity</span></summary>
<div class="deeper-body">
<h5>All five formats</h5>
<table class="dtable">
<tr><td>Lightning talks</td><td>60–90 seconds. One speaker per team shares the question, one or two visuals, and the team's number-one recommendation.</td></tr>
<tr><td>Gallery walk</td><td>Teams post a one-pager and a graph; peers circulate leaving "I notice / I wonder / next step" notes.</td></tr>
<tr><td>Coach's huddle</td><td>Small groups present to a rotating "coach panel" (you plus guests) for quick Q&amp;A and feedback cards.</td></tr>
<tr><td>Demo</td><td>A 3-minute live walkthrough of the build and how the team validated their insight.</td></tr>
<tr><td>Community pitch</td><td>Invite a counselor, a CTE teacher, or a local partner to hear 2-minute pitches and offer real-world ties.</td></tr>
</table>
<h5>Artifacts to capture (aim for one visual + one narrative per team)</h5>
<ul><li><b>One-pager:</b> question, sources, key graph, two or three findings, recommendation.</li><li><b>Signature visual:</b> one clean, labeled figure with a title and units.</li><li><b>Process snapshot:</b> a photo of the whiteboard or a slide showing how the team iterated.</li><li><b>30-second video:</b> each member states one insight or "next play."</li></ul>
<h5>Recognition that builds belonging</h5>
<ul><li><b>Shout-outs:</b> name teamwork, persistence, clear visuals, clever problem-solving, community impact.</li><li><b>Badges:</b> quick digital stickers ("clutch communicator," "tenacious teammate").</li><li><b>Wall of wins:</b> post work with brief captions in the room or your class site.</li><li><b>Student voice:</b> invite a few teams to share a one-minute "what we would do next."</li></ul>
<h5>Quick logistics checklist</h5>
<ul><li>Finalize the order and timing.</li><li>Export any visuals ahead of time and test live demos.</li><li>Prepare feedback slips or a simple form for audience notes.</li><li>Assign roles: emcee, timekeeper, tech helper, photographer.</li><li>Secure guests if you want them: counselor, coach, CTE teacher, partner.</li></ul>
<h5>Equity &amp; care</h5>
<ul><li>Make sure every student has a speaking role or a contribution on display.</li><li>Invite multiple ways to share, spoken, visual, or written, with sentence starters.</li><li>Normalize iteration: celebrate revisions and lessons learned, not just polished outputs.</li></ul>
</div>
</details>
</div>
<div class="block">
<div class="callout capture"><div class="callout-head"><svg class="ico" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 14l2 2 4-4"/></svg><span class="verb">Capture &rarr; Blueprint</span><span class="callout-sub">Section 6 · your first move</span></div><div class="callout-body"><p class="cap-lead">Name your first move, then submit.</p><ul class="steps"><li><b>Your first move back home.</b> Not a 30-day plan, the very next thing: book the room, pitch my principal, email the three teachers I need.</li><li><b>Drop your Blueprint in the pilot pool.</b> The Dell Education Team reviews every submission, and selected programs get support to launch a real pilot.</li></ul><button class="bp-jump" data-bpfield="firstmove">Write your first move &rarr;</button><div class="links" style="margin-top:12px"><a data-dell-link="" href="#">Submit your Blueprint to the pilot pool<span class="note">add form link</span></a></div></div></div>
</div>`
  },
];

const BLUEPRINT_FIELDS = [
  {
    key: "outcome", num: "01 · from Frame",
    title: `Student outcome, constraint, and one sign of success`,
    hint: `By the end, our students can ___ and are becoming ___. The constraint. What we will see if it is working.`,
    placeholder: `By the end, our students can… / The constraint… / We will know it is working when…`
  },
  {
    key: "concept", num: "02 · from Ideate",
    title: `Program name and one-line concept`,
    hint: `[Name] is a [scale] program where students [do what] so they can [outcome].`,
    placeholder: `[Name] is a [scale] program where students [do what] so they can [outcome].`
  },
  {
    key: "activities", num: "03 · from Prototype",
    title: `What students actually do`,
    hint: `Week to week, or across the one afternoon. Concrete.`,
    placeholder: `Week to week, or across the one afternoon. Be concrete.`
  },
  {
    key: "leads", num: "04 · from Prototype",
    title: `Who runs it, and how students lead`,
    hint: `Grades, roles, and how much sits in students' hands.`,
    placeholder: `Led by…  Students lead by…`
  },
  {
    key: "resources", num: "05 · from Prototype",
    title: `Resources to make it run`,
    hint: `Places, people, hardware, software, and time, at your scale.`,
    placeholder: `Places…  People…  Hardware…  Software…  Time…`
  },
  {
    key: "firstmove", num: "06 · from Prototype",
    title: `Your first move back home`,
    hint: `The very next thing you will do.`,
    placeholder: `On Monday I will…`
  },
];


const RESOURCES = [
  { title:"Facilitator quick links", open:true, note:"Handy to pull up live during the session.", links:[
    { label:"Data Dunkers \u00b7 Overview", url:"https://www.wevideo.com/view/3578548266", note:"video" },
    { label:"Data Dunkers \u00b7 In action", url:"https://www.wevideo.com/view/3909445586", note:"video" },
  ]},
  { title:"Design process and frameworks", links:[
    { label:"From Problems to Possibilities: Design Thinking in the Classroom", url:"https://mackinlearning.com/from-problems-to-possibilities-design-thinking-in-the-classroom/", note:"primer" },
    { label:"The Design Thinking Process", url:"https://www.youtube.com/watch?v=_r0VX-aU_T8", note:"short video" },
    { label:"Design Thinking for 11th Graders", url:"https://oercommons.org/authoring/61491-design-thinking-for-11th-graders/view", note:"full classroom example" },
    { label:"Engineering Design Process", url:"https://www.teachengineering.org/k12engineering/designprocess", note:"alternative framework" },
    { label:"What is Project-Based Learning?", url:"https://www.pblworks.org/what-is-pbl", note:"alternative framework" },
  ]},
  { title:"Understanding your users \u00b7 empathy and define", links:[
    { label:"Empathy Mapping", url:"https://www.interaction-design.org/literature/article/empathy-mapping-the-first-step-in-design-thinking", note:"tool" },
    { label:"Teaching Empathy Through Design Thinking", url:"https://www.edutopia.org/blog/teaching-empathy-through-design-thinking-rusul-alrubail", note:"Edutopia" },
    { label:"Writing good empathy questions", url:"https://www.mural.co/blog/design-thinking-empathize", note:"how-to" },
    { label:"Empathy interview techniques", url:"https://webdesign.tutsplus.com/techniques-of-empathy-interviews-in-design-thinking--cms-31219a", note:"how-to" },
    { label:"Students Are Using AI Already", url:"https://www.edsurge.com/news/2024-03-19-students-are-using-ai-already-here-s-what-they-think-adults-should-know", note:"student voice" },
  ]},
  { title:"Prototyping and testing", links:[
    { label:"Rapid Prototyping for Beginners", url:"https://www.freecodecamp.org/news/a-beginners-guide-to-rapid-prototyping-71e8722c17df/", note:"freeCodeCamp" },
    { label:"Design Sprints for Education", url:"https://edtech-class.com/2023/06/16/introducing-students-to-design-thinking-using-a-design-sprint/", note:"facilitation" },
    { label:"Prototype and Test in Design Thinking", url:"https://www.interaction-design.org/literature/article/stage-4-in-the-design-thinking-process-prototype", note:"primer" },
    { label:"Gallery Walk protocol", url:"https://pz.harvard.edu/sites/default/files/Gallery-Walk.pdf", note:"Harvard Project Zero" },
  ]},
  { title:"Themes and standards to anchor a program", links:[
    { label:"UN Sustainable Development Goals", url:"https://sdgs.un.org/goals", note:"challenge themes" },
    { label:"ISTE Standards for Students", url:"https://iste.org/standards/students", note:"alignment" },
    { label:"ISTE Digital Citizenship", url:"https://iste.org/digital-citizenship", note:"alignment" },
    { label:"Intel Skills for Innovation", url:"https://skillsforinnovation.intel.com/landing/index.html", note:"ready projects" },
  ]},
];
