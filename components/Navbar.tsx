'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code, BookOpen, Mail, Sparkles } from 'lucide-react';

const navItems = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'skills', icon: Sparkles, label: 'Skills' },
  { id: 'experience', icon: Briefcase, label: 'Experience' },
  { id: 'projects', icon: Code, label: 'Projects' },
  { id: 'blog', icon: BookOpen, label: 'Blog' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export default function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show/hide navbar based on scroll direction
          if (currentScrollY < lastScrollY || currentScrollY < 100) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }

          lastScrollY = currentScrollY;

          // Update active section
          const sections = navItems.map((item) => item.id);
          const scrollPosition = window.scrollY + window.innerHeight / 2;

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                setActiveSection(section);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <motion.div
            className="bg-[#1a1a1a]/90 backdrop-blur-md rounded-full px-3 py-2 flex items-center gap-1 md:gap-2 border border-gray-800 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="relative">
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-3 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-blue-600"
                        layoutId="activeSection"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <Icon size={20} className="relative z-10" />
                  </motion.button>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap"
                      >
                        {item.label}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
