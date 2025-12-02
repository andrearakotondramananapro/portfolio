import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import profile from '../data/profile.json';

/**
 * Composant Footer
 * Pied de page avec liens sociaux et bouton retour en haut
 */
function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Scroll vers le haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Réseaux sociaux
  const socialLinks = [
    { icon: Github, href: profile.social.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: profile.social.twitter, label: 'Twitter' },
  ];

  // Liens de navigation
  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#education', label: t('nav.education') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <footer className="relative bg-charbon text-creme overflow-hidden">
      {/* Décorations de fond */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-bordeaux/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-taupe/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Section principale */}
        <div className="py-12 md:py-16 border-b border-creme/10">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Colonne 1 - Logo et description */}
            <div className="space-y-4">
              <motion.a
                href="#"
                className="inline-block text-2xl font-bold text-creme hover:text-bordeaux transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Portfolio
              </motion.a>
              <p className="text-creme/60 text-sm leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Colonne 2 - Navigation */}
            <div>
              <h4 className="text-sm font-semibold text-creme/80 uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-creme/60 hover:text-creme transition-colors text-sm"
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 3 - Réseaux sociaux */}
            <div>
              <h4 className="text-sm font-semibold text-creme/80 uppercase tracking-wider mb-4">
                Réseaux sociaux
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-creme/10 rounded-lg text-creme/60 hover:text-creme hover:bg-creme/20 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section copyright */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-creme/50 text-sm flex items-center space-x-1">
            <span>© {currentYear} {profile.name}.</span>
            <span>{t('footer.rights')}.</span>
          </p>

          <p className="text-creme/50 text-sm flex items-center space-x-1">
            <span>{t('footer.madeWith')}</span>
            <Heart size={14} className="text-bordeaux fill-bordeaux" />
            <span>& React</span>
          </p>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-bordeaux text-creme rounded-full shadow-glow hover:shadow-glow-lg transition-all z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Retour en haut"
      >
        <ArrowUp size={20} />
      </motion.button>

      {/* Easter egg dans la console */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            console.log('%c👋 Salut développeur curieux !', 'font-size: 24px; font-weight: bold; color: #72383d;');
            console.log('%cTu as trouvé mon easter egg ! 🎉', 'font-size: 16px; color: #322d29;');
            console.log('%cN\\'hésite pas à me contacter si tu veux discuter tech !', 'font-size: 14px; color: #ac9c8d;');
            console.log('%c📧 ${profile.email}', 'font-size: 14px; color: #72383d;');
          `,
        }}
      />
    </footer>
  );
}

export default Footer;
