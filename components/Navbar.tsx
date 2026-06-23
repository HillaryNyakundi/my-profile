import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import MobileNav from './MobileNav';

const links = [
  { href: '/experience', label: 'experience' },
  { href: '/projects', label: 'projects' },
  { href: '/process', label: 'work process' },
  { href: '/contact', label: 'contact' },
];

export default function Navbar() {
  return (
    <header className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-6 sm:pt-8">
      <div className="flex items-center justify-between border-b border-line pb-4 sm:pb-5">
        <Link href="/" className="group flex min-w-0 items-center">
          <Logo />
        </Link>

        <div className="flex shrink-0 items-center gap-4 text-sm md:text-base sm:gap-6">
          <nav className="hidden items-center gap-5 md:flex lg:gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink underline-offset-4 transition-colors hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />
          <MobileNav links={links} className="md:hidden" />
        </div>
      </div>
    </header>
  );
}
