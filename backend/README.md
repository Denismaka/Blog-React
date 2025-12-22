# Backend - Blog React API

## 📚 Guide Complet d'Installation et d'Utilisation

Ce guide explique **en détail** comment installer et utiliser le backend de votre blog React.

---

## 🎯 Qu'est-ce que ce Backend ?

Le backend est la **partie serveur** de votre application. Il gère :

-   ✅ La base de données (stockage des articles, utilisateurs)
-   ✅ L'authentification (connexion, inscription)
-   ✅ Les API (endpoints pour récupérer/créer/modifier les données)
-   ✅ La sécurité (validation, protection)

**Analogie simple** : Si le front-end est la vitrine d'un magasin, le backend est l'entrepôt et la caisse.

---

## 📦 Technologies Utilisées

### 1. **Node.js** - Runtime JavaScript

-   **C'est quoi ?** : Permet d'exécuter JavaScript côté serveur (pas seulement dans le navigateur)
-   **Pourquoi ?** : Même langage que React (cohérence)
-   **Installation** : Télécharger depuis [nodejs.org](https://nodejs.org) (version LTS recommandée)

### 2. **Express.js** - Framework Web

-   **C'est quoi ?** : Framework pour créer des APIs REST facilement
-   **Pourquoi ?** : Simple, rapide, très utilisé
-   **Fonction** : Gère les routes, les requêtes HTTP (GET, POST, PUT, DELETE)

### 3. **PostgreSQL** - Base de Données

-   **C'est quoi ?** : Système de gestion de base de données relationnelle
-   **Pourquoi ?** : Robuste, fiable, gratuit, très performant
-   **Alternative** : MySQL (si vous préférez avec Laragon)

### 4. **Prisma** - ORM (Object-Relational Mapping)

-   **C'est quoi ?** : Outil qui facilite l'interaction avec la base de données
-   **Pourquoi ?** : Évite d'écrire du SQL brut, type-safe, migrations automatiques
-   **Fonction** : Convertit vos objets JavaScript en requêtes SQL

### 5. **JWT** - Authentification

-   **C'est quoi ?** : JSON Web Token, système d'authentification sans session
-   **Pourquoi ?** : Stateless, scalable, moderne
-   **Fonction** : Génère des tokens pour identifier les utilisateurs

---

## 🚀 Installation Étape par Étape

### Étape 1 : Installer Node.js

1. **Télécharger Node.js** :

    - Aller sur [nodejs.org](https://nodejs.org)
    - Télécharger la version **LTS** (Long Term Support)
    - Installer avec les options par défaut

2. **Vérifier l'installation** :

    ```bash
    node --version
    npm --version
    ```

    Vous devriez voir des numéros de version (ex: v20.10.0)

3. **Explication** :
    - `node` : Exécute JavaScript côté serveur
    - `npm` : Gestionnaire de paquets (installe des bibliothèques)

---

### Étape 2 : Installer PostgreSQL

#### Option A : Avec Laragon (Recommandé si vous utilisez déjà Laragon)

1. **Ouvrir Laragon**
2. **Menu** → **Tools** → **Quick add** → **PostgreSQL**
3. Laragon installe et configure automatiquement

#### Option B : Installation Manuelle

1. **Télécharger PostgreSQL** :

    - Aller sur [postgresql.org/download](https://www.postgresql.org/download/)
    - Télécharger pour Windows
    - Installer avec les options par défaut
    - **Important** : Noter le mot de passe du superutilisateur (postgres)

2. **Vérifier l'installation** :

    - Ouvrir **pgAdmin** (interface graphique)
    - Ou utiliser la ligne de commande

3. **Créer une base de données** :
    ```sql
    CREATE DATABASE blog_react;
    ```

---

### Étape 3 : Installer les Dépendances du Backend

1. **Ouvrir un terminal** dans le dossier `backend/`

2. **Installer toutes les dépendances** :

    ```bash
    npm install
    ```

3. **Explication** :
    - `npm install` lit le fichier `package.json`
    - Télécharge toutes les bibliothèques nécessaires
    - Les installe dans `node_modules/`

---

### Étape 4 : Configurer l'Environnement

1. **Créer le fichier `.env`** (copier depuis `.env.example`)

2. **Remplir les variables** :

    ```env
    # Port du serveur
    PORT=5000

    # Base de données PostgreSQL
    DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/blog_react"

    # JWT Secret (générer une chaîne aléatoire)
    JWT_SECRET="votre_secret_super_securise_ici_changez_moi"
    JWT_REFRESH_SECRET="votre_refresh_secret_ici_changez_moi"

    # URL du front-end (pour CORS)
    FRONTEND_URL="http://localhost:5173"
    ```

3. **Générer un JWT_SECRET** :
    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```

---

### Étape 5 : Configurer la Base de Données

1. **Générer le client Prisma** :

    ```bash
    npx prisma generate
    ```

    - Crée le client Prisma pour interagir avec la DB

2. **Créer les tables dans la base de données** :

    ```bash
    npx prisma migrate dev --name init
    ```

    - Lit le fichier `prisma/schema.prisma`
    - Crée toutes les tables nécessaires
    - Applique les migrations

3. **Voir la base de données** (optionnel) :
    ```bash
    npx prisma studio
    ```
    - Ouvre une interface graphique pour voir/modifier les données

---

### Étape 6 : Lancer le Serveur

1. **Mode développement** :

    ```bash
    npm run dev
    ```

    - Lance le serveur avec rechargement automatique
    - Accessible sur `http://localhost:5000`

2. **Mode production** :

    ```bash
    npm start
    ```

3. **Vérifier que ça fonctionne** :
    - Ouvrir `http://localhost:5000/api/health`
    - Vous devriez voir : `{ "status": "OK", "message": "Server is running" }`

---

## 📁 Structure du Projet

```
backend/
├── src/
│   ├── config/           # Configuration (DB, JWT)
│   ├── controllers/      # Logique métier (gestion des requêtes)
│   ├── middleware/       # Middleware (auth, validation, errors)
│   ├── models/           # Modèles Prisma (types)
│   ├── routes/           # Routes API (endpoints)
│   ├── services/         # Services métier (logique complexe)
│   ├── utils/            # Utilitaires (helpers)
│   └── server.js         # Point d'entrée du serveur
├── prisma/
│   ├── schema.prisma     # Schéma de la base de données
│   └── migrations/       # Migrations (historique des changements DB)
├── .env                  # Variables d'environnement (SECRET !)
├── .env.example          # Exemple de .env
├── package.json          # Dépendances et scripts
└── README.md            # Ce fichier
```

---

## 🔑 Concepts Importants Expliqués

### 1. **Routes (Routes)**

-   **C'est quoi ?** : Les "chemins" de votre API
-   **Exemple** : `GET /api/articles` → récupère tous les articles
-   **Fonction** : Définit quelles URLs répondent à quelles actions

### 2. **Controllers (Contrôleurs)**

-   **C'est quoi ?** : La logique qui s'exécute quand on appelle une route
-   **Exemple** : Quand on appelle `GET /api/articles`, le controller récupère les articles en DB
-   **Fonction** : Traite les requêtes et renvoie les réponses

### 3. **Services (Services)**

-   **C'est quoi ?** : Logique métier complexe réutilisable
-   **Exemple** : Service d'envoi d'email, service de génération de slug
-   **Fonction** : Sépare la logique métier de la logique de route

### 4. **Middleware (Intergiciels)**

-   **C'est quoi ?** : Code qui s'exécute avant/après les routes
-   **Exemple** : Vérifier si l'utilisateur est connecté (auth)
-   **Fonction** : Réutiliser du code commun (auth, validation, logging)

### 5. **Prisma Schema**

-   **C'est quoi ?** : Définition de votre base de données en code
-   **Exemple** : Définit qu'un Article a un titre, un contenu, un auteur
-   **Fonction** : Génère automatiquement les tables et les types TypeScript

---

## 🛠️ Scripts Disponibles

| Commande             | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `npm run dev`        | Lance le serveur en mode développement (avec rechargement) |
| `npm start`          | Lance le serveur en mode production                        |
| `npm run db:migrate` | Applique les migrations de base de données                 |
| `npm run db:studio`  | Ouvre Prisma Studio (interface graphique DB)               |
| `npm run db:seed`    | Remplit la base de données avec des données de test        |

---

## 🔐 Sécurité

### Variables d'Environnement (.env)

-   **Ne JAMAIS** commiter le fichier `.env` dans Git
-   Contient des secrets (mots de passe, clés API)
-   Utiliser `.env.example` comme template

### Authentification

-   JWT tokens pour identifier les utilisateurs
-   Mots de passe hashés avec bcrypt (jamais en clair)
-   Rate limiting pour éviter les attaques

---

## 📡 Endpoints API Disponibles

### Articles

-   `GET /api/articles` - Liste tous les articles
-   `GET /api/articles/:id` - Détail d'un article
-   `POST /api/articles` - Créer un article (auth requis)
-   `PUT /api/articles/:id` - Modifier un article (auth requis)
-   `DELETE /api/articles/:id` - Supprimer un article (auth requis)

### Authentification

-   `POST /api/auth/register` - Inscription
-   `POST /api/auth/login` - Connexion
-   `POST /api/auth/refresh` - Rafraîchir le token
-   `GET /api/auth/me` - Profil utilisateur actuel

### Contact

-   `POST /api/contact` - Envoyer un message de contact

---

## 🐛 Dépannage

### Erreur : "Cannot find module"

-   **Solution** : Exécuter `npm install` dans le dossier backend

### Erreur : "Database connection failed"

-   **Solution** : Vérifier que PostgreSQL est démarré et que DATABASE_URL est correct

### Erreur : "Port already in use"

-   **Solution** : Changer le PORT dans `.env` ou arrêter l'autre processus

### Erreur : "Prisma Client not generated"

-   **Solution** : Exécuter `npx prisma generate`

---

## 📚 Ressources pour Apprendre

-   [Node.js Documentation](https://nodejs.org/docs)
-   [Express.js Guide](https://expressjs.com/en/guide/routing.html)
-   [Prisma Documentation](https://www.prisma.io/docs)
-   [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)
-   [JWT Explained](https://jwt.io/introduction)

---

## ✅ Checklist d'Installation

-   [ ] Node.js installé et vérifié
-   [ ] PostgreSQL installé et base de données créée
-   [ ] Dépendances installées (`npm install`)
-   [ ] Fichier `.env` créé et configuré
-   [ ] Prisma généré (`npx prisma generate`)
-   [ ] Migrations appliquées (`npx prisma migrate dev`)
-   [ ] Serveur lancé (`npm run dev`)
-   [ ] Test de l'endpoint `/api/health` réussi

---

**Besoin d'aide ?** Consultez la documentation ou créez une issue sur GitHub.
