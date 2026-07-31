import Link from 'next/link';

const GitHubButton = () => {
  return (
    <Link
      className="bg-gray-800 hover:bg-gray-900 text-white px-4 sm:px-8 py-3 rounded-lg font-medium transition-colors w-full inline-flex items-center justify-center gap-2 border border-gray-700 text-center whitespace-nowrap"
      href="/work"
    >
      View Work
    </Link>
  );
};

export default GitHubButton;
