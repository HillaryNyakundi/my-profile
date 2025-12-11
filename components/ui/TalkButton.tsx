import Link from 'next/link';
import Strings from '@/constants/strings';

const TalkButton = () => {
  return (
    <Link
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-3 rounded-lg font-medium transition-colors w-full inline-flex items-center justify-center text-center whitespace-nowrap"
      href={Strings.calendyLink}
      target="_blank"
    >
      Let&apos;s Talk
    </Link>
  );
};

export default TalkButton;
