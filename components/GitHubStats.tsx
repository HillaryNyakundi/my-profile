'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Strings from '@/constants/strings';

export default function GitHubStats() {
  const username = Strings.githubUsername;

  return (
    <section
      id="github-stats"
      className="py-16 sm:py-20 lg:py-24 bg-[#1a1a1a] px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            GitHub <span className="text-blue-500">Activity</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Check out my contributions and coding statistics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GitHub Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true&bg_color=1a1a1a&title_color=3b82f6&icon_color=3b82f6&text_color=ffffff`}
              alt="GitHub Stats"
              width={500}
              height={200}
              className="rounded-lg w-full max-w-[500px] h-auto"
              unoptimized
            />
          </motion.div>

          {/* Top Languages Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <Image
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical&hide_border=true&bg_color=1a1a1a&title_color=3b82f6&text_color=ffffff`}
              alt="Top Languages"
              width={500}
              height={200}
              className="rounded-lg w-full max-w-[500px] h-auto"
              unoptimized
            />
          </motion.div>

          {/* GitHub Streak Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 flex justify-center"
          >
            <Image
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical&hide_border=true&background=1a1a1a&ring=3b82f6&fire=3b82f6&currStreakLabel=3b82f6`}
              alt="GitHub Streak"
              width={800}
              height={200}
              className="rounded-lg w-full max-w-[800px] h-auto"
              unoptimized
            />
          </motion.div>

          {/* GitHub Activity Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2 flex justify-center"
          >
            <Image
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&hide_border=true&bg_color=1a1a1a&color=3b82f6&line=3b82f6&point=ffffff`}
              alt="GitHub Activity Graph"
              width={1000}
              height={300}
              className="rounded-lg w-full h-auto"
              unoptimized
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
