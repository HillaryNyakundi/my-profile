// JSON-LD structured data for search engines and AI crawlers.
// Rendered as <script type="application/ld+json"> in the root layout.
import Strings from '@/constants/strings';
import { siteConfig } from '@/lib/site';

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

// Combined graph served on every page.
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [personSchema, websiteSchema],
};
