import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import profile from '../data/profile.json';

/**
 * Section Contact
 * Formulaire de contact statique avec informations personnelles
 */
function Contact() {
  const { t, getLocalizedContent } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // État du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission simulée du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation d'envoi
    setIsSubmitted(true);
    // Reset après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Informations de contact
  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: `${profile.location.city}, ${getLocalizedContent(profile.location.country)}`,
    },
    {
      icon: Clock,
      label: t('contact.info.availability'),
      value: t('contact.info.availableNow'),
      highlight: true,
    },
  ];

  // Réseaux sociaux
  const socialLinks = [
    { icon: Github, href: profile.social.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: profile.social.twitter, label: 'Twitter' },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-gradient-to-b from-creme to-beige/30 overflow-hidden"
    >
      {/* Décorations de fond */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-bordeaux/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-taupe/10 rounded-full blur-3xl" />

      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Titre de section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charbon mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-taupe mb-4">{t('contact.subtitle')}</p>
          <div className="w-24 h-1 bg-bordeaux mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Colonne gauche - Formulaire */}
          <motion.div variants={itemVariants}>
            <div className="bg-creme/90 backdrop-blur-sm rounded-3xl border border-gris/20 p-8 shadow-glass">
              {isSubmitted ? (
                // Message de succès
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-charbon mb-2">
                    {t('contact.form.success')}
                  </h3>
                  <p className="text-taupe">{t('contact.form.successDesc')}</p>
                </motion.div>
              ) : (
                // Formulaire
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-charbon mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 bg-beige/30 border-2 rounded-xl outline-none transition-all ${
                        focusedField === 'name'
                          ? 'border-bordeaux bg-creme'
                          : 'border-transparent hover:border-gris/30'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-charbon mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 bg-beige/30 border-2 rounded-xl outline-none transition-all ${
                        focusedField === 'email'
                          ? 'border-bordeaux bg-creme'
                          : 'border-transparent hover:border-gris/30'
                      }`}
                    />
                  </div>

                  {/* Sujet */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-charbon mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 bg-beige/30 border-2 rounded-xl outline-none transition-all ${
                        focusedField === 'subject'
                          ? 'border-bordeaux bg-creme'
                          : 'border-transparent hover:border-gris/30'
                      }`}
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-charbon mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 bg-beige/30 border-2 rounded-xl outline-none transition-all resize-none ${
                        focusedField === 'message'
                          ? 'border-bordeaux bg-creme'
                          : 'border-transparent hover:border-gris/30'
                      }`}
                    />
                  </div>

                  {/* Bouton d'envoi */}
                  <motion.button
                    type="submit"
                    className="group relative w-full flex items-center justify-center space-x-2 px-6 py-4 bg-bordeaux text-creme font-semibold rounded-xl overflow-hidden shadow-glow hover:shadow-glow-lg transition-all"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Send size={20} />
                    <span>{t('contact.form.send')}</span>

                    {/* Effet de brillance */}
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Colonne droite - Informations */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Informations de contact */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-creme/80 backdrop-blur-sm rounded-xl border border-gris/20 shadow-glass"
                  whileHover={{ x: 4 }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.highlight ? 'bg-green-100' : 'bg-bordeaux/10'
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        item.highlight ? 'text-green-600' : 'text-bordeaux'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-taupe">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-charbon font-medium hover:text-bordeaux transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        className={`font-medium ${
                          item.highlight ? 'text-green-600' : 'text-charbon'
                        }`}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="bg-creme/80 backdrop-blur-sm rounded-xl border border-gris/20 p-6 shadow-glass">
              <h3 className="text-lg font-semibold text-charbon mb-4">
                Réseaux sociaux
              </h3>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-beige/50 rounded-xl text-charbon hover:text-bordeaux hover:bg-beige transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={22} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA Final */}
            <motion.div
              className="relative p-8 bg-gradient-to-br from-bordeaux to-charbon rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* Décoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-creme mb-4">
                  {t('contact.cta')}
                </h3>
                <p className="text-creme/80 mb-6">
                  {t('contact.subtitle')}
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-creme text-charbon font-semibold rounded-xl hover:bg-beige transition-colors"
                >
                  <Mail size={18} />
                  <span>{profile.email}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
