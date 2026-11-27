import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { NavList } from './NavList';
import { NAV_ITEMS } from './nav-items';

describe('NavList', () => {
  it('renders a link for every navigation item', () => {
    render(<NavList pathname="/" />);

    for (const item of NAV_ITEMS) {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        item.href
      );
    }
  });

  it('marks only the current page with aria-current', () => {
    render(<NavList pathname="/kitchen" />);

    expect(screen.getByRole('link', { name: 'My Kitchen' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('marks nothing as current while the path is unknown', () => {
    render(<NavList pathname={null} />);

    for (const link of screen.getAllByRole('link')) {
      expect(link).not.toHaveAttribute('aria-current');
    }
  });

  it('calls onNavigate when a link is clicked', async () => {
    const onNavigate = vi.fn();
    render(<NavList pathname="/" onNavigate={onNavigate} />);

    await userEvent.click(screen.getByRole('link', { name: 'Help' }));

    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('supports a vertical layout', () => {
    render(<NavList pathname="/" orientation="vertical" />);

    expect(screen.getByRole('list')).toHaveClass('flex-col');
  });
});
