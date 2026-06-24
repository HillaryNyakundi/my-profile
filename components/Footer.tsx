import Link from 'next/link';
import CopyButton from '@/components/CopyButton';
import Strings from '@/constants/strings';

type FooterLink = { label: string; href: string };

const topLinks: FooterLink[] = [
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

const pageLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks: FooterLink[] = [
  { label: 'GitHub', href: Strings.githubLink },
  { label: 'LinkedIn', href: Strings.linkedInLink },
  { label: 'WhatsApp', href: Strings.whatsAppLink },
];

const elsewhereLinks: FooterLink[] = [
  { label: 'Resume', href: '/Hillary-Nyakundi-Maranga-Resume.pdf' },
  { label: 'Book a call', href: Strings.calendyLink },
  { label: 'Email', href: Strings.primaryEmailLink },
];

const linkClass = 'text-sm text-subtle transition-colors hover:text-ink';

function FooterAnchor({ href, label }: FooterLink) {
  const isInternal = href.startsWith('/') && !href.endsWith('.pdf');
  if (isInternal) {
    return (
      <Link href={href} className={linkClass}>
        {label}
      </Link>
    );
  }
  const external = href.startsWith('http') || href.endsWith('.pdf');
  return (
    <a
      href={href}
      className={linkClass}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </a>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-subtle">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <FooterAnchor {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 sm:mt-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
        {/* Top row: nav + email */}
        <div className="flex flex-col gap-4 border-y border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {topLinks.map((link) => (
              <FooterAnchor key={link.label} {...link} />
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <a
              href={Strings.primaryEmailLink}
              className="text-ink transition-colors hover:text-subtle"
            >
              {Strings.primaryEmail}
            </a>
            <CopyButton value={Strings.primaryEmail} />
          </div>
        </div>

        {/* Main */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {Strings.fullName}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-subtle">
              Building web and mobile products that feel purposeful, reliable,
              and made to keep working when real users show up.
            </p>
            <p className="mt-6 text-xs text-subtle">
              © {year} {Strings.fullName}. All rights reserved.
            </p>
          </div>

          <FooterColumn title="Pages" links={pageLinks} />
          <FooterColumn title="Socials" links={socialLinks} />
          <FooterColumn title="Elsewhere" links={elsewhereLinks} />
        </div>
      </div>
    </footer>
  );
}
