# 🌍 Portfolio Mounkang Souloukna

> **Géomaticien • Développeur SIG • Enseignant & formateur**

Un portfolio moderne et interactif présentant mon expertise en géomatique, développement SIG et formation professionnelle.

**Dépôt GitHub :** [github.com/souloukn/site](https://github.com/souloukn/site)

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fmounkangsouloukna.com%2F)](https://mounkangsouloukna.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## ✨ Fonctionnalités

### 🎨 Design Moderne
- **Interface utilisateur contemporaine** avec effets glassmorphism
- **Mode sombre/clair** avec persistance des préférences
- **Animations fluides** et micro-interactions
- **Curseur personnalisé** pour une expérience unique
- **Responsive design** optimisé pour tous les appareils

### 🚀 Technologies & Performance
- **HTML5 sémantique** pour l'accessibilité
- **CSS Grid & Flexbox** pour des layouts modernes
- **Vanilla JavaScript ES6+** sans frameworks lourds
- **Intersection Observer API** pour les animations au scroll
- **Optimisations performances** (lazy loading, debouncing)

### 📱 Expérience Utilisateur
- **Navigation fluide** avec indicateurs visuels
- **Formulaire de contact** avec validation en temps réel
- **Filtres de projets** animés
- **Barres de compétences** progressives
- **Compteurs animés** pour les statistiques

### 🔧 Fonctionnalités Avancées
- **Écran de chargement** personnalisé
- **Animations de frappe** pour les rôles
- **Effets parallax** subtils
- **Thème système** auto-détection
- **Toast notifications** pour les retours utilisateur

## 🗂️ Structure du Projet

```
site/
├── 📄 index.html              # Page principale
├── 📁 assets/
│   ├── 📁 css/
│   │   └── 📄 styles.css      # Styles principaux
│   ├── 📁 js/
│   │   └── 📄 script.js       # JavaScript principal
│   ├── 📁 images/
│   │   ├── 📄 profil.jpg      # Photo de profil
│   │   ├── 📄 favicon.ico     # Icône du site
│   │   ├── 📁 projects/       # Images des projets
│   │   └── 📁 products/       # Images des formations
│   └── 📁 documents/
│       └── 📄 cv.pdf          # CV téléchargeable
├── 📄 README.md               # Documentation
├── 📄 LICENSE                 # Licence MIT
└── 📄 .gitignore             # Fichiers ignorés par Git
```

## 🚀 Installation & Déploiement

### Installation Locale

1. **Cloner le repository**
   ```bash
   git clone https://github.com/souloukn/site.git
   cd site
   ```

2. **Ouvrir avec un serveur local**
   ```bash
   # Avec Python 3
   python -m http.server 8000
   
   # Avec Node.js (npx)
   npx serve .
   
   # Avec PHP
   php -S localhost:8000
   ```

3. **Accéder au site**
   Ouvrir `http://localhost:8000` dans votre navigateur

### Déploiement GitHub Pages

1. **Cloner le dépôt** [souloukn/site](https://github.com/souloukn/site) sur votre machine (ou utiliser ce repo comme source GitHub Pages).

2. **Activer GitHub Pages**
   - Aller dans Settings > Pages
   - Source: Deploy from a branch
   - Branch: main / (root)

3. **Personnaliser le contenu**
   - Modifier les informations personnelles dans `index.html`
   - Remplacer les images dans `/assets/images/`
   - Ajuster les couleurs dans `/assets/css/styles.css`

## ⚙️ Personnalisation

### 🎨 Couleurs et Thème

Modifier les variables CSS dans `styles.css` :

```css
:root {
  --primary-500: #3b82f6;    /* Couleur principale */
  --secondary-500: #06b6d4;  /* Couleur secondaire */
  --accent-500: #f59e0b;     /* Couleur d'accent */
  /* ... autres variables */
}
```

### 📝 Contenu

1. **Informations personnelles** : Modifier dans `index.html`
2. **Compétences** : Ajuster les pourcentages des barres
3. **Projets** : Ajouter/modifier dans la section projets
4. **Formations** : Personnaliser les liens Gumroad

### 📧 Formulaire de Contact

Configurer Formspree ou votre service préféré :

```html
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
  <!-- champs du formulaire -->
</form>
```

## 🔧 Configuration Avancée

### Analytics & Tracking

1. **Google Analytics 4**
   ```html
   <!-- Ajouter dans <head> -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Facebook Pixel**
   ```html
   <!-- Ajouter le code de suivi Facebook -->
   ```

### SEO & Meta Tags

Personnaliser les meta tags dans `<head>` :

```html
<meta property="og:title" content="Votre Nom - Géomaticien">
<meta property="og:description" content="Votre description">
<meta property="og:image" content="URL_de_votre_image">
<meta property="og:url" content="URL_de_votre_site">
```

## 📱 Responsive Design

Le portfolio est optimisé pour :
- 📱 **Mobile** : 320px - 768px
- 📱 **Tablet** : 768px - 1024px  
- 💻 **Desktop** : 1024px+
- 🖥️ **Large screens** : 1440px+

## ♿ Accessibilité

- ✅ **Sémantique HTML5** appropriée
- ✅ **Attributs ARIA** pour les éléments interactifs
- ✅ **Navigation au clavier** complète
- ✅ **Contrastes de couleurs** WCAG AA
- ✅ **Support screen readers**
- ✅ **Focus visible** pour la navigation

## 🌐 Compatibilité Navigateurs

| Navigateur | Version Minimale |
|------------|------------------|
| Chrome     | 90+              |
| Firefox    | 88+              |
| Safari     | 14+              |
| Edge       | 90+              |

## 📈 Performance

- ⚡ **Lighthouse Score** : 95+ (Performance, Accessibilité, SEO)
- 🔄 **Lazy Loading** pour les images
- 📦 **Code minifié** pour la production
- 🚀 **Service Worker** ready (PWA)

## 🛠️ Technologies Utilisées

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Animations** : AOS Library, CSS Animations
- **Icons** : Font Awesome 6
- **Fonts** : Google Fonts (Inter, JetBrains Mono)
- **Form Handling** : Formspree
- **Hosting** : [GitHub Pages](https://pages.github.com/) — domaine personnalisé : [mounkangsouloukna.com](https://mounkangsouloukna.com/) (fichier `CNAME` ; miroir technique possible sur `souloukn.github.io/site`).

## 📝 Roadmap

- [ ] 🌐 Version multilingue (EN/FR)
- [ ] 📊 Dashboard analytics personnalisé
- [ ] 🎯 Intégration CMS headless
- [ ] 📱 Application mobile PWA
- [ ] 🤖 Chatbot AI intégré
- [ ] 🔍 Recherche avancée de contenu

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir `LICENSE` pour plus de détails.

## 📞 Contact

**Mounkang Souloukna**
- 📧 Email : [mounkangsouloukna@gmail.com](mailto:mounkangsouloukna@gmail.com)
- 💼 LinkedIn : [mounkang-souloukna](https://www.linkedin.com/in/mounkang-souloukna/)
- 🌐 Site : [mounkangsouloukna.com](https://mounkangsouloukna.com/)
- 💻 Code : [github.com/souloukn/site](https://github.com/souloukn/site)
- 📱 WhatsApp : [+235 68275851](https://wa.me/23568275851)

---

## 🙏 Remerciements

- [AOS Library](https://michalsnik.github.io/aos/) pour les animations au scroll
- [Font Awesome](https://fontawesome.com/) pour les icônes
- [Google Fonts](https://fonts.google.com/) pour les polices
- [Formspree](https://formspree.io/) pour la gestion des formulaires
- [Gumroad](https://gumroad.com/) pour la vente de formations

---

<div align="center">
  <strong>⭐ Si ce projet vous aide, n'hésitez pas à lui donner une étoile ! ⭐</strong>
</div>