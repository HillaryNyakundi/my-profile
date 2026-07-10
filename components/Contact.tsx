'use client';

import { Mail } from 'lucide-react';
import { FaXTwitter, FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import ContactForm from '@/components/ContactForm';
import Strings from '@/constants/strings';

export default function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            Feel free to shoot your message.
          </h2>
          <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">
            Got what you need? Tell me about your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="px-4 sm:px-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
              My Socials
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <a
                href={Strings.primaryEmailLink}
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-blue-500 transition-colors group text-sm sm:text-base"
              >
                <Mail
                  size={18}
                  className="group-hover:scale-110 transition-transform text-white"
                />
                <span className="break-all">{Strings.primaryEmail}</span>
              </a>
              <a
                href={Strings.xLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-blue-500 transition-colors group text-sm sm:text-base"
              >
                <FaXTwitter
                  size={18}
                  className="group-hover:scale-110 transition-transform text-white"
                />
                <span>{Strings.x}</span>
              </a>
              <a
                href={Strings.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-blue-500 transition-colors group text-sm sm:text-base"
              >
                <FaWhatsapp
                  size={18}
                  style={{ color: '#25D366' }}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{Strings.whatsapp}</span>
              </a>
              <a
                href={Strings.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-blue-500 transition-colors group text-sm sm:text-base"
              >
                <FaInstagram
                  size={18}
                  className="group-hover:scale-110 transition-transform text-white"
                />
                <span>{Strings.instagram}</span>
              </a>
            </div>
          </div>

          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
