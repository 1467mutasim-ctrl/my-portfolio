/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 *  This is the single source of truth for every piece of text, link and image
 *  path on the site. Edit here — never inside the components.
 *
 *  Anything marked `TODO:` is an intentional placeholder. Nothing has been
 *  invented: fields that were not supplied are left empty on purpose, and the
 *  UI simply hides or gracefully degrades any section whose data is empty.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Types ─────────────────────────────────────────────────────────────────── */

export interface Personal {
  name: string;
  shortName: string;
  tagline: readonly string[];
  roles: readonly string[];
  statement: string;
  intro: string;
  /** Path inside /public. Replace public/resume.pdf with the real file. */
  resumeUrl: string;
  profileImage: string;
  location: string;
}

export type AchievementKind = 'robotics' | 'sports';

export interface Achievement {
  id: string;
  year: string;
  event: string;
  segment: string;
  result: string;
  detail?: string;
  kind: AchievementKind;
  /** Renders this entry as the dominant node on the timeline. */
  featured?: boolean;
}

/** Case-study fields left blank stay hidden until you fill them in. */
export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  solution: string;
  hardware: readonly string[];
  software: readonly string[];
  contribution: string;
  challenges: string;
  result: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  /** Short, honest tags only. Add specifics once they're confirmed. */
  tags: readonly string[];
  coverImage: string;
  gallery: readonly string[];
  /** null renders a disabled "link pending" button rather than a dead link. */
  githubUrl: string | null;
  demoUrl: string | null;
  caseStudy: ProjectCaseStudy;
}

export interface SkillGroup {
  id: string;
  title: string;
  caption: string;
  items: readonly string[];
}

export interface IdentityCard {
  id: string;
  title: string;
  body: string;
  index: string;
}

export interface PhilosophyStep {
  index: string;
  title: string;
  body: string;
}

export interface PhotoItem {
  src: string;
  alt: string;
  category: PhotoCategory;
  /** Frame shape. The photo centre-crops to fit whatever ratio you upload. */
  span: 'tall' | 'wide' | 'square';
}

export type PhotoCategory = 'TRAVEL' | 'SPORTS' | 'NATURE' | 'PHOTOGRAPHY';

export interface SocialLink {
  id: 'email' | 'github' | 'linkedin';
  label: string;
  /** Displayed to visitors. Replace the placeholder text below. */
  handle: string;
  /** null keeps the button visibly inert instead of linking somewhere wrong. */
  href: string | null;
}

export interface NavItem {
  label: string;
  targetId: string;
}

/* ── Personal ──────────────────────────────────────────────────────────────── */

export const personal: Personal = {
  name: 'Mutasim Billah',
  shortName: 'MUTASIM',
  tagline: ['BUILD.', 'COMPETE.', 'EXPLORE.'],
  roles: ['Robotics Enthusiast', 'Programmer', 'Problem Solver', 'Explorer'],
  statement:
    'I build machines, solve problems, and explore the world beyond the screen.',
  intro:
    'Robotics, electronics and software are where I spend my time — designing systems, competing with them, and learning why they behave the way they do.',
  resumeUrl: '/resume.pdf',
  profileImage: '/images/profile/profile.jpg',
  location: 'Bangladesh', // TODO: adjust or clear if you'd rather not show this
};

/* ── Navigation ────────────────────────────────────────────────────────────── */

export const navItems: readonly NavItem[] = [
  { label: 'WORK', targetId: 'work' },
  { label: 'JOURNEY', targetId: 'journey' },
  { label: 'ABOUT', targetId: 'about' },
  { label: 'CONTACT', targetId: 'contact' },
];

/* ── Identity ──────────────────────────────────────────────────────────────── */

export const identityCards: readonly IdentityCard[] = [
  {
    id: 'engineer',
    index: '01',
    title: 'ENGINEER',
    body: 'Building robots, electronics and software solutions.',
  },
  {
    id: 'competitor',
    index: '02',
    title: 'COMPETITOR',
    body: 'Competing in robotics and sports with discipline, experimentation and performance.',
  },
  {
    id: 'explorer',
    index: '03',
    title: 'EXPLORER',
    body: 'Photography, travel, sports and nature shape how I observe the world.',
  },
];

/* ── Achievements ──────────────────────────────────────────────────────────── */

export const achievements: readonly Achievement[] = [
  {
    id: 'taekwondo-2016',
    year: '2016',
    event: 'National Games',
    segment: 'Taekwondo',
    result: 'Silver Medal',
    kind: 'sports',
  },
  {
    id: 'taekwondo-2017',
    year: '2017',
    event: 'National Games',
    segment: 'Taekwondo',
    result: 'Bronze Medal',
    kind: 'sports',
  },
  {
    id: 'robo-fusion-2025',
    year: '2025',
    event: 'Robo Fusion',
    segment: 'Organised by UFTB',
    result: 'Top 10 Teams',
    detail:
      'The top 10 teams earned an opportunity to represent Bangladesh at a national stage in Malaysia.',
    kind: 'robotics',
  },
  {
    id: 'nrc-2025',
    year: '2025',
    event: 'National Robotics Championship',
    segment: 'RoboSoccer',
    result: 'Runner-up',
    kind: 'robotics',
    featured: true,
  },
];

/** Compact highlights surfaced in the hero. */
export const heroHighlights: readonly { value: string; label: string }[] = [
  { value: 'RUNNER-UP', label: 'National Robotics Championship 2025 · RoboSoccer' },
  { value: 'TOP 10', label: 'Robo Fusion — opportunity to represent Bangladesh' },
  { value: '2×', label: 'National Games medallist · Taekwondo' },
];

/* ── Projects ──────────────────────────────────────────────────────────────── */

const emptyCaseStudy: ProjectCaseStudy = {
  overview: '',
  problem: '',
  solution: '',
  hardware: [],
  software: [],
  contribution: '',
  challenges: '',
  result: '',
};

export const projects: readonly Project[] = [
  {
    id: 'robosoccer',
    index: '01',
    title: 'RoboSoccer',
    category: 'Competitive Robotics',
    year: '2025',
    summary:
      'A competition robot built for the RoboSoccer segment of the National Robotics Championship.',
    tags: ['Robotics', 'Competition'], // TODO: add real tech tags once confirmed
    coverImage: '/images/projects/robosoccer/cover.jpg',
    gallery: [
      '/images/projects/robosoccer/01.jpg',
      '/images/projects/robosoccer/02.jpg',
    ],
    githubUrl: null, // TODO: 'https://github.com/<you>/<repo>'
    demoUrl: null, // TODO: demo or video link
    caseStudy: { ...emptyCaseStudy }, // TODO: fill in — see ProjectCaseStudy above
  },
  {
    id: 'lfr',
    index: '02',
    title: 'LFR',
    category: 'Line Following Robot',
    year: '', // TODO
    summary:
      'An autonomous line following robot — an exercise in sensing, control and consistency.',
    tags: ['Robotics', 'Autonomous'], // TODO: add real tech tags once confirmed
    coverImage: '/images/projects/lfr/cover.jpg',
    gallery: ['/images/projects/lfr/01.jpg', '/images/projects/lfr/02.jpg'],
    githubUrl: null, // TODO
    demoUrl: null, // TODO
    caseStudy: { ...emptyCaseStudy }, // TODO
  },
  {
    id: 'aqua-guard',
    index: '03',
    title: 'Aqua Guard',
    category: 'Applied Engineering',
    year: '', // TODO
    summary:
      'A hardware project exploring how engineering can be pointed at a real environmental problem.',
    tags: ['Electronics', 'Hardware'], // TODO: add real tech tags once confirmed
    coverImage: '/images/projects/aqua-guard/cover.jpg',
    gallery: [
      '/images/projects/aqua-guard/01.jpg',
      '/images/projects/aqua-guard/02.jpg',
    ],
    githubUrl: null, // TODO
    demoUrl: null, // TODO
    caseStudy: { ...emptyCaseStudy }, // TODO
  },
];

/* ── Skills ────────────────────────────────────────────────────────────────── */

export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'software',
    title: 'SOFTWARE',
    caption: 'Languages I write in',
    items: ['C', 'C++', 'Java', 'Python'],
  },
  {
    id: 'web',
    title: 'WEB',
    caption: 'Markup & styling',
    items: ['HTML', 'CSS'],
  },
  {
    id: 'database',
    title: 'DATABASE',
    caption: 'Relational systems',
    items: ['MySQL', 'PostgreSQL'],
  },
  {
    id: 'engineering',
    title: 'ENGINEERING',
    caption: 'Tools & domains',
    items: ['MATLAB', 'Cisco Packet Tracer', 'Electronics', 'Robotics'],
  },
];

/* ── Philosophy ────────────────────────────────────────────────────────────── */

export const philosophyQuote =
  "I don't just want to make things work. I want to understand why they work.";

export const philosophySteps: readonly PhilosophyStep[] = [
  {
    index: '01',
    title: 'UNDERSTAND',
    body: 'Sit with the problem before touching a tool. What is actually being asked, and what constraints are real?',
  },
  {
    index: '02',
    title: 'ANALYZE',
    body: 'Break the system into parts small enough to reason about, and find where the difficulty truly lives.',
  },
  {
    index: '03',
    title: 'BUILD',
    body: 'Make the simplest version that can be tested. A working rough draft beats a perfect diagram.',
  },
  {
    index: '04',
    title: 'TEST',
    body: 'Push it until it fails, then read the failure carefully. Failure is the most honest feedback available.',
  },
  {
    index: '05',
    title: 'IMPROVE',
    body: 'Fix the cause, not the symptom — then run the loop again with what the last pass taught.',
  },
];

/* ── Interests ─────────────────────────────────────────────────────────────── */

export const passions: readonly string[] = ['Electronics', 'Photography', 'Problem Solving'];

export const loves: readonly string[] = ['Traveling', 'Sports', 'Nature', 'Photography'];

/* ── Photography ───────────────────────────────────────────────────────────── */

export const photoCategories: readonly PhotoCategory[] = [
  'TRAVEL',
  'SPORTS',
  'NATURE',
  'PHOTOGRAPHY',
];

/**
 * Photos are centre-cropped inside their frame, so mixed aspect ratios are fine.
 * Replace the files in public/images/photography/ and update `alt` + `category`.
 */
export const photos: readonly PhotoItem[] = [
  { src: '/images/photography/photography-01.jpg', alt: 'Photograph — placeholder 01', category: 'TRAVEL', span: 'tall' },
  { src: '/images/photography/photography-02.jpg', alt: 'Photograph — placeholder 02', category: 'NATURE', span: 'square' },
  { src: '/images/photography/photography-03.jpg', alt: 'Photograph — placeholder 03', category: 'SPORTS', span: 'wide' },
  { src: '/images/photography/photography-04.jpg', alt: 'Photograph — placeholder 04', category: 'PHOTOGRAPHY', span: 'square' },
  { src: '/images/photography/photography-05.jpg', alt: 'Photograph — placeholder 05', category: 'NATURE', span: 'tall' },
  { src: '/images/photography/photography-06.jpg', alt: 'Photograph — placeholder 06', category: 'TRAVEL', span: 'wide' },
];

/* ── Contact ───────────────────────────────────────────────────────────────── */

/**
 * PLACEHOLDERS — nothing here is real yet.
 * Set `handle` to what visitors should see and `href` to the destination.
 * Leave `href` as null and the button stays visibly inactive instead of
 * pointing somewhere wrong.
 */
export const socials: readonly SocialLink[] = [
  { id: 'email', label: 'Email', handle: 'your-email@example.com — TODO', href: null },
  { id: 'github', label: 'GitHub', handle: 'github.com/your-username — TODO', href: null },
  { id: 'linkedin', label: 'LinkedIn', handle: 'linkedin.com/in/your-profile — TODO', href: null },
];

export const contactCopy = {
  title: "LET'S BUILD SOMETHING.",
  body: 'Interested in robotics, technology, problem solving, or building something interesting?',
};

/* ── Footer / meta ─────────────────────────────────────────────────────────── */

export const siteMeta = {
  copyrightYear: 2026,
  builtWith: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
};
