import type { Metadata } from 'next';
import Experience from '@/components/Experience';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Work experience and roles held by Hillary Nyakundi.',
};

export default function ExperiencePage() {
  return <Experience />;
}
