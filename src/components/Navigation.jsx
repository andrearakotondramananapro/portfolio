import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitch from './LanguageSwitch';

/**
 * Composant de navigation principale
 * CSS pur pour des performances optimales
 */
function Navigation() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Éléments de navigation
  const navItems = [
    { href: '#about', label: t('nav.about') },
    { href: '#education', label: t('nav.education') },
    { href: '#certifications', label: t('nav.certifications') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ];

  // Détection du scroll et calcul de la progression
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Calcul de la progression sur toute la page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Barre de progression du scroll */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-rose z-60 origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Navigation principale */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-blanc/80 backdrop-blur-lg shadow-glass'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="text-xl md:text-2xl font-bold text-dark hover:text-rose hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Portfolio
            </a>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-3 lg:px-4 py-2 text-sm lg:text-base text-dark hover:text-rose transition-colors group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                </a>
              ))}

              <LanguageSwitch />
            </div>

            {/* Bouton menu mobile */}
            <div className="flex md:hidden items-center space-x-4">
              <LanguageSwitch />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-dark hover:text-rose active:scale-90 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden bg-blanc/95 backdrop-blur-lg border-t border-light-gray/30 overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="block px-4 py-3 text-dark hover:text-rose hover:bg-light-gray/50 rounded-lg transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
