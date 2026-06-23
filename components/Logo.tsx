import Image from 'next/image';
import Strings from '@/constants/strings';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <span className={`flex min-w-0 items-center gap-2.5 sm:gap-3 ${className ?? ''}`}>
      <Image
        src="/Hillary.jpeg"
        alt={Strings.fullName}
        width={36}
        height={36}
        className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-9 sm:w-9"
      />
      <span className="truncate text-sm font-medium text-ink transition-colors group-hover:underline group-hover:underline-offset-4 md:text-base">
        {Strings.shortName}
      </span>
    </span>
  );
}
