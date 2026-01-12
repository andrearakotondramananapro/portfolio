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
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
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
      className="relative py-24 md:py-40 bg-gradient-to-b from-blanc to-light-gray/30 overflow-hidden"
    >
      {/* Décorations de fond */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-corail/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gray/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 sm:px-8 lg:px-12 3xl:px-16">
        {/* Titre de section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray mb-6">{t('contact.subtitle')}</p>
          <div className="w-24 h-1 bg-corail mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Colonne gauche - Formulaire */}
          <div>
            <div className="bg-blanc/90 backdrop-blur-sm rounded-3xl border border-light-gray/20 p-8 shadow-glass">
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
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  {/* Bouton d'envoi */}
                  <button
                    type="submit"
                    className="group relative w-full flex items-center justify-center space-x-2 px-6 py-4 bg-rose text-blanc font-semibold rounded-xl overflow-hidden shadow-glow hover:shadow-glow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                  >
                    <Send size={20} />
                    <span>{t('contact.form.send')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Colonne droite - Informations */}
          <div className="space-y-10">
            {/* Informations de contact */}
            <div className="space-y-5">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-5 p-5 bg-blanc/80 backdrop-blur-sm rounded-xl border border-light-gray/20 shadow-glass hover:border-corail/20 hover:translate-x-1 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-corail/10">
                    <item.icon className="w-5 h-5 text-corail" />
                  </div>
                  <div>
                    <p className="text-sm text-gray">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-dark font-medium hover:text-corail transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className={`font-medium ${item.highlight ? 'text-corail' : 'text-dark'}`}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="bg-blanc/80 backdrop-blur-sm rounded-xl border border-light-gray/20 p-6 shadow-glass">
              <h3 className="text-lg font-semibold text-dark mb-5">
                Réseaux sociaux
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-light-gray/50 rounded-xl text-dark hover:text-corail hover:bg-corail/10 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Final */}
            <div className="relative p-8 bg-gradient-to-br from-rose to-dark rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-blanc mb-4">
                  {t('contact.cta')}
                </h3>
                <p className="text-blanc/80 mb-6">{t('contact.subtitle')}</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blanc text-dark font-semibold rounded-xl hover:bg-light-gray transition-colors"
                >
                  <Mail size={18} />
                  <span>{profile.email}</span>
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
