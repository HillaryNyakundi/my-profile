import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import Strings from '@/constants/strings';

const links = [
  { href: '/work', label: 'work' },
  { href: '/contact', label: 'contact' },
];

export default function Navbar() {
  return (
    <header className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-6 sm:pt-8">
      <div className="flex items-center justify-between border-b border-line pb-4 sm:pb-5">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <Image
            src="/Hillary.jpeg"
            alt={Strings.fullName}
            width={36}
            height={36}
            className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-9 sm:w-9"
          />
          <span className="truncate text-ink text-sm md:text-base transition-colors group-hover:text-ink hover:underline">
            {Strings.shortName}
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-4 text-sm md:text-base sm:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink underline-offset-4 transition-colors hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
