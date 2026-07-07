'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type NavLink = { href: string; label: string };

export default function MobileNav({
  links,
  className,
}: {
  links: NavLink[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-300 transition-colors hover:text-white ${className ?? ''}`}
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-72 border-gray-800 bg-[#1a1a1a] text-white"
      >
        <SheetHeader>
          <SheetTitle className="text-left text-white">
            Hillary Nyakundi
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-2 flex flex-col px-4">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={`border-b border-gray-800 py-4 text-base transition-colors ${
                    isActive ? 'text-blue-500' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mt-auto px-4 py-5 text-xs text-gray-500">
          © {year} Hillary Nyakundi
        </div>
      </SheetContent>
    </Sheet>
  );
}
