/**
 * Composant AnimatedBackground
 * Fond unifié avec dégradé non linéaire et motif tech subtil
 * Animations CSS pures (GPU-accelerated) pour performances optimales
 */
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dégradé de base non linéaire - plus de contraste */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(255, 212, 100, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(226, 60, 100, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(255, 94, 94, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 70%, rgba(107, 114, 128, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #f9f9f9 100%)
          `
        }}
      />

      {/* Formes flottantes avec animations CSS pures - plus visibles */}
      <div className="absolute inset-0">
        {/* Grande forme rose - haut droite */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-float-1"
          style={{
            background: 'radial-gradient(circle, rgba(226, 60, 100, 0.08) 0%, rgba(226, 60, 100, 0.03) 40%, transparent 70%)',
            top: '5%',
            right: '-8%',
          }}
        />

        {/* Forme jaune - bas gauche */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-float-2"
          style={{
            background: 'radial-gradient(circle, rgba(255, 212, 100, 0.1) 0%, rgba(255, 212, 100, 0.04) 40%, transparent 70%)',
            bottom: '8%',
            left: '-5%',
          }}
        />

        {/* Forme corail centrale */}
        <div
          className="absolute w-[450px] h-[450px] rounded-full bg-float-3"
          style={{
            background: 'radial-gradient(circle, rgba(255, 94, 94, 0.07) 0%, rgba(255, 94, 94, 0.02) 40%, transparent 70%)',
            top: '35%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Forme grise - pour le contraste */}
        <div
          className="absolute w-[380px] h-[380px] rounded-full bg-float-1"
          style={{
            background: 'radial-gradient(circle, rgba(107, 114, 128, 0.06) 0%, transparent 70%)',
            top: '60%',
            right: '15%',
          }}
        />
      </div>

      {/* Grille tech avec effet de code - plus visible */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26, 26, 26, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 26, 26, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Pattern de circuit/code subtil */}
      <div className="absolute inset-0 opacity-[0.025]">
        {/* Lignes de "circuit" horizontales */}
        <div
          className="absolute top-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose/40 to-transparent"
          style={{ animation: 'slideRight 20s linear infinite' }}
        />
        <div
          className="absolute top-[45%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-corail/40 to-transparent"
          style={{ animation: 'slideLeft 25s linear infinite' }}
        />
        <div
          className="absolute top-[75%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-jaune/40 to-transparent"
          style={{ animation: 'slideRight 30s linear infinite' }}
        />

        {/* Lignes verticales */}
        <div
          className="absolute top-0 bottom-0 left-[25%] w-[1px] bg-gradient-to-b from-transparent via-rose/30 to-transparent"
          style={{ animation: 'slideDown 22s linear infinite' }}
        />
        <div
          className="absolute top-0 bottom-0 left-[60%] w-[1px] bg-gradient-to-b from-transparent via-corail/30 to-transparent"
          style={{ animation: 'slideUp 28s linear infinite' }}
        />
      </div>

      {/* Points de connexion (nœuds de circuit) */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute w-1.5 h-1.5 bg-rose rounded-full"
          style={{
            top: '20%',
            left: '15%',
            animation: 'pulse 3s ease-in-out infinite',
            boxShadow: '0 0 10px rgba(226, 60, 100, 0.5)'
          }}
        />
        <div
          className="absolute w-1.5 h-1.5 bg-corail rounded-full"
          style={{
            top: '55%',
            right: '20%',
            animation: 'pulse 4s ease-in-out infinite',
            animationDelay: '1s',
            boxShadow: '0 0 10px rgba(255, 94, 94, 0.5)'
          }}
        />
        <div
          className="absolute w-1.5 h-1.5 bg-jaune rounded-full"
          style={{
            bottom: '25%',
            left: '70%',
            animation: 'pulse 3.5s ease-in-out infinite',
            animationDelay: '2s',
            boxShadow: '0 0 10px rgba(255, 212, 100, 0.5)'
          }}
        />
      </div>

      {/* Overlay pour adoucir le tout */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255, 255, 255, 0.3) 100%)'
        }}
      />

      {/* Animations CSS personnalisées */}
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slideLeft {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes slideUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}

export default AnimatedBackground;
