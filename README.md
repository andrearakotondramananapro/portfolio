# Portfolio Développeur Full-Stack

Portfolio moderne et professionnel construit avec React 19, Tailwind CSS v4 et Framer Motion. Design glassmorphism avec animations fluides et support multilingue (FR/EN/MG).

## Fonctionnalités

- Design glassmorphism moderne (tendances 2026)
- Animations fluides avec Framer Motion
- Support multilingue (Français, Anglais, Malagasy)
- Détection automatique de la langue du navigateur
- Filtres de projets dynamiques
- Timeline interactive pour le parcours scolaire
- Formulaire de contact avec validation
- SEO optimisé avec meta tags Open Graph
- Responsive design (mobile, tablet, desktop)
- Accessibilité (focus visible, contraste, alt texts)
- Easter egg console pour les développeurs curieux

## Installation

```bash
# Cloner le projet
git clone https://github.com/andrearakotondramananapro/portfolio.git
cd portfolio

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## Structure du Projet

```
src/
├── components/          # Composants React
│   ├── Navigation.jsx   # Barre de navigation sticky
│   ├── Hero.jsx         # Section d'accueil
│   ├── About.jsx        # Section À propos
│   ├── Education.jsx    # Timeline formation
│   ├── Certifications.jsx
│   ├── Skills.jsx       # Grille bento des compétences
│   ├── Projects.jsx     # Portfolio avec filtres
│   ├── Contact.jsx      # Formulaire de contact
│   ├── Footer.jsx
│   └── LanguageSwitch.jsx
├── data/                # Données JSON
│   ├── translations.json # Traductions i18n
│   ├── profile.json     # Infos personnelles
│   ├── education.json   # Parcours scolaire
│   ├── certifications.json
│   ├── skills.json      # Compétences par catégorie
│   └── projects.json    # Liste des projets
├── hooks/
│   └── useLanguage.jsx  # Hook i18n avec détection auto
├── App.jsx
├── main.jsx
└── index.css            # Styles Tailwind + custom
```

## Personnalisation

### Modifier les informations personnelles
Éditez le fichier `src/data/profile.json` :
```json
{
  "name": "Votre Nom",
  "email": "votre@email.com",
  "social": {
    "github": "https://github.com/...",
    "linkedin": "https://linkedin.com/in/..."
  }
}
```

### Ajouter un projet
Ajoutez un objet dans `src/data/projects.json` :
```json
{
  "id": 7,
  "title": { "fr": "...", "en": "...", "mg": "..." },
  "description": { "fr": "...", "en": "...", "mg": "..." },
  "technologies": ["React", "Node.js"],
  "category": "fullstack",
  "liveUrl": "https://...",
  "githubUrl": "https://github.com/..."
}
```

### Modifier les couleurs
Les couleurs sont définies dans `src/index.css` sous `@theme` :
- `--color-charbon`: #322d29 (texte principal)
- `--color-bordeaux`: #72383d (accent/CTA)
- `--color-taupe`: #ac9c8d (secondaire)
- `--color-beige`: #d1c7bd (fond léger)
- `--color-gris`: #d9d9d9 (séparateurs)
- `--color-creme`: #efe9e1 (fond principal)

## Déploiement

### Vercel (recommandé)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Déployer le dossier dist/
```

### GitHub Pages
```bash
npm run build
# Configurer le déploiement depuis la branche gh-pages
```

## Stack Technique

- **React 19** - Framework UI
- **Vite 7** - Build tool rapide
- **Tailwind CSS v4** - Styles utilitaires
- **Framer Motion** - Animations
- **Lucide React** - Icônes
- **React Intersection Observer** - Animations au scroll

## License

MIT
