'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold mb-4">Get to know me!</h3>
            <p className="text-gray-300 leading-relaxed">
              Hi, my name is Hillary and I am a <strong>highly proficient</strong>,{' '}
              <strong>self-motivated</strong>, and <strong>driven</strong> software
              engineer based in Nairobi, Kenya.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I graduated from South Eastern Kenya University, in 2024 with a BS in
              Computer Science. I have been working for close to two years.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I have a wide range of hobbies and passions that keep me busy. From
              reading, playing chess, travelling, writing poems, I am always seeking new
              experiences and love to keep myself engaged and learning new things.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I believe that you should{' '}
              <span className="text-blue-400 font-semibold">never stop growing</span>{' '}
              and thats what I strive to do, I have a passion for technology and a
              desire to always push the limits of what is possible. I am excited to see
              where my career takes me and am always open to new opportunities. 🙂
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Image
              src="/dev.png"
              alt="Character illustration"
              width={400}
              height={400}
              className="opacity-80 rounded-md"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
