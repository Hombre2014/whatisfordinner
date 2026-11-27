'use client';

import { usePathname } from 'next/navigation';
import { NavList } from './NavList';

type NavLinksProps = {
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
};

/** Navigation links that highlight the current page. */
export const NavLinks = ({ orientation, onNavigate }: NavLinksProps) => (
  <NavList
    pathname={usePathname()}
    orientation={orientation}
    onNavigate={onNavigate}
  />
);
