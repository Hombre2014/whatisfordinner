import type { Metadata } from 'next';
import { ComingSoon } from '@/components/layout/ComingSoon';

export const metadata: Metadata = { title: 'Find dinner' };

export default function DinnerPage() {
  return (
    <ComingSoon
      title="What can I have for dinner?"
      description="Pick your ingredients and get recipes that fit. This is the heart of the app and comes soon."
    />
  );
}
