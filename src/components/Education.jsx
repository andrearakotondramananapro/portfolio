import { GraduationCap, BookOpen, School } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import educationData from '../data/education.json';

/**
 * Section Formation - Timeline
 * Sans Framer Motion - CSS uniquement
 */
function Education() {
  const { t, getLocalizedContent } = useLanguage();

  const iconMap = {
    graduation: GraduationCap,
    book: BookOpen,
    school: School,
  };

  return (
    <section
      id="education"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl 3xl:max-w-7xl 4xl:max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
            {t('education.title')}
          </h2>
          <p className="text-lg text-gray mb-6">{t('education.subtitle')}</p>
          <div className="w-24 h-1 bg-corail mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-corail/30 md:-translate-x-1/2" />

          {/* Éléments de la timeline */}
          <div className="space-y-6">
            {educationData.map((item, index) => {
              const Icon = iconMap[item.icon] || GraduationCap;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Point de la timeline */}
                  <div className="absolute left-4 md:left-1/2 w-10 h-10 -translate-x-1/2 z-10">
                    <div className="w-full h-full bg-corail rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                      <Icon size={18} className="text-blanc" />
                    </div>
                  </div>

                  {/* Contenu de la carte */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] ${
                      isEven ? 'md:pr-10 pl-14 md:pl-0' : 'md:pl-10 pl-14 md:pr-0'
                    }`}
                  >
                    <div className="group bg-blanc/90 backdrop-blur-sm p-8 rounded-2xl border border-light-gray/20 shadow-glass hover:shadow-glass-lg hover:border-corail/20 hover:-translate-y-1 transition-all duration-200">
                      {/* Dates */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="px-4 py-1.5 bg-corail/10 text-corail text-sm font-semibold rounded-full">
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>

                      {/* Institution */}
                      <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-corail transition-colors">
                        {getLocalizedContent(item.degree)}
                      </h3>

                      {/* Diplôme */}
                      <p className="text-gray font-medium mb-3">
                        {getLocalizedContent(item.institution)}
                      </p>

                      {/* Spécialisation */}
                      <p className="text-sm text-rose/80 mb-4">
                        {getLocalizedContent(item.field)}
                      </p>

                      {/* Description */}
                      <p className="text-dark/70 text-sm leading-relaxed">
                        {getLocalizedContent(item.description)}
                      </p>
                    </div>
                  </div>

                  {/* Espace vide pour l'autre côté */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
