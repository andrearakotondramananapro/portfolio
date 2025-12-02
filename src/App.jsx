import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './hooks/useLanguage';
import Loader from './components/Loader';
import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

/**
 * Composant principal de l'application
 * Portfolio moderne avec glassmorphism et animations fluides
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Gestion du chargement initial
  useEffect(() => {
    // Empêcher le scroll pendant le chargement
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    // Petit délai pour une transition plus fluide
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <LanguageProvider>
      {/* Loader initial */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <div className="min-h-screen bg-creme font-sans antialiased relative">
        {/* Fond animé */}
        <AnimatedBackground />

        {/* Navigation fixe */}
        <Navigation />

        {/* Contenu principal - centré sur tous les écrans */}
        <main className="relative z-10 mx-auto">
          {/* Section Hero - Première impression */}
          <Hero />

          {/* Section À propos */}
          <About />

          {/* Section Formation */}
          <Education />

          {/* Section Certifications */}
          <Certifications />

          {/* Section Compétences */}
          <Skills />

          {/* Section Projets */}
          <Projects />

          {/* Section Contact */}
          <Contact />
        </main>

        {/* Pied de page */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
