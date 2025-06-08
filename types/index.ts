import { IconType } from 'react-icons/lib';

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  logo?: string;
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
