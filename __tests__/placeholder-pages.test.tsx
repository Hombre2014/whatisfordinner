import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DinnerPage from '@/app/dinner/page';
import FriendsPage from '@/app/friends/page';
import HelpPage from '@/app/help/page';
import KitchenPage from '@/app/kitchen/page';
import RecipesPage from '@/app/recipes/page';

describe('Placeholder pages', () => {
  it.each([
    ['Recipes', RecipesPage],
    ['My Kitchen', KitchenPage],
    ['Friends', FriendsPage],
    ['Help', HelpPage],
    ['What can I have for dinner?', DinnerPage],
  ])('%s shows its heading and a coming-soon note', (heading, Page) => {
    render(<Page />);

    expect(
      screen.getByRole('heading', { level: 1, name: heading })
    ).toBeInTheDocument();
    expect(screen.getByText('Coming soon')).toBeInTheDocument();
  });
});
