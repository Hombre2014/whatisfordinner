import Link from 'next/link';
import { cn } from '@/lib/utils';
import { isNavItemActive, NAV_ITEMS } from './nav-items';

type NavListProps = {
  /** Current path, or null when it is not known yet (Suspense fallback). */
  pathname: string | null;
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
};

/** The navigation links, without any routing hook so it can also be a fallback. */
export const NavList = ({
  pathname,
  orientation = 'horizontal',
  onNavigate,
}: NavListProps) => (
  <ul
    className={cn(
      'flex gap-1',
      orientation === 'vertical' ? 'flex-col' : 'items-center'
    )}
  >
    {NAV_ITEMS.map(item => {
      const active = isNavItemActive(item, pathname);
      return (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'block rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              'focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {item.label}
          </Link>
        </li>
      );
    })}
  </ul>
);
