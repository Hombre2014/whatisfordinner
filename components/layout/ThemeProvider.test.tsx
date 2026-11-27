import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider', () => {
  beforeAll(() => {
    // jsdom has no matchMedia, which next-themes uses for the system theme.
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })
    );
  });

  it('renders its children', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <p>Inside the provider</p>
      </ThemeProvider>
    );

    expect(screen.getByText('Inside the provider')).toBeInTheDocument();
  });
});
