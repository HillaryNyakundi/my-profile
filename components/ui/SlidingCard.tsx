'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
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
import type { Project } from '@/types';

interface SlidingCardProps {
  items: Project[];
  autoSlide?: boolean;
  slideInterval?: number;
  className?: string;
}

export default function SlidingCard({
  items,
  autoSlide = true,
  slideInterval = 3000,
  className = '',
}: SlidingCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    const onInit = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    // Subscribe to events
    api.on('init', onInit);
    api.on('select', onSelect);

    // If already initialized, call onInit manually
    if (api.scrollSnapList().length > 0) {
      onInit();
    }

    // Cleanup event listeners
    return () => {
      api.off('init', onInit);
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!autoSlide || !api || isPaused) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, slideInterval);

    return () => clearInterval(interval);
  }, [api, autoSlide, slideInterval, isPaused]);

  const renderProjectCard = (project: Project) => (
    <Card
      className="h-full bg-[#2a2a2a] border-gray-700 overflow-hidden group hover:border-gray-600 transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="h-32 sm:h-40 md:h-48 relative bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>
      <CardContent className="p-4 sm:p-5 md:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-blue-400 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-2 sm:line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-3 md:mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-700 rounded text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-700 rounded text-xs text-gray-300">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 sm:gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
            >
              <SiGithub size={14} className="sm:w-4 sm:h-4" />
              <span>Code</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
            >
              <ExternalLink size={14} className="sm:w-4 sm:h-4" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );


  return (
    <div className={cn('relative w-full', className)}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-2 sm:pl-3 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              {renderProjectCard(item)}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        <CarouselPrevious className="hidden sm:flex absolute -left-2 sm:-left-3 md:-left-4 lg:-left-12 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-700 backdrop-blur-sm" />
        <CarouselNext className="hidden sm:flex absolute -right-2 sm:-right-3 md:-right-4 lg:-right-12 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-700 backdrop-blur-sm" />
      </Carousel>

      {/* Dots indicator for mobile */}
      <div className="sm:hidden flex justify-center items-center gap-1.5 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              current === index + 1 ? 'bg-blue-600 w-4' : 'bg-gray-600 w-1.5'
            )}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress indicator for larger screens */}
      <div className="hidden sm:flex justify-center items-center gap-2 mt-6">
        <span className="text-xs text-gray-500">
          {current} / {count}
        </span>
      </div>

      {/* Mobile swipe hint */}
      <div className="sm:hidden text-center mt-2">
        <p className="text-xs text-gray-500">Swipe to browse</p>
      </div>
    </div>
  );
}
