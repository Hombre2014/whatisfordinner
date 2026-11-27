'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

/** Thin client wrapper so the root layout can stay a Server Component. */
export const ThemeProvider = (
  props: ComponentProps<typeof NextThemesProvider>
) => <NextThemesProvider {...props} />;
