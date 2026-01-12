import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Github, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import projectsData from '../data/projects.json';

/**
 * Section Projets
 * Grille filtrable avec modale - CSS uniquement pour les animations d'entrée
 */
function Projects() {
  const { t, getLocalizedContent } = useLanguage();

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filters = ['all', 'frontend', 'backend', 'fullstack', 'mobile'];

  const filteredProjects =
    activeFilter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const nextProject = () => {
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject?.id
    );
    const nextIndex =
      currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
    setSelectedProject(filteredProjects[nextIndex]);
    setCurrentImageIndex(0);
  };

  return (
    <section
      id="projects"
      className="relative py-12 md:py-16 bg-blanc overflow-hidden"
    >
      {/* Décorations de fond */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-corail/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gray/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-gray mb-6">{t('projects.subtitle')}</p>
          <div className="w-24 h-1 bg-corail mx-auto rounded-full" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                activeFilter === filter
                  ? 'bg-corail text-blanc shadow-lg'
                  : 'bg-light-gray/50 text-dark hover:bg-light-gray'
              }`}
            >
              {t(`projects.filters.${filter}`)}
            </button>
          ))}
          <span className="px-4 py-2 text-sm text-gray font-medium">
            {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Grille de projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="group cursor-pointer"
            >
              <div className="relative bg-blanc/90 backdrop-blur-sm rounded-2xl border border-light-gray/20 overflow-hidden shadow-glass hover:shadow-glass-lg hover:border-corail/20 hover:-translate-y-1 transition-all duration-200">
                {/* Image du projet */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-light-gray to-gris/30">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-dark/20">
                      {getLocalizedContent(project.title).substring(0, 2)}
                    </span>
                  </div>

                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-dark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-blanc font-semibold">
                      {t('projects.viewProject')}
                    </span>
                  </div>

                  {/* Badge featured */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-corail text-blanc text-xs font-semibold rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-corail transition-colors">
                    {getLocalizedContent(project.title)}
                  </h3>

                  <p className="text-dark/70 text-sm mb-5 line-clamp-2">
                    {getLocalizedContent(project.description)}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-light-gray/50 text-dark/80 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-gray text-xs">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modale de détail - rendu via portal pour échapper au stacking context */}
      {selectedProject && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm opacity-0 animate-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-blanc rounded-3xl shadow-2xl opacity-0 scale-95 animate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-blanc/90 backdrop-blur-sm rounded-full text-dark hover:text-rose transition-colors"
            >
              <X size={24} />
            </button>

            {/* Image carousel */}
            <div className="relative aspect-video bg-gradient-to-br from-light-gray to-gris/30">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl font-bold text-dark/20">
                  {getLocalizedContent(selectedProject.title).substring(0, 2)}
                </span>
              </div>

              {/* Navigation images */}
              {selectedProject.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-blanc/90 backdrop-blur-sm rounded-full text-dark hover:text-rose transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-blanc/90 backdrop-blur-sm rounded-full text-dark hover:text-rose transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Indicateurs */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentImageIndex === index
                            ? 'bg-rose'
                            : 'bg-blanc/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Contenu de la modale */}
            <div className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
                {getLocalizedContent(selectedProject.title)}
              </h3>

              <p className="text-dark/80 leading-relaxed mb-6">
                {getLocalizedContent(selectedProject.longDescription)}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray uppercase mb-3">
                  {t('projects.technologies')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-light-gray/50 text-dark rounded-lg text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Défis */}
              {selectedProject.challenges && (
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray uppercase mb-3">
                    {t('projects.challenges')}
                  </h4>
                  <ul className="space-y-2">
                    {getLocalizedContent(selectedProject.challenges).map(
                      (challenge, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 text-dark/80"
                        >
                          <ChevronRight
                            size={16}
                            className="text-rose mt-1 flex-shrink-0"
                          />
                          <span>{challenge}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Liens */}
              <div className="flex flex-wrap gap-6">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-rose text-blanc font-semibold rounded-xl shadow-glow hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <ExternalLink size={18} />
                    <span>{t('projects.viewProject')}</span>
                  </a>
                )}

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-dark text-blanc font-semibold rounded-xl hover:bg-dark/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <Github size={18} />
                    <span>{t('projects.viewCode')}</span>
                  </a>
                )}

                <button
                  onClick={nextProject}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-light-gray/50 text-dark font-semibold rounded-xl hover:bg-light-gray hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ml-auto"
                >
                  <span>{t('projects.nextProject')}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default Projects;
