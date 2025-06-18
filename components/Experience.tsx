'use client';

import SwipeableCard from '@/components/ui/SwipeableCard';
import { experiences } from '@/lib/data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
            Experience
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto" />
          <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">
            My work experience
          </p>
        </div>

        <SwipeableCard items={experiences} />
      </div>
    </section>
  );
}
