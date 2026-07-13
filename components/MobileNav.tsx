'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import ThemeToggle from './ThemeToggle';

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
          className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground ${className ?? ''}`}
        >
          <Menu className="size-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-72 border-border bg-background text-foreground"
      >
        <SheetHeader>
          <SheetTitle className="text-left">
            <SheetClose asChild>
              <Link
                href="/"
                className="inline-block transition-opacity hover:opacity-80"
                aria-label="Home"
              >
                <Image
                  src="/avid-tech-logo.png"
                  alt="Avid Tech"
                  width={1084}
                  height={700}
                  className="h-9 w-auto"
                />
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-2 flex flex-col px-4">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={`border-b border-border py-4 text-base transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center justify-between px-4 py-5 text-xs text-muted-foreground">
          <span>© {year} Hillary Nyakundi</span>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
