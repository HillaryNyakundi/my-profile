import Image from 'next/image';

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
      'I start by understanding the real problem — the users, the constraints, and what success actually looks like.',
    image: '/workflow/problem.svg',
    color: '#f97316',
  },
  {
    title: 'Research',
    description:
      'I explore the space: existing solutions, technical options, and the trade-offs that actually matter.',
    image: '/workflow/research.svg',
    color: '#3b82f6',
  },
  {
    title: 'Prototype',
    description:
      'I build a focused prototype to validate the approach and surface the hard parts early.',
    image: '/workflow/prototype.svg',
    color: '#8b5cf6',
  },
  {
    title: 'Product',
    description:
      'I turn the prototype into a reliable, well-tested product that holds up under real use.',
    image: '/workflow/product.svg',
    color: '#22c55e',
  },
  {
    title: 'Deployment',
    description:
      'I ship it, set up CI/CD and monitoring, then iterate based on real-world feedback.',
    image: '/workflow/deployment.svg',
    color: '#06b6d4',
  },
  {
    title: 'Client Handover',
    description:
      'I hand over clean documentation, a walkthrough, and the keys — so your team can own and run it with confidence.',
    image: '/workflow/handover.svg',
    color: '#ec4899',
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="py-12 sm:py-16 md:py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            My Workflow
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto" />
          <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            A simple, repeatable process for turning an idea into something real
            — and keeping it working once it&apos;s live.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-xl border border-gray-800 bg-[#222] p-6 transition-colors hover:border-gray-700"
            >
              <div className="relative mb-5 flex h-32 items-center justify-center rounded-lg">

                <Image
                  src={step.image}
                  alt={`${step.title} illustration`}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                  className="object-contain p-4"
                />
                <span
                  className="absolute right-3 top-3 text-sm font-semibold tabular-nums"
                  style={{ color: step.color }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
