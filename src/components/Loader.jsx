import { useEffect, useState } from 'react';

/**
 * Composant Loader
 * Animation douce et féminine avec fade élégant
 */
function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading, complete, fading

  useEffect(() => {
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setPhase('complete');
        // Petit délai avant le fade
        setTimeout(() => setPhase('fading'), 300);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (phase === 'fading') {
      const timer = setTimeout(onLoadingComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all ease-out ${
        phase === 'fading'
          ? 'opacity-0 duration-1000'
          : 'opacity-100 duration-300'
      }`}
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(255, 212, 100, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(226, 60, 100, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 40% 80%, rgba(255, 94, 94, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 70%, rgba(107, 114, 128, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #f9f9f9 100%)
        `,
      }}
    >
      {/* Cercles décoratifs identiques au background principal */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grande forme rose - haut droite */}
        <div
          className={`absolute top-[5%] right-[-8%] w-[600px] h-[600px] rounded-full transition-all duration-1000 ${
            phase === 'fading' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(226, 60, 100, 0.08) 0%, rgba(226, 60, 100, 0.03) 40%, transparent 70%)',
          }}
        />

        {/* Forme jaune - bas gauche */}
        <div
          className={`absolute bottom-[8%] left-[-5%] w-[500px] h-[500px] rounded-full transition-all duration-1000 delay-100 ${
            phase === 'fading' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(255, 212, 100, 0.1) 0%, rgba(255, 212, 100, 0.04) 40%, transparent 70%)',
          }}
        />

        {/* Forme corail centrale */}
        <div
          className={`absolute top-[35%] left-[50%] w-[450px] h-[450px] rounded-full transition-all duration-1000 delay-200 ${
            phase === 'fading' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(255, 94, 94, 0.07) 0%, rgba(255, 94, 94, 0.02) 40%, transparent 70%)',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Forme grise - pour le contraste */}
        <div
          className={`absolute top-[60%] right-[15%] w-[380px] h-[380px] rounded-full transition-all duration-1000 delay-300 ${
            phase === 'fading' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(107, 114, 128, 0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Contenu central */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-700 ${
          phase === 'fading' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Logo élégant */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl md:text-5xl font-mono font-light text-corail/80">{'<'}</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-display font-medium text-dark tracking-wide">
                Portfolio
              </span>
              <span className="text-xs text-gray/60 tracking-[0.3em] uppercase mt-1">
                Bienvenue
              </span>
            </div>
            <span className="text-4xl md:text-5xl font-mono font-light text-corail/80">{'/>'}</span>
          </div>
        </div>

        {/* Barre de progression fine et élégante */}
        <div className="w-64 md:w-80">
          <div className="h-[2px] bg-gray/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #ffd464 0%, #e23c64 50%, #b0183d 100%)',
              }}
            />
          </div>

          {/* Pourcentage élégant */}
          <div className="flex justify-center mt-6">
            <span
              className={`text-sm font-light tracking-widest transition-all duration-500 ${
                phase === 'complete' ? 'text-corail' : 'text-gray/70'
              }`}
            >
              {`${Math.round(progress)}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Bordure décorative en bas */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-1000 ${
          phase === 'fading' ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #e23c6440 50%, transparent 100%)',
        }}
      />
    </div>
  );
}

export default Loader;
