import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import { SiteHeader } from './SiteHeader';

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }));

describe('SiteHeader', () => {
  it('shows the logo as a link to the home page', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    render(<SiteHeader />);

    expect(
      screen.getByRole('link', { name: 'whatisfordinner' })
    ).toHaveAttribute('href', '/');
  });

  it('has a main navigation with the current page marked', () => {
    vi.mocked(usePathname).mockReturnValue('/friends');
    render(<SiteHeader />);

    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Friends' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('offers the theme toggle and the mobile menu button', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    render(<SiteHeader />);

    expect(
      screen.getByRole('button', { name: 'Toggle color theme' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Open menu' })
    ).toBeInTheDocument();
  });
});
