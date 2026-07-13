"use client";

import { services } from "@/lib/data";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-20 px-4 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            What I bring
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base">
            Services that I offer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-border hover:border-border transition-all duration-300 group"
            >
              {/* Icons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                {service.icons.map((item, iconIndex) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={iconIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: index * 0.1 + iconIndex * 0.05,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      viewport={{ once: true }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-card flex items-center justify-center group-hover:bg-muted transition-colors"
                    >
                      <Icon
                        size={20}
                        className="transition-transform group-hover:scale-110 sm:text-2xl"
                        style={{ color: item.color }}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-dusty-blue">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
