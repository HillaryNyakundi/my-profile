'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';

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
    <header className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
      <div className="flex items-center justify-between gap-3 border-b border-gray-800 pb-4 sm:pb-5">
        <Link
          href="/"
          className="text-sm font-bold text-white transition-colors hover:text-blue-500 sm:text-base whitespace-nowrap"
        >
          Hillary Nyakundi
        </Link>

        <ul className="hidden items-center gap-6 text-sm sm:flex">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors ${
                    isActive ? 'text-blue-500' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <MobileNav links={links} className="sm:hidden" />
      </div>
    </header>
  );
}
