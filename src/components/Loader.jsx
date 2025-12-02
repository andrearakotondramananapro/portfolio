import { motion } from 'framer-motion';

/**
 * Composant Loader
 * Animation de chargement élégante avec le thème du portfolio
 */
function Loader({ onLoadingComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-creme"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Fond avec motif subtil */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sauge/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-bordeaux/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Contenu du loader */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo animé - Brackets de code */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Bracket gauche */}
          <motion.span
            className="text-5xl md:text-6xl font-mono font-bold text-sauge"
            animate={{ x: [-5, 0, -5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {'<'}
          </motion.span>

          {/* Texte central */}
          <motion.div
            className="flex items-center"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-3xl md:text-4xl font-display font-bold text-charbon">
              Portfolio
            </span>
          </motion.div>

          {/* Bracket droit avec slash */}
          <motion.span
            className="text-5xl md:text-6xl font-mono font-bold text-sauge"
            animate={{ x: [5, 0, 5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {'/>'}
          </motion.span>
        </motion.div>

        {/* Barre de progression */}
        <div className="w-48 md:w-64 h-1 bg-gris/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sauge via-bordeaux to-sauge rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            onAnimationComplete={onLoadingComplete}
          />
        </div>

        {/* Texte de chargement */}
        <motion.p
          className="mt-4 text-sm text-taupe font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Chargement en cours...
          </motion.span>
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Loader;
