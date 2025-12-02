import { Download, Award, Briefcase, Code } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import profile from '../data/profile.json';

/**
 * Section À propos
 * Sans animations Framer Motion - CSS uniquement
 */
function About() {
  const { t, getLocalizedContent } = useLanguage();

  const stats = [
    { icon: Briefcase, value: profile.stats.experience, label: t('about.stats.experience') },
    { icon: Code, value: profile.stats.projects, label: t('about.stats.projects') },
    { icon: Award, value: profile.stats.technologies, label: t('about.stats.technologies') },
  ];

  return (
    <section id="about" className="relative py-24 md:py-40 bg-creme overflow-hidden">
      {/* Décorations de fond */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sauge/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-taupe/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charbon mb-6">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-sauge mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Colonne gauche - Image et valeurs */}
          <div className="space-y-10">
            {/* Image avec effet glassmorphism */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-bordeaux/20 to-taupe/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500" />
              <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-beige to-gris/30 shadow-glass-lg">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl font-bold text-charbon/20">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-creme/80 backdrop-blur-md">
                  <p className="text-charbon font-semibold">{profile.name}</p>
                  <p className="text-taupe text-sm">{getLocalizedContent(profile.title)}</p>
                </div>
              </div>
            </div>

            {/* Valeurs */}
            <div className="bg-creme/80 backdrop-blur-sm rounded-2xl p-8 border border-gris/20 shadow-glass">
              <h3 className="text-lg font-semibold text-charbon mb-5">
                {t('about.values.title')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {t('about.values.items').map((value, index) => (
                  <span
                    key={index}
                    className="px-4 py-2.5 bg-beige/50 text-charbon rounded-lg text-sm font-medium hover:bg-sauge/10 hover:border-sauge/20 border border-transparent transition-all duration-200"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite - Description et stats */}
          <div className="space-y-10">
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
            <div className="grid grid-cols-3 gap-5">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-5 bg-creme/80 backdrop-blur-sm rounded-xl border border-gris/20 shadow-glass group hover:shadow-glass-lg hover:border-sauge/20 hover:-translate-y-1 transition-all duration-200"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-3 text-sauge" />
                  <p className="text-2xl md:text-3xl font-bold text-charbon">
                    {stat.value}+
                  </p>
                  <p className="text-xs md:text-sm text-taupe mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bouton télécharger CV */}
            <a
              href={profile.resume}
              download
              className="group relative inline-flex items-center space-x-3 px-6 py-4 bg-bordeaux text-creme font-semibold rounded-xl overflow-hidden shadow-glow hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Download size={20} />
              <span>{t('about.downloadCV')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
