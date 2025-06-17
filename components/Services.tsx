'use client';

import { services } from '@/lib/data';
import { motion } from 'framer-motion';

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Services</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto" />
          <p className="text-gray-400 mt-4">Services that I offer</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
            >
              {/* Icons */}
              <div className="flex gap-3 mb-6">
                {service.icons.map((item, iconIndex) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={iconIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: index * 0.1 + iconIndex * 0.05,
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      }}
                      viewport={{ once: true }}
                      className="w-12 h-12 rounded-lg bg-[#2a2a2a] flex items-center justify-center group-hover:bg-[#3a3a3a] transition-colors"
                    >
                      <Icon
                        size={24}
                        style={{ color: item.color }}
                        className="transition-transform group-hover:scale-110"
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
