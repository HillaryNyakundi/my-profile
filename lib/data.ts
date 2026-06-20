import {
  SiHtml5,
  SiCss3,
  SiDjango,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFlutter,
  SiKotlin,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import type { Experience, Project, Service } from "@/types";
import { Database, Server } from "lucide-react";

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Frontend Developer (Full-time)",
    company: "VisioRad AI",
    location: "Ghana, Accra",
    period: "FEB 2025 - PRESENT",
    responsibilities: [
      "Designed, built, and maintained React/TypeScript components using Next.js App Router and serverless functions for edge-rendering pages.",
      "Crafted polished UIs with TailwindCSS and Shadcn UI, ensuring responsive design and accessibility compliance.",
      "Set up and monitored automated Docker deployments linked to GitHub pull requests (CI/CD) and Digital Ocean.",
      "Collaborated with designers to translate Figma mocks into production-ready code, iterating based on analytics and user feedback.",
      "Contributed to component libraries, design-system tokens, and Storybook docs.",
      "Championed frontend best practices: code reviews, testing (Jest/RTL/Playwright), and performance profiling.",
      "Worked with API-first architectures, JWT/OAuth flows, and secure client-side storage.",
      "Worked with backend developers to integrate applications with RESTful APIs and third-party APIs for seamless data exchange.",
      "Applied responsive design principles following the mobile-first design principles.",
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
    title: "Software Developer (Self-Employed) ",
    company: "Mor Insight Analytics",
    location: "Kenya",
    period: "JAN 2025 - PRESENT",
    responsibilities: [
      "Developed, optimized, and maintained responsive web applications, ensuring 100% compatibility across major browsers and devices using React, Next.js, Typescript, and Context API.",
      "Assisted in developing deployment strategies to AWS and automation scripts.",
      "Optimized web performance to maintain an optimal Lighthouse performance score above 90%.",
      "Collaborated with UX/UI designers to transform wireframes and Figma prototypes into high-quality, interactive user interfaces and ensured 95% accuracy in translating designs into functional web pages.",
      "Integrated and built on the design prototypes following the accessibility design principles (WCAG).",
      "Addressed and resolved at least 95% of reported frontend issues within SLA using debugging tools such as DevTools and Lighthouse.",
      "Engaged in code reviews and completed assigned development tasks within sprint deadlines.",
      "Worked with backend developers to integrate applications with RESTful APIs and third-party APIs for seamless data exchange.",
    ],
    technologies: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Tanstack",
      "Paystack- Mpesa",
      "Django-Python"
    ],
  },
  {
    id: 3,
    title: "Frontend Developer (Contract)",
    company: "Karegivv",
    location: "Nairobi, Kenya",
    period: "FEB 2024 - DEC 2024",
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
    id: 4,
    title: "Frontend Developer (Intern)",
    company: "Lupleg LLC",
    location: "Lusaka, Zambia",
    period: "NOV 2023 - FEB 2024",
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
      { icon: SiKotlin, color: "#7F52FF" },
      { icon: SiFlutter, color: "#02569B" },
      { icon: TbBrandReactNative, color: "#61DAFB" },
    ],
  },
  {
    title: "Web Development",
    description:
      "I deliver stunning, user-friendly websites to establish your online presence. From simple sites to complex e-commerce platforms, I provide tailored solutions using the latest frameworks and technologies for a seamless, responsive, and SEO-friendly browsing experience. Enhance your online identity with quality.",
    icons: [
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
      { icon: SiNodedotjs, color: "#339933" },
      { icon: SiExpress, color: "#FFFFFF" },
      { icon: SiDjango, color: "#44B78B" },
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
      { icon: Server, color: "#FFFFFF" },
    ],
  },
];
