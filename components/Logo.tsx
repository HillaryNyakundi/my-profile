import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Brand mark that swaps by theme. The black `logo.svg` reads on light
 * backgrounds; the white PNG lockup reads on dark. Both are always rendered and
 * toggled with `dark:` classes (next-themes uses the `class` strategy), so there
 * is no theme-resolution flash and no client-only guard needed.
 *
 * `className` sets the shared sizing (e.g. `h-11 w-auto`); the visibility
 * variants are layered on per image.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/logo-light.png"
        alt="Avid Tech"
        width={547}
        height={372}
        priority
        className={cn(className, 'dark:hidden')}
      />
      <Image
        src="/logo-dark.png"
        alt="Avid Tech"
        width={547}
        height={372}
        priority
        className={cn('hidden dark:block', className)}
      />
    </>
  );
}
