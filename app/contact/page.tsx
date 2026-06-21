import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuoteSheet from '@/components/QuoteSheet';
import CopyButton from '@/components/CopyButton';
import Strings from '@/constants/strings';

export const metadata: Metadata = {
  title: 'Contact | Hillary Nyakundi',
  description: 'Get in touch with Hillary Nyakundi.',
};

const socials = [
  { label: 'GitHub', href: Strings.githubLink },
  { label: 'LinkedIn', href: Strings.linkedInLink },
  { label: 'WhatsApp', href: Strings.whatsAppLink },
  { label: 'Book a call', href: Strings.calendyLink },
];

const eyebrow = 'font-sans text-xs uppercase tracking-[0.2em] text-subtle';

export default function ContactPage() {
  return (
    <section className="grid gap-10 py-10 font-sans lg:grid-cols-2 lg:gap-16 lg:py-12">
      {/* Image panel */}
      <aside className="hidden lg:sticky lg:top-8 lg:block lg:self-start">
        <div className="relative h-[40rem] overflow-hidden rounded-2xl bg-neutral-950">
          <Image
            src="/Hillary.jpeg"
            alt={Strings.fullName}
            fill
            sizes="(min-width: 1024px) 40vw, 0px"
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          <p className="absolute bottom-8 left-8 font-display text-4xl leading-[0.95] tracking-tight text-white/90">
            SAY HELLO
            <br />
            BEFORE
            <br />
            YOU GO
          </p>
        </div>
      </aside>

      {/* Content */}
      <div className="space-y-12">
        <header>
          <p className={eyebrow}>Contact</p>
          <h1 className="mt-5 text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
            Let&apos;s transform your idea into a tangible product.
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-subtle">
            Tell me what you&apos;re working on.
          </p>
        </header>

        <div className="flex flex-wrap gap-3">
          <QuoteSheet />
          <Button asChild variant="outline" size="lg" className="font-sans">
            <a href={Strings.calendyLink} target="_blank" rel="noopener noreferrer">
              Book a call
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Email */}
        <div className="border-t border-line pt-8">
          <p className={eyebrow}>Email</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={Strings.primaryEmailLink}
              className="break-all text-2xl tracking-tight transition-colors hover:text-highlight sm:text-3xl"
            >
              {Strings.primaryEmail}
            </a>
            <CopyButton value={Strings.primaryEmail} />
          </div>
        </div>

        {/* Based in / Working with */}
        <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <p className={eyebrow}>Based in</p>
            <p className="mt-3 font-medium text-ink">{Strings.location}</p>
            <p className="mt-1 text-sm text-subtle">EAT (UTC+3)</p>
          </div>
          <div>
            <p className={eyebrow}>Working with</p>
            <p className="mt-3 leading-relaxed text-subtle">
              Founders and teams across Africa, the US, and Europe.
            </p>
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8 text-sm">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-subtle transition-colors hover:text-ink"
            >
              {s.label}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
