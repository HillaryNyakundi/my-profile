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

      <div className="grid gap-12 py-12 md:grid-cols-2 md:gap-16">
        <div>
          <h1 className="font-display text-6xl tracking-tight sm:text-7xl">
            CONTACT
          </h1>
          <p className="mt-4 text-subtle">Reach out directly or follow my work.</p>
        </div>

        <div>
          <ul className="space-y-5">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="text-xl underline underline-offset-4 transition-colors hover:text-accent sm:text-2xl"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-10 font-sans text-sm text-subtle">
            Top Skills: {Strings.topSkills}
          </p>
        </div>
      </div>
    </>
  );
}
