import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiAmazon,
  SiDart,
  SiFlutter,
  SiSocketdotio,
  SiMysql,
  SiFirebase,
  SiUbuntu,
  SiFigma,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import type { Experience, Project, Service, SkillCategory } from '@/types';
import {
  BarChart3,
  Cloud,
  Database,
  GitBranch,
  Globe,
  Palette,
  Server,
  Settings,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Dart', icon: SiDart, color: '#0175C2' },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss3, color: '#1572B6' },
      { name: 'Tailwindcss', icon: SiTailwindcss, color: '#CC6699' },
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#FFFFFF' },
      { name: 'Socket.io', icon: SiSocketdotio, color: '#FFFFFF' },
      { name: 'Python', icon: SiPython, color: '#FFFFFF' },
    ],
  },
  {
    title: 'Mobile App Development',
    skills: [
      { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
      { name: 'GetX', icon: TbBrandReactNative, color: '#764ABC' },
    ],
  },
  {
    title: 'Database Management',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    ],
  },
  {
    title: 'DevOps/VCS',
    skills: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'AWS', icon: SiAmazon, color: '#FF9900' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
    ],
  },
  {
    title: 'Miscellaneous',
    skills: [
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      { name: 'Ubuntu', icon: SiUbuntu, color: '#E95420' },
    ],
  },
  {
    title: 'Nontechnical Skills',
    skills: [
      { name: 'Problem Solving', icon: SiReact, color: '#FFFFFF' }, // You can replace with custom icon
      { name: 'Collaboration', icon: SiGithub, color: '#FFFFFF' }, // You can replace with custom icon
      { name: 'Analytical Skills', icon: SiNodedotjs, color: '#FFFFFF' }, // You can replace with custom icon
    ],
  },
];

// Flatten skills for backward compatibility if needed
export const skills = skillCategories.flatMap((category) => category.skills);

export const experiences: Experience[] = [
  {
    id: 1,
    title: 'Frontend Developer (Contract)',
    company: 'Karegivv',
    period: 'JAN 01 2024 - DEC 31 2024',
    logo: '/images/dev.png',
    responsibilities: [
      'Managing project timelines, coordinating tasks, and ensuring timely delivery.',
      'Designing and developing user interfaces with JavaScript frameworks and Python.',
      'Building server-side logic, managing databases, and setting up servers.',
      'Communicating with clients to understand requirements, provide updates, and address feedback.',
    ],
    technologies: ['Python', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'Frontend Developer (Contract)',
    company: 'Zaprack Technologies',
    period: 'MAR 27 2025 - PRESENT',
    logo: '/images/dev.png',
    responsibilities: [
      'Managing project timelines, coordinating tasks, and ensuring timely delivery.',
      'Designing and developing user interfaces with JavaScript frameworks and Python.',
      'Building server-side logic, managing databases, and setting up servers.',
      'Communicating with clients to understand requirements, provide updates, and address feedback.',
    ],
    technologies: ['React', 'Python', 'JavaScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 3,
    title: 'Frontend Developer (Contract)',
    company: 'Visiorad AI',
    period: 'MAR 27 2025 - PRESENT',
    logo: '/images/dev.png',
    responsibilities: [
      'Managing project timelines, coordinating tasks, and ensuring timely delivery.',
      'Designing and developing user interfaces with JavaScript frameworks and Python.',
      'Building server-side logic, managing databases, and setting up servers.',
      'Communicating with clients to understand requirements, provide updates, and address feedback.',
    ],
    technologies: ['React', 'Python', 'JavaScript', 'Next.js', 'Tailwind CSS'],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Inventory App',
    description: 'A dynamic inventory Application with CRUD functionalities',
    image: '/images/projects/Invent.png',
    technologies: ['React', 'JavaScript', 'CSS', 'Python'],
    github: 'https://github.com/HillaryNyakundi/my-inventory',
    demo: 'https://my-inventory-six.vercel.app/',
  },
  {
    id: 2,
    title: 'RwandAIR',
    description: 'A landing page website for Rwanda air travel operations built',
    image: '/images/projects/Rwanda.png',
    technologies: ['PostgreSQL', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/HillaryNyakundi/rwandair-holidays',
    demo: 'https://rwandair-holidays.vercel.app/',
  },
  {
    id: 3,
    title: 'Barcadi',
    description: 'Cocktails store UI',
    image: '/images/projects/Barcardi.png',
    technologies: ['CSS', 'Python', 'React', 'JavaScript', 'HTML'],
    github: 'https://github.com/HillaryNyakundi/bacardi',
    demo: 'https://barcardi.vercel.app/',
  },
  {
    id: 4,
    title: 'Guarantors Guard',
    description: 'A landing page for a SACCO business',
    image: '/images/projects/Sacco.png',
    technologies: ['CSS', 'Python', 'React', 'JavaScript', 'HTML'],
    github: 'https://github.com/HillaryNyakundi/GuarantorsGuard',
    demo: 'https://guarantorguard.vercel.app/',
  },
];

export const services: Service[] = [
  {
    title: 'Mobile App Development',
    description:
      'I create captivating mobile apps from concept to deployment for iOS and Android. Using cutting-edge technologies, I ensure seamless performance, intuitive interfaces, and robust functionality that align with your business goals. Enjoy a flawless user experience and outstanding results.',
    icons: [
      { icon: Smartphone, color: '#FFFFFF' },
      { icon: SiReact, color: '#61DAFB' },
      { icon: SiFlutter, color: '#02569B' },
      { icon: TbBrandReactNative, color: '#61DAFB' },
      { icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    title: 'Web Development',
    description:
      'I deliver stunning, user-friendly websites to establish your online presence. From simple sites to complex e-commerce platforms, I provide tailored solutions using the latest frameworks and technologies for a seamless, responsive, and SEO-friendly browsing experience. Enhance your online identity with quality.',
    icons: [
      { icon: Globe, color: '#FFFFFF' },
      { icon: SiReact, color: '#61DAFB' },
      { icon: SiNodedotjs, color: '#339933' },
      { icon: SiHtml5, color: '#E34F26' },
      { icon: SiCss3, color: '#1572B6' },
    ],
  },
  {
    title: 'Backend Development',
    description:
      'I enhance digital applications with robust, scalable backend infrastructures. I develop efficient database structures, APIs, and configure servers for optimal performance, security, and scalability, ensuring your applications handle high traffic and complex data management seamlessly. Rely on strong backend solutions.',
    icons: [
      { icon: Server, color: '#FFFFFF' },
      { icon: SiNodedotjs, color: '#339933' },
      { icon: SiExpress, color: '#FFFFFF' },
      { icon: Database, color: '#FFFFFF' },
      { icon: Cloud, color: '#FFFFFF' },
    ],
  },
  {
    title: 'Product Strategy',
    description:
      "I collaborate to define clear goals, target audiences, and a success roadmap. My expertise in product ideation and market analysis ensures your product meets user needs and aligns with your business strategy for long-term growth and full potential realization. Drive your product's success with strategic planning.",
    icons: [
      { icon: BarChart3, color: '#FFFFFF' },
      { icon: Palette, color: '#FFFFFF' },
      { icon: SiFigma, color: '#F24E1E' },
      { icon: Zap, color: '#FFFFFF' },
      { icon: Settings, color: '#FFFFFF' },
    ],
  },
  {
    title: 'DevOps',
    description:
      'I streamline development and operations processes through effective DevOps practices. I implement continuous integration and deployment pipelines, manage cloud infrastructure, and use containerization to ensure efficient, reliable, and scalable software delivery. Improve your workflow with DevOps solutions.',
    icons: [
      { icon: GitBranch, color: '#FFFFFF' },
      { icon: SiDocker, color: '#2496ED' },
      { icon: SiAmazon, color: '#FF9900' },
      { icon: Cloud, color: '#FFFFFF' },
      { icon: Settings, color: '#FFFFFF' },
    ],
  },
  {
    title: 'Database Management',
    description:
      'I manage and optimize your database systems for performance, reliability, and scalability. With expertise in SQL and NoSQL databases, I design schemas, write complex queries, and implement best practices for data integrity and security. Ensure your data is managed effectively and efficiently.',
    icons: [
      { icon: Database, color: '#FFFFFF' },
      { icon: SiPostgresql, color: '#4169E1' },
      { icon: SiMongodb, color: '#47A248' },
      { icon: Shield, color: '#FFFFFF' },
      { icon: Server, color: '#FFFFFF' },
    ],
  },
];
