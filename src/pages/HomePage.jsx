import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from '../lib/animations';

// Layout
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollProgress from '../components/layout/ScrollProgress';

// Sections
import Hero from '../components/sections/Hero';
import Identity from '../components/sections/Identity';
import EngineeringDomains from '../components/sections/EngineeringDomains';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import TechStack from '../components/sections/TechStack';
import CurrentlyBuilding from '../components/sections/CurrentlyBuilding';
import Terminal from '../components/sections/Terminal';
import Contact from '../components/sections/Contact';

// Combined UX-optimized Sections
import FounderAndLeadership from '../components/sections/FounderAndLeadership';
import JourneyTabs from '../components/sections/JourneyTabs';
import Preloader from '../components/ui/Preloader';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          <ScrollProgress />
          <Navbar />
          
          <main>
            <Hero />
            <Identity />
            <FeaturedProjects />
            <EngineeringDomains />
            <FounderAndLeadership />
            <TechStack />
            <JourneyTabs />
            <Terminal />
            <CurrentlyBuilding />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}
