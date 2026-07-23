'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/experience', label: 'Experience' },
  { href: '/workflow', label: 'Workflow' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4 sm:pb-5">
        <Link
          href="/"
          className="shrink-0 transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          <Logo className="h-10 w-auto sm:h-11" />
        </Link>

        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-6 text-sm sm:flex">
            {links.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle className="hidden sm:inline-flex" />
          <MobileNav links={links} className="sm:hidden" />
        </div>
      </div>
    </header>
  );
}
