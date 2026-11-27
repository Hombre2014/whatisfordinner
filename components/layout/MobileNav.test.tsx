import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MobileNav } from './MobileNav';

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }));

describe('MobileNav', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/');
  });

  it('keeps the menu closed until the button is pressed', () => {
    render(<MobileNav />);

    expect(screen.getByRole('button', { name: 'Open menu' })).toBeVisible();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens a menu with all navigation links', async () => {
    render(<MobileNav />);

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'My Kitchen' })).toBeVisible();
  });

  it('closes the menu after a link is chosen', async () => {
    render(<MobileNav />);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    await userEvent.click(await screen.findByRole('link', { name: 'Help' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
