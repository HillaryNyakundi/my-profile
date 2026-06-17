import Strings from '@/constants/strings';

export default function QuoteBanner() {
  return (
    <div className="border-b border-line py-5 text-center sm:py-6">
      <p className="text-sm sm:text-base md:text-lg">
        <span className="italic">“{Strings.tagline}”</span>{' '}
        <span className="text-subtle">- {Strings.fullName}</span>
      </p>
    </div>
  );
}
