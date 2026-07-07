import type { Metadata } from 'next';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Hillary Nyakundi — email, phone, or WhatsApp.',
};

export default function ContactPage() {
  return <Contact />;
}
