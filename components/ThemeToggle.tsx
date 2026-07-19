'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const noopSubscribe = () => () => {};

/** Sun/moon button that flips the site between light and dark. */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  // Theme is only known on the client — avoid a hydration mismatch.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground ${className}`}
    >
      {mounted && isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
