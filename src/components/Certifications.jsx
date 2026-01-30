import { ExternalLink, Award } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import certificationsData from '../data/certifications.json';

/**
 * Section Certifications
 * Sans Framer Motion - CSS uniquement
 */
function Certifications() {
  const { t, getLocalizedContent } = useLanguage();

  return (
    <section
      id="certifications"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
            {t('certifications.title')}
          </h2>
          <p className="text-lg text-gray mb-6">{t('certifications.subtitle')}</p>
          <div className="w-24 h-1 bg-corail mx-auto rounded-full" />
        </div>

        {/* Grille de certifications */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsData.map((cert, index) => (
            <div key={cert.id} className="group relative" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="relative bg-blanc/90 backdrop-blur-sm rounded-2xl border border-light-gray/20 overflow-hidden shadow-glass hover:shadow-glass-lg hover:border-corail/20 hover:-translate-y-1 transition-all duration-200">
                {/* Effet shine au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                {/* En-tête avec logo */}
                <div className="relative p-8 pb-5">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 bg-corail/10 rounded-xl flex items-center justify-center group-hover:bg-corail/20 transition-colors">
                      <Award className="w-7 h-7 text-corail" />
                    </div>
                    <span className="px-3 py-1.5 bg-light-gray/50 text-dark/70 text-xs font-medium rounded-full">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-corail transition-colors line-clamp-2">
                    {getLocalizedContent(cert.name)}
                  </h3>

                  <p className="text-gray font-medium text-sm">{cert.issuer}</p>
                </div>

                {/* Footer avec lien */}
                <div className="px-8 pb-8">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-corail hover:text-dark transition-colors text-sm font-medium hover:translate-x-1 transform duration-200"
                  >
                    <span>{t('certifications.viewCredential')}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
