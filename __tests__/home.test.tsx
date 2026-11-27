import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '@/app/page';

describe('Home page', () => {
  it('leads with the dinner question and the main action', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'What can I have for dinner?',
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Find dinner' })).toHaveAttribute(
      'href',
      '/dinner'
    );
    expect(
      screen.getByRole('link', { name: 'Browse recipes' })
    ).toHaveAttribute('href', '/recipes');
  });

  it('links to the kitchen, recipes and friends areas', () => {
    render(<Home />);

    expect(screen.getByRole('link', { name: /Your kitchen/ })).toHaveAttribute(
      'href',
      '/kitchen'
    );
    expect(screen.getByRole('link', { name: /Your recipes/ })).toHaveAttribute(
      'href',
      '/recipes'
    );
    expect(
      screen.getByRole('link', { name: /Cook with friends/ })
    ).toHaveAttribute('href', '/friends');
  });
});
