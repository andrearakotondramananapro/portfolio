import { ChevronDown, Github, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import profile from '../data/profile.json';

/**
 * Section Hero - Première impression du portfolio
 * Sans animations d'entrée - affichage direct et fluide
 */
function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blanc via-light-gray/30 to-blanc"
    >
      {/* Fond avec CSS pur - GPU accelerated */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-rose/5 blur-3xl bg-float-1" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gray/10 blur-3xl bg-float-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose/3 blur-3xl bg-float-3" />
      </div>

      {/* Contenu principal - sans animations d'entrée */}
      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Photo de profil */}
          <div className="relative group">
            {/* Halo de fond */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-corail/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500" />

            {/* Conteneur de la photo */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blanc/50 shadow-glass-lg backdrop-blur-sm">
              <div className="w-full h-full bg-gradient-to-br from-corail/30 to-rose/20 flex items-center justify-center">
                <span className="text-6xl md:text-7xl font-bold text-dark/30">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="absolute inset-0 bg-rose/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Badge de disponibilité */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-blanc/90 backdrop-blur-sm rounded-full shadow-glass border border-corail/20">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-corail rounded-full animate-pulse-slow" />
                <span className="text-xs font-semibold text-dark tracking-wide">
                  {t('contact.info.availableNow')}
                </span>
              </div>
            </div>
          </div>

          {/* Texte et CTAs */}
          <div className="text-center lg:text-left max-w-xl">
            {/* Salutation */}
            <p className="text-lg md:text-xl text-corail font-medium mb-3 tracking-wide">
              {t('hero.greeting')}
            </p>

            {/* Nom */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-5">
              {profile.name}
            </h1>

            {/* Titre */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-rose mb-8">
              {t('hero.title')}
            </h2>

            {/* Sous-titre */}
            <p className="text-lg md:text-xl text-dark/70 mb-10 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-10">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-rose text-blanc font-semibold rounded-xl overflow-hidden shadow-glow hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span className="relative z-10">{t('hero.cta')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>

              <a
                href="#contact"
                className="px-8 py-4 bg-blanc/80 backdrop-blur-sm text-dark font-semibold rounded-xl border-2 border-dark/10 hover:border-rose/30 hover:bg-blanc hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                {t('hero.ctaContact')}
              </a>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              {[
                { icon: Github, href: profile.social.github },
                { icon: Linkedin, href: profile.social.linkedin },
                { icon: Twitter, href: profile.social.twitter },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blanc/80 backdrop-blur-sm rounded-xl text-dark hover:text-rose hover:bg-light-gray/50 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-glass"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="flex flex-col items-center text-dark/50 hover:text-rose transition-colors animate-float"
        >
          <span className="text-sm mb-2 font-medium">Scroll</span>
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  );
}

export default Hero;
