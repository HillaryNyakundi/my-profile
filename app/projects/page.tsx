import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import ProjectCta from '@/components/ProjectCta';
import { projects } from '@/lib/data';
import type { Project } from '@/types';

export const metadata: Metadata = {
  title: 'Projects | Hillary Nyakundi',
  description: 'A selection of things Hillary Nyakundi has designed and built.',
};

const eyebrow = 'text-xs uppercase tracking-[0.2em] text-subtle';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group">
      {/* Prominent image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-muted">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}

        {/* scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* title + actions */}
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {project.title}
          </h2>

          <div className="flex shrink-0 gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-white/85"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* meta */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-xl leading-relaxed text-subtle">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-3 py-1 text-xs text-subtle"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <section className="py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className={eyebrow}>Projects</p>
        <h1 className="mt-4 text-3xl font-medium leading-[1.15] tracking-tight sm:mt-5 sm:text-4xl sm:leading-[1.1] md:text-5xl">
          Things I&apos;ve designed and built.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-subtle sm:mt-5 sm:text-lg">
          A selection of my work, hover a project to peek at the code or jump
          straight to the live build.
        </p>
      </header>

      <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 border-t border-line pt-16 sm:mt-28">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-subtle">
          Like what you see?
        </p>
        <div className="mt-5">
          <ProjectCta />
        </div>
      </div>
    </section>
  );
}
