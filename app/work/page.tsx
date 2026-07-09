import type { Metadata } from 'next';
import Work from '@/components/Work';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected client projects and products designed and built by Hillary Nyakundi.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return <Work />;
}
