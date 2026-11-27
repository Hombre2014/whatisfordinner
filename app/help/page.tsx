import type { Metadata } from 'next';
import { ComingSoon } from '@/components/layout/ComingSoon';

export const metadata: Metadata = { title: 'Help' };

export default function HelpPage() {
  return (
    <ComingSoon
      title="Help"
      description="Guides for every feature, step by step, will be here."
    />
  );
}
