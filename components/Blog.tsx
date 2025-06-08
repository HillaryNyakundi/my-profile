'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlidingCard from '@/components/ui/SlidingCard';
import { fetchHashnodeBlogsByHost } from '@/lib/hashnode';
import type { BlogPost } from '@/types';

const HASHNODE_HOST = 'https://nyakundi.hashnode.dev/';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const { posts } = await fetchHashnodeBlogsByHost(HASHNODE_HOST, 10);
        setBlogs(posts);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center space-x-2"
          >
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            />
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
          </motion.div>
          <p className="mt-4 text-gray-400">Loading blog posts...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section id="blog" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Blog</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8" />
          <p className="text-gray-400">Coming soon, keep watching!.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Blog</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto" />
          <p className="text-gray-400 mt-4">My thoughts and writings on technology</p>
        </motion.div>

        <SlidingCard items={blogs} type="blog" autoSlide={true} slideInterval={5000} />
      </div>
    </section>
  );
}
