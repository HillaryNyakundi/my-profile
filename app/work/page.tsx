import type { Metadata } from 'next';
import Image from 'next/image';
import QuoteBanner from '@/components/QuoteBanner';
import ExperienceList from '@/components/ExperienceList';
import { experiences } from '@/lib/data';
import { totalExperience } from '@/lib/experience';
import Strings from '@/constants/strings';

export const metadata: Metadata = {
  title: 'Work | Hillary Nyakundi',
  description: 'Work experience and roles held by Hillary Nyakundi.',
};

export default function WorkPage() {
  return (
    <>
      <QuoteBanner />

      <div className="grid gap-12 py-12 md:grid-cols-[18rem_1fr] md:gap-16">
        <aside className="md:sticky md:top-12 md:self-start">
          <Image
            src="/Hillary.jpeg"
            alt={Strings.fullName}
            width={120}
            height={120}
            className="h-28 w-28 rounded-full object-cover"
          />
          <h1 className="mt-6 font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl">
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
    </>
  );
}
