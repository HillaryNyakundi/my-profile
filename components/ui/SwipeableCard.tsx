'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
//import Image from 'next/image';
import type { Experience } from '@/types';

interface SwipeableCardProps {
  items: Experience[];
  className?: string;
}

export default function SwipeableCard({ items, className = '' }: SwipeableCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevCard();
    } else if (info.offset.x < -threshold) {
      nextCard();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="bg-[#2a2a2a] rounded-xl p-8 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-start gap-4 mb-6">
            {/* <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              {items[currentIndex].logo ? (
                <Image
                  src={items[currentIndex].logo || ''}
                  alt={items[currentIndex].company}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                  priority
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-2xl font-bold text-gray-400">
                  {items[currentIndex].company[0]}
                </span>
              )}
            </div> */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold">{items[currentIndex].title}</h3>
              <p className="text-gray-400">{items[currentIndex].company}</p>
              <p className="text-sm text-gray-500 mt-1">{items[currentIndex].period}</p>
            </div>
          </div>

          <ul className="space-y-3 mb-6">
            {items[currentIndex].responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-600 mt-1">•</span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {items[currentIndex].technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevCard}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
        aria-label="Previous experience"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextCard}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
        aria-label="Next experience"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-600'
            }`}
            aria-label={`Go to experience ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
