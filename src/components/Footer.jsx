import { Heart, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import profile from '../data/profile.json';

/**
 * Composant Footer
 * Sans Framer Motion - CSS uniquement
 */
function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: profile.social.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: profile.social.twitter, label: 'Twitter' },
  ];

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#education', label: t('nav.education') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <footer className="relative bg-dark text-blanc overflow-hidden">
      {/* Décorations de fond */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-rose/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gray/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Section principale */}
        <div className="py-12 md:py-16 border-b border-blanc/10">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Colonne 1 - Logo et description */}
            <div className="space-y-4">
              <a
                href="#"
                className="inline-block text-2xl font-bold text-blanc hover:text-rose hover:scale-105 transition-all duration-200"
              >
                Portfolio
              </a>
              <p className="text-blanc/60 text-sm leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Colonne 2 - Navigation */}
            <div>
              <h4 className="text-sm font-semibold text-blanc/80 uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-blanc/60 hover:text-blanc hover:translate-x-1 transition-all duration-200 text-sm inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 3 - Réseaux sociaux */}
            <div>
              <h4 className="text-sm font-semibold text-blanc/80 uppercase tracking-wider mb-4">
                Réseaux sociaux
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blanc/10 rounded-lg text-blanc/60 hover:text-blanc hover:bg-blanc/20 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section copyright */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blanc/50 text-sm flex items-center space-x-1">
            <span>© {currentYear} {profile.name}.</span>
            <span>{t('footer.rights')}.</span>
          </p>

          <p className="text-blanc/50 text-sm flex items-center space-x-1">
            <span>{t('footer.madeWith')}</span>
            <Heart size={14} className="text-rose fill-rose" />
            <span>& React</span>
          </p>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-rose text-blanc rounded-full shadow-glow hover:shadow-glow-lg hover:scale-110 active:scale-95 transition-all duration-200 z-40"
        aria-label="Retour en haut"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}

export default Footer;
