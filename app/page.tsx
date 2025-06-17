'use client';

import FloatingNavbar from '@/components/Navbar';
import Hero from '@/components/Hero';
//import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Services from '@/components/Services';

export default function Home() {
  return (
    <>
      <FloatingNavbar />
      <main className="relative">
        <Hero />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
