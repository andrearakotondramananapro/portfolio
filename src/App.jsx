import { useState, useEffect } from 'react';
import { LanguageProvider } from './hooks/useLanguage';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

  // Activation du smooth scroll avec Lenis (uniquement après le chargement)
  const shouldInitLenis = !isLoading;

  useEffect(() => {
    if (isLoading) {
      // Empêcher le scroll et cacher la scrollbar
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Éviter le décalage de layout
      document.documentElement.style.overflow = 'hidden'; // Cache aussi sur html
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = 'auto';

      // Initialiser AOS après le loader
      AOS.init({
        duration: 600,
        easing: 'ease-out',
        once: true,
        offset: 50,
        disable: 'mobile', // Désactiver sur mobile pour performance
      });
    }
  }, [isLoading]);

  // Initialisation de Lenis après le loader
  useEffect(() => {
    if (!shouldInitLenis) return;

    let lenis = null;
    let rafId = null;

    // Import dynamique pour ne charger Lenis qu'après le loader
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2, // Durée de l'inertie
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Courbe naturelle
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true, // Smooth scroll à la molette
        smoothTouch: false, // Natif sur mobile pour ne pas interférer
        wheelMultiplier: 1, // Vitesse normale
        touchMultiplier: 2,
        infinite: false,
        autoResize: true,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    // Nettoyage lors du démontage
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, [shouldInitLenis]);

  return (
    <LanguageProvider>
      {/* Contenu principal - toujours rendu */}
      <div className="min-h-screen bg-blanc font-sans antialiased relative">
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
