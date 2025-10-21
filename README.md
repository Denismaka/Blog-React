# Blog-React — Projet d'apprentissage React + Vite

<!-- Badges -->

![Node.js](https://img.shields.io/badge/node-%3E%3D16-brightgreen)
![Vite](https://img.shields.io/badge/vite-%5E4.4-blue)
![React](https://img.shields.io/badge/react-18.x-61DAFB)

Ce dépôt contient une petite application de blog réalisée pour l'apprentissage de React et de l'écosystème moderne (Vite, Tailwind, hooks personnalisés). 🎓

## Table des matières 🧭

-   [Fonctionnalités principales](#fonctionnalites-principales-)
-   [Prérequis](#prérequis)
-   [Installation](#installation)
-   [Scripts utiles](#scripts-utiles)
-   [Structure du projet](#structure-du-projet)
-   [Dépendances clés](#dependances-clés)
-   [Illustrations & icônes](#illustrations--icônes-)
-   [Notes d'apprentissage / recommandations](#notes-dapprentissage--recommandations)
-   [Comment contribuer / expérimenter](#comment-contribuer--experimenter)
-   [Contact](#-contact)

L'objectif principal est pédagogique : explorer la création de composants réutilisables, l'utilisation de hooks personnalisés, la navigation basée sur le hash, et la consommation d'API externes (JSONPlaceholder).

Cette application n'est pas destinée à la production sans adaptations (sécurité, tests, gestion d'API réelle, accessibilité, optimisation). Elle sert de terrain d'entraînement.

## Fonctionnalités principales

-   Navigation simple basée sur le hash (home, contact, post:id).
-   Liste de posts récupérée depuis https://jsonplaceholder.typicode.com.
-   Affichage d'un post unique, édition locale (dans l'état) via une modal.
-   Composants réutilisables : Header, Card, Button, Modal, Spinner, Alert.
-   Hooks personnalisés : useFetch, useDocumentTitle, useHashNavigation, useToggle, etc.
-   Configuration Vite + plugin React et TailwindCSS (présence des dépendances).

Petits icônes associés :

-   🏠 Home
-   ✉️ Contact
-   📝 Post
-   ⚙️ Hooks
-   🧩 Composants

## Prérequis

-   Node.js (version 16+ recommandée)
-   npm ou yarn

## Installation

Ouvrez un terminal dans la racine du projet puis :

```powershell
npm install
```

ou avec yarn :

```powershell
yarn
```

## Scripts utiles

-   `npm run dev` — lance le serveur de développement Vite (HMR)
-   `npm run build` — construit l'application pour la production
-   `npm run preview` — prévisualise le build produit
-   `npm run lint` — lance ESLint sur le projet

Exemples (PowerShell) :

```powershell
npm run dev
# ou
yarn dev
```

## Structure du projet

Quelques fichiers et dossiers importants :

-   `index.html` — point d'entrée HTML
-   `src/main.jsx` — point d'entrée React
-   `src/App.jsx` — routeur/hash navigation et structure principale
-   `src/components/` — composants réutilisables (Header, Card, Button, Modal, Spinner, Alert...)
-   `src/hooks/` — hooks personnalisés (useFetch, useHashNavigation, useDocumentTitle...)
-   `src/pages/` — pages (Home, Contact, Single, NotFound)
-   `vite.config.js`, `postcss.config.cjs`, `tailwind.config.cjs` — configuration de build et CSS

## Dépendances clés

## Illustrations & icônes 🖼️

Pour améliorer la présentation visuelle, vous pouvez :

-   Ajouter des images/screenshot dans un dossier `public/screenshots/` et les référencer dans le README avec Markdown :

```markdown
![Exemple d'écran](public/screenshots/screenshot-1.png)
```

-   Ajouter un favicon ou une icône dans `index.html` :

```html
<link rel="icon" href="/favicon.ico" />
```

-   Utiliser une bibliothèque d'icônes (ex. Heroicons, Font Awesome) ou insérer de petits SVG inline directement dans vos composants React.

Exemple simple d'icône SVG inline dans un composant :

```jsx
export function IconUser() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="12"
                cy="8"
                r="3"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}
```

Vous pouvez aussi utiliser des badges (shields) comme en tête du README pour afficher la version de Node, l'état du build, etc.

-   `react`, `react-dom` — bibliothèque UI
-   `vite` — bundler / dev server moderne
-   `@vitejs/plugin-react` — plugin React pour Vite
-   `tailwindcss`, `postcss`, `autoprefixer` — utilitaires CSS (présence dans package.json)
-   `react-error-boundary` — gestion simple des erreurs au niveau d'UI

## Notes d'apprentissage / recommandations

-   Le routage est volontairement minimal (hash-based). Pour un vrai projet, envisagez React Router.
-   `useFetch` est simple : il fait un fetch direct et expose loading/data/error. Pour des besoins avancés considérez SWR ou React Query.
-   Les appels à JSONPlaceholder sont utilisés comme données fictives. Remplacez par votre API pour production.
-   Ajouter des tests unitaires (Jest + React Testing Library) améliorerait la robustesse.

## Comment contribuer / expérimenter

-   Modifier ou ajouter des composants dans `src/components`.
-   Ajouter des hooks dans `src/hooks` pour encapsuler la logique réutilisable.
-   Remplacer les appels à `jsonplaceholder.typicode.com` par une API locale ou mock pour expérimenter le CRUD complet.

## Licence

Ce projet est pour l'apprentissage — adaptez la licence selon vos besoins.

---

Si vous voulez, je peux :

-   Ajouter une section « How to deploy » (Netlify / Vercel / Surge).
-   Mettre en place une CI minimale (lint + build) via GitHub Actions.
-   Ajouter des tests unitaires de base pour `useFetch` et le composant `Card`.

---

### Remarques rapides

-   Si vous souhaitez que j'ajoute des icônes précises (SVG ou bibliothèque) ou que j'intègre un screenshot réel, fournissez les fichiers image ou dites-moi quelle bibliothèque d'icônes privilégier.
-   Si vous voulez que je masque ou remplace vos coordonnées de contact, dites-le et je mettrai un placeholder à la place.

## 📬 Contact

Pour toute question, collaboration ou devis :

-   **Email** : makadenis370@gmail.com
-   **Téléphone** : +243 818 252 385 / +243 997 435 030
-   **Réseaux sociaux** :
    -   [Twitter](https://twitter.com/MakaDenis3)
    -   [LinkedIn](https://www.linkedin.com/in/Denismaka)
    -   [GitHub](https://github.com/Denismaka)
    -   [Facebook](https://www.facebook.com/Denismaka)

> Pour modifier vos coordonnées : éditez simplement cette section dans `README.md`. Si vous préférez, je peux remplacer vos coordonnées par des placeholders ou ajouter un fichier `CONTACT.md` séparé pour garder le README plus générique.

---

Merci pour votre visite et votre intérêt ! ✨
