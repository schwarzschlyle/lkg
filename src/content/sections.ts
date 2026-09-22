import type {
  BlueprintLabel,
  DepthTheme,
  FeatureCardItem,
  QuestionItem,
  SolutionTrack,
  MethodStep,
  Phase,
  TextSegment,
} from '@/types/content';
import { BRAND } from './site';

/* ---- §3 HERO -------------------------------------------------------------- */
export const HERO = {
  eyebrow: 'PRODUCTION-GRADE SOFTWARE · WEB · AI',
  // Leads with the capability, not the concession. The previous opener
  // ("Anyone can generate software") spent the largest type on the page
  // making the competitor's argument, and spoke only to a buyer weighing an
  // AI tool, which the Track A operator is not.
  headline: [
    { text: 'I engineer software that ' },
    { text: 'survives', accent: true },
    { text: ' real users, real data, and real failure.' },
  ] as readonly TextSegment[],
  // The closing clause used to be "when real users and real data arrive",
  // which now restates the headline almost word for word. "The demo is the
  // easy part" stays: it plants the antecedent the Problem section needs.
  sub: "Internal systems that end the manual work, or the product you've been describing. Either way the demo is the easy part. I build everything underneath it.",
  primaryCta: { label: 'Book a free consult', href: '#contact' },
  // Solutions is the first section after the hero now; pointing this at
  // #problem jumped clean over the one section written for the operator.
  secondaryCta: { label: 'See how ↓', href: '#solutions' },
  // \u00A0 (non-breaking) so the wide gaps around the dot survive HTML
  // whitespace collapsing, as the reference's &nbsp; entities did.
  readout: 'uptime 99.99%\u00A0\u00A0·\u00A0\u00A0p99 42ms',
} as const;

/* ---- §4 TRUST STRIP ------------------------------------------------------- */
export const TRUST_ITEMS: readonly string[] = [
  'Built to survive production',
  'Fewer manual hours',
  'End-to-end ownership',
  'Engineered, not assembled',
];

/* ---- SOLUTIONS (new) -----------------------------------------------------
   The whole persuasion layer, in one section. The header names the pain so a
   visitor who has never considered custom software recognises themselves in
   it; the cards answer it. Kept deliberately short: this sits between the
   hero and the Problem section, and anything longer reads as a second page
   before the argument has started. */
export const SOLUTIONS = {
  eyebrow: 'WHAT I BUILD',
  heading: 'Two problems. The same engineering underneath.',
  lead: 'Most work is one of these. Both fail the same way when the foundation is wrong.',
  /* Hands off to the Problem section. Without it a reader who has just been
     shown what is possible walks into a warning about demos they never ran.

     Phrased so the difficulty attaches to the CRAFT, not to this work: the
     earlier wording ("whether it still works in a year") sat at the end of an
     offer list, so its nearest referent was the offer itself and it read as a
     disclaimer. */
  close:
    'All of this is buildable today. The hard part is building it so it still holds when the business depends on it.',
} as const;

export const SOLUTION_TRACKS: readonly SolutionTrack[] = [
  {
    id: 'internal',
    label: 'INTERNAL SYSTEMS',
    qualifier: 'When the business already runs, but it runs on manual work.',
    returns: 'Cost that stops',
    cards: [
      {
        id: 'automate',
        numeral: '01',
        title: 'Automate the busywork',
        body: 'Invoices, reports, data entry, reminders and follow-ups, generated and sent automatically, accurately, every time. You review and approve. You never retype.',
        tag: 'hours back / week',
        viz: 'automate',
      },
      {
        id: 'connect',
        numeral: '02',
        title: 'Connect your tools',
        body: 'Your CRM, spreadsheets, inbox, accounting and store, wired together so information is entered once and stays in sync everywhere.',
        tag: 'always in sync',
        viz: 'connect',
      },
      {
        id: 'dashboard',
        numeral: '03',
        title: 'See your whole business',
        body: 'A single dashboard showing what is really happening across sales, jobs, stock, cash and customers. Real time, one place.',
        tag: 'one clear view',
        viz: 'dashboard',
      },
    ],
  },
  {
    id: 'product',
    label: 'PRODUCTS & APPS',
    qualifier: "When you have an idea, and you want it built properly the first time.",
    returns: 'Revenue that starts',
    cards: [
      {
        id: 'prove',
        numeral: '01',
        title: 'Prove it before you fund it',
        body: 'A working proof of concept first, in weeks rather than months. You find out whether the idea holds up before you commit a real budget to it.',
        tag: 'certainty, cheaply',
        viz: 'prove',
      },
      {
        id: 'product',
        numeral: '02',
        title: 'Products your customers use',
        body: 'The part people actually touch: accounts, booking, payments, dashboards. Fast, accessible, and built so someone can use it without being taught.',
        tag: 'built to be used',
        viz: 'selfServe',
      },
      {
        id: 'ai',
        numeral: '03',
        title: 'AI that actually ships',
        body: 'Assistants, search and automation grounded in your own data, with guardrails, cost control and human oversight. Useful in production, not just in a demo.',
        tag: 'grounded and guarded',
        viz: 'assistant',
      },
    ],
  },
];

/* ---- §5 THE PROBLEM ------------------------------------------------------- */
export const PROBLEM = {
  heading: 'The demo works. Then reality arrives.',
  // Broadened past AI tools. The operator reading Track A is not choosing
  // between this and a code generator; they are choosing between this, a
  // rushed freelance build, an off-the-shelf tool, and doing nothing. Every
  // failure below applies to all of them, so the lead has to name all of them.
  lead: 'AI tools ace the first 20%. So does a rushed build, and so does a tool that almost fits. The last 80%, the part that decides whether a business can actually run on it, is where all of them leave you stranded.',
  failures: [
    'No real security.',
    'Data that corrupts under load.',
    'A cloud bill that explodes.',
    'It buckles the moment it succeeds.',
    'Code no one understands.',
  ],
  resolve: [
    { text: 'Those failures hide in the layers most builds skip. ' },
    { text: "I don't skip them.", accent: true },
  ] as readonly TextSegment[],
} as const;

/* ---- §6 WHAT I DO DIFFERENTLY --------------------------------------------- */
export const DIFFERENTIATORS_HEADING = 'Not another dev. An engineer.';

export const DIFFERENTIATORS: readonly FeatureCardItem[] = [
  {
    id: 'survive',
    numeral: '01',
    title: 'Built to survive production',
    body: 'Reliability, security, and scale designed in from day one, never bolted on after it breaks.',
    viz: 'selfHeal',
  },
  {
    id: 'phased',
    numeral: '02',
    title: 'Phased & de-risked',
    body: 'Proof of concept → MVP → Growth. You fund proven steps, never one blind cheque on an unproven idea.',
    viz: 'phaseFill',
  },
  {
    id: 'responsible-ai',
    numeral: '03',
    title: 'AI done responsibly',
    body: 'Guardrails, cost control, and human oversight. I use AI heavily, but I never ship it blindly.',
    viz: 'guardrail',
  },
  {
    id: 'yours',
    numeral: '04',
    title: 'Clear, honest, yours',
    body: 'Plain-language trade-offs, full code ownership, a clean handoff, and no lock-in.',
    viz: 'handoff',
  },
];

/* ---- §7 DEPTH ------------------------------------------------------------- */
export const DEPTH = {
  heading: 'I build the whole system, not just the screen.',
  lead: "Most developers build the part you see. I engineer everything beneath it: the architecture, the data, the security, the way it scales and survives, and the way AI is woven in. That's the difference between something that demos well and something your business can actually run on.",
  close: [
    { text: 'Every one of these gets deliberate attention on every build. ' },
    { text: 'That\'s what "engineered" means.', accent: true },
  ] as readonly TextSegment[],
} as const;

export const DEPTH_THEMES: readonly DepthTheme[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    caption:
      'The architecture, data, and connections your whole product stands on, designed to stay correct and easy to change.',
    regionChip: 'architecture · data · APIs',
    regionPoint: [0.3, 0.28],
  },
  {
    id: 'experience',
    title: 'Experience',
    caption: 'Fast, accessible interfaces your users actually enjoy using.',
    regionChip: 'frontend · UI/UX · accessibility',
    regionPoint: [0.62, 0.22],
  },
  {
    id: 'scale',
    title: 'Scale & resilience',
    caption:
      'Built to stay fast and standing as you grow, and to recover gracefully when things go wrong.',
    regionChip: 'scaling · reliability · performance',
    regionPoint: [0.72, 0.6],
  },
  {
    id: 'security',
    title: 'Security & operations',
    caption:
      'Protecting your data, catching problems before your customers do, and releasing changes safely.',
    regionChip: 'security · observability · CI/CD',
    regionPoint: [0.34, 0.72],
  },
  {
    id: 'ai-cost',
    title: 'AI & cost',
    caption:
      'AI integrated responsibly (grounded and guarded), with a bill that scales sensibly, not shockingly.',
    regionChip: 'AI integration · cost control',
    regionPoint: [0.55, 0.45],
  },
];

/* ---- §8 THE DELIVERABLE --------------------------------------------------- */
export const DELIVERABLE = {
  heading: 'You get a plan, not just a promise.',
  lead: 'Before we build, you receive a clear written blueprint of the whole system: the architecture, the data model, the security and reliability plans, the cost model, and the roadmap. All in plain language you can actually read.',
  stackTitle: 'Your Product Blueprint',
} as const;

export const BLUEPRINT_DOCS: readonly BlueprintLabel[] = [
  { id: 'architecture', label: 'ARCHITECTURE' },
  { id: 'data-design', label: 'DATA DESIGN' },
  { id: 'security', label: 'SECURITY' },
  { id: 'reliability', label: 'RELIABILITY' },
  { id: 'cost-model', label: 'COST MODEL' },
  { id: 'ai-design', label: 'AI DESIGN' },
  { id: 'roadmap', label: 'ROADMAP' },
];

/* ---- §9 PHASING ----------------------------------------------------------- */
export const PHASING = {
  heading: 'A path that protects your budget.',
  close: 'Each phase spends only on what it needs. Nothing wasted, nothing rebuilt.',
} as const;

export const PHASES: readonly Phase[] = [
  {
    numeral: '01',
    title: 'Proof of Concept',
    body: 'We prove the idea is viable, quickly and cheaply, before you spend real money. Cheap insurance against building the wrong thing.',
  },
  {
    numeral: '02',
    title: 'MVP',
    body: 'The real, launched product: user accounts, security, proper hosting. Put in front of real users to confirm they want it.',
  },
  {
    numeral: '03',
    title: 'Growth',
    body: 'We scale features and capacity exactly when your users need them. An ongoing partnership, not a one-time build.',
  },
];

/* ---- §10 METHOD ----------------------------------------------------------- */
export const METHOD = {
  heading: 'Every build runs a disciplined method.',
  sub: 'No guesswork: requirements before solutions, numbers before architecture, and every trade-off named out loud.',
} as const;

export const METHOD_STEPS: readonly MethodStep[] = [
  {
    numeral: '01',
    label: 'Understand',
    description: 'The real problem, not the stated one.',
    glyph: 'understand',
  },
  {
    numeral: '02',
    label: 'Estimate',
    description: 'Real numbers before any architecture.',
    glyph: 'estimate',
  },
  {
    numeral: '03',
    label: 'Architect',
    description: 'The blueprint the whole build follows.',
    glyph: 'architect',
  },
  {
    numeral: '04',
    label: 'Build in phases',
    description: 'POC → MVP → Growth, de-risked.',
    glyph: 'phases',
  },
  {
    numeral: '05',
    label: 'Harden',
    description: 'Security, reliability, tests.',
    glyph: 'harden',
  },
  {
    numeral: '06',
    label: 'Launch',
    description: 'Deployed for real, safely.',
    glyph: 'launch',
  },
  {
    numeral: '07',
    label: 'Scale',
    description: 'Grow features and capacity on demand.',
    glyph: 'scale',
  },
];

/* ---- §11 BEFORE YOU BOOK -------------------------------------------------
   Replaces the toolkit. This is the last section before the ask, and the only
   thing left between a reader and the booking is the questions they have not
   said out loud. A list of tool names answered none of them.

   The spec rules out case studies and client names, so "Have you built this
   before?" is the ONLY track record anywhere on the page. It describes the
   class of work rather than the clients, which keeps it inside that
   constraint while staying specific enough to be credible. */
export const QUESTIONS = {
  eyebrow: 'WHAT PEOPLE ASK FIRST',
  heading: 'Before you book.',
} as const;

export const QUESTION_ITEMS: readonly QuestionItem[] = [
  {
    id: 'speed',
    index: '01',
    question: 'How fast can I see something real?',
    answer:
      "Days for something simple, a few weeks at most for a proof of concept. You'll be looking at working software, not a slide deck, before you commit to a full build.",
  },
  {
    id: 'track-record',
    index: '02',
    question: 'Have you built this before?',
    answer:
      "Yes, mostly AI products ambitious enough that shipping them was the hard part: retrieval over private data, agents that run unattended, pipelines with real cost ceilings and human oversight. I don't publish client work, so ask on the call and I'll walk you through the architecture.",
  },
  {
    id: 'unclear-scope',
    index: '03',
    question: "I don't know exactly what I want yet.",
    answer:
      "Most people don't. That's what the first phase is for: turning a rough idea into something specific enough to estimate, before anyone commits to building it.",
  },
  {
    id: 'not-worth-it',
    index: '04',
    question: 'What if it turns out not to be worth building?',
    answer:
      "Then I'll say so. The proof of concept exists to find that out cheaply, and an honest no is worth more to you than an invoice is to me.",
  },
  {
    id: 'non-technical',
    index: '05',
    question: 'Do I need to be technical?',
    answer:
      "No. You'll get plain-language trade-offs, know why each decision was made, and never have to take a technical claim on faith.",
  },
  {
    id: 'exit',
    index: '06',
    question: 'What if I want to take it elsewhere?',
    answer:
      "You own the code and the infrastructure. More to the point, it's built to be maintained, so another developer can pick it up and keep going. No lock-in by obscurity.",
  },
];

/** The toolkit, demoted from a section to one line. "Shipped with", not
 *  "stack": these are tools in use, not tools admired. */
export const SHIPPED_WITH = {
  label: 'Shipped with',
  items: [
    'React',
    'TypeScript',
    'FastAPI',
    'PostgreSQL',
    'Redis',
    'AWS',
    'Terraform',
    'Docker',
    'LangGraph',
    'OpenAI',
    'Anthropic',
    'Stripe',
  ],
} as const;

/* ---- §13 CONTACT ---------------------------------------------------------- */
export const CONTACT = {
  heading: "Let's find out if it's viable.",
  lead: "A free 20-minute call. Tell me what you're building, and I'll tell you honestly whether and how to build it.",
  schedulerPlaceholder:
    '📅 Set VITE_BOOKING_URL to embed the inline scheduler: "Free 20-min project consult"',
  tabsLabel: 'Ways to get in touch',
  tabs: {
    book: 'Book a call',
    write: 'Send a message',
  },
  // The tab label already says what this does, so the button just sends.
  submitLabel: 'Send message',
  submittingLabel: 'Sending…',
  successTitle: 'Message sent.',
  successBody: "Thanks. I'll reply within one business day, usually sooner.",
  errorBody: 'That did not send. Please try again, or email me directly below.',
  // Formspree uses this as the notification email's subject line.
  subject: 'New project enquiry from the portfolio site',
  emailPrefix: 'or email ',
  linkedinLabel: 'LinkedIn',
  fields: {
    project: {
      name: 'project',
      label: 'What are you building?',
      placeholder: 'A marketplace, a SaaS tool, an AI assistant…',
    },
    email: {
      name: 'email',
      label: 'Your email',
      placeholder: 'you@company.com',
    },
    details: {
      name: 'details',
      label: 'Tell me about your project',
      placeholder: 'Timeline, rough budget, what success looks like…',
    },
  },
} as const;

/* ---- §14 FOOTER ----------------------------------------------------------- */
export const FOOTER = {
  links: {
    email: 'Email',
    linkedin: 'LinkedIn',
  },
  copyright: `© ${new Date().getFullYear()} ${BRAND.name}`,
  note: 'From proof of concept to production, engineered end to end.',
} as const;
