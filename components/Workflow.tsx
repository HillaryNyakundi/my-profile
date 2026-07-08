import {
  CloudUpload,
  Handshake,
  PencilRuler,
  Puzzle,
  Rocket,
  Telescope,
  type LucideIcon,
} from 'lucide-react';

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

const steps: Step[] = [
  {
    title: 'Problem',
    description:
      'I start by understanding the real problem, which is; the users, the constraints, and what success actually looks like.',
    icon: Puzzle,
    color: '#f97316',
  },
  {
    title: 'Research',
    description:
      'I explore the space: existing solutions, technical options, and the trade-offs that actually matter.',
    icon: Telescope,
    color: '#3b82f6',
  },
  {
    title: 'Prototype',
    description:
      'I build a focused prototype to validate the approach and surface the hard parts early.',
    icon: PencilRuler,
    color: '#8b5cf6',
  },
  {
    title: 'Product',
    description:
      'I turn the prototype into a reliable, well-tested product that holds up under real use.',
    icon: Rocket,
    color: '#22c55e',
  },
  {
    title: 'Deployment',
    description:
      'I ship it, set up CI/CD and monitoring, then iterate based on real-world feedback.',
    icon: CloudUpload,
    color: '#06b6d4',
  },
  {
    title: 'Client Handover',
    description:
      'I hand over clean documentation, a walkthrough, and the keys so your team can own and run the app or website system with confidence.',
    icon: Handshake,
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
          <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            A simple, repeatable process for turning an idea into something real and keeping it working once it&apos;s live.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group rounded-xl border border-gray-800 bg-[#222] p-6 transition-colors hover:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-transform group-hover:scale-105"
                    style={{ color: step.color }}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <span className="text-3xl font-bold tabular-nums text-white/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
