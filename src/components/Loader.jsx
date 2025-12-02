import { useEffect, useState } from 'react';

/**
 * Composant Loader
 * Animation de chargement avec CSS pur - zéro Framer Motion
 */
function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Progression fluide avec requestAnimationFrame
    const duration = 1800; // 1.8 secondes
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        // Démarrer l'animation de sortie
        setTimeout(() => {
          setIsExiting(true);
          // Attendre la fin de l'animation de sortie
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
        }, 100);
      }
    };

    requestAnimationFrame(animate);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-creme transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Fond subtil statique */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sauge/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-bordeaux/5 rounded-full blur-3xl" />
      </div>

      {/* Contenu du loader */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-500 ease-out ${
          isExiting ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Logo - Brackets de code */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-5xl md:text-6xl font-mono font-bold text-sauge">
            {'<'}
          </span>
          <span className="text-3xl md:text-4xl font-display font-bold text-charbon">
            Portfolio
          </span>
          <span className="text-5xl md:text-6xl font-mono font-bold text-sauge">
            {'/>'}
          </span>
        </div>

        {/* Barre de progression CSS */}
        <div className="w-48 md:w-64 h-1.5 bg-gris/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #5B7B5B 0%, #72383d 50%, #5B7B5B 100%)',
            }}
          />
        </div>

        {/* Texte de chargement */}
        <p className="mt-5 text-sm text-taupe font-mono tracking-wider">
          Chargement...
        </p>
      </div>
    </div>
  );
}

export default Loader;
