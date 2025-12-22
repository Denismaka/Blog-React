# 🚀 Guide d'Installation Détaillé - Backend

Ce guide vous explique **étape par étape** comment installer et configurer le backend de votre blog React.

---

## 📋 Prérequis

Avant de commencer, vous devez avoir installé :

1. **Node.js** (version 18+ recommandée)
2. **PostgreSQL** (version 15+)
3. **npm** (inclus avec Node.js)

---

## 📦 Étape 1 : Installer Node.js

### Windows

1. **Télécharger Node.js** :

    - Aller sur [nodejs.org](https://nodejs.org)
    - Cliquer sur "Download" pour la version **LTS** (Long Term Support)
    - Télécharger le fichier `.msi` pour Windows

2. **Installer Node.js** :

    - Double-cliquer sur le fichier téléchargé
    - Suivre l'assistant d'installation
    - **Important** : Cocher "Add to PATH" si proposé
    - Installer avec les options par défaut

3. **Vérifier l'installation** :
   Ouvrir PowerShell ou CMD et taper :
    ```bash
    node --version
    npm --version
    ```
    Vous devriez voir des numéros de version (ex: `v20.10.0` et `10.2.3`)

### Explication

-   **Node.js** : Permet d'exécuter JavaScript côté serveur
-   **npm** : Gestionnaire de paquets pour installer des bibliothèques

---

## 🗄️ Étape 2 : Installer PostgreSQL

### Option A : Avec Laragon (Recommandé)

Si vous utilisez déjà Laragon :

1. **Ouvrir Laragon**
2. **Menu** → **Tools** → **Quick add** → **PostgreSQL**
3. Laragon installe et configure automatiquement PostgreSQL
4. **Noter** : Le mot de passe par défaut est souvent `root` ou vide

### Option B : Installation Manuelle

1. **Télécharger PostgreSQL** :

    - Aller sur [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
    - Cliquer sur "Download the installer"
    - Télécharger la dernière version

2. **Installer PostgreSQL** :

    - Double-cliquer sur le fichier téléchargé
    - Suivre l'assistant d'installation
    - **Important** : Noter le mot de passe du superutilisateur `postgres`
    - Installer avec les options par défaut

3. **Vérifier l'installation** :
    - Ouvrir **pgAdmin** (interface graphique)
    - Ou utiliser la ligne de commande

### Créer la Base de Données

1. **Ouvrir pgAdmin** (ou utiliser la ligne de commande)

2. **Se connecter** :

    - Host: `localhost`
    - Port: `5432`
    - User: `postgres`
    - Password: (celui que vous avez noté)

3. **Créer la base de données** :
    - Clic droit sur "Databases" → "Create" → "Database"
    - Nom: `blog_react`
    - Cliquer sur "Save"

### Explication

-   **PostgreSQL** : Base de données pour stocker les articles, utilisateurs, etc.
-   **pgAdmin** : Interface graphique pour gérer PostgreSQL

---

## 📥 Étape 3 : Installer les Dépendances

1. **Ouvrir un terminal** dans le dossier `backend/`

2. **Installer les dépendances** :

    ```bash
    npm install
    ```

3. **Explication** :
    - `npm install` lit le fichier `package.json`
    - Télécharge toutes les bibliothèques nécessaires
    - Les installe dans `node_modules/`
    - Cela peut prendre quelques minutes

### Dépendances Installées

-   **express** : Framework web pour créer l'API
-   **prisma** : ORM pour interagir avec PostgreSQL
-   **bcryptjs** : Pour hasher les mots de passe
-   **jsonwebtoken** : Pour l'authentification JWT
-   **cors** : Pour autoriser les requêtes depuis le front-end
-   **helmet** : Pour sécuriser les headers HTTP
-   Et d'autres...

---

## ⚙️ Étape 4 : Configurer l'Environnement

1. **Créer le fichier `.env`** :

    - Copier le fichier `.env.example`
    - Le renommer en `.env`

2. **Ouvrir `.env`** et remplir les variables :

```env
# Port du serveur
PORT=5000

# Base de données PostgreSQL
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# Exemple avec Laragon: postgresql://postgres:root@localhost:5432/blog_react
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/blog_react"

# JWT Secret (générer une chaîne aléatoire)
# Commande pour générer: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET="votre_secret_super_securise_ici_changez_moi"
JWT_REFRESH_SECRET="votre_refresh_secret_ici_changez_moi"

# Durée de vie des tokens (en secondes)
JWT_EXPIRE=3600
JWT_REFRESH_EXPIRE=604800

# URL du front-end (pour CORS)
FRONTEND_URL="http://localhost:5173"

# Environnement
NODE_ENV="development"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

3. **Générer les secrets JWT** :
   Ouvrir un terminal et exécuter :
    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```
    Copier le résultat dans `JWT_SECRET` et générer un autre pour `JWT_REFRESH_SECRET`

### Explication

-   **`.env`** : Fichier de configuration (ne JAMAIS le commiter dans Git)
-   **DATABASE_URL** : URL de connexion à PostgreSQL
-   **JWT_SECRET** : Secret pour signer les tokens JWT (garder SECRET !)

---

## 🗃️ Étape 5 : Configurer la Base de Données

1. **Générer le client Prisma** :

    ```bash
    npx prisma generate
    ```

    - Crée le client Prisma pour interagir avec la DB
    - Génère les types TypeScript (même en JavaScript)

2. **Créer les tables dans la base de données** :

    ```bash
    npx prisma migrate dev --name init
    ```

    - Lit le fichier `prisma/schema.prisma`
    - Crée toutes les tables nécessaires
    - Applique les migrations
    - Vous devrez confirmer avec `y` si demandé

3. **Voir la base de données** (optionnel) :
    ```bash
    npx prisma studio
    ```
    - Ouvre une interface graphique dans le navigateur
    - Permet de voir/modifier les données
    - Accessible sur `http://localhost:5555`

### Explication

-   **Prisma** : ORM qui facilite l'interaction avec PostgreSQL
-   **Migrations** : Historique des changements de structure de la DB
-   **Prisma Studio** : Interface graphique pour voir les données

---

## 🚀 Étape 6 : Lancer le Serveur

1. **Mode développement** :

    ```bash
    npm run dev
    ```

    - Lance le serveur avec rechargement automatique
    - Accessible sur `http://localhost:5000`

2. **Vérifier que ça fonctionne** :

    - Ouvrir `http://localhost:5000/api/health` dans le navigateur
    - Vous devriez voir : `{ "success": true, "status": "OK", "message": "Server is running" }`

3. **Voir les logs** :
    - Les requêtes s'affichent dans la console
    - Les erreurs sont également affichées

### Explication

-   **Mode dev** : Rechargement automatique quand vous modifiez le code
-   **Port 5000** : Port par défaut (peut être changé dans `.env`)

---

## ✅ Checklist d'Installation

Vérifiez que tout est bien installé :

-   [ ] Node.js installé (`node --version` fonctionne)
-   [ ] PostgreSQL installé et base de données créée
-   [ ] Dépendances installées (`npm install` exécuté)
-   [ ] Fichier `.env` créé et configuré
-   [ ] Prisma généré (`npx prisma generate` exécuté)
-   [ ] Migrations appliquées (`npx prisma migrate dev` exécuté)
-   [ ] Serveur lancé (`npm run dev` fonctionne)
-   [ ] Test de l'endpoint `/api/health` réussi

---

## 🐛 Dépannage

### Erreur : "Cannot find module"

**Solution** :

```bash
cd backend
npm install
```

### Erreur : "Database connection failed"

**Solutions** :

1. Vérifier que PostgreSQL est démarré
2. Vérifier que `DATABASE_URL` dans `.env` est correct
3. Vérifier le mot de passe PostgreSQL
4. Vérifier que la base de données `blog_react` existe

### Erreur : "Port already in use"

**Solution** :

1. Changer le `PORT` dans `.env`
2. Ou arrêter l'autre processus qui utilise le port 5000

### Erreur : "Prisma Client not generated"

**Solution** :

```bash
npx prisma generate
```

### Erreur : "Migration failed"

**Solution** :

1. Vérifier que PostgreSQL est démarré
2. Vérifier que `DATABASE_URL` est correct
3. Vérifier que la base de données existe

---

## 📚 Commandes Utiles

| Commande                   | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| `npm run dev`              | Lance le serveur en mode développement                           |
| `npm start`                | Lance le serveur en mode production                              |
| `npx prisma generate`      | Génère le client Prisma                                          |
| `npx prisma migrate dev`   | Crée et applique une migration                                   |
| `npx prisma studio`        | Ouvre Prisma Studio (interface graphique)                        |
| `npx prisma migrate reset` | Réinitialise la base de données (⚠️ supprime toutes les données) |

---

## 🎉 Félicitations !

Votre backend est maintenant installé et configuré !

Vous pouvez maintenant :

-   Tester les endpoints avec Postman ou Thunder Client
-   Connecter votre front-end React
-   Commencer à développer

**Besoin d'aide ?** Consultez le `README.md` ou créez une issue.
