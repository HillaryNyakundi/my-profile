import Link from 'next/link';
import Strings from '@/constants/strings';
import { SiGithub } from 'react-icons/si';

const GitHubButton = () => {
  return (
    <Link
      className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-medium transition-colors min-w-[10rem] inline-flex items-center justify-center gap-2 border border-gray-700"
      href={Strings.githubLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiGithub className="text-xl" />
      View GitHub
    </Link>
  );
};

export default GitHubButton;
