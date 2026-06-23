'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Strings from '@/constants/strings';

type NavLink = { href: string; label: string };

export default function MobileNav({
  links,
  className,
}: {
  links: NavLink[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:text-subtle ${className ?? ''}`}
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72 sm:w-80">
        <SheetHeader>
          <SheetTitle className="text-xs uppercase tracking-[0.2em] text-subtle">
            Menu
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-2 flex flex-col px-4">
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="border-b border-line py-4 text-lg text-ink transition-colors hover:text-subtle"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto border-t border-line px-4 py-5 text-xs text-subtle">
          © {year} {Strings.fullName}. All rights reserved.
        </div>
      </SheetContent>
    </Sheet>
  );
}
