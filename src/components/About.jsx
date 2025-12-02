import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Award, Briefcase, Code } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import profile from '../data/profile.json';

/**
 * Section À propos
 * Présentation personnelle avec storytelling et statistiques
 */
function About() {
  const { t, getLocalizedContent } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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

  // Configuration des statistiques
  const stats = [
    {
      icon: Briefcase,
      value: profile.stats.experience,
      label: t('about.stats.experience'),
    },
    {
      icon: Code,
      value: profile.stats.projects,
      label: t('about.stats.projects'),
    },
    {
      icon: Award,
      value: profile.stats.technologies,
      label: t('about.stats.technologies'),
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 bg-creme overflow-hidden"
    >
      {/* Décorations de fond */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bordeaux/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-taupe/10 rounded-full blur-3xl" />

      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Titre de section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charbon mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-bordeaux mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Colonne gauche - Image et valeurs */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Image avec effet glassmorphism */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-bordeaux/20 to-taupe/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500" />

              <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-beige to-gris/30 shadow-glass-lg">
                {/* Placeholder si pas de photo */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl font-bold text-charbon/20">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                {/* Overlay glassmorphism */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-creme/80 backdrop-blur-md">
                  <p className="text-charbon font-semibold">{profile.name}</p>
                  <p className="text-taupe text-sm">
                    {getLocalizedContent(profile.title)}
                  </p>
                </div>
              </div>
            </div>

            {/* Valeurs */}
            <motion.div
              variants={itemVariants}
              className="bg-creme/80 backdrop-blur-sm rounded-2xl p-6 border border-gris/20 shadow-glass"
            >
              <h3 className="text-lg font-semibold text-charbon mb-4">
                {t('about.values.title')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {t('about.values.items').map((value, index) => (
                  <motion.span
                    key={index}
                    className="px-4 py-2 bg-beige/50 text-charbon rounded-lg text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {value}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne droite - Description et stats */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Description */}
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-charbon/80 leading-relaxed">
                {t('about.description')}
              </p>

              <p className="text-charbon/70 leading-relaxed">
                {getLocalizedContent(profile.bio)}
              </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-creme/80 backdrop-blur-sm rounded-xl border border-gris/20 shadow-glass group hover:shadow-glass-lg transition-shadow"
                  whileHover={{ y: -4 }}
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-bordeaux" />
                  <motion.p
                    className="text-2xl md:text-3xl font-bold text-charbon"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {stat.value}+
                  </motion.p>
                  <p className="text-xs md:text-sm text-taupe mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bouton télécharger CV */}
            <motion.a
              href={profile.resume}
              download
              className="group inline-flex items-center space-x-3 px-6 py-4 bg-bordeaux text-creme font-semibold rounded-xl overflow-hidden shadow-glow hover:shadow-glow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={20} />
              <span>{t('about.downloadCV')}</span>

              {/* Effet de brillance */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
