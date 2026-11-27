import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ComingSoon } from './ComingSoon';

describe('ComingSoon', () => {
  it('shows the title as the page heading with its description', () => {
    render(
      <ComingSoon title="Recipes" description="Saved recipes live here." />
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Recipes' })
    ).toBeVisible();
    expect(screen.getByText('Saved recipes live here.')).toBeVisible();
    expect(screen.getByText('Coming soon')).toBeVisible();
  });
});
