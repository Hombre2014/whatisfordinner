import type { Metadata } from 'next';
import { Nunito_Sans, Rubik } from 'next/font/google';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import './globals.css';

// Rubik for headings, Nunito Sans for body text. Both include the Cyrillic
// subset, which the Bulgarian interface needs.
const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin', 'cyrillic'],
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: {
    default: 'whatisfordinner',
    template: '%s · whatisfordinner',
  },
  description:
    'A recipe app for friends and family. Find tonight’s dinner from what is in your kitchen.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // suppressHydrationWarning: next-themes sets the theme class on <html>
    // before React hydrates.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${rubik.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
