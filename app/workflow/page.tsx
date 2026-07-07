import type { Metadata } from 'next';
import Workflow from '@/components/Workflow';

export const metadata: Metadata = {
  title: 'Workflow',
  description:
    'The workflow Hillary Nyakundi follows to take an idea from problem to client handover.',
};

export default function WorkflowPage() {
  return <Workflow />;
}
