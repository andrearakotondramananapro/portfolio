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
      className="relative py-24 md:py-40 bg-gradient-to-b from-creme to-beige/30 overflow-hidden"
    >
      {/* Décorations de fond - avec touche de sauge */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-sauge/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-taupe/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl 3xl:max-w-7xl 4xl:max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charbon mb-6">
            {t('education.title')}
          </h2>
          <p className="text-lg text-taupe mb-6">{t('education.subtitle')}</p>
          <div className="w-24 h-1 bg-sauge mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <motion.div
          ref={ref}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Ligne verticale de la timeline - CSS transition */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gris md:-translate-x-1/2">
            <div
              className={`w-full bg-sauge origin-top transition-transform duration-1000 ease-out ${inView ? 'scale-y-100' : 'scale-y-0'}`}
              style={{ height: '100%' }}
            />
          </div>

          {/* Éléments de la timeline */}
          <div className="space-y-16">
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
                    className="absolute left-4 md:left-1/2 w-10 h-10 -translate-x-1/2 z-10"
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="w-full h-full bg-sauge rounded-full flex items-center justify-center shadow-glow-sauge">
                      <Icon size={18} className="text-creme" />
                    </div>
                  </motion.div>

                  {/* Contenu de la carte */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] ${
                      isEven ? 'md:pr-10 pl-14 md:pl-0' : 'md:pl-10 pl-14 md:pr-0'
                    }`}
                  >
                    <motion.div
                      className="group bg-creme/90 backdrop-blur-sm p-8 rounded-2xl border border-gris/20 shadow-glass hover:shadow-glass-lg hover:border-sauge/20 transition-all"
                      whileHover={{ y: -4 }}
                    >
                      {/* Dates */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="px-4 py-1.5 bg-sauge/10 text-sauge text-sm font-semibold rounded-full">
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>

                      {/* Institution */}
                      <h3 className="text-xl font-bold text-charbon mb-3 group-hover:text-sauge transition-colors">
                        {getLocalizedContent(item.degree)}
                      </h3>

                      {/* Diplôme */}
                      <p className="text-taupe font-medium mb-3">
                        {getLocalizedContent(item.institution)}
                      </p>

                      {/* Spécialisation */}
                      <p className="text-sm text-bordeaux/80 mb-4">
                        {getLocalizedContent(item.field)}
                      </p>

                      {/* Description */}
                      <p className="text-charbon/70 text-sm leading-relaxed">
                        {getLocalizedContent(item.description)}
                      </p>

                      {/* Décoration au hover */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-sauge/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
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
