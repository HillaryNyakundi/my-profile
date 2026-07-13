"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import type { WorkProject } from "@/types";

function ProjectImage({ project }: { project: WorkProject }) {
  const [errored, setErrored] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const showImage = project.image && !errored;

  return (
    <div
      className="relative h-full min-h-[340px] w-full overflow-hidden bg-background sm:min-h-[440px] lg:min-h-[520px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Soft base gradient — sits behind the screenshot and shows through if it fails */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-background" />

      {showImage ? (
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ scale: hovered && !reduceMotion ? 1.08 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.image as string}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
            onError={() => setErrored(true)}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-4xl text-foreground/10 sm:text-5xl">
            {project.title}
          </span>
        </div>
      )}

      {/* Edge fade toward the content panel — softens on hover so the shot lifts */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40 opacity-100 transition-opacity duration-700 group-hover:opacity-40 lg:to-black/60" />
    </div>
  );
}

function ProjectRow({ project }: { project: WorkProject }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group grid overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-border lg:grid-cols-[1.7fr_1fr]"
    >
      {/* Image cell — always on the left */}
      <div className="relative">
        <ProjectImage project={project} />
      </div>

      {/* Content cell */}
      <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:border-l lg:border-border lg:p-12">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {project.label}
          </p>
          <h3 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
        </div>

        <div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {project.problem}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {project.urlLabel ?? "Visit site"}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-background px-4 py-20 sm:px-6"
    >
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl sm:mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Selected Work
          </p>
          <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl md:text-5xl">
            Projects I&apos;ve designed for clients.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A look at products and platforms I&apos;ve designed and built from
            early startups to established companies.
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
