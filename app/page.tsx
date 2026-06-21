import Link from 'next/link';
import Strings from '@/constants/strings';

export default function Home() {
  return (
    <section className="mx-auto max-w-2xl py-12 sm:py-20 md:py-28">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {Strings.fullName}
      </h1>

      <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/90 sm:mt-8 sm:space-y-6 sm:text-lg">
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
          <Link href="/work" className="underline underline-offset-4 hover:text-highlight">
            work
          </Link>
          , or{' '}
          <Link href="/contact" className="underline underline-offset-4 hover:text-highlight">
            reach out
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
