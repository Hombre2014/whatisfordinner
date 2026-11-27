import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from 'next-themes';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

vi.mock('next-themes', () => ({ useTheme: vi.fn() }));

describe('ThemeToggle', () => {
  const setTheme = vi.fn();

  beforeEach(() => {
    setTheme.mockClear();
  });

  it('switches to dark mode when the theme is light', async () => {
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'light',
      setTheme,
    } as unknown as ReturnType<typeof useTheme>);
    render(<ThemeToggle />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Toggle color theme' })
    );

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('switches to light mode when the theme is dark', async () => {
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'dark',
      setTheme,
    } as unknown as ReturnType<typeof useTheme>);
    render(<ThemeToggle />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Toggle color theme' })
    );

    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
