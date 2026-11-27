import Link from 'next/link';
import { Suspense } from 'react';
import { MobileNav } from './MobileNav';
import { NavLinks } from './NavLinks';
import { NavList } from './NavList';
import { ThemeToggle } from './ThemeToggle';

/** Sticky top bar: menu (mobile), logo, main navigation, theme toggle. */
export const SiteHeader = () => (
  <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:px-6">
      <MobileNav />
      <Link
        href="/"
        className="font-heading text-xl font-bold tracking-tight text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        whatisfordinner
      </Link>
      <nav aria-label="Main" className="ml-6 hidden md:block">
        <Suspense fallback={<NavList pathname={null} />}>
          <NavLinks />
        </Suspense>
      </nav>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </div>
  </header>
);
