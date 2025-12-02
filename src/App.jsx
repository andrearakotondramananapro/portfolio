import { useState, useEffect } from 'react';
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
 * Portfolio moderne avec transitions CSS pures
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Gestion du chargement initial
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Petit délai pour laisser le loader disparaître
    setTimeout(() => {
      setShowContent(true);
    }, 50);
  };

  return (
    <LanguageProvider>
      {/* Loader initial */}
      {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}

      {/* Contenu principal - transitions CSS pures */}
      {!isLoading && (
        <div
          className={`min-h-screen bg-creme font-sans antialiased relative transition-opacity duration-700 ease-out ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Fond animé */}
          <AnimatedBackground />

          {/* Navigation fixe */}
          <div
            className={`transition-all duration-700 ease-out delay-100 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <Navigation />
          </div>

          {/* Contenu principal */}
          <main className="relative z-10 mx-auto">
            <Hero />
            <About />
            <Education />
            <Certifications />
            <Skills />
            <Projects />
            <Contact />
          </main>

          {/* Pied de page */}
          <Footer />
        </div>
      )}
    </LanguageProvider>
  );
}

export default App;
