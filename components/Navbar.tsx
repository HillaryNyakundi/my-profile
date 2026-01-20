'use client';

import { useEffect, useState } from 'react';
import { User, Briefcase, Code, Mail, Sparkles, CircuitBoard } from 'lucide-react';

const navItems = [
  { id: 'hero', icon: User, label: 'About' },
  { id: 'services', icon: Briefcase, label: 'Services' },
  { id: 'skills', icon: Sparkles, label: 'Skills' },
  { id: 'experience', icon: CircuitBoard, label: 'Experience' },
  { id: 'projects', icon: Code, label: 'Projects' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export default function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((section) => section.element);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = section.element!;
        const { offsetTop, offsetHeight } = element;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for fixed headers if any
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className="
        bg-[#1a1a1a]/90 backdrop-blur-md 
        rounded-full border border-gray-800 shadow-lg
        flex items-center gap-1 md:gap-2
        px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3
      "
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  relative rounded-full transition-all duration-300 
                  flex items-center justify-center
                  p-2.5 sm:p-3 
                  ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                `}
                aria-label={item.label}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />

                {/* Simple active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                )}
              </button>

              {/* Tooltip - Only show on medium screens and up */}
              {hoveredItem === item.id && (
                <div
                  className="
                  absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                  px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap 
                  hidden md:block
                  animate-in fade-in slide-in-from-bottom-1 duration-200
                "
                >
                  {item.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
