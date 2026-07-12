import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { getGoogleReviews } from '@/lib/reviews';

export default async function Home() {
  const reviews = await getGoogleReviews();

  return (
    <>
      <Hero />
      {reviews && <Reviews data={reviews} />}
    </>
  );
}
