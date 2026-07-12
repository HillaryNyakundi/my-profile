// Server-only: fetches Google reviews via the Places API (New).
// The API key is read from env and never reaches the client — this module
// must only be imported from Server Components / route handlers.
import type { GoogleReview, GoogleReviewsData } from '@/types';

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Shape of the Places API (New) response we care about.
interface PlacesApiReview {
  name: string;
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
  relativePublishTimeDescription?: string;
}

interface PlacesApiResponse {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesApiReview[];
}

/**
 * Returns Google reviews for the configured business, or null if the API is
 * not configured or the request fails (so the UI can gracefully hide).
 * Cached for 24h via Next's fetch revalidation to respect rate limits.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  if (!PLACE_ID || !API_KEY) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=en`,
      {
        headers: {
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask':
            'rating,userRatingCount,googleMapsUri,reviews',
        },
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) return null;

    const data = (await res.json()) as PlacesApiResponse;

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .map((r, i) => ({
        id: r.name ?? `review-${i}`,
        author: r.authorAttribution?.displayName ?? 'Google user',
        authorUri: r.authorAttribution?.uri,
        rating: r.rating ?? 0,
        text: r.text?.text ?? r.originalText?.text ?? '',
        relativeTime: r.relativePublishTimeDescription ?? '',
      }))
      .filter((r) => r.text.trim() !== '');

    if (reviews.length === 0) return null;

    return {
      rating: data.rating ?? 0,
      total: data.userRatingCount ?? 0,
      mapsUri: data.googleMapsUri,
      reviews,
    };
  } catch {
    return null;
  }
}
