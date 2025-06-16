'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import type { Project, BlogPost } from '@/types';

interface SlidingCardProps {
  items: Project[] | BlogPost[];
  type: 'project' | 'blog';
  autoSlide?: boolean;
  slideInterval?: number;
  className?: string;
}

export default function SlidingCard({
  items,
  type,
  autoSlide = true,
  slideInterval = 3000,
  className = '',
}: SlidingCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

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
      className="h-full bg-[#2a2a2a] border-gray-700 overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="h-48 relative bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden">
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
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github size={16} />
              <span>Code</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
              <span>Demo</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderBlogCard = (blog: BlogPost) => (
    <Card
      className="h-full bg-[#2a2a2a] border-gray-700 overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="h-48 relative bg-gradient-to-br from-blue-600 to-purple-600">
        {blog.coverImage && (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 text-white">{blog.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.brief}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={14} />
            <span>{new Date(blog.dateAdded).toLocaleDateString()}</span>
          </div>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Read More →
          </a>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Carousel
      setApi={setApi}
      className={`w-full ${className}`}
      opts={{
        align: 'start',
        loop: true,
        slidesToScroll: 1,
      }}
    >
      <CarouselContent className="-ml-4">
        {items.map((item) => (
          <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            {type === 'project'
              ? renderProjectCard(item as Project)
              : renderBlogCard(item as BlogPost)}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700" />
      <CarouselNext className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700" />
    </Carousel>
  );
}
