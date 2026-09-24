// All site copy lives here, so content edits never touch the components.

export const profile = {
  name: "Chirag Jethva",
  firstName: "Chirag",
  lastName: "Jethva",
  role: "Full Stack Developer",
  tagline: "Systems & Scalability",
  location: "Surat, India",
  timezone: "Asia/Kolkata",
  email: "chiragjethva23@gmail.com",
  resume: "/Chirag_Jethva_Resume.pdf",
  cal: "https://cal.com/chirag-jethva/book30min",
  // Hero 3D: "globe" (dotted earth with arcs from Surat) or "glass" (refractive knot).
  heroScene: "globe" as "globe" | "glass",
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jethvachirag23/" },
  { label: "Instagram", href: "https://www.instagram.com/_chiragjethva03" },
  { label: "X / Twitter", href: "https://x.com/chiragjethva23" },
  // Add your GitHub profile URL here to show it everywhere socials appear.
  { label: "GitHub", href: "" },
].filter((s) => s.href);

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const marquee = [
  "Next.js",
  "React",
  "Node.js",
  "NestJS",
  "Flutter",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "REST APIs",
  "Microservices",
  "Firebase",
  "Express",
];

export const about = {
  statement:
    "I'm Chirag, a full-stack developer from Surat who turns ideas into fast, reliable products. I design the API, shape the database, craft the interface and ship it to production, end to end.",
  stats: [
    { value: 2, suffix: "+", label: "Years shipping production code" },
    { value: 4, suffix: "", label: "Live client sites in production" },
    { value: 5, suffix: "+", label: "Products designed & built" },
    { value: 3, suffix: "", label: "Teams & studios worked with" },
  ],
};

export const services = [
  {
    no: "01",
    title: "Web Applications",
    body: "Responsive, accessible interfaces in Next.js and React that load fast and convert.",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    no: "02",
    title: "Backend & APIs",
    body: "Clean REST APIs, auth, and service architecture that stays maintainable as you grow.",
    tags: ["Node.js", "NestJS", "Express"],
  },
  {
    no: "03",
    title: "Mobile Apps",
    body: "Cross-platform Flutter apps that share one backend with your web product.",
    tags: ["Flutter", "Dart", "Firebase"],
  },
  {
    no: "04",
    title: "Ship & Scale",
    body: "Schema design, performance tuning, hosting, domains and production support.",
    tags: ["PostgreSQL", "MongoDB", "Deployment"],
  },
];

export type Project = {
  title: string;
  kind: string;
  year: string;
  status?: string;
  description: string;
  highlights: string[];
  tech: string[];
  url?: string;
  hue: [string, string];
  glyph: string;
};

export const projects: Project[] = [
  {
    title: "Clothes Bazzar",
    kind: "E-commerce marketplace",
    year: "2026",
    status: "In development",
    description:
      "An India-focused clothing marketplace tackling high commissions, return fraud and delayed seller payouts.",
    highlights: [
      "Flutter app, Next.js seller dashboard, NestJS microservices",
      "Escrow-style payout logic for seller payment security",
      "PostgreSQL for transactional integrity",
    ],
    tech: ["Flutter", "Next.js", "NestJS", "PostgreSQL", "Firebase Auth"],
    hue: ["#c8ff2e", "#1f6f5c"],
    glyph: "CB",
  },
  {
    title: "CloudVentors",
    kind: "Cloud solutions platform",
    year: "Live",
    description:
      "A high-performance marketing and services platform for a cloud solutions company, tuned for page speed and lead conversion.",
    highlights: [
      "Built, deployed and hosted end to end",
      "Performance-first Next.js build",
      "Domain & hosting configuration",
    ],
    tech: ["Next.js", "Tailwind CSS"],
    url: "https://cloudventors.com",
    hue: ["#7aa2ff", "#231a5c"],
    glyph: "CV",
  },
  {
    title: "Shree Gayatri Agency",
    kind: "Business website",
    year: "Live",
    description:
      "A production website for a growing agency, delivered from requirements to launch with ongoing client support.",
    highlights: [
      "Requirement gathering to deployment",
      "Responsive UI with Tailwind CSS",
      "Stable live performance",
    ],
    tech: ["Next.js", "React", "Tailwind CSS"],
    url: "https://www.shreegayatriagency.com",
    hue: ["#ffb347", "#5c2a1a"],
    glyph: "SG",
  },
  {
    title: "SwitchKart",
    kind: "Commerce platform · Backend",
    year: "2026",
    description:
      "RESTful APIs for the SwitchKart platform at AndAI, from auth and schema design to QA across the user app and admin panel.",
    highlights: [
      "Authentication & authorization on every endpoint",
      "Faster responses through query and schema optimization",
      "Zero critical issues at final delivery",
    ],
    tech: ["Node.js", "REST APIs", "Auth", "Database design"],
    hue: ["#ff5fa2", "#3a1036"],
    glyph: "SK",
  },
  {
    title: "CareerBridge",
    kind: "Job portal",
    year: "2024",
    description:
      "A full hiring platform covering candidate and company flows, with the backend architecture owned end to end.",
    highlights: [
      "Auth, profiles and application workflows from scratch",
      "Complete candidate & company feature coverage",
      "Independent backend architecture decisions",
    ],
    tech: ["Node.js", "Express", "MongoDB"],
    hue: ["#3ee6d0", "#0d3a44"],
    glyph: "CR",
  },
];

export const journey = [
  {
    period: "Jul 2024 — Now",
    role: "Full Stack Developer",
    org: "KnC Future Tech · Freelance",
    points: [
      "Custom full-stack apps for clients with Next.js, React, Node.js and MongoDB",
      "Two live production launches, including hosting and domains",
      "End-to-end delivery: requirements, system design, build, deploy, support",
    ],
  },
  {
    period: "Nov 2025 — Feb 2026",
    role: "Backend Developer Intern",
    org: "AndAI · SwitchKart",
    points: [
      "Designed REST APIs and secured them with auth",
      "Optimized response times and database schema",
      "Ran full manual QA across user app and admin panel",
    ],
  },
  {
    period: "May — Jul 2024",
    role: "Node.js Developer Intern",
    org: "Toshal Infotech",
    points: [
      "Built CareerBridge, a production-ready job portal",
      "Owned backend architecture decisions independently",
    ],
  },
  {
    period: "2023 — 2026",
    role: "B.Tech, Information Technology",
    org: "DEPSTAR · Charusat University",
    points: ["CGPA 7.98"],
  },
  {
    period: "2020 — 2023",
    role: "Diploma, Information Technology",
    org: "L.E. College, Morbi",
    points: ["CGPA 8.00"],
  },
];

export const stack = [
  { group: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "Responsive UI"] },
  { group: "Backend", items: ["Node.js", "Express.js", "NestJS", "REST APIs", "Auth Systems", "Microservices"] },
  { group: "Databases", items: ["PostgreSQL", "MongoDB", "Firebase"] },
  { group: "Mobile", items: ["Flutter", "Dart"] },
  { group: "Languages", items: ["JavaScript (ES6+)", "Dart"] },
  { group: "Tools", items: ["Git", "GitHub", "Postman", "VS Code", "Figma"] },
];

// Quotes copied word for word from kncfuturetech.com/testimonials.
export const testimonials = [
  {
    quote:
      "Working with KnC Future Tech was a great experience. They delivered a professional, high-quality solution that perfectly matched our vision. Their technical expertise and attention to detail truly set them apart. Highly recommended!",
    name: "Shivam Yadav",
    role: "Founder & Owner",
    company: "CloudVentors",
    url: "https://cloudventors.com",
    photo: "/testimonials/shivam.png",
    // Source photo has dark corners; zoom in to crop them.
    photoClass: "scale-[1.18]",
  },
  {
    quote:
      "They understood all my requirements, covered every point, and completed my project before the deadline. Highly Recommend!",
    name: "Sharthak Jani",
    role: "Owner",
    company: "Shree Gayatri Agency",
    url: "https://www.shreegayatriagency.com",
    photo: "/testimonials/sharthak.jpeg",
    // Wide shot; zoom in on the face.
    photoClass: "scale-[2.1] origin-[48%_28%]",
  },
  {
    quote:
      "Excellent work, maine apni company ki website cosmicapital.in KnC Future Tech se banvayi unka unique design, user-friendly approach, aur after-sale service se main bahot khush hu. I will highly recommend KnC Future Tech! 🙏",
    name: "Himesh Barot",
    role: "Founder & Owner",
    company: "Cosmic Capital",
    url: "https://www.cosmiccapital.in/",
    photo: "/testimonials/himesh.png",
  },
];

// Visible on the page and mirrored into FAQ structured data; answers people searching for local developers.
export const faqs = [
  {
    q: "Are you a software developer based in Surat?",
    a: "Yes. I'm Chirag Jethva, a full stack developer based in Surat, Gujarat. I work with businesses in Surat and across Gujarat in person or remotely, and with clients across India and abroad online.",
  },
  {
    q: "What can you build for my business?",
    a: "Business websites, web applications, admin dashboards, e-commerce platforms, REST APIs and backends, and cross-platform mobile apps with Flutter. I handle the whole journey: requirements, design, development, deployment, hosting and ongoing support.",
  },
  {
    q: "Which technologies do you work with?",
    a: "Next.js and React for the frontend, Node.js, NestJS and Express for the backend, PostgreSQL, MongoDB and Firebase for data, and Flutter for iOS and Android apps.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Yes. Most of my work is with founders and growing businesses, from a first website to a full product with a web app, mobile app and shared backend. I keep the scope practical and the code maintainable so it can grow with you.",
  },
  {
    q: "How do we get started?",
    a: "Book a 30-minute call. We'll talk through your idea, what you need and your timeline, and I'll suggest the simplest way to build it.",
  },
];
