import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import projectsData from '../data/projects.json';

/**
 * Section Projets
 * Grille filtrable avec modale de détail
 */
function Projects() {
  const { t, getLocalizedContent } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filtres disponibles
  const filters = ['all', 'frontend', 'backend', 'fullstack', 'mobile'];

  // Projets filtrés
  const filteredProjects =
    activeFilter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  // Gestion de la modale
  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Navigation images dans la modale
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

  // Projet suivant dans la modale
  const nextProject = () => {
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject?.id
    );
    const nextIndex =
      currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
    setSelectedProject(filteredProjects[nextIndex]);
    setCurrentImageIndex(0);
  };

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
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-24 md:py-40 bg-creme overflow-hidden"
    >
      {/* Décorations de fond - avec touche de sauge */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sauge/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-taupe/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charbon mb-6">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-taupe mb-6">{t('projects.subtitle')}</p>
          <div className="w-24 h-1 bg-sauge mx-auto rounded-full" />
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                activeFilter === filter
                  ? 'bg-sauge text-creme shadow-glow-sauge'
                  : 'bg-beige/50 text-charbon hover:bg-beige'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(`projects.filters.${filter}`)}
            </motion.button>
          ))}

          {/* Compteur */}
          <span className="px-4 py-2 text-sm text-taupe font-medium">
            {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Grille de projets */}
        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                onClick={() => openModal(project)}
                className="group cursor-pointer"
              >
                <div className="relative bg-creme/90 backdrop-blur-sm rounded-2xl border border-gris/20 overflow-hidden shadow-glass hover:shadow-glass-lg hover:border-sauge/20 transition-all">
                  {/* Image du projet */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-beige to-gris/30">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-charbon/20">
                        {getLocalizedContent(project.title).substring(0, 2)}
                      </span>
                    </div>

                    {/* Overlay au hover */}
                    <motion.div
                      className="absolute inset-0 bg-charbon/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="text-creme font-semibold">
                        {t('projects.viewProject')}
                      </span>
                    </motion.div>

                    {/* Badge featured */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-sauge text-creme text-xs font-semibold rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-charbon mb-3 group-hover:text-sauge transition-colors">
                      {getLocalizedContent(project.title)}
                    </h3>

                    <p className="text-charbon/70 text-sm mb-5 line-clamp-2">
                      {getLocalizedContent(project.description)}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-beige/50 text-charbon/80 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-taupe text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modale de détail */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charbon/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-creme rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-creme/90 backdrop-blur-sm rounded-full text-charbon hover:text-bordeaux transition-colors"
              >
                <X size={24} />
              </button>

              {/* Image carousel */}
              <div className="relative aspect-video bg-gradient-to-br from-beige to-gris/30">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl font-bold text-charbon/20">
                    {getLocalizedContent(selectedProject.title).substring(0, 2)}
                  </span>
                </div>

                {/* Navigation images */}
                {selectedProject.images?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-creme/90 backdrop-blur-sm rounded-full text-charbon hover:text-bordeaux transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-creme/90 backdrop-blur-sm rounded-full text-charbon hover:text-bordeaux transition-colors"
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
                              ? 'bg-bordeaux'
                              : 'bg-creme/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Contenu de la modale */}
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-charbon mb-4">
                  {getLocalizedContent(selectedProject.title)}
                </h3>

                <p className="text-charbon/80 leading-relaxed mb-6">
                  {getLocalizedContent(selectedProject.longDescription)}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-taupe uppercase mb-3">
                    {t('projects.technologies')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-beige/50 text-charbon rounded-lg text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Défis */}
                {selectedProject.challenges && (
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-taupe uppercase mb-3">
                      {t('projects.challenges')}
                    </h4>
                    <ul className="space-y-2">
                      {getLocalizedContent(selectedProject.challenges).map(
                        (challenge, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2 text-charbon/80"
                          >
                            <ChevronRight
                              size={16}
                              className="text-bordeaux mt-1 flex-shrink-0"
                            />
                            <span>{challenge}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Liens */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.liveUrl && (
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-bordeaux text-creme font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={18} />
                      <span>{t('projects.viewProject')}</span>
                    </motion.a>
                  )}

                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-charbon text-creme font-semibold rounded-xl hover:bg-charbon/90 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github size={18} />
                      <span>{t('projects.viewCode')}</span>
                    </motion.a>
                  )}

                  <motion.button
                    onClick={nextProject}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-beige/50 text-charbon font-semibold rounded-xl hover:bg-beige transition-colors ml-auto"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t('projects.nextProject')}</span>
                    <ChevronRight size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
