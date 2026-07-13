import Link from 'next/link';
import Strings from '@/constants/strings';

const TalkButton = () => {
  return (
    <Link
      className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-8 py-3 rounded-lg font-medium transition-colors w-full inline-flex items-center justify-center text-center whitespace-nowrap"
      href={Strings.calendyLink}
      target="_blank"
    >
      Let&apos;s Talk
    </Link>
  );
};

export default TalkButton;
