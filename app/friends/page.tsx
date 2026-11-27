import type { Metadata } from 'next';
import { ComingSoon } from '@/components/layout/ComingSoon';

export const metadata: Metadata = { title: 'Friends' };

export default function FriendsPage() {
  return (
    <ComingSoon
      title="Friends"
      description="Invite friends and family and share recipes with them."
    />
  );
}
