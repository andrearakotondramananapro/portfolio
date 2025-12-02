import { LanguageProvider } from './hooks/useLanguage';
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
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-creme font-sans antialiased">
        {/* Navigation fixe */}
        <Navigation />

        {/* Contenu principal */}
        <main>
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
