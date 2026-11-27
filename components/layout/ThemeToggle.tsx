'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

/**
 * Switches between light and dark mode. Both icons are always rendered and
 * CSS shows the right one, so the server and client HTML match (the saved
 * theme is only known in the browser).
 */
export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="dark:hidden" aria-hidden />
      <Moon className="hidden dark:block" aria-hidden />
    </Button>
  );
};
