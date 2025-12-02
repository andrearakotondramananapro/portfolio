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
 * Le contenu est toujours rendu, le loader fait un fade out par dessus
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <LanguageProvider>
      {/* Contenu principal - toujours rendu */}
      <div className="min-h-screen bg-creme font-sans antialiased relative">
        <AnimatedBackground />
        <Navigation />
        <main className="relative z-10 mx-auto">
          <Hero />
          <About />
          <Education />
          <Certifications />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Loader par dessus - fait un fade out */}
      {isLoading && (
        <Loader onLoadingComplete={() => setIsLoading(false)} />
      )}
    </LanguageProvider>
  );
}

export default App;
