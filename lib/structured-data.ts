// JSON-LD structured data for search engines and AI crawlers.
// Rendered as <script type="application/ld+json"> in the root layout.
import Strings from '@/constants/strings';
import { siteConfig } from '@/lib/site';
import { projects } from '@/lib/data';

// Person schema — the primary entity for a personal portfolio.
const personSchema = {
  '@type': 'Person',
  '@id': `${siteConfig.url}/#person`,
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  jobTitle: 'Software Engineer - Mobile and website developer',
  description: siteConfig.description,
  email: Strings.primaryEmail,
  sameAs: [Strings.githubLink, Strings.linkedInLink, Strings.calendyLink],
  knowsAbout: [
    'Software Engineering',
    'Frontend Development',
    'Website development',
    'React',
    'Next.js',
    'TypeScript',
    'React Native',
    'Mobile App Development',
    'Node.js',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KE',
  },
};

// WebSite schema — describes the site itself and its owner.
const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: { '@id': `${siteConfig.url}/#person` },
  inLanguage: 'en',
};

// CreativeWork schema — one node per portfolio project, authored by the person.
// Helps search engines and AI crawlers understand the work as distinct entities.
const projectSchemas = projects
  .filter((project) => project.title.trim() !== '')
  .map((project) => ({
    '@type': 'CreativeWork',
    '@id': `${siteConfig.url}/work#project-${project.id}`,
    name: project.title,
    description: project.tagline,
    abstract: project.problem,
    author: { '@id': `${siteConfig.url}/#person` },
    keywords: project.technologies.join(', '),
    ...(project.url ? { url: project.url } : {}),
    ...(project.image
      ? { image: `${siteConfig.url}${project.image}` }
      : {}),
  }));

// Combined graph served on every page.
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [personSchema, websiteSchema, ...projectSchemas],
};
