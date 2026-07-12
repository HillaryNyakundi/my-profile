import { IconType } from 'react-icons/lib';

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  location?: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  github?: string;
  demo?: string | null;
}

export interface WorkProject {
  id: number;
  /** Small uppercase eyebrow, e.g. "STARTUP PROJECT" */
  label: string;
  title: string;
  /** Short one-line summary shown under the title */
  tagline: string;
  /** Context / the problem this project solved */
  problem: string;
  technologies: string[];
  image?: string;
  /** Live site URL */
  url?: string;
  /** Display text for the link, e.g. "eventparlour.com" */
  urlLabel?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  brief: string;
  url: string;
  coverImage?: string;
  dateAdded: string;
}

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Icon {
  icon: IconType;
  color: string;
}

export interface Service {
  title: string;
  description: string;
  icons: Icon[];
}

export interface GoogleReview {
  id: string;
  author: string;
  authorUri?: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface GoogleReviewsData {
  rating: number;
  total: number;
  mapsUri?: string;
  reviews: GoogleReview[];
}
