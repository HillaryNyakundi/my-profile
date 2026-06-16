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
    <header className="mx-auto w-full max-w-7xl px-6 pt-8">
      <div className="flex items-center justify-between border-b border-line pb-5">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/Hillary.jpeg"
            alt={Strings.fullName}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-ink text-sm md:text-base transition-colors group-hover:text-ink hover:underline">
            {Strings.shortName}
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm md:text-base sm:gap-6">
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
