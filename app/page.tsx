import Link from 'next/link';

const inlineLink =
  'font-medium text-ink underline underline-offset-4 transition-colors hover:text-highlight';

export default function Home() {
  return (
    <div className="py-12 sm:py-16">
      {/* Hero */}
      <section className='max-w-3xl mx-auto'>
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
      </section>
    </div>
  );
}
