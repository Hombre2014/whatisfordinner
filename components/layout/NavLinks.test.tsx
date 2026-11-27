import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import { NavLinks } from './NavLinks';

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }));

describe('NavLinks', () => {
  it('highlights the link for the current path', () => {
    vi.mocked(usePathname).mockReturnValue('/recipes/7');
    render(<NavLinks />);

    expect(screen.getByRole('link', { name: 'Recipes' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});
