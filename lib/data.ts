import {
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
  SiMysql,
  SiTypescript,
  SiUbuntu,
  SiKotlin,
  SiCloudflare,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import type {
  Experience,
  Service,
  SkillCategory,
  WorkProject,
} from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Tailwindcss", icon: SiTailwindcss, color: "#CC6699" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "Python", icon: SiPython, color: "#61DAFB" },
    ],
  },
  {
    title: "Mobile App Development",
    skills: [
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
      { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
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
    period: "FEB 2025 - JUL 2026",
    location: "Accra, Ghana",
    responsibilities: [
      "Developed and maintained the application using React, Node.js, TypeScript, Tailwind CSS, and Next.js.",
      "Implemented UI/UX principles, typography, color theory, spacing, and visual hierarchy.",
      "Implemented UI features based on business and product requirements while improving overall user experience.",
      "Troubleshot and resolved bugs in production and development environments, improving application stability and performance.",
      "Built reusable, maintainable UI components using modern frontend best practices and integrated frontend interfaces with REST APIs.",
      "Ensured cross-browser compatibility, performance optimization, and web accessibility.",
      "Worked closely with UX designers, QA, and DevOps teams to deliver production-ready features.",
      "Contributed to frontend testing using Jest, React Testing Library, and Playwright.",
      "Supported CI/CD workflows using Docker, GitHub Actions, and Git.",
      "Maintained clear communication with the team while working effectively both collaboratively and independently.",
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
    title: "Frontend Developer (Contract)",
    company: "MOR Insight Analytics",
    period: "MAR 2024 - JAN 2025",
    location: "Nairobi, Kenya",
    responsibilities: [
      "Designed, developed, and maintained scalable, reusable, and high-quality frontend applications.",
      "Ensured application reliability, security, and performance across different platforms and devices.",
      "Collaborated with designers and backend developers to implement responsive and user-friendly interfaces.",
      "Participated in code reviews and contribute to frontend development best practices.",
      "Created and maintain technical documentation such as component guides, architecture diagrams, and test plans.",
      "Stay up to date with the latest frontend technologies and suggest improvements when applicable.",
      "Communicated effectively with both technical and non-technical stakeholders.",
      "Collaborated with backend engineers to integrate APIs and ensure smooth data flow.",
      "Assisted in developing deployment strategies to Azure and Google cloud platform.",
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
    id: 3,
    title: "Frontend Developer (Internship)",
    company: "Lupleg LLC",
    period: "JAN 2024 - MAR 2024",
    location: "Lusaka, Zambia",
    responsibilities: [
      "Wrote clean, scalable, and maintainable React, ES6+ JavaScript and TypeScript code following best practices.",
      "Worked closely with backend developers to ensure seamless communication between frontend and backend systems.",
      "Participated in sprint planning, standups, and peer code reviews.",
      "Designed and developed reusable React components, enhancing application modularity and scalability.",
      "Maintained detailed documentation for new features, integrations, and deployment processes.",
      "Applied responsive design principles to create applications that provided a consistent user experience across different devices and screen sizes, following the mobile-first design principles.",
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

export const projects: WorkProject[] = [
  {
    id: 1,
    label: "Startup Project",
    title: "VisioRad AI",
    tagline: "One Platform for Every Step in the Diagnostic Journey.",
    problem:
      "Healthcare facilities across Africa share the same systemic barriers regardless of size, staffing, or specialisation.Diagnostic workflows are broken and patients pay the price.",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tanstack", "FastAPI"],
    image: "/work/visioradai.png",
    url: "https://visioradai.com",
    urlLabel: "visioradai.com",
  },
  {
    id: 2,
    label: "Client Work",
    title: "MOR Insight Analytics",
    tagline:
      "Trusted market research partner providing data and insights to fuel business growth across Africa. Access brand trackers, online panels, retail audits and consumer data.",
    problem:
      "Whether you're exploring new markets, launching products, or scaling operations, our localized expertise helps you make smarter, faster decisions.",
    technologies: ["Next.js", "TypeScript", "Shadcn UI", "Django", "Tanstack"],
    image: "/work/morinsight.png",
    url: "https://morinsight.co.ke",
    urlLabel: "morinsight.co.ke",
  },
];

export const services: Service[] = [
  {
    title: "Mobile App Development",
    description:
      "I create captivating mobile apps from concept to deployment for iOS and Android. Using cutting-edge technologies, I ensure seamless performance, intuitive interfaces, and robust functionality that align with your business goals. Enjoy a flawless user experience and outstanding results.",
    icons: [
      { icon: TbBrandReactNative, color: "#61DAFB" },
      { icon: SiKotlin, color: "#7F52FF" },
    ],
  },
  {
    title: "Web Development",
    description:
      "I deliver stunning, user-friendly websites to establish your online presence. From simple sites to complex e-commerce platforms, I provide tailored solutions using the latest frameworks and technologies for a seamless, responsive, and SEO-friendly browsing experience. Enhance your online identity with quality.",
    icons: [
      { icon: SiReact, color: "#61DAFB" },
      { icon: SiNodedotjs, color: "#339933" },
    ],
  },
  {
    title: "Backend Development",
    description:
      "I enhance digital applications with robust, scalable backend infrastructures. I develop efficient database structures, APIs, and configure servers for optimal performance, security, and scalability, ensuring your applications handle high traffic and complex data management seamlessly. Rely on strong backend solutions.",
    icons: [
      { icon: SiNodedotjs, color: "#339933" },
      { icon: SiExpress, color: "#FFFFFF" },
      { icon: SiPython, color: "#61DAFB" },
    ],
  },
  {
    title: "Database Management",
    description:
      "I manage and optimize your database systems for performance, reliability, and scalability. With expertise in SQL and NoSQL databases, I design schemas, write complex queries, and implement best practices for data integrity and security. Ensure your data is managed effectively and efficiently.",
    icons: [
      { icon: SiPostgresql, color: "#4169E1" },
      { icon: SiMongodb, color: "#47A248" },
    ],
  },
];
