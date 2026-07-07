import type { Metadata } from 'next';
import Skills from '@/components/Skills';
import Services from '@/components/Services';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Hillary Nyakundi — skills, tech stack, and the services I offer across web and mobile development.',
};

export default function AboutPage() {
  return (
    <>
      <Services />
      <Skills />
    </>
  );
}
