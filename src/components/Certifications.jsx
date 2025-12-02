import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Award } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import certificationsData from '../data/certifications.json';

/**
 * Section Certifications
 * Grille de cartes avec effet shine au hover
 */
function Certifications() {
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="certifications"
      className="relative py-24 md:py-40 bg-creme overflow-hidden"
    >
      {/* Décorations de fond - avec touche de sauge */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-sauge/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-taupe/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charbon mb-6">
            {t('certifications.title')}
          </h2>
          <p className="text-lg text-taupe mb-6">
            {t('certifications.subtitle')}
          </p>
          <div className="w-24 h-1 bg-sauge mx-auto rounded-full" />
        </motion.div>

        {/* Grille de certifications */}
        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {certificationsData.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-creme/90 backdrop-blur-sm rounded-2xl border border-gris/20 overflow-hidden shadow-glass hover:shadow-glass-lg hover:border-sauge/20 transition-all">
                {/* Effet shine au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                {/* En-tête avec logo */}
                <div className="relative p-8 pb-5">
                  <div className="flex items-start justify-between mb-5">
                    {/* Icône de certification */}
                    <div className="w-14 h-14 bg-sauge/10 rounded-xl flex items-center justify-center group-hover:bg-sauge/20 transition-colors">
                      <Award className="w-7 h-7 text-sauge" />
                    </div>

                    {/* Badge de date */}
                    <span className="px-3 py-1.5 bg-beige/50 text-charbon/70 text-xs font-medium rounded-full">
                      {cert.date}
                    </span>
                  </div>

                  {/* Nom de la certification */}
                  <h3 className="text-lg font-bold text-charbon mb-3 group-hover:text-sauge transition-colors line-clamp-2">
                    {getLocalizedContent(cert.name)}
                  </h3>

                  {/* Organisme émetteur */}
                  <p className="text-taupe font-medium text-sm">
                    {cert.issuer}
                  </p>
                </div>

                {/* Footer avec lien */}
                <div className="px-8 pb-8">
                  <motion.a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-sauge hover:text-charbon transition-colors text-sm font-medium"
                    whileHover={{ x: 4 }}
                  >
                    <span>{t('certifications.viewCredential')}</span>
                    <ExternalLink size={14} />
                  </motion.a>
                </div>

                {/* Décoration de coin */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-sauge/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Certifications;
