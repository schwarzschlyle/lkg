import type {
  BlueprintLabel,
  DepthTheme,
  Differentiator,
  MethodStep,
  Phase,
  StackGroup,
  TextSegment,
} from '@/types/content';
import { BRAND } from './site';

/* ---- §3 HERO -------------------------------------------------------------- */
export const HERO = {
  eyebrow: 'PRODUCTION-GRADE WEB & AI DEVELOPMENT',
  headline: [
    { text: 'Anyone can generate an app. I engineer ones that ' },
    { text: 'survive', accent: true },
    { text: '.' },
  ] as readonly TextSegment[],
  sub: 'AI can scaffold software in an afternoon. Then it breaks under real users, real data, and real failure. I build the whole system beneath the surface, so yours holds.',
  primaryCta: { label: 'Book a free consult', href: '#contact' },
  secondaryCta: { label: 'See how ↓', href: '#problem' },
  // \u00A0 (non-breaking) so the wide gaps around the dot survive HTML
  // whitespace collapsing, as the reference's &nbsp; entities did.
  readout: 'uptime 99.99%\u00A0\u00A0·\u00A0\u00A0p99 42ms',
} as const;

/* ---- §4 TRUST STRIP ------------------------------------------------------- */
export const TRUST_ITEMS: readonly string[] = [
  'Built to survive production',
  'AI-fluent, not AI-hype',
  'End-to-end ownership',
  'Engineered, not assembled',
];

/* ---- §5 THE PROBLEM ------------------------------------------------------- */
export const PROBLEM = {
  heading: 'The demo works. Then reality arrives.',
  lead: 'AI tools ace the first 20%. The last 80%, the part that decides whether a business can actually run on it, is where they leave you stranded.',
  failures: [
    'No real security.',
    'Data that corrupts under load.',
    'A cloud bill that explodes.',
    'It buckles the moment it succeeds.',
    'Code no one understands.',
  ],
  resolve: [
    { text: 'Those failures hide in the layers AI skips. ' },
    { text: "I don't skip them.", accent: true },
  ] as readonly TextSegment[],
} as const;

/* ---- §6 WHAT I DO DIFFERENTLY --------------------------------------------- */
export const DIFFERENTIATORS_HEADING = 'Not another dev. An engineer.';

export const DIFFERENTIATORS: readonly Differentiator[] = [
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

/* ---- §11 STACK ------------------------------------------------------------ */
export const STACK_HEADING = 'The toolkit.';

export const STACK_GROUPS: readonly StackGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'TanStack Query', 'Tailwind', 'MUI', 'WebSockets'],
  },
  { category: 'Backend', items: ['FastAPI', 'Express', 'Celery'] },
  {
    category: 'Data',
    items: ['PostgreSQL', 'Redis', 'Pinecone', 'Milvus', 'AWS S3', 'Cloud SQL'],
  },
  {
    category: 'Infra & Deploy',
    items: ['Terraform', 'AWS', 'Azure', 'GCP', 'Docker', 'GitHub Actions', 'Nginx'],
  },
  {
    category: 'AI',
    items: ['LangChain', 'LangGraph', 'LlamaIndex', 'OpenAI', 'Anthropic', 'MCP'],
  },
  {
    category: 'Integrations & Ops',
    items: ['Stripe', 'Clerk', 'Auth0', 'Sentry', 'LangSmith'],
  },
];

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
