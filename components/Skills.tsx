"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import { Brain, Handshake, BarChart3 } from "lucide-react";

const customIcons = {
  "Problem Solving": Brain,
  Collaboration: Handshake,
  "Analytical Skills": BarChart3,
};

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Tech Stack
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base">
            Technologies have been working with recently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg sm:rounded-xl p-4 sm:p-6 border border-border hover:border-border transition-colors"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-dusty-blue text-center">
                {category.title}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const Icon =
                    customIcons[skill.name as keyof typeof customIcons] ||
                    skill.icon;
                  const isCustomIcon = skill.name in customIcons;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center justify-center p-2 sm:p-3 group cursor-pointer"
                    >
                      <div className="relative">
                        <Icon
                          size={20}
                          style={{
                            color: isCustomIcon ? "#FFFFFF" : skill.color,
                          }}
                          className="mb-1 sm:mb-2 group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
