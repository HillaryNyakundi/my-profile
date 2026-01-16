import {
  SiHtml5,
  SiCss3,
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
  SiFlutter,
  SiMysql,
  SiFirebase,
  SiTypescript,
  SiUbuntu,
  SiKotlin,
  SiDigitalocean,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import type { Experience, Project, Service, SkillCategory } from "@/types";
import {
  Cloud,
  Database,
  Globe,
  Server,
  Shield,
  Smartphone,
} from "lucide-react";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss3, color: "#1572B6" },
      { name: "Tailwindcss", icon: SiTailwindcss, color: "#CC6699" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    title: "Mobile App Development",
    skills: [
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
      { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
    ],
  },
  {
    title: "Database Management",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    title: "DevOps/VCS",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "AWS", icon: SiAmazon, color: "#FF9900" },
      { name: "Digital Ocean", icon: SiDigitalocean, color: "#0080FF" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Ubuntu", icon: SiUbuntu, color: "#E95420" },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Problem Solving", icon: SiReact, color: "#FFFFFF" }, // You can replace with custom icon
      { name: "Collaboration", icon: SiGithub, color: "#FFFFFF" }, // You can replace with custom icon
      { name: "Analytical Skills", icon: SiNodedotjs, color: "#FFFFFF" }, // You can replace with custom icon
    ],
  },
];

// Flatten skills for backward compatibility if needed
export const skills = skillCategories.flatMap((category) => category.skills);

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Frontend Developer (Contract)",
    company: "VisioRad AI",
    period: "MAR 27 2025 - DEC 5 2025",
    logo: "/images/dev.png",
    responsibilities: [
      "Designed, built, and maintained React/TypeScript components using Next.js App Router and serverless functions for edge-rendering pages.",
      "Crafted polished UIs with TailwindCSS and Shadcn UI, ensuring responsive design and accessibility compliance.",
      "Set up and monitor automated Vercel deployments linked to GitHub pull requests(CI/CD).",
      "Collaborated with designers to translate Figma mocks into production‐ready code, iterating based on analytics and user feedback.",
      "Worked with backend developers to integrate applications with RESTful APIs and third-party APIs for seamless data exchange.",
    ],
    technologies: [
      "React",
      "Typescript",
      "JavaScript",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    id: 2,
    title: "Frontend Developer (Freelance)",
    company: "Sentiint.ai",
    period: "FEB 03 2024 - DEC 31 2024",
    logo: "/images/dev.png",
    responsibilities: [
      "Developed, optimized, and maintained responsive web applications, ensuring 100% compatibility across major browsers and devices using React, Next.js,Typescript, and Redux Toolkit.",
      "I optimized web performance to maintain an optimal Lighthouse performance score above 90%.",
      "Collaborated with UX/UI designers to transform wire frames and Figma prototypes into high-quality, interactive user interfaces and ensured 95% accuracy in translating designs into functional web pages.",
      "Integrated and built on the design prototypes following the accessibility design principles(WCAG).",
      "Worked with backend developers to integrate applications with RESTful APIs and third-party APIs for seamless data exchange.",
    ],
    technologies: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Redux Toolkit",
    ],
  },
  {
    id: 3,
    title: "Frontend Developer (Freelance)",
    company: "Karegivv",
    period: "JAN 06 2024 - DEC 24 2024",
    logo: "/images/dev.png",
    responsibilities: [
      "Managing project timelines, coordinating tasks, and ensuring timely delivery.",
      "Designing and developing user interfaces with React.js and Next.js.",
      "Building client-side logic, designed the user interfaces, and wrote clear documentation.",
      "Communicating with clients to understand requirements, provide updates, and address feedback.",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
    ],
  },
  {
    id: 4,
    title: "Frontend Developer Intern (Contract)",
    company: "Lupleg LLC",
    period: "AUG 06 2023 - DEC 24 2023",
    logo: "/images/dev.png",
    responsibilities: [
      "I Wrote clean, scalable, and maintainable React, ES6+ JavaScript and TypeScript code following best practices.",
      "I Worked closely with backend developers to ensure seamless communication between frontend and backend systems.",
      "Participated in sprint planning, stand up meetings, and peer code reviews.",
      "Designed and developed reusable react components, enhancing application modularity and scalability.",
      "Maintained detailed documentation for new features, integrations, and deployment processes.",
    ],
    technologies: [
      "React",
      "Typescript",
      "JavaScript",
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
    ],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Inventory App",
    description: "A dynamic inventory Application with CRUD functionalities",
    image: "/images/projects/Invent.png",
    technologies: ["React", "JavaScript", "CSS", "Python"],
    github: "https://github.com/HillaryNyakundi/my-inventory",
    demo: "https://my-inventory-six.vercel.app/",
  },
  {
    id: 2,
    title: "RwandAIR",
    description:
      "A landing page website for Rwanda air travel operations built",
    image: "/images/projects/Rwanda.png",
    technologies: ["PostgreSQL", "Express", "React", "Node.js"],
    github: "https://github.com/HillaryNyakundi/rwandair-holidays",
    demo: "https://rwandair-holidays.vercel.app/",
  },
  {
    id: 3,
    title: "Barcadi",
    description: "Cocktails store UI",
    image: "/images/projects/Barcardi.png",
    technologies: ["CSS", "Python", "React", "JavaScript", "HTML"],
    github: "https://github.com/HillaryNyakundi/bacardi",
    demo: "https://barcardi.vercel.app/",
  },
];

export const services: Service[] = [
  {
    title: "Mobile App Development",
    description:
      "I create captivating mobile apps from concept to deployment for iOS and Android. Using cutting-edge technologies, I ensure seamless performance, intuitive interfaces, and robust functionality that align with your business goals. Enjoy a flawless user experience and outstanding results.",
    icons: [
      { icon: Smartphone, color: "#FFFFFF" },
      { icon: SiReact, color: "#61DAFB" },
      { icon: SiFlutter, color: "#02569B" },
      { icon: TbBrandReactNative, color: "#61DAFB" },
      { icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "Web Development",
    description:
      "I deliver stunning, user-friendly websites to establish your online presence. From simple sites to complex e-commerce platforms, I provide tailored solutions using the latest frameworks and technologies for a seamless, responsive, and SEO-friendly browsing experience. Enhance your online identity with quality.",
    icons: [
      { icon: Globe, color: "#FFFFFF" },
      { icon: SiReact, color: "#61DAFB" },
      { icon: SiNodedotjs, color: "#339933" },
      { icon: SiHtml5, color: "#E34F26" },
      { icon: SiCss3, color: "#1572B6" },
    ],
  },
  {
    title: "Backend Development",
    description:
      "I enhance digital applications with robust, scalable backend infrastructures. I develop efficient database structures, APIs, and configure servers for optimal performance, security, and scalability, ensuring your applications handle high traffic and complex data management seamlessly. Rely on strong backend solutions.",
    icons: [
      { icon: Server, color: "#FFFFFF" },
      { icon: SiNodedotjs, color: "#339933" },
      { icon: SiExpress, color: "#FFFFFF" },
      { icon: Database, color: "#FFFFFF" },
      { icon: Cloud, color: "#FFFFFF" },
    ],
  },
  {
    title: "Database Management",
    description:
      "I manage and optimize your database systems for performance, reliability, and scalability. With expertise in SQL and NoSQL databases, I design schemas, write complex queries, and implement best practices for data integrity and security. Ensure your data is managed effectively and efficiently.",
    icons: [
      { icon: Database, color: "#FFFFFF" },
      { icon: SiPostgresql, color: "#4169E1" },
      { icon: SiMongodb, color: "#47A248" },
      { icon: Shield, color: "#FFFFFF" },
      { icon: Server, color: "#FFFFFF" },
    ],
  },
];
