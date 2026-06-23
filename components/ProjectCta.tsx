import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuoteSheet from '@/components/QuoteSheet';
import Strings from '@/constants/strings';

export default function ProjectCta() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl sm:leading-[1.1] md:text-5xl">
        Let&apos;s transform your idea into a tangible product.
      </h2>
      <p className="mt-4 text-base leading-relaxed text-subtle sm:mt-5 sm:text-lg">
        Tell me what you&apos;re working on.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <QuoteSheet />
        <Button asChild variant="outline" size="lg">
          <a href={Strings.calendyLink} target="_blank" rel="noopener noreferrer">
            Book a call
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
