import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Composant de sélection de langue
 * Affiche un dropdown élégant avec drapeaux et noms de langues
 */
function LanguageSwitch() {
  const { language, changeLanguage, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Configuration des langues avec drapeaux emoji
  const languageConfig = {
    fr: { name: 'Français', flag: '🇫🇷' },
    en: { name: 'English', flag: '🇬🇧' },
    mg: { name: 'Malagasy', flag: '🇲🇬' },
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bouton de déclenchement */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-beige/50 hover:bg-beige transition-colors text-charbon"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe size={18} />
        <span className="text-sm font-medium">
          {languageConfig[language]?.flag} {language.toUpperCase()}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay pour fermer le menu */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu de sélection */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-44 rounded-xl bg-creme/95 backdrop-blur-lg shadow-glass-lg border border-gris/20 overflow-hidden z-50"
            >
              {supportedLanguages.map((lang) => (
                <motion.button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                    language === lang
                      ? 'bg-bordeaux/10 text-bordeaux'
                      : 'text-charbon hover:bg-beige/50'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-xl">{languageConfig[lang]?.flag}</span>
                  <span className="text-sm font-medium">
                    {languageConfig[lang]?.name}
                  </span>
                  {language === lang && (
                    <motion.span
                      layoutId="activeLanguage"
                      className="ml-auto w-2 h-2 rounded-full bg-bordeaux"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSwitch;
