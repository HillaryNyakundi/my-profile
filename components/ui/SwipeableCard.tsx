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
    <div className={cn('relative', className)}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="bg-[#1a1a1a] border-gray-700">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700 -left-4 md:-left-8" />
        <CarouselNext className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700 -right-4 md:-right-8" />
      </Carousel>

      {/* Custom dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => api?.scrollTo(idx)}
            className={cn(
              'h-2 rounded-full transition-all',
              idx === current ? 'bg-blue-600 w-8' : 'bg-gray-600 w-2'
            )}
            aria-label={`Go to experience ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
