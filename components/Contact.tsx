'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Contact Me</h2>
          <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto" />
          <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">
            Got what you need? Holla at me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="px-4 sm:px-6"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
              Get in touch
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <a
                href="mailto:hillarynyakundi66@gmail.com"
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors group text-sm sm:text-base"
              >
                <Mail
                  size={18}
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span className="break-all">hillarynyakundi66@gmail.com</span>
              </a>
              <a
                href="tel:+254741467228"
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors group text-sm sm:text-base"
              >
                <Phone
                  size={18}
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span>+254 741 467 228</span>
              </a>
              <a
                href="https://wa.me/254741467228"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors group text-sm sm:text-base"
              >
                <MessageCircle
                  size={18}
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-300 text-sm sm:text-base">
                <MapPin size={18} className="text-blue-500" />
                <span>Karen, Nairobi, Kenya</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
