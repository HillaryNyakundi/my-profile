import Strings from '@/constants/strings';

export default function QuoteBanner() {
  return (
    <div className="border-b border-line py-6 text-center">
      <p className="text-base sm:text-lg">
        <span className="italic">“{Strings.tagline}”</span>{' '}
        <span className="text-subtle">- {Strings.fullName}</span>
      </p>
    </div>
  );
}
