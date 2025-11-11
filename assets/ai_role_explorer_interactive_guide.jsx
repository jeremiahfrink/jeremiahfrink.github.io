import React, { useMemo, useState } from "react";

// AI Role Explorer – Interactive Guide
// Simplified: Removed clipboard copy functionality and debug/self-test UI for maximum stability.
// Content texts (prompts/purposes/starters/blurbs) remain EXACTLY the same.

// =============== Data ==================
// Notes:
// - TailwindCSS-only UI for portability in this preview.
// - Dataset includes content from the provided document PLUS the grade-banded ideas we generated.
// - Filters: Role → Stakeholder → (optional) Grade band. Search filters prompts too.
// - Each prompt shows its purpose.

const ROLES = [
  {
    id: "assistant",
    name: "AI as an Assistant",
    blurb:
      "Takes repetitive or time-consuming tasks off your plate. Keeps things efficient and clear. Asks clarifying questions when needed.",
    starter:
      "I want you to act as my assistant. Your job is to take repetitive or time-consuming tasks off my plate. Ask clarifying questions if needed, but keep things efficient and clear. Don’t overcomplicate or guess—just help me move faster and cleaner.",
    stakeholders: {
      "Educator/Admin": [
        {
          prompt: "Draft a welcome message for families in multiple languages.",
          purpose:
            "Include warm tone, translation, and culturally relevant references.",
        },
        {
          prompt:
            "Generate a rubric for a project-based learning unit on environmental justice.",
          purpose:
            "Ask for customization by grade level and inclusion of student voice/choice.",
        },
        {
          prompt:
            "Write a weekly newsletter blurb that summarizes recent classroom activities and previews what’s next.",
          purpose:
            "Try changing tone (professional → conversational) and compare results.",
        },
        {
          prompt:
            "Analyze anonymized student writing samples and suggest differentiated next steps for instruction.",
          purpose: "Prompt AI to describe skill gaps and recommend next mini-lessons.",
        },
        {
          prompt:
            "Create a proposal for using AI to streamline an administrative task (e.g., bus scheduling, substitute requests).",
          purpose: "Include pros/cons and privacy considerations.",
        },
      ],
      Student: [
        {
          prompt:
            "Use AI to summarize a long article or textbook excerpt in simple language.",
          purpose:
            "Then ask for it in 'TikTok script style' or a visual story format.",
        },
        {
          prompt:
            "Brainstorm ideas for a science fair project on renewable energy.",
          purpose: "Include budget and materials planning.",
        },
        {
          prompt:
            "Ask AI to help organize a weekly homework and extracurricular schedule.",
          purpose: "Try prompting it to create a visual plan or calendar.",
        },
        {
          prompt:
            "Generate possible questions to ask during a career day panel based on your interests.",
          purpose:
            "AI can take a list of hobbies and turn them into interview-style questions.",
        },
        {
          prompt: "Write a respectful email to a teacher about a grade concern.",
          purpose: "Use multiple tone options and evaluate which feels best.",
        },
      ],
      "Parent/Caregiver": [
        {
          prompt:
            "Create a sample conversation starter to talk with your teen about screen time boundaries.",
          purpose: "Ask for age-appropriate language and empathetic tone.",
        },
        {
          prompt:
            "Ask for 3 meal prep ideas that are budget-friendly, nut-free, and kid-approved — with a grocery list.",
          purpose:
            "Ask it to fit in a 1-hour prep window for the week.",
        },
        {
          prompt:
            "Draft a response to a confusing district communication in a way that seeks clarification respectfully.",
          purpose: "Prompt for email tone and clarity.",
        },
        {
          prompt:
            "Simulate a parent-teacher conference and ask for ways to better support a struggling student.",
          purpose: "Include suggestions you can do at home.",
        },
        {
          prompt:
            "Use AI to create a visual or social media post promoting a school fundraiser.",
          purpose: "Ask for multiple design concepts and messaging strategies.",
        },
      ],
    },
    gradeBandedEducator: {
      Primary: [
        { prompt: "Create morning meeting prompts.", purpose: "Generate 10 SEL-focused starters (kindness, belonging)." },
        { prompt: "Draft parent updates.", purpose: "Short, cheerful weekly highlights in simple language." },
        { prompt: "Plan literacy centers.", purpose: "Rotation ideas with three levels of difficulty (phonics focus)." },
        { prompt: "Simplify directions.", purpose: "Rewrite tasks at a 1st-grade reading level." },
        { prompt: "Generate quick songs or chants.", purpose: "Transitions for lining up/clean up to boost routines." },
      ],
      Intermediate: [
        { prompt: "Draft rubrics for projects.", purpose: "Biography/project rubrics with creativity + research criteria." },
        { prompt: "Summarize student reflections.", purpose: "Theme clustering to inform next steps." },
        { prompt: "Generate reading questions.", purpose: "Tiered recall/inference/opinion questions for a text." },
        { prompt: "Write scaffolded directions.", purpose: "Rewrite tasks for varied reading levels and ELL support." },
        { prompt: "Create progress update templates.", purpose: "Positive framing with next goals for families." },
      ],
      Middle: [
        { prompt: "Brainstorm unit pacing.", purpose: "Four-week outline with checkpoints and assessments." },
        { prompt: "Generate discussion prompts.", purpose: "Open-ended questions connected to current topic." },
        { prompt: "Create feedback comments.", purpose: "Kind, specific feedback sentences for writing." },
        { prompt: "Draft lesson intros.", purpose: "3-minute hooks tied to student interests." },
        { prompt: "Organize club/elective planning.", purpose: "6-session plan for student-led clubs." },
      ],
      High: [
        { prompt: "Draft recommendation letters.", purpose: "Start from student traits; personalize afterward." },
        { prompt: "Generate reflection prompts.", purpose: "Self-assessment questions aligned to unit goals." },
        { prompt: "Analyze grading trends.", purpose: "Quick insights from anonymized rubric data." },
        { prompt: "Create student exemplars.", purpose: "Model responses for different rubric levels." },
        { prompt: "Summarize professional readings.", purpose: "Implications for practice from articles." },
      ],
    },
  },
  {
    id: "thoughtPartner",
    name: "AI as a Thought Partner",
    blurb:
      "Asks questions that deepen thinking, notice gaps, and refine ideas. Pushes respectfully; doesn’t do the thinking for you.",
    starter:
      "Act as my thought partner. Ask probing questions, surface blind spots, and help me examine alternatives. Don’t finish the thinking—help me do it better.",
    stakeholders: {
      "Educator/Admin": [
        { prompt: "Here’s my plan for a student-led conference. What might I be missing?", purpose: "Surface overlooked details, logistics, and access issues." },
        { prompt: "Act like an instructional coach. Based on this lesson outline, what feedback would you give?", purpose: "Model coaching dialogue and self-reflection." },
        { prompt: "Suggest 3 ways to frame this message to families — supportive, urgent, community-focused.", purpose: "Tone shifting and audience awareness." },
        { prompt: "What’s an alternative way to assess this learning goal that centers student agency?", purpose: "Push creativity in assessment design." },
        { prompt: "I’m concerned about teacher workload. What trade-offs should I consider in this policy?", purpose: "Encourage ethical reflection and complexity awareness." },
      ],
      Student: [
        { prompt: "I’m writing an argument that school uniforms should be optional. What are strong counterpoints?", purpose: "Refine claims with counter-arguments." },
        { prompt: "I want to start a club. Help me think through what students might need to feel included.", purpose: "Empathetic leadership and planning." },
        { prompt: "I have three project ideas — which has the most potential for impact, and why?", purpose: "Decision-making with reasoning." },
        { prompt: "Explain this science concept in 2 ways — one for me, one for a 3rd grader.", purpose: "Deepen understanding via perspective-taking." },
        { prompt: "Based on this personal story, help me brainstorm a meaningful topic for my essay.", purpose: "Guide reflection and narrative clarity." },
      ],
      "Parent/Caregiver": [
        { prompt: "Here’s how my child’s been acting. What might be going on, and how can I talk with them supportively?", purpose: "Gentle framing and questions to try." },
        { prompt: "Compare three summer activity options for my child — social, academic, creative.", purpose: "Support informed family choices." },
        { prompt: "How can I better advocate for my child without overstepping the teacher’s role?", purpose: "Balance empathy and boundaries." },
        { prompt: "We’re trying to set routines at home. What ideas could work for mornings without power struggles?", purpose: "Practical, values-aligned routines." },
        { prompt: "Act like a fellow parent. What would you consider before letting a teen have a smartphone?", purpose: "Shared dialogue and values check." },
      ],
    },
    gradeBandedEducator: {
      Primary: [
        { prompt: "Here’s my literacy center setup. What could better support emerging readers?", purpose: "Reflect on scaffolds and differentiation." },
        { prompt: "Act like an early-childhood coach. What routines aid calmer transitions?", purpose: "Classroom-management insights." },
        { prompt: "Three hands-on ways to adapt my next math lesson using movement/manipulatives?", purpose: "Tactile, kinesthetic engagement." },
        { prompt: "Review my parent note. How can it be more positive and accessible?", purpose: "Inclusive communication." },
        { prompt: "Plan for introducing empathy — what stories/activities deepen understanding?", purpose: "SEL enrichment through reflection." },
      ],
      Intermediate: [
        { prompt: "Science project outline — how to increase student ownership?", purpose: "Shift to inquiry-based learning." },
        { prompt: "Act like a peer teacher — likely misconceptions about fractions?", purpose: "Anticipate learning challenges." },
        { prompt: "Updating classroom jobs — how to build collaboration and responsibility?", purpose: "Strengthen SEL/community roles." },
        { prompt: "Here’s a student reflection — what feedback questions would push thinking?", purpose: "Formative dialogue coaching." },
        { prompt: "Anchor chart on growth mindset — how to keep it authentic?", purpose: "Avoid buzzwords; focus on practice." },
      ],
      Middle: [
        { prompt: "Draft inquiry unit — questions to see multiple perspectives?", purpose: "Critical-thinking alignment." },
        { prompt: "Equity concerns to watch in this group project plan?", purpose: "Participation and access awareness." },
        { prompt: "Assess same skill with fewer essays?", purpose: "Alternative assessments to reduce burnout." },
        { prompt: "Class norms — ways to build student voice into revision?", purpose: "Democratic classroom culture." },
        { prompt: "Balancing tech and hands-on — what guiding questions help decide?", purpose: "Thoughtful integration." },
      ],
      High: [
        { prompt: "Socratic Seminar plan — questions for deeper analysis?", purpose: "Increase rigor and challenge." },
        { prompt: "Act like an equity coach — do readings reflect diverse perspectives?", purpose: "Inclusive curriculum awareness." },
        { prompt: "Civic engagement project — pitfalls around bias/misinformation?", purpose: "Critical media literacy." },
        { prompt: "Grading policy draft — how might students perceive fairness?", purpose: "Empathy for policy impact." },
        { prompt: "Unit summary — how to make career connections explicit?", purpose: "Authenticity and transfer." },
      ],
    },
  },
  {
    id: "builder",
    name: "AI as a Builder",
    blurb:
      "Helps construct multi-part systems, plans, resources, and artifacts using your goals, data, and constraints.",
    starter:
      "Act as a builder. Given my goals and constraints, co-construct the structures, templates, and resources we need. Show versioned drafts and request missing inputs.",
    stakeholders: {
      "Educator/Admin": [
        { prompt: "Using attendance and grade data, suggest a multi-tiered intervention system and draft sample communications for each tier.", purpose: "Data-informed support model + tools." },
        { prompt: "Design a full PD session (slides, activities, handouts) based on this staff survey about AI readiness.", purpose: "Tailored end-to-end training materials." },
        { prompt: "Create a family engagement plan for the year using demographic and event attendance data.", purpose: "Annual strategy with templates and measures." },
        { prompt: "Build a dashboard summary and action plan from our school improvement plan.", purpose: "Visualization + implementation strategies." },
        { prompt: "From student feedback, build a proposal for a student advisory council.", purpose: "Participatory leadership structure." },
      ],
      Student: [
        { prompt: "From our survey data, build a campaign to reduce littering — slogan ideas, poster drafts, rollout plan.", purpose: "Data analysis + design + planning." },
        { prompt: "Map 5 podcast episodes, script the first, and plan a social release schedule.", purpose: "Project planning and media creation." },
        { prompt: "With this budget, build a business pitch — branding, pitch script, visuals.", purpose: "Entrepreneurship toolkit." },
        { prompt: "Design a math review game — rules, sample cards, balance for levels.", purpose: "Logic + content creation + testing." },
        { prompt: "Analyze science fair results; write a conclusion, next steps, and presentation board layout.", purpose: "Synthesis + visual storytelling." },
      ],
      "Parent/Caregiver": [
        { prompt: "Based on report card + teacher feedback, build a home support plan with weekly goals and communication templates.", purpose: "Integrated support aligned to school context." },
        { prompt: "Outline a neighborhood tutoring co-op — model, policies, outreach materials.", purpose: "Community-building toolkit." },
        { prompt: "Design a family summer plan balancing learning, rest, affordability — include calendar and packing lists.", purpose: "Coordinated planning system." },
        { prompt: "Step-by-step guide to prepare for starting middle school — social, emotional, academic.", purpose: "Transition support guide." },
        { prompt: "Build a data-backed proposal to improve school lunches.", purpose: "Advocacy packet with visuals and surveys." },
      ],
    },
    gradeBandedEducator: {
      Primary: [
        { prompt: "Weekly classroom jobs chart with visuals and fair rotation.", purpose: "Equitable, student-friendly management." },
        { prompt: "5-day kindness mini-unit with read-alouds and reflections.", purpose: "Cohesive SEL sequence." },
        { prompt: "Sight-word progress tracker students can help update.", purpose: "Accessible formative tracking." },
        { prompt: "Center rotation plan balancing literacy, math, and play.", purpose: "Efficient time/group structure." },
        { prompt: "Parent communication templates emphasizing growth and support.", purpose: "Proactive, strengths-based outreach." },
      ],
      Intermediate: [
        { prompt: "Cross-curricular plan: math data collection + persuasive writing.", purpose: "Integrate STEM and ELA." },
        { prompt: "Differentiated vocabulary study plan with extensions.", purpose: "Tiered structure for mixed abilities." },
        { prompt: "Rubric + peer-feedback checklist for SS poster project.", purpose: "Student-friendly assessment tools." },
        { prompt: "Digital portfolio structure for quarterly growth.", purpose: "Long-term reflection framework." },
        { prompt: "Yearlong experiment logbook template for inquiry.", purpose: "Consistent investigation documentation." },
      ],
      Middle: [
        { prompt: "Research process checklist from question to citation.", purpose: "Inquiry + academic integrity support." },
        { prompt: "Choice-board for novel understanding (creative + analytical).", purpose: "Authentic assessment pathways." },
        { prompt: "Reusable unit overview template (objectives, activities, reflection).", purpose: "Planning infrastructure for teams." },
        { prompt: "Peer-editing protocol for digital writing.", purpose: "Structured student feedback cycles." },
        { prompt: "Climate-change data project sequence leading to exhibition.", purpose: "Data literacy + real-world problem solving." },
      ],
      High: [
        { prompt: "Semester plan connecting texts, skills, assessments.", purpose: "Coherent curriculum map." },
        { prompt: "Mentorship framework for senior capstones.", purpose: "Authentic learning with accountability." },
        { prompt: "System for student self-assessment journals + dashboards.", purpose: "Metacognitive skill tracking." },
        { prompt: "Project proposal template including AI/tech ethics.", purpose: "Infuse digital ethics in planning." },
        { prompt: "Professional pitch deck template for entrepreneurship/advocacy.", purpose: "Transferable communication tools." },
      ],
    },
  },
  {
    id: "amplifier",
    name: "AI as an Amplifier",
    blurb:
      "Elevates and extends ideas, student voice, and classroom products to reach broader audiences with more polish and impact.",
    starter:
      "Act as an amplifier. Help me take raw ideas and work products and transform them into formats that reach and move wider audiences.",
    stakeholders: {
      "Educator/Admin": [
        { prompt: "Turn a student reflection into a student-led presentation to the school board about what’s working.", purpose: "Student voice → public impact." },
        { prompt: "Convert a small group discussion into three questions for a full-class Socratic Seminar.", purpose: "Idea seeding → deeper dialogue." },
        { prompt: "Turn five student projects on food insecurity into a community showcase plan.", purpose: "Projects → public celebration." },
        { prompt: "Use sticky-note brainstorms to build a professional-looking infographic on school climate.", purpose: "Raw input → visual storytelling." },
        { prompt: "Convert a classroom routine into a student-created how-to video series.", purpose: "Routine → student-led onboarding." },
      ],
      Student: [
        { prompt: "Turn my poem into a short animated video for our assembly.", purpose: "Writing → multi-modal performance." },
        { prompt: "Write 3 TikTok-style hooks for my science project summary.", purpose: "Content → audience connection." },
        { prompt: "Create a story/podcast episode from interviews with my grandparents.", purpose: "Family history → narrative artifact." },
        { prompt: "Turn my project into a one-pager for a youth leadership application.", purpose: "Schoolwork → real-world leverage." },
        { prompt: "Help me build a proposal to pitch a student-led event to the principal.", purpose: "Idea → action plan." },
      ],
      "Parent/Caregiver": [
        { prompt: "Turn my child’s art into a digital portfolio to share with family.", purpose: "Private talent → shared celebration." },
        { prompt: "Help me respond supportively to a tough text from my teen.", purpose: "Tough moments → relationship growth." },
        { prompt: "Build a campaign encouraging more parent volunteers; I have quotes and ideas.", purpose: "Quiet passion → community momentum." },
        { prompt: "Convert PTA notes into an action-oriented newsletter.", purpose: "Minutes → family engagement." },
        { prompt: "Turn parent testimonials into a short video script to promote the school.", purpose: "Parent voice → public advocacy." },
      ],
    },
    gradeBandedEducator: {
      Primary: [
        { prompt: "Class quotes about friendship → class poem display.", purpose: "Amplify student voices into a shared artifact." },
        { prompt: "Create short captions for student artwork for a digital gallery.", purpose: "Collective celebration of creativity." },
        { prompt: "Turn class notes into 3 family questions for at-home talk.", purpose: "Extend classroom learning to homes." },
        { prompt: "Science observations → ‘class weather report’ script.", purpose: "Performance + media literacy practice." },
        { prompt: "Design certificates that highlight effort and kindness.", purpose: "Recognize social-emotional growth." },
      ],
      Intermediate: [
        { prompt: "Reflections → ‘Classroom News’ headlines for a board.", purpose: "Public recognition of learning." },
        { prompt: "Rewrite research summaries as short podcast scripts.", purpose: "Real-world communication formats." },
        { prompt: "Templates for student-led conference slides (strengths/next steps).", purpose: "Authentic self-presentation." },
        { prompt: "Debate arguments → infographic for display.", purpose: "Make critical thinking visible." },
        { prompt: "Persuasive essays → advocacy posters for community.", purpose: "Civic voice + social purpose." },
      ],
      Middle: [
        { prompt: "Opinion pieces → digital magazine layout.", purpose: "Publication-quality pride." },
        { prompt: "Service-learning highlights → press release draft.", purpose: "Extend impact beyond classroom." },
        { prompt: "Summarize survey results → student slides to present to principal.", purpose: "Advocate with data and clarity." },
        { prompt: "Brainstorm notes → ‘student vision statement’ for hallway.", purpose: "Amplify collective identity." },
        { prompt: "Design an awards ceremony script celebrating growth and collaboration.", purpose: "Community recognition aligned to values." },
      ],
      High: [
        { prompt: "Project summaries → showcase catalog for community night.", purpose: "Public exhibition artifacts." },
        { prompt: "Refine reflection essays into publishable op-eds.", purpose: "Voice, tone, authenticity for real audiences." },
        { prompt: "Video interviews → documentary storyboard.", purpose: "Coherent media projects from raw footage." },
        { prompt: "Research data → summary for school board.", purpose: "Connect inquiry to decisions." },
        { prompt: "Capstone findings → social media campaign.", purpose: "Extend learning into advocacy." },
      ],
    },
  },
  {
    id: "mirror",
    name: "AI as a Mirror",
    blurb:
      "Reflects your practice back to you to reveal blind spots, equity concerns, tone, and design choices. Helps you see like others might.",
    starter:
      "Act as a reflective mirror. Analyze my materials, policies, and interactions from multiple perspectives (student, family, equity, UDL). Reflect back patterns, assumptions, and potential improvements with kindness and specificity.",
    stakeholders: {
      // Mirror is intentionally educator-facing in this guide
      "Educator/Admin": [
        { prompt: "(Use the grade-band filters for educator-focused reflection prompts.)", purpose: "Mirror prompts are organized by grade band below." },
      ],
    },
    gradeBandedEducator: {
      Primary: [
        { prompt: "Response to a student meltdown — what might the student have felt/needed?", purpose: "Empathy and de-escalation insight." },
        { prompt: "Daily schedule — which patterns might overstimulate/tire students?", purpose: "Balance energy and sensory load." },
        { prompt: "Newsletter draft — how would a new parent perceive it?", purpose: "Welcoming, clear communication." },
        { prompt: "Circle time transcript — what phrasing could increase student voice?", purpose: "Participation dynamics awareness." },
        { prompt: "My ‘favorite student’ traits — what do these reveal about bias?", purpose: "Equity reflection and self-awareness." },
      ],
      Intermediate: [
        { prompt: "Lesson intro — what assumptions about prior knowledge?", purpose: "Surface hidden gaps to pre-teach." },
        { prompt: "Reflect back how this rubric feels to a struggling student.", purpose: "Tone, fairness, and motivation check." },
        { prompt: "Compare two parent emails — how consistent is tone/support?", purpose: "Balanced, empathetic outreach." },
        { prompt: "Off-task patterns — which structures might contribute?", purpose: "Systems lens vs. blame." },
        { prompt: "Journal prompt — who might struggle to connect?", purpose: "Cultural/experiential inclusion." },
      ],
      Middle: [
        { prompt: "What message does this feedback likely convey to a student?", purpose: "Tone and unintended signals." },
        { prompt: "Whose perspectives were centered/missing this week?", purpose: "Equity/representation audit." },
        { prompt: "Discussion transcript — who spoke most? How to balance?", purpose: "Participation equity strategies." },
        { prompt: "Late-work policy — what values does it communicate?", purpose: "Align beliefs and practices." },
        { prompt: "Weekly reflections — what strengths and growth areas recur?", purpose: "Identify development trends." },
      ],
      High: [
        { prompt: "Unit plan from a first-gen college student’s view — what empowers/intimidates?", purpose: "Empathy for diverse learners." },
        { prompt: "Grading data summary — any patterns suggesting bias?", purpose: "Data-informed equity check." },
        { prompt: "Three assignments — which learners do they privilege/disadvantage?", purpose: "Inclusive design reflection." },
        { prompt: "Policy statement — what values are embedded?", purpose: "Implicit messages about control/trust." },
        { prompt: "Syllabus language — how might students see my philosophy?", purpose: "Meta-reflection on identity." },
      ],
    },
  },
];

const GRADE_BANDS = ["Primary", "Intermediate", "Middle", "High"] as const;
const STAKEHOLDERS = ["Educator/Admin", "Student", "Parent/Caregiver"] as const;

type GradeBand = typeof GRADE_BANDS[number];

function SectionHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {desc && <p className="text-sm text-gray-600 mt-1">{desc}</p>}
    </div>
  );
}

function PromptCard({ prompt, purpose }: { prompt: string; purpose: string }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm bg-white flex flex-col gap-2">
      <p className="font-medium leading-relaxed">{prompt}</p>
      <p className="text-sm text-gray-600"><span className="font-semibold">Purpose:</span> {purpose}</p>
    </div>
  );
}

export default function AIProjector() {
  const [roleId, setRoleId] = useState(ROLES[0].id);
  const [stakeholder, setStakeholder] = useState<(typeof STAKEHOLDERS)[number]>(STAKEHOLDERS[0]);
  const [grade, setGrade] = useState<GradeBand>("Primary");
  const [query, setQuery] = useState("");

  const role = useMemo(() => ROLES.find((r) => r.id === roleId)!, [roleId]);

  const hasGradeBand = Boolean(role.gradeBandedEducator);
  const stakeholderOptions = Object.keys(role.stakeholders) as (keyof typeof role.stakeholders)[];

  const filteredStakeholderItems = useMemo(() => {
    const list = role.stakeholders[stakeholder] || [];
    return list.filter(
      (x) =>
        x.prompt.toLowerCase().includes(query.toLowerCase()) ||
        x.purpose.toLowerCase().includes(query.toLowerCase())
    );
  }, [role, stakeholder, query]);

  const gradeItems = useMemo(() => {
    if (!hasGradeBand) return [] as { prompt: string; purpose: string }[];
    const list = role.gradeBandedEducator?.[grade] || [];
    return list.filter(
      (x) =>
        x.prompt.toLowerCase().includes(query.toLowerCase()) ||
        x.purpose.toLowerCase().includes(query.toLowerCase())
    );
  }, [role, grade, query, hasGradeBand]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">AI Role Explorer</h1>
          <p className="text-gray-700 mt-1">Choose a role for the AI, then explore prompts by stakeholder and (for educators) grade band. Each prompt includes a clear purpose. Use the starter to set the AI’s role in your conversation.</p>
        </header>

        {/* Controls */}
        <div className="grid md:grid-cols-4 gap-3 mb-6">
          <div className="col-span-2">
            <label className="text-xs font-semibold text-gray-700">AI Role</label>
            <div className="mt-1 flex gap-2 flex-wrap">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRoleId(r.id)}
                  className={`px-3 py-1.5 rounded-full border text-sm ${
                    roleId === r.id ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700">Stakeholder</label>
            <select
              className="mt-1 w-full border rounded-xl px-3 py-2 bg-white"
              value={stakeholder as string}
              onChange={(e) => setStakeholder(e.target.value as any)}
            >
              {stakeholderOptions.map((s) => (
                <option key={s} value={s as string}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700">Search</label>
            <input
              className="mt-1 w-full border rounded-xl px-3 py-2 bg-white"
              placeholder="Search prompts or purposes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Role summary + starter */}
        <div className="rounded-2xl border bg-white p-4 mb-6">
          <SectionHeader title={`${role.name}`} desc={role.blurb} />
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-2/3">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold">Starter Prompt:</span> {role.starter}
              </p>
            </div>
          </div>
        </div>

        {/* Educator grade-banded section (if present) */}
        {role.gradeBandedEducator && (
          <div className="rounded-2xl border bg-white p-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <SectionHeader title="Educator Prompts by Grade Band" desc="Choose a grade band to see educator-focused prompts and purposes." />
              <div className="flex items-center gap-2">
                {GRADE_BANDS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`px-3 py-1.5 rounded-full border text-sm ${
                      grade === g ? "bg-indigo-600 text-white border-indigo-600" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              {gradeItems.map((item, idx) => (
                <PromptCard key={idx} {...item} />
              ))}
              {gradeItems.length === 0 && (
                <p className="text-sm text-gray-600">No results match your search.</p>
              )}
            </div>
          </div>
        )}

        {/* Stakeholder section */}
        <div className="rounded-2xl border bg-white p-4 mb-24">
          <SectionHeader title={`${stakeholder} Prompts`} desc={`Explore ${stakeholder.toLowerCase()}-focused prompts for ${role.name.toLowerCase()}.`} />
          <div className="grid md:grid-cols-2 gap-3">
            {filteredStakeholderItems.map((item, idx) => (
              <PromptCard key={idx} {...item} />
            ))}
            {filteredStakeholderItems.length === 0 && (
              <p className="text-sm text-gray-600">No results match your search. Try clearing the search box.</p>
            )}
          </div>
        </div>

        <footer className="text-xs text-gray-500 max-w-6xl mx-auto pb-8">
          <p>
            This guide combines ideas from your original document with expanded, grade-banded educator prompts and stakeholder-specific prompts. Use the starter line to set the AI’s role, then explore the prompts.
          </p>
        </footer>
      </div>
    </div>
  );
}
