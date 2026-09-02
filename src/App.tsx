import { MotionConfig } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Projects } from '@/sections/Projects';
import { Achievements } from '@/sections/Achievements';
import { Identity } from '@/sections/Identity';
import { Skills } from '@/sections/Skills';
import { Philosophy } from '@/sections/Philosophy';
import { Photography } from '@/sections/Photography';
import { Contact } from '@/sections/Contact';

export default function App() {
  return (
    // reducedMotion="user" strips transforms for anyone who asked the OS for it,
    // leaving opacity-only transitions. Nothing else in the tree needs to care.
    <MotionConfig reducedMotion="user">
      <Navbar />

      <main id="main">
        <Hero />
        <Projects />
        <Achievements />
        <Identity />
        <Skills />
        <Philosophy />
        <Photography />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
