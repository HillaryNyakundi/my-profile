"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import type { GoogleReview, GoogleReviewsData } from "@/types";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < Math.round(rating)
              ? "h-4 w-4 fill-yellow-400 text-yellow-400"
              : "h-4 w-4 text-gray-600"
          }
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-800 bg-[#222] p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-400">
          {initials(review.author)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {review.author}
          </p>
          <p className="text-xs text-gray-500">{review.relativeTime}</p>
        </div>
      </div>
      <Stars rating={review.rating} />
      <p className="mt-3 text-sm leading-relaxed text-gray-400 line-clamp-5">
        {review.text}
      </p>
    </div>
  );
}

export default function Reviews({ data }: { data: GoogleReviewsData }) {
  return (
    <section
      id="reviews"
      className="bg-[#1a1a1a] px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end"
        >
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              What clients say
            </h2>
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
              <FcGoogle className="h-5 w-5" />
              <span className="font-semibold text-white">
                {data.rating.toFixed(1)}
              </span>
              <Stars rating={data.rating} />
              <span>
                ({data.total} {data.total === 1 ? "review" : "reviews"})
              </span>
            </div>
          </div>

          {data.mapsUri && (
            <a
              href={data.mapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-blue-500"
            >
              Read all reviews on Google →
            </a>
          )}
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.reviews.slice(0, 6).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
