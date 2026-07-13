"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck, ArrowUpRight, Quote } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import type { GoogleReview, GoogleReviewsData } from "@/types";
import Link from "next/link";

const GOOGLE_ACCENT =
  "bg-[linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)]";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className ?? ""}`}
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < Math.round(rating)
              ? "h-4 w-4 fill-yellow-400 text-yellow-400"
              : "h-4 w-4 text-muted-foreground/40"
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

function SummaryCard({ data }: { data: GoogleReviewsData }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-background p-6 sm:p-7">
      <div className={`absolute inset-x-0 top-0 h-0.5 ${GOOGLE_ACCENT}`} />

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        <FcGoogle className="h-5 w-5" />
        Google Reviews
      </div>

      <div className="my-6">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold leading-none text-foreground">
            {data.rating.toFixed(1)}
          </span>
          <span className="mb-1 text-sm text-muted-foreground">/ 5.0</span>
        </div>
        <Stars rating={data.rating} className="mt-3" />
        <p className="mt-3 text-sm text-muted-foreground">
          Based on {data.total} verified{" "}
          {data.total === 1 ? "review" : "reviews"}
        </p>
      </div>

      {data.mapsUri && (
        <Link
          href={data.mapsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-dusty-blue hover:text-dusty-blue"
        >
          View on Google Maps
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card">
      <div
        className={`absolute inset-x-0 top-0 h-0.5 opacity-60 transition-opacity duration-300 group-hover:opacity-100 ${GOOGLE_ACCENT}`}
      />

      <Quote className="mb-4 h-7 w-7 fill-dusty-blue/20 text-primary/40" />

      <p className="flex-1 text-[15px] leading-relaxed text-foreground/90 line-clamp-6">
        {review.text}
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <div className="relative shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-dusty-blue/25 to-dusty-blue/5 text-sm font-semibold text-dusty-blue">
            {initials(review.author)}
          </div>
          <BadgeCheck className="absolute -bottom-0.5 -right-0.5 size-4 fill-dusty-blue text-background" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {review.author}
          </p>
          <p className="text-xs text-muted-foreground">{review.relativeTime}</p>
        </div>
        <Stars rating={review.rating} />
      </div>
    </div>
  );
}

export default function Reviews({ data }: { data: GoogleReviewsData }) {
  return (
    <section id="reviews" className="bg-background px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-2xl sm:mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Client Feedback
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            What clients say
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Verified reviews from my Google Business profile.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <SummaryCard data={data} />
          </motion.div>

          {data.reviews.slice(0, 5).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.06 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
