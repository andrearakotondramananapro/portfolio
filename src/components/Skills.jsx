import { useLanguage } from '../hooks/useLanguage';
import skillsData from '../data/skills.json';
import { skillIconMap } from './SkillIcons';

/**
 * Section Compétences
 * Sans Framer Motion - CSS uniquement
 */
function Skills() {
  const { t } = useLanguage();

  const categories = [
    { key: 'frontend', label: t('skills.categories.frontend') },
    { key: 'backend', label: t('skills.categories.backend') },
    { key: 'database', label: t('skills.categories.database') },
    { key: 'tools', label: t('skills.categories.tools') },
  ];

  return (
    <section
      id="skills"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-gray mb-6 max-w-2xl mx-auto">{t('skills.subtitle')}</p>
          <div className="w-24 h-1 bg-corail mx-auto rounded-full" />
        </div>

        {/* Grille */}
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div key={category.key} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="group bg-blanc/90 backdrop-blur-sm rounded-3xl border border-light-gray/20 p-8 shadow-glass hover:shadow-glass-lg transition-all h-full">
                {/* En-tête de catégorie */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-dark group-hover:text-corail transition-colors">
                    {category.label}
                  </h3>
                  <span className="text-sm text-gray font-medium px-3 py-1 bg-light-gray/50 rounded-full">
                    {skillsData[category.key]?.length || 0} skills
                  </span>
                </div>

                {/* Liste des compétences */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skillsData[category.key]?.map((skill) => {
                    const IconComponent = skillIconMap[skill.name];

                    return (
                      <div
                        key={skill.name}
                        className="group/skill flex flex-col items-center p-5 bg-light-gray/20 rounded-2xl hover:bg-light-gray/40 border border-transparent hover:border-corail/20 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                      >
                        {/* Icône */}
                        <div className="w-12 h-12 rounded-xl bg-dark/5 flex items-center justify-center mb-3 transition-all group-hover/skill:bg-corail/10 group-hover/skill:scale-110">
                          {IconComponent ? (
                            <IconComponent className="w-6 h-6 text-dark/70 group-hover/skill:text-corail transition-colors" />
                          ) : (
                            <span className="text-lg font-bold text-dark/50">
                              {skill.name.substring(0, 2)}
                            </span>
                          )}
                        </div>

                        {/* Nom */}
                        <span className="text-sm font-medium text-dark text-center">
                          {skill.name}
                        </span>

                        {/* Indicateur de niveau */}
                        <div className="w-full mt-3 h-1.5 bg-light-gray/20 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gray group-hover/skill:bg-corail transition-colors"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
