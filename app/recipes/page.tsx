import type { Metadata } from 'next';
import { ComingSoon } from '@/components/layout/ComingSoon';

export const metadata: Metadata = { title: 'Recipes' };

export default function RecipesPage() {
  return (
    <ComingSoon
      title="Recipes"
      description="Your recipe library will live here: save recipes from the web or write your own."
    />
  );
}
