# 🏗️ Architecture du Backend - Explication Complète

Ce document explique **en détail** comment fonctionne le backend de votre blog React.

---

## 📐 Vue d'Ensemble

```
Requête HTTP (Front-end)
    ↓
Serveur Express (server.js)
    ↓
Routes (routes/)
    ↓
Middleware (auth, validation)
    ↓
Controllers (controllers/)
    ↓
Services (services/)
    ↓
Base de Données (PostgreSQL via Prisma)
    ↓
Réponse JSON
```

---

## 🔄 Flux d'une Requête

### Exemple : Récupérer tous les articles

1. **Front-end envoie une requête** :

    ```javascript
    fetch("http://localhost:5000/api/articles");
    ```

2. **Le serveur reçoit la requête** (`server.js`) :

    - Express route la requête vers `/api/articles`

3. **La route correspond** (`routes/articles.routes.js`) :

    - `GET /api/articles` → `articlesController.getAllArticles`

4. **Le controller traite la requête** (`controllers/articlesController.js`) :

    - Extrait les paramètres (page, limit)
    - Appelle le service

5. **Le service exécute la logique métier** (`services/articlesService.js`) :

    - Interroge la base de données via Prisma
    - Formate les données

6. **Prisma interroge PostgreSQL** :

    - Exécute la requête SQL
    - Retourne les résultats

7. **La réponse remonte** :

    - Service → Controller → Route → Serveur → Front-end

8. **Le front-end reçoit** :
    ```json
    {
      "success": true,
      "data": [...articles],
      "pagination": {...}
    }
    ```

---

## 📁 Structure des Fichiers Expliquée

### 1. `server.js` - Point d'Entrée

**Rôle** : Configure et démarre le serveur Express

**Ce qu'il fait** :

-   Crée l'application Express
-   Configure les middlewares globaux (CORS, sécurité, etc.)
-   Ajoute les routes
-   Démarre le serveur sur le port 5000

**Explication** :

-   C'est le "cerveau" du serveur
-   Tout passe par là au démarrage

---

### 2. `routes/` - Routes API

**Rôle** : Définit les URLs de l'API

**Exemple** :

```javascript
// routes/articles.routes.js
router.get("/", articlesController.getAllArticles);
// Quand on appelle GET /api/articles, exécute getAllArticles
```

**Explication** :

-   Associe une URL à une fonction
-   Peut ajouter des middlewares (auth, validation)

---

### 3. `controllers/` - Contrôleurs

**Rôle** : Traite les requêtes HTTP

**Exemple** :

```javascript
// controllers/articlesController.js
export async function getAllArticles(req, res, next) {
    // req : données de la requête
    // res : réponse à envoyer
    // next : passer au middleware suivant

    const articles = await articlesService.getAllArticles();
    res.json({ success: true, data: articles });
}
```

**Explication** :

-   Reçoit les données de la requête
-   Appelle les services
-   Renvoie la réponse

---

### 4. `services/` - Services Métier

**Rôle** : Contient la logique métier

**Exemple** :

```javascript
// services/articlesService.js
export async function getAllArticles() {
    // Logique complexe ici
    const articles = await prisma.article.findMany();
    return articles;
}
```

**Explication** :

-   Logique métier réutilisable
-   Interagit avec la base de données
-   Indépendant des routes HTTP

---

### 5. `middleware/` - Intergiciels

**Rôle** : Code qui s'exécute avant/après les routes

**Exemple** :

```javascript
// middleware/auth.middleware.js
export async function authenticate(req, res, next) {
    // Vérifie si l'utilisateur est connecté
    const token = req.headers.authorization;
    // ...
    req.user = user; // Ajoute l'utilisateur à la requête
    next(); // Passe au suivant
}
```

**Explication** :

-   S'exécute avant les controllers
-   Peut modifier la requête
-   Peut bloquer la requête (ex: non authentifié)

---

### 6. `config/` - Configuration

**Rôle** : Configuration de la base de données, JWT, etc.

**Exemple** :

```javascript
// config/database.js
export const prisma = new PrismaClient();
// Client pour interagir avec PostgreSQL
```

**Explication** :

-   Centralise la configuration
-   Réutilisable dans tout le projet

---

### 7. `utils/` - Utilitaires

**Rôle** : Fonctions réutilisables

**Exemple** :

```javascript
// utils/helpers.js
export function generateSlug(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
}
```

**Explication** :

-   Fonctions simples réutilisables
-   Pas de logique métier complexe

---

## 🔐 Authentification - Comment ça Marche ?

### 1. Inscription

```
Utilisateur → POST /api/auth/register
    ↓
Controller vérifie les données
    ↓
Service hash le mot de passe (bcrypt)
    ↓
Service crée l'utilisateur en DB
    ↓
Réponse : Utilisateur créé
```

### 2. Connexion

```
Utilisateur → POST /api/auth/login (email + password)
    ↓
Service trouve l'utilisateur par email
    ↓
Service compare le mot de passe avec bcrypt
    ↓
Service génère des tokens JWT
    ↓
Réponse : Tokens + infos utilisateur
```

### 3. Requête Protégée

```
Front-end → GET /api/articles (avec token dans header)
    ↓
Middleware authenticate vérifie le token
    ↓
Si valide : ajoute req.user et continue
    ↓
Controller peut utiliser req.user.id
    ↓
Réponse : Données
```

---

## 🗄️ Base de Données - Prisma

### Schéma Prisma

```prisma
model Article {
  id        String   @id @default(uuid())
  title     String
  body      String
  authorId  String
  author    User     @relation(...)
}
```

**Explication** :

-   Définit la structure de la table
-   Prisma génère automatiquement les tables
-   Prisma génère les types JavaScript

### Utilisation

```javascript
// Créer un article
await prisma.article.create({
    data: { title: "Mon article", body: "..." },
});

// Lire des articles
const articles = await prisma.article.findMany();

// Mettre à jour
await prisma.article.update({
    where: { id: "..." },
    data: { title: "Nouveau titre" },
});
```

---

## 🛡️ Sécurité - Mesures Implémentées

### 1. **Mots de Passe Hashés**

-   Jamais stockés en clair
-   Utilisation de bcrypt (12 rounds)

### 2. **JWT Tokens**

-   Tokens signés avec un secret
-   Expiration automatique
-   Refresh tokens pour renouveler

### 3. **Validation**

-   Validation des données entrantes
-   Protection contre les injections

### 4. **Rate Limiting**

-   Limite le nombre de requêtes
-   Protection contre DDoS

### 5. **CORS**

-   Autorise uniquement le front-end configuré
-   Protection contre les requêtes malveillantes

### 6. **Helmet**

-   Sécurise les headers HTTP
-   Protection contre certaines vulnérabilités

---

## 📡 Endpoints API

### Articles

| Méthode | Endpoint            | Description             | Auth |
| ------- | ------------------- | ----------------------- | ---- |
| GET     | `/api/articles`     | Liste tous les articles | ❌   |
| GET     | `/api/articles/:id` | Détail d'un article     | ❌   |
| POST    | `/api/articles`     | Créer un article        | ✅   |
| PUT     | `/api/articles/:id` | Modifier un article     | ✅   |
| DELETE  | `/api/articles/:id` | Supprimer un article    | ✅   |

### Authentification

| Méthode | Endpoint             | Description        | Auth |
| ------- | -------------------- | ------------------ | ---- |
| POST    | `/api/auth/register` | Inscription        | ❌   |
| POST    | `/api/auth/login`    | Connexion          | ❌   |
| POST    | `/api/auth/refresh`  | Rafraîchir token   | ❌   |
| GET     | `/api/auth/me`       | Profil utilisateur | ✅   |

### Contact

| Méthode | Endpoint                | Description     | Auth     |
| ------- | ----------------------- | --------------- | -------- |
| POST    | `/api/contact`          | Envoyer message | ❌       |
| GET     | `/api/contact`          | Liste messages  | ✅ Admin |
| PUT     | `/api/contact/:id/read` | Marquer lu      | ✅ Admin |

---

## 🔄 Exemple Complet : Créer un Article

### 1. Front-end envoie

```javascript
fetch("http://localhost:5000/api/articles", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer <token>",
    },
    body: JSON.stringify({
        title: "Mon nouvel article",
        body: "Contenu de l'article...",
    }),
});
```

### 2. Serveur reçoit

-   Route : `POST /api/articles`
-   Middleware `authenticate` vérifie le token
-   Middleware `validateCreateArticle` valide les données
-   Controller `createArticle` traite

### 3. Controller appelle le service

```javascript
const article = await articlesService.createArticle({
    ...req.body,
    authorId: req.user.id,
});
```

### 4. Service crée en DB

```javascript
const article = await prisma.article.create({
    data: {
        title,
        body,
        authorId,
        slug: generateSlug(title),
    },
});
```

### 5. Réponse envoyée

```json
{
    "success": true,
    "data": {
        "id": "...",
        "title": "Mon nouvel article",
        ...
    },
    "message": "Article créé avec succès"
}
```

---

## 🎓 Concepts Clés

### Middleware

-   Code qui s'exécute avant/après les routes
-   Peut modifier req/res
-   Peut bloquer la requête

### Service Layer

-   Sépare la logique métier des routes
-   Réutilisable
-   Testable indépendamment

### ORM (Prisma)

-   Facilite l'interaction avec la DB
-   Évite d'écrire du SQL brut
-   Type-safe

### JWT

-   Tokens pour l'authentification
-   Stateless (pas de session)
-   Portable

---

## 📚 Pour Aller Plus Loin

-   [Express.js Documentation](https://expressjs.com/)
-   [Prisma Documentation](https://www.prisma.io/docs)
-   [JWT Explained](https://jwt.io/introduction)
-   [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

---

**Questions ?** Consultez le README.md ou créez une issue.
