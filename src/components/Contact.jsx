import { useState } from 'react';
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
 * Sans Framer Motion - CSS uniquement
 */
function Contact() {
  const { t, getLocalizedContent } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  // Clé d'accès Web3Forms - Remplacez par votre propre clé
  const WEB3FORMS_ACCESS_KEY = '84cb5464-58de-420c-8cfd-5fa0fd00163e';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(t('contact.form.error') || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch {
      setError(t('contact.form.error') || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

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

  const socialLinks = [
    { icon: Github, href: profile.social.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: profile.social.twitter, label: 'Twitter' },
  ];

  return (
    <section
      id="contact"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray mb-6">{t('contact.subtitle')}</p>
          <div className="w-24 h-1 bg-corail mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Colonne gauche - Formulaire */}
          <div>
            <div className="bg-blanc/90 backdrop-blur-sm rounded-3xl border border-light-gray/20 p-4 sm:p-6 md:p-8 shadow-glass">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-corail/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-corail" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">
                    {t('contact.form.success')}
                  </h3>
                  <p className="text-gray">{t('contact.form.successDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nom */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-dark mb-2">
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
                      className={`w-full px-4 py-3.5 bg-light-gray/30 border-2 rounded-xl outline-none transition-all duration-200 ${
                        focusedField === 'name'
                          ? 'border-corail bg-blanc'
                          : 'border-transparent hover:border-light-gray/30'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-dark mb-2">
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
                      className={`w-full px-4 py-3.5 bg-light-gray/30 border-2 rounded-xl outline-none transition-all duration-200 ${
                        focusedField === 'email'
                          ? 'border-corail bg-blanc'
                          : 'border-transparent hover:border-light-gray/30'
                      }`}
                    />
                  </div>

                  {/* Sujet */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-dark mb-2">
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
                      className={`w-full px-4 py-3.5 bg-light-gray/30 border-2 rounded-xl outline-none transition-all duration-200 ${
                        focusedField === 'subject'
                          ? 'border-corail bg-blanc'
                          : 'border-transparent hover:border-light-gray/30'
                      }`}
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-dark mb-2">
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
                      className={`w-full px-4 py-3.5 bg-light-gray/30 border-2 rounded-xl outline-none transition-all duration-200 resize-none ${
                        focusedField === 'message'
                          ? 'border-corail bg-blanc'
                          : 'border-transparent hover:border-light-gray/30'
                      }`}
                    />
                  </div>

                  {/* Message d'erreur */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Bouton d'envoi */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full flex items-center justify-center space-x-2 px-6 py-4 bg-rose text-blanc font-semibold rounded-xl overflow-hidden shadow-glow transition-all duration-200 ${
                      isLoading
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:shadow-glow-lg hover:scale-[1.01] active:scale-[0.99]'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{t('contact.form.sending') || 'Envoi en cours...'}</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>{t('contact.form.send')}</span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Colonne droite - Informations */}
          <div className="space-y-4">
            {/* Informations de contact */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 sm:space-x-4 md:space-x-5 p-4 sm:p-5 bg-blanc/80 backdrop-blur-sm rounded-xl border border-light-gray/20 shadow-glass hover:border-corail/20 hover:translate-x-1 transition-all duration-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-corail/10 flex-shrink-0">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-corail" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-dark font-medium hover:text-corail transition-colors break-words text-sm sm:text-base"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className={`font-medium break-words text-sm sm:text-base ${item.highlight ? 'text-corail' : 'text-dark'}`}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="bg-blanc/80 backdrop-blur-sm rounded-xl border border-light-gray/20 p-4 sm:p-5 md:p-6 shadow-glass">
              <h3 className="text-base sm:text-lg font-semibold text-dark mb-4 sm:mb-5">
                Réseaux sociaux
              </h3>
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 md:p-3.5 bg-light-gray/50 rounded-xl text-dark hover:text-corail hover:bg-corail/10 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Final */}
            <div className="relative p-5 sm:p-6 md:p-8 bg-gradient-to-br from-rose to-dark rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-200">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-blanc mb-3 sm:mb-4">
                  {t('contact.cta')}
                </h3>
                <p className="text-blanc/80 mb-4 sm:mb-6 text-sm sm:text-base">{t('contact.subtitle')}</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blanc text-dark font-semibold rounded-xl hover:bg-light-gray transition-colors text-sm sm:text-base break-all"
                >
                  <Mail size={18} className="flex-shrink-0" />
                  <span className="break-all">{profile.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
