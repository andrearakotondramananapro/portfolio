import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import profile from '../data/profile.json';

/**
 * Section Hero - Première impression du portfolio
 * Inclut l'animation d'entrée spectaculaire et les informations principales
 */
function Hero() {
  const { t, getLocalizedContent } = useLanguage();

  // Variantes d'animation pour le conteneur
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  // Variantes pour les éléments enfants
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Animation pour la photo de profil
  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-creme via-beige/30 to-creme"
    >
      {/* Fond animé avec particules/gradient */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cercles décoratifs animés */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-bordeaux/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-taupe/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-bordeaux/3 blur-3xl"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Contenu principal */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          {/* Photo de profil avec effet glassmorphism */}
          <motion.div
            variants={photoVariants}
            className="relative group"
          >
            {/* Halo de fond */}
            <div className="absolute inset-0 bg-gradient-to-br from-bordeaux/20 to-taupe/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500" />

            {/* Conteneur de la photo */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-creme/50 shadow-glass-lg backdrop-blur-sm">
              {/* Placeholder si pas de photo */}
              <div className="w-full h-full bg-gradient-to-br from-taupe/30 to-bordeaux/20 flex items-center justify-center">
                <span className="text-6xl md:text-7xl font-bold text-charbon/30">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              {/* Overlay au hover */}
              <motion.div
                className="absolute inset-0 bg-bordeaux/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            {/* Badge de disponibilité - avec la couleur sauge */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-creme/90 backdrop-blur-sm rounded-full shadow-glass border border-sauge/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-sauge rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-charbon tracking-wide">
                  {t('contact.info.availableNow')}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Texte et CTAs */}
          <div className="text-center lg:text-left max-w-xl">
            {/* Salutation */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-sauge font-medium mb-3 tracking-wide"
            >
              {t('hero.greeting')}
            </motion.p>

            {/* Nom */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-charbon mb-5"
            >
              {profile.name}
            </motion.h1>

            {/* Titre */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-bordeaux mb-8"
            >
              {t('hero.title')}
            </motion.h2>

            {/* Sous-titre */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-charbon/70 mb-10 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Boutons CTA */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mb-10"
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-bordeaux text-creme font-semibold rounded-xl overflow-hidden shadow-glow hover:shadow-glow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{t('hero.cta')}</span>
                {/* Effet de brillance au hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />
              </motion.a>

              <motion.a
                href="#contact"
                className="px-8 py-4 bg-creme/80 backdrop-blur-sm text-charbon font-semibold rounded-xl border-2 border-charbon/10 hover:border-bordeaux/30 hover:bg-creme transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.ctaContact')}
              </motion.a>
            </motion.div>

            {/* Réseaux sociaux */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start space-x-4"
            >
              {[
                { icon: Github, href: profile.social.github },
                { icon: Linkedin, href: profile.social.linkedin },
                { icon: Twitter, href: profile.social.twitter },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-creme/80 backdrop-blur-sm rounded-xl text-charbon hover:text-bordeaux hover:bg-beige/50 transition-all shadow-glass"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center text-charbon/50 hover:text-bordeaux transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm mb-2 font-medium">Scroll</span>
          <ChevronDown size={24} />
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Hero;
