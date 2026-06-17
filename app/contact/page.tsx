import type { Metadata } from 'next';
import QuoteBanner from '@/components/QuoteBanner';
import Strings from '@/constants/strings';

export const metadata: Metadata = {
  title: 'Contact | Hillary Nyakundi',
  description: 'Get in touch with Hillary Nyakundi.',
};

const channels = [
  { label: 'Call me', href: Strings.phoneLink, external: false },
  { label: 'Send email', href: Strings.primaryEmailLink, external: false },
  { label: 'WhatsApp', href: Strings.whatsAppLink, external: true },
  { label: 'LinkedIn', href: Strings.linkedInLink, external: true },
  { label: 'GitHub', href: Strings.githubLink, external: true },
  { label: 'Book a call', href: Strings.calendyLink, external: true },
];

export default function ContactPage() {
  return (
    <>
      <QuoteBanner />

      <div className="grid gap-8 py-10 md:grid-cols-2 md:gap-16 md:py-12">
        <div>
          <h1 className="font-display text-5xl tracking-tight sm:text-6xl md:text-7xl">
            CONTACT
          </h1>
          <p className="mt-4 text-subtle">Reach out directly or follow my work.</p>
        </div>

        <div>
          <ul className="space-y-4 sm:space-y-5">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="text-lg underline underline-offset-4 transition-colors hover:text-accent sm:text-xl md:text-2xl"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-sans text-sm text-subtle sm:mt-10">
            Top Skills: {Strings.topSkills}
          </p>
        </div>
      </div>
    </>
  );
}
