# 🗄️ Guide Complet : Créer la Base de Données PostgreSQL

Ce guide vous explique **étape par étape** comment créer la base de données `blog_react` dans PostgreSQL.

---

## 📋 Méthode 1 : Avec pgAdmin (Interface Graphique) - RECOMMANDÉ

### Étape 1 : Ouvrir pgAdmin

1. **Si vous utilisez Laragon** :

    - Ouvrir Laragon
    - Cliquer sur **PostgreSQL** dans la liste des services
    - Ou chercher "pgAdmin" dans le menu Démarrer

2. **Si vous avez installé PostgreSQL manuellement** :
    - Chercher "pgAdmin" dans le menu Démarrer Windows
    - Double-cliquer sur "pgAdmin 4"

### Étape 2 : Se Connecter à PostgreSQL

1. **pgAdmin s'ouvre dans votre navigateur** (généralement `http://127.0.0.1:XXXXX`)

2. **Entrer le mot de passe** :

    - pgAdmin vous demande le mot de passe du superutilisateur `postgres`
    - **Avec Laragon** : Le mot de passe est souvent `root` ou vide (laissez vide)
    - **Installation manuelle** : Utilisez le mot de passe que vous avez défini lors de l'installation

3. **Si vous avez oublié le mot de passe** :
    - Voir la section "Réinitialiser le mot de passe" plus bas

### Étape 3 : Créer la Base de Données

1. **Dans le panneau de gauche (Object Browser)** :

    - Développer **Servers** (cliquer sur la flèche)
    - Développer **PostgreSQL XX** (XX = version, ex: 15)
    - Développer **Databases**

2. **Clic droit sur "Databases"** :

    - Sélectionner **Create** → **Database...**

3. **Remplir le formulaire** :

    - **Database name** : `blog_react`
    - **Owner** : `postgres` (par défaut)
    - **Encoding** : `UTF8` (par défaut)
    - **Collation** : Laisser par défaut
    - **Character type** : Laisser par défaut

4. **Cliquer sur "Save"** (en bas à droite)

5. **Vérification** :
    - Vous devriez voir `blog_react` dans la liste des bases de données
    - ✅ Base de données créée avec succès !

---

## 📋 Méthode 2 : Avec la Ligne de Commande (psql)

### Étape 1 : Ouvrir psql

1. **Avec Laragon** :

    - Ouvrir PowerShell ou CMD
    - Naviguer vers le dossier PostgreSQL de Laragon :
        ```bash
        cd C:\laragon\bin\postgresql\postgresql-XX\bin
        ```
        (Remplacez XX par votre version, ex: 15)

2. **Installation manuelle** :
    - Ouvrir PowerShell ou CMD
    - psql est généralement dans le PATH, sinon :
        ```bash
        cd "C:\Program Files\PostgreSQL\XX\bin"
        ```

### Étape 2 : Se Connecter

```bash
psql -U postgres
```

-   Il vous demandera le mot de passe
-   **Avec Laragon** : `root` ou laissez vide (appuyez sur Entrée)
-   **Installation manuelle** : Votre mot de passe

### Étape 3 : Créer la Base de Données

Une fois connecté, taper :

```sql
CREATE DATABASE blog_react;
```

Appuyer sur **Entrée**.

### Étape 4 : Vérifier

```sql
\l
```

Cette commande liste toutes les bases de données. Vous devriez voir `blog_react` dans la liste.

### Étape 5 : Quitter

```sql
\q
```

---

## 📋 Méthode 3 : Avec SQL Directement (Alternative)

Si vous préférez exécuter du SQL directement :

1. **Ouvrir pgAdmin**
2. **Clic droit sur "Databases"** → **Query Tool**
3. **Taper la commande** :
    ```sql
    CREATE DATABASE blog_react;
    ```
4. **Cliquer sur "Execute"** (ou F5)
5. ✅ Base de données créée !

---

## 🔧 Problèmes Courants et Solutions

### Problème 1 : "Mot de passe incorrect"

**Solution** :

1. **Avec Laragon** :

    - Le mot de passe par défaut est souvent `root`
    - Essayez aussi de laisser vide (appuyez juste sur Entrée)

2. **Réinitialiser le mot de passe** :
    - Voir la section "Réinitialiser le mot de passe" ci-dessous

### Problème 2 : "pgAdmin ne s'ouvre pas"

**Solutions** :

1. **Vérifier que PostgreSQL est démarré** :

    - Dans Laragon : Vérifier que PostgreSQL est vert (démarré)
    - Si rouge : Cliquer dessus pour démarrer

2. **Réinstaller pgAdmin** :
    - Dans Laragon : Menu → Tools → Quick add → PostgreSQL
    - Ou réinstaller PostgreSQL manuellement

### Problème 3 : "Erreur : database already exists"

**Solution** :

La base de données existe déjà ! Vous pouvez :

-   L'utiliser telle quelle
-   Ou la supprimer et la recréer (voir ci-dessous)

### Problème 4 : "Permission denied"

**Solution** :

Assurez-vous d'être connecté en tant que `postgres` (superutilisateur).

---

## 🔑 Réinitialiser le Mot de Passe PostgreSQL

### Méthode 1 : Avec Laragon

1. **Arrêter PostgreSQL** dans Laragon
2. **Ouvrir un terminal** en tant qu'administrateur
3. **Naviguer vers le dossier PostgreSQL** :
    ```bash
    cd C:\laragon\bin\postgresql\postgresql-XX\bin
    ```
4. **Réinitialiser le mot de passe** :
    ```bash
    pg_ctl -D "C:\laragon\bin\postgresql\postgresql-XX\data" -o "-p 5432" start
    psql -U postgres -c "ALTER USER postgres PASSWORD 'root';"
    ```

### Méthode 2 : Fichier pg_hba.conf

1. **Trouver le fichier `pg_hba.conf`** :

    - Laragon : `C:\laragon\bin\postgresql\postgresql-XX\data\pg_hba.conf`
    - Installation manuelle : `C:\Program Files\PostgreSQL\XX\data\pg_hba.conf`

2. **Modifier la ligne** :

    ```
    # TYPE  DATABASE        USER            ADDRESS                 METHOD
    host    all             all             127.0.0.1/32            md5
    ```

    En :

    ```
    host    all             all             127.0.0.1/32            trust
    ```

3. **Redémarrer PostgreSQL**

4. **Se connecter sans mot de passe** et changer le mot de passe :

    ```sql
    ALTER USER postgres PASSWORD 'root';
    ```

5. **Remettre `md5` dans pg_hba.conf** et redémarrer

---

## ✅ Vérifier que la Base de Données est Créée

### Avec pgAdmin

1. Ouvrir pgAdmin
2. Développer **Servers** → **PostgreSQL** → **Databases**
3. Vous devriez voir `blog_react` dans la liste

### Avec psql

```bash
psql -U postgres -l
```

Vous devriez voir `blog_react` dans la liste.

---

## 🗑️ Supprimer et Recréer la Base de Données

Si vous voulez recommencer à zéro :

### Avec pgAdmin

1. **Clic droit sur `blog_react`** → **Delete/Drop**
2. Confirmer la suppression
3. Recréer avec la méthode 1 ci-dessus

### Avec psql

```sql
-- Se connecter
psql -U postgres

-- Supprimer (ATTENTION : supprime toutes les données !)
DROP DATABASE blog_react;

-- Recréer
CREATE DATABASE blog_react;

-- Quitter
\q
```

---

## 🔗 Tester la Connexion

Une fois la base créée, testez la connexion :

### Avec psql

```bash
psql -U postgres -d blog_react
```

Si ça fonctionne, vous êtes connecté ! Tapez `\q` pour quitter.

### Avec votre application

Dans votre fichier `.env`, utilisez :

```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/blog_react"
```

(Remplacez `root` par votre mot de passe si différent)

Puis testez :

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

---

## 📝 Commandes SQL Utiles

```sql
-- Lister toutes les bases de données
\l

-- Se connecter à une base de données
\c blog_react

-- Lister toutes les tables
\dt

-- Voir la structure d'une table
\d nom_de_la_table

-- Quitter psql
\q
```

---

## 🆘 Besoin d'Aide ?

Si vous rencontrez toujours des problèmes :

1. **Vérifiez que PostgreSQL est démarré** (vert dans Laragon)
2. **Vérifiez le port** : Par défaut c'est `5432`
3. **Vérifiez les logs** : Dans Laragon, clic droit sur PostgreSQL → Logs
4. **Essayez de redémarrer PostgreSQL** dans Laragon

---

## 🎉 Prochaines Étapes

Une fois la base de données créée :

1. ✅ Configurer le `.env` avec la bonne `DATABASE_URL`
2. ✅ Exécuter `npx prisma generate`
3. ✅ Exécuter `npx prisma migrate dev --name init`
4. ✅ Votre backend est prêt !

**Bon courage !** 💪
