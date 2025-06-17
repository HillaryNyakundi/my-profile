import Link from 'next/link';
import Strings from '@/constants/strings';

const TalkButton = () => {
  return (
    <Link
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 mb-3 py-3 rounded-lg font-medium transition-color min-w-[10rem]"
      href={Strings.calendyLink}
      target="_blank"
    >
      Let&apos;s Talk
    </Link>
  );
};

export default TalkButton;
