// components/Experience.tsx
'use client';

import { motion } from 'framer-motion';
import SwipeableCard from '@/components/ui/SwipeableCard';
import { experiences } from '@/lib/data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto" />
        </motion.div>

        <SwipeableCard items={experiences} />
      </div>
    </section>
  );
}
