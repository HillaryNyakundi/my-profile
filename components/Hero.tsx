'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FlipWords } from './common/FlipWords';
import TalkButton from './ui/TalkButton';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]"
    >
      <div className="w-full max-w-6xl mx-auto py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-blue-600 bg-gray-800">
              <Image
                src="/headshot.jpg"
                alt="Hillary Nyakundi"
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/320';
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center md:text-left w-full max-w-2xl px-4 sm:px-6 md:px-0"
          >
            <div className="inline-flex flex-wrap justify-center md:justify-start gap-2">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                Meet!
              </p>
              <FlipWords
                words={['Hillary Nyakundi.', '@hillarynyakundi.']}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-500"
              />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-4 mb-4">
              A <span className="text-blue-500 font-semibold">Software Engineer</span>{' '}
              based in Nairobi, Kenya.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-4">
              Working towards creating software that makes life easier and more
              meaningful.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8">
              I am available for <span className="text-white">freelancing</span> or{' '}
              <span className="text-white">full-time</span> gigs.
            </p>
            <div className="mb-3">
              <TalkButton />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
