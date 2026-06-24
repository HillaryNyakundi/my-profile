import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Download } from 'lucide-react';
import QuoteBanner from '@/components/QuoteBanner';
import ExperienceList from '@/components/ExperienceList';
import { Button } from '@/components/ui/button';
import { experiences } from '@/lib/data';
import { totalExperience } from '@/lib/experience';
import Strings from '@/constants/strings';

const RESUME = '/Hillary-Nyakundi-Maranga-Resume.pdf';

export const metadata: Metadata = {
  title: 'Work | Hillary Nyakundi',
  description: 'Work experience and roles held by Hillary Nyakundi.',
};

export default function WorkPage() {
  return (
    <>
      <QuoteBanner />

      <div className="grid gap-10 py-10 md:grid-cols-[18rem_1fr] md:gap-16 md:py-12">
        <aside className="md:sticky md:top-12 md:self-start">
          <Image
            src="/Hillary.jpeg"
            alt={Strings.fullName}
            width={120}
            height={120}
            className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
          />
          <h1 className="mt-6 font-display text-4xl leading-[0.9] tracking-tight sm:text-5xl md:text-6xl">
            WORK
            <br />
            EXPERIENCE
          </h1>
          <p className="mt-6 font-sans text-sm text-subtle">{Strings.role}</p>
          <p className="mt-1 font-sans text-sm text-subtle">{Strings.location}</p>
          <p className="mt-1 font-sans text-sm text-subtle">
            Total Experience: {totalExperience()}
          </p>
          <p className="mt-5 max-w-xs leading-relaxed text-ink/90">
            I build web and mobile products, developer tooling, and systems where
            software meets real-world constraints.
          </p>
        </aside>

        <ExperienceList items={experiences} />
      </div>

      {/* Résumé */}
      <div className="flex flex-col items-start gap-5 border-t border-line py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Resume
          </h2>
          <p className="mt-2 text-subtle">
            Prefer the one-pager? Grab a copy of my full Resume.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <a href={RESUME} target="_blank" rel="noopener noreferrer">
              View Resume
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={RESUME} download aria-label="Download résumé">
              <Download className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
