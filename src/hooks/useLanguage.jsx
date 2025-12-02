import { useState, useEffect, createContext, useContext } from 'react';
import translations from '../data/translations.json';

// Contexte pour la gestion des langues
const LanguageContext = createContext();

// Langues supportées
const SUPPORTED_LANGUAGES = ['fr', 'en', 'mg'];
const DEFAULT_LANGUAGE = 'fr';

/**
 * Provider pour la gestion multilingue
 * Détecte automatiquement la langue du navigateur au chargement
 */
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  // Détection automatique de la langue du navigateur au montage
  useEffect(() => {
    const detectBrowserLanguage = () => {
      const browserLang = navigator.language.split('-')[0];
      if (SUPPORTED_LANGUAGES.includes(browserLang)) {
        return browserLang;
      }
      return DEFAULT_LANGUAGE;
    };

    setLanguage(detectBrowserLanguage());
  }, []);

  // Fonction pour changer de langue
  const changeLanguage = (newLang) => {
    if (SUPPORTED_LANGUAGES.includes(newLang)) {
      setLanguage(newLang);
    }
  };

  // Fonction pour obtenir une traduction
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Retourne la clé si la traduction n'existe pas
      }
    }

    return value || key;
  };

  // Fonction pour obtenir du contenu multilingue depuis les données JSON
  const getLocalizedContent = (content) => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    return content[language] || content['fr'] || content['en'] || '';
  };

  const value = {
    language,
    changeLanguage,
    t,
    getLocalizedContent,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook personnalisé pour accéder au contexte de langue
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé dans un LanguageProvider');
  }
  return context;
}

export default useLanguage;
