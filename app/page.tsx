import Image from 'next/image';
import Link from 'next/link';
import Strings from '@/constants/strings';

const inlineLink =
  'font-medium text-ink underline underline-offset-4 transition-colors hover:text-highlight';

const softSkills = [
  {
    title: 'Attention to detail',
    body: 'I take pleasure in building interfaces and systems with careful precision, emphasizing quality over quantity.',
  },
  {
    title: 'Collaboration',
    body: 'I work closely with designers, backend engineers, and non-technical stakeholders, communicating clearly to keep everyone moving in the same direction.',
  },
  {
    title: 'Ownership & little supervision',
    body: 'I understand people are busy, so I do my best to deliver work reliably and on time, sparing you the need to closely manage or oversee my work.',
  },
  {
    title: 'Continuous learning',
    body: 'I stay current with new tools and approaches, and I’m comfortable figuring things out in unfamiliar territory, favorable or not.',
  },
];

export default function Home() {
  return (
    <div className="py-12 sm:py-16">
      {/* Hero */}
      <section className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="flex min-h-[calc(100svh-9rem)] flex-col justify-center lg:block lg:min-h-0 lg:justify-start">
          <h1 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl md:leading-[1.1]">
            I&apos;m Hillary Nyakundi. I live in Nairobi, where I build the
            future.
          </h1>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-subtle sm:text-lg">
            <p>
              I&apos;m a self-driven, career-oriented software engineer
              specializing in frontend web and mobile development. My expertise
              lies in building interactive, reliable applications with
              technologies like JavaScript, React, Next.js, TypeScript, React
              Native and NodeJS.
            </p>
            <p>
              I strongly believe in continuous learning and improving myself, so
              I try my best to learn in any situation possible; favorable or
              not.
            </p>
            <p>
              You can find my{" "}
              <Link href="/projects" className={inlineLink}>
                work
              </Link>{" "}
              and reach out through{" "}
              <Link href="/contact" className={inlineLink}>
                contact
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Photo */}
        <div className="lg:max-w-sm">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line">
            <Image
              src="/Hillary.jpeg"
              alt={Strings.fullName}
              fill
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Soft Skills */}
      <section className="mt-20 max-w-2xl sm:mt-28">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Soft Skills
        </h2>
        <p className="mt-4 text-base leading-relaxed text-subtle sm:text-lg">
          Certain skills I&apos;ve picked along the way that deserve mentioning:
        </p>

        <ul className="mt-6 space-y-5">
          {softSkills.map((skill) => (
            <li key={skill.title} className="flex gap-3 leading-relaxed">
              <span className="shrink-0 text-subtle">-</span>
              <p className="text-subtle">
                <span className="font-semibold text-ink">{skill.title}:</span>{" "}
                {skill.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
