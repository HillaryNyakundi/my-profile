'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TypewriterText from '@/components/ui/TypewriterText';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-600 bg-gray-800">
              <Image
                src="/headshot.jpg"
                alt="Hillary Nyakundi"
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/320';
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center md:text-left max-w-2xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Meet, <TypewriterText text="Hillary Nyakundi" className="text-blue-500" />
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              A <span className="text-blue-500 font-semibold">Software Engineer</span>{' '}
              based in Nairobi, Kenya.
            </p>
            <p className="text-gray-400 mb-8">
              Working towards creating software that makes life easier and more
              meaningful.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View Projects
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown size={32} className="text-gray-500" />
      </motion.div>
    </section>
  );
}
