'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Experience } from '@/types';
import { describePeriod } from '@/lib/experience';

export default function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <Accordion type="single" collapsible className="border-t border-line">
      {items.map((job) => {
        const { label, duration } = describePeriod(job.period);

        return (
          <AccordionItem
            key={job.id}
            value={`item-${job.id}`}
            className="border-line"
          >
            <AccordionTrigger className="cursor-pointer py-6 hover:no-underline">
              <div className="flex-1">
                <h3 className="text-xl font-semibold sm:text-2xl">{job.title}</h3>
                <p className="mt-2 font-sans text-sm text-subtle">{job.company}</p>
                <p className="mt-1 font-sans text-sm text-subtle">
                  {label} <span className="opacity-70">({duration})</span>
                </p>
                {job.location && (
                  <p className="mt-1 font-sans text-sm text-subtle">
                    {job.location}
                  </p>
                )}
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-8 text-base">
              <ul className="space-y-2.5 text-ink/90">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed">
                    <span className="shrink-0 text-subtle">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 font-sans text-xs text-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
