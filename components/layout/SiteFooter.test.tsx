import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteFooter } from './SiteFooter';

describe('SiteFooter', () => {
  it('renders a contentinfo landmark with the app description', () => {
    render(<SiteFooter />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'a recipe app for friends and family'
    );
  });
});
