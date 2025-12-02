import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, BookOpen, School } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import educationData from '../data/education.json';

/**
 * Section Formation - Timeline interactive
 * Affiche le parcours académique avec animations au scroll
 */
function Education() {
  const { t, getLocalizedContent } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Mapping des icônes
  const iconMap = {
    graduation: GraduationCap,
    book: BookOpen,
    school: School,
  };

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="education"
      className="relative py-20 md:py-32 bg-gradient-to-b from-creme to-beige/30 overflow-hidden"
    >
      {/* Décorations de fond */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-bordeaux/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-taupe/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charbon mb-4">
            {t('education.title')}
          </h2>
          <p className="text-lg text-taupe mb-4">{t('education.subtitle')}</p>
          <div className="w-24 h-1 bg-bordeaux mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <motion.div
          ref={ref}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Ligne verticale de la timeline */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gris md:-translate-x-1/2">
            <motion.div
              className="w-full bg-bordeaux origin-top"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ height: '100%' }}
            />
          </div>

          {/* Éléments de la timeline */}
          <div className="space-y-12">
            {educationData.map((item, index) => {
              const Icon = iconMap[item.icon] || GraduationCap;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Point de la timeline */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 z-10"
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="w-full h-full bg-bordeaux rounded-full flex items-center justify-center shadow-glow">
                      <Icon size={16} className="text-creme" />
                    </div>
                  </motion.div>

                  {/* Contenu de la carte */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] ${
                      isEven ? 'md:pr-8 pl-12 md:pl-0' : 'md:pl-8 pl-12 md:pr-0'
                    }`}
                  >
                    <motion.div
                      className="group bg-creme/90 backdrop-blur-sm p-6 rounded-2xl border border-gris/20 shadow-glass hover:shadow-glass-lg transition-all"
                      whileHover={{ y: -4 }}
                    >
                      {/* Dates */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="px-3 py-1 bg-bordeaux/10 text-bordeaux text-sm font-semibold rounded-full">
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>

                      {/* Institution */}
                      <h3 className="text-xl font-bold text-charbon mb-2 group-hover:text-bordeaux transition-colors">
                        {getLocalizedContent(item.degree)}
                      </h3>

                      {/* Diplôme */}
                      <p className="text-taupe font-medium mb-2">
                        {getLocalizedContent(item.institution)}
                      </p>

                      {/* Spécialisation */}
                      <p className="text-sm text-bordeaux/80 mb-3">
                        {getLocalizedContent(item.field)}
                      </p>

                      {/* Description */}
                      <p className="text-charbon/70 text-sm leading-relaxed">
                        {getLocalizedContent(item.description)}
                      </p>

                      {/* Décoration au hover */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-bordeaux/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>

                  {/* Espace vide pour l'autre côté */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Education;
