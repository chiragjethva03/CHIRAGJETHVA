import { faqs, profile, projects, socials } from "./data";

// Live domain; NEXT_PUBLIC_SITE_URL can override it (e.g. for a staging copy).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://chiragjethva.tech").replace(/\/$/, "");

export const seo = {
  title: "Chirag Jethva | Full Stack Developer in Surat, Gujarat",
  shortTitle: "Chirag Jethva",
  description:
    "Chirag Jethva is a full stack developer in Surat, Gujarat, building fast websites, web apps, REST APIs and Flutter mobile apps with Next.js, React, Node.js, NestJS and PostgreSQL. Book a 30-minute call.",
  keywords: [
    "Chirag Jethva",
    "software developer in Surat",
    "full stack developer Surat",
    "web developer Surat",
    "website developer in Surat",
    "freelance developer Surat",
    "Next.js developer Surat",
    "React developer Surat",
    "Node.js developer Surat",
    "Flutter app developer Surat",
    "mobile app developer Surat",
    "web application development Gujarat",
    "freelance full stack developer India",
    "hire full stack developer India",
  ],
};

// Structured data describing the person, the services offered and where.
export function jsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    description: seo.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Charotar University of Science and Technology (CHARUSAT)" },
      { "@type": "CollegeOrUniversity", name: "Lukhdhirji Engineering College, Morbi" },
    ],
    knowsAbout: [
      "Full stack web development",
      "Next.js",
      "React",
      "Node.js",
      "NestJS",
      "Express.js",
      "REST API design",
      "Flutter",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
    ],
    sameAs: socials.map((s) => s.href),
  };

  const service = {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: `${profile.name} — Full Stack Developer`,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    email: profile.email,
    description:
      "Website development, web application development, backend and API development, and Flutter mobile app development for startups and businesses in Surat, across Gujarat and India, and remote clients worldwide.",
    founder: { "@id": `${siteUrl}/#person` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 21.1702, longitude: 72.8311 },
    areaServed: [
      { "@type": "City", name: "Surat" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development services",
      itemListElement: [
        "Website development",
        "Web application development",
        "Backend & REST API development",
        "Flutter mobile app development",
        "Deployment, hosting & maintenance",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: seo.shortTitle,
    description: seo.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteUrl}/#person` },
  };

  const work = {
    "@type": "ItemList",
    name: "Selected projects",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        ...(p.url ? { url: p.url } : {}),
        creator: { "@id": `${siteUrl}/#person` },
      },
    })),
  };

  const faq = {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [person, service, website, work, faq] };
}
