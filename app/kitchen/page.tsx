import type { Metadata } from 'next';
import { ComingSoon } from '@/components/layout/ComingSoon';

export const metadata: Metadata = { title: 'My Kitchen' };

export default function KitchenPage() {
  return (
    <ComingSoon
      title="My Kitchen"
      description="Soon you will be able to list your equipment, fridge and pantry here."
    />
  );
}
