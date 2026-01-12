/**
 * Composant AnimatedBackground
 * Fond subtil avec animations CSS pures (GPU-accelerated)
 * Pas de JavaScript, pas de Framer Motion = performances optimales
 */
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Gradient de base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blanc via-light-gray/20 to-blanc" />

      {/* Formes flottantes avec animations CSS pures */}
      <div className="absolute inset-0">
        {/* Grande forme rose - animation CSS */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-float-1"
          style={{
            background: 'radial-gradient(circle, rgba(226, 60, 100, 0.04) 0%, transparent 70%)',
            top: '5%',
            right: '-5%',
          }}
        />

        {/* Forme jaune - animation CSS */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-float-2"
          style={{
            background: 'radial-gradient(circle, rgba(255, 212, 100, 0.05) 0%, transparent 70%)',
            bottom: '10%',
            left: '-3%',
          }}
        />

        {/* Forme corail centrale - animation CSS */}
        <div
          className="absolute w-[350px] h-[350px] rounded-full bg-float-3"
          style={{
            background: 'radial-gradient(circle, rgba(255, 94, 94, 0.04) 0%, transparent 70%)',
            top: '40%',
            left: '45%',
          }}
        />
      </div>

      {/* Grille subtile statique */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26, 26, 26, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 26, 26, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}

export default AnimatedBackground;
