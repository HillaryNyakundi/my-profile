'use client';

import SlidingCard from '@/components/ui/SlidingCard';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto" />
          <p className="text-gray-400 mt-4">
            Here are some of the projects I have worked on
          </p>
        </div>

        <SlidingCard
          items={projects}
          type="project"
          autoSlide={true}
          slideInterval={4000}
        />
      </div>
    </section>
  );
}
