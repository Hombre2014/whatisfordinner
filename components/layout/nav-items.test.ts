import { describe, expect, it } from 'vitest';
import { isNavItemActive, NAV_ITEMS } from './nav-items';

const [home, recipes] = NAV_ITEMS;

describe('isNavItemActive', () => {
  it('matches Home only on the exact root path', () => {
    expect(isNavItemActive(home, '/')).toBe(true);
    expect(isNavItemActive(home, '/recipes')).toBe(false);
  });

  it('matches a section and its sub-pages', () => {
    expect(isNavItemActive(recipes, '/recipes')).toBe(true);
    expect(isNavItemActive(recipes, '/recipes/42')).toBe(true);
  });

  it('does not match a path that only shares a prefix', () => {
    expect(isNavItemActive(recipes, '/recipes-archive')).toBe(false);
  });

  it('matches nothing while the path is unknown', () => {
    expect(isNavItemActive(home, null)).toBe(false);
  });
});
