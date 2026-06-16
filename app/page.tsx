import Link from 'next/link';
import Strings from '@/constants/strings';

export default function Home() {
  return (
    <section className="mx-auto max-w-2xl py-20 sm:py-28">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {Strings.fullName}
      </h1>

      <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/90">
        <p>
          I&apos;m a software engineer who builds web and mobile products end to
          end. I care about clean interfaces, practical architecture, and
          software that keeps working when real users, real data, and real
          constraints show up.
        </p>
        <p>
          This site is where I collect the things I&apos;m learning and building
          across frontend systems, mobile applications, backend services,
          databases, and the tooling that ties them together.
        </p>
        <p>
          You can see my{' '}
          <Link href="/work" className="underline underline-offset-4 hover:text-accent">
            work
          </Link>
          , or{' '}
          <Link href="/contact" className="underline underline-offset-4 hover:text-accent">
            reach out
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
