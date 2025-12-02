import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';
import skillsData from '../data/skills.json';

/**
 * Section Compétences
 * Layout bento box avec cartes animées et effet 3D au hover
 */
function Skills() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Configuration des catégories avec tailles de grille
  const categories = [
    { key: 'frontend', label: t('skills.categories.frontend'), size: 'large' },
    { key: 'backend', label: t('skills.categories.backend'), size: 'large' },
    { key: 'database', label: t('skills.categories.database'), size: 'medium' },
    { key: 'tools', label: t('skills.categories.tools'), size: 'medium' },
  ];

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      id="skills"
      className="relative py-20 md:py-32 bg-gradient-to-b from-beige/30 to-creme overflow-hidden"
    >
      {/* Décorations de fond */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-bordeaux/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-taupe/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charbon mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-taupe mb-4">{t('skills.subtitle')}</p>
          <div className="w-24 h-1 bg-bordeaux mx-auto rounded-full" />
        </motion.div>

        {/* Grille Bento */}
        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              variants={itemVariants}
              className={`${
                category.size === 'large' ? 'lg:col-span-2' : 'lg:col-span-2'
              }`}
            >
              <div className="group bg-creme/90 backdrop-blur-sm rounded-3xl border border-gris/20 p-6 shadow-glass hover:shadow-glass-lg transition-all h-full">
                {/* En-tête de catégorie */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-charbon group-hover:text-bordeaux transition-colors">
                    {category.label}
                  </h3>
                  <span className="text-sm text-taupe">
                    {skillsData[category.key]?.length || 0} skills
                  </span>
                </div>

                {/* Liste des compétences */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {skillsData[category.key]?.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="group/skill relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <motion.div
                        className="flex flex-col items-center p-4 bg-beige/30 rounded-xl hover:bg-beige/50 transition-all cursor-pointer"
                        whileHover={{
                          y: -4,
                          rotateX: 5,
                          rotateY: 5,
                        }}
                        style={{ perspective: 1000 }}
                      >
                        {/* Icône colorée */}
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-transform group-hover/skill:scale-110"
                          style={{ backgroundColor: `${skill.color}20` }}
                        >
                          <span
                            className="text-lg font-bold"
                            style={{ color: skill.color }}
                          >
                            {skill.name.substring(0, 2)}
                          </span>
                        </div>

                        {/* Nom de la compétence */}
                        <span className="text-sm font-medium text-charbon text-center">
                          {skill.name}
                        </span>

                        {/* Indicateur de niveau */}
                        <div className="w-full mt-2 h-1 bg-gris/30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{
                              delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                              duration: 0.8,
                              ease: 'easeOut',
                            }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
