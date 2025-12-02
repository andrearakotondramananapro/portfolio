import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';
import skillsData from '../data/skills.json';
import { skillIconMap } from './SkillIcons';

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
      className="relative py-24 md:py-40 bg-gradient-to-b from-beige/30 to-creme overflow-hidden"
    >
      {/* Décorations de fond - avec touche de vert sauge */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-sauge/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-taupe/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-bordeaux/3 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charbon mb-6">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-taupe mb-6 max-w-2xl mx-auto">{t('skills.subtitle')}</p>
          <div className="w-24 h-1 bg-sauge mx-auto rounded-full" />
        </motion.div>

        {/* Grille Bento */}
        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
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
              <div className="group bg-creme/90 backdrop-blur-sm rounded-3xl border border-gris/20 p-8 shadow-glass hover:shadow-glass-lg transition-all h-full">
                {/* En-tête de catégorie */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-charbon group-hover:text-sauge transition-colors">
                    {category.label}
                  </h3>
                  <span className="text-sm text-taupe font-medium px-3 py-1 bg-beige/50 rounded-full">
                    {skillsData[category.key]?.length || 0} skills
                  </span>
                </div>

                {/* Liste des compétences - Icônes monochromes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skillsData[category.key]?.map((skill, skillIndex) => {
                    // Récupération du composant d'icône correspondant
                    const IconComponent = skillIconMap[skill.name];

                    return (
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
                          className="flex flex-col items-center p-5 bg-beige/20 rounded-2xl hover:bg-beige/40 border border-transparent hover:border-sauge/20 transition-all cursor-pointer"
                          whileHover={{
                            y: -6,
                            scale: 1.02,
                          }}
                        >
                          {/* Icône monochrome */}
                          <div className="w-12 h-12 rounded-xl bg-charbon/5 flex items-center justify-center mb-3 transition-all group-hover/skill:bg-sauge/10 group-hover/skill:scale-110">
                            {IconComponent ? (
                              <IconComponent className="w-6 h-6 text-charbon/70 group-hover/skill:text-sauge transition-colors" />
                            ) : (
                              <span className="text-lg font-bold text-charbon/50">
                                {skill.name.substring(0, 2)}
                              </span>
                            )}
                          </div>

                          {/* Nom de la compétence */}
                          <span className="text-sm font-medium text-charbon text-center group-hover/skill:text-charbon transition-colors">
                            {skill.name}
                          </span>

                          {/* Indicateur de niveau - monochrome */}
                          <div className="w-full mt-3 h-1.5 bg-gris/20 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-taupe group-hover/skill:bg-sauge transition-colors"
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
                    );
                  })}
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
