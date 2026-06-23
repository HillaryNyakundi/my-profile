import type { Metadata } from 'next';
import Image from 'next/image';
import ProjectCta from '@/components/ProjectCta';

export const metadata: Metadata = {
  title: 'Process | Hillary Nyakundi',
  description: 'How Hillary Nyakundi takes an idea from problem to client handover.',
};

type Step = {
  title: string;
  description: string;
  image: string;
  color: string;
};

const steps: Step[] = [
  {
    title: 'Problem',
    description:
      'I start by understanding the real problem which is the users, the constraints, and what success actually looks like.',
    image: '/process/problem.svg',
    color: '#f97316',
  },
  {
    title: 'Research',
    description:
      'I explore the space: existing solutions, technical options, and the trade-offs that actually matter.',
    image: '/process/research.svg',
    color: '#3b82f6',
  },
  {
    title: 'Prototype',
    description:
      'I build a focused prototype to validate the approach and surface the hard parts early.',
    image: '/process/prototype.svg',
    color: '#6366f1',
  },
  {
    title: 'Product',
    description:
      'I turn the prototype into a reliable, well-tested product that holds up under real use.',
    image: '/process/product.svg',
    color: '#22c55e',
  },
  {
    title: 'Deployment',
    description:
      'I ship it, set up CI/CD and monitoring, then iterate based on real-world feedback.',
    image: '/process/deployment.svg',
    color: '#06b6d4',
  },
  {
    title: 'Client Handover',
    description:
      'I hand over clean documentation, a walkthrough, and the keys, so your team can own and run it with confidence.',
    image: '/process/handover.svg',
    color: '#ec4899',
  },
];

const eyebrow = 'text-xs uppercase tracking-[0.2em] text-subtle';

export default function ProcessPage() {
  return (
    <section className="py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className={eyebrow}>Process</p>
        <h1 className="mt-4 text-3xl font-medium leading-[1.15] tracking-tight sm:mt-5 sm:text-4xl sm:leading-[1.1] md:text-5xl">
          How I work
        </h1>
        <p className="mt-4 text-base leading-relaxed text-subtle sm:mt-5 sm:text-lg">
          A simple, repeatable way of turning an idea into something real and
          keeping it working once it&apos;s out in the world.
        </p>
      </header>

      <ol className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="flex flex-col rounded-2xl border border-line p-6 transition-colors hover:border-subtle"
          >
            <div
              className="relative flex h-32 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${step.color}14` }}
            >
              <Image
                src={step.image}
                alt={`${step.title} illustration`}
                fill
                unoptimized
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                className="object-contain p-5"
              />
              <span
                className="absolute right-3 top-3 text-sm font-semibold tabular-nums"
                style={{ color: step.color }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-subtle">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-16">
        <ProjectCta />
      </div>
    </section>
  );
}
