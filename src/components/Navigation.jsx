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

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
        className={`fixed top-0 left-0 right-0 h-1 bg-bordeaux z-[60] origin-left transition-transform duration-300 ${
          isScrolled ? 'scale-x-100' : 'scale-x-0'
        }`}
      />

      {/* Navigation principale */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-creme/80 backdrop-blur-lg shadow-glass'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="text-xl md:text-2xl font-bold text-charbon hover:text-bordeaux hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Portfolio
            </a>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-3 lg:px-4 py-2 text-sm lg:text-base text-charbon hover:text-bordeaux transition-colors group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-bordeaux transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                </a>
              ))}

              <LanguageSwitch />
            </div>

            {/* Bouton menu mobile */}
            <div className="flex md:hidden items-center space-x-4">
              <LanguageSwitch />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-charbon hover:text-bordeaux active:scale-90 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden bg-creme/95 backdrop-blur-lg border-t border-gris/30 overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="block px-4 py-3 text-charbon hover:text-bordeaux hover:bg-beige/50 rounded-lg transition-all duration-200"
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
