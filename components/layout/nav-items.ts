/** Main navigation. Labels move to translation files when i18n arrives (M2). */
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'My Kitchen', href: '/kitchen' },
  { label: 'Friends', href: '/friends' },
  { label: 'Help', href: '/help' },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

/** True when `pathname` is the item's page or one of its sub-pages. */
export const isNavItemActive = (item: NavItem, pathname: string | null) => {
  if (pathname === null) return false;
  return item.href === '/'
    ? pathname === '/'
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
};
