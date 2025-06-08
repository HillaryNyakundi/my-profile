// components/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto" />
          <p className="text-gray-400 mt-4">Got what you need? Holla at me</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:edwinchebii@kibet.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <Mail
                  size={20}
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span>hillarynyakundi66@gmail.com</span>
              </a>
              <a
                href="tel:+254701200709"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <Phone
                  size={20}
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span>+254 741 467 228</span>
              </a>
              <a
                href="https://wa.me/254741467228"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <MessageCircle
                  size={20}
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-blue-500" />
                <span>Karen, Nairobi, Kenya</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
