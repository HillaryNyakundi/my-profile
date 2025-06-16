// components/ui/SwipeableCard.tsx (Enhanced Version)
'use client';

import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Experience } from '@/types';

interface SwipeableCardProps {
  items: Experience[];
  className?: string;
}

export default function SwipeableCard({ items, className = '' }: SwipeableCardProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
              <Card className="bg-[#2a2a2a] border-gray-700 cursor-grab active:cursor-grabbing">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      <p className="text-gray-400">{item.company}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.period}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {item.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full"
        aria-label="Previous experience"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={scrollNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full"
        aria-label="Next experience"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              idx === selectedIndex
                ? 'bg-blue-600 w-8'
                : 'bg-gray-600 w-2 hover:bg-gray-500'
            )}
            aria-label={`Go to experience ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
