'use client';

import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Experience } from '@/types';

interface SwipeableCardProps {
  items: Experience[];
  className?: string;
}

export default function SwipeableCard({ items, className = '' }: SwipeableCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div
      className={cn(
        'relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4">
              <Card className="bg-[#2a2a2a] border-gray-700 h-full">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  {/* Header Section */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400 break-words">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-400 mt-1">
                        {item.company}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {item.period}
                      </p>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="mb-4 sm:mb-6">
                    <ul className="space-y-2 sm:space-y-3">
                      {item.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 sm:mt-1 flex-shrink-0">
                            •
                          </span>
                          <span className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                            {resp}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-700 rounded-full text-xs sm:text-sm text-gray-300 hover:bg-gray-600 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="hidden sm:flex bg-gray-800 hover:bg-gray-700 text-white border-gray-700 -left-2 sm:-left-4 md:-left-12 lg:-left-16 h-8 w-8 sm:h-10 sm:w-10" />
        <CarouselNext className="hidden sm:flex bg-gray-800 hover:bg-gray-700 text-white border-gray-700 -right-2 sm:-right-4 md:-right-12 lg:-right-16 h-8 w-8 sm:h-10 sm:w-10" />
      </Carousel>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => api?.scrollTo(idx)}
            className={cn(
              'h-1.5 sm:h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]',
              idx === current
                ? 'bg-blue-600 w-6 sm:w-8'
                : 'bg-gray-600 w-1.5 sm:w-2 hover:bg-gray-500'
            )}
            aria-label={`Go to experience ${idx + 1}`}
          />
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="sm:hidden text-center mt-3">
        <p className="text-xs text-gray-500">Swipe to navigate</p>
      </div>
    </div>
  );
}
