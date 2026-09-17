# Terra — E-commerce MERN/PERN Demo

Mini-boutique en ligne (objets pour la maison) construite avec **PostgreSQL, Express, React et Node.js**. Projet fait pour un portfolio Upwork.

## Structure

```
ecommerce-project/
├── backend/     → API Express + PostgreSQL (Sequelize)
└── frontend/    → App React (Vite)
```

## 1. Créer la base de données PostgreSQL

Avec pgAdmin, Compass-équivalent Postgres, ou en ligne de commande:

```sql
CREATE DATABASE terra;
```

(Utilise le même compte `postgres` que ton projet Friends Coffee.)

## 2. Lancer le Backend

```bash
cd backend
npm install
cp .env.example .env
```

Modifie `.env` si besoin (par défaut ça pointe sur `localhost:5432`, DB `terra`, user `postgres`).

Puis lance:
```bash
npm run dev
```

Au démarrage tu dois voir:
```
PostgreSQL connected: terra@localhost
Database tables synced
Server running on port 5000
```
Sequelize crée automatiquement les tables (`Products`, `Users`, `Orders`, `OrderItems`) au premier lancement.

## 3. Lancer le Frontend

Dans un autre terminal:
```bash
cd frontend
npm install
npm run dev
```
Le site tourne sur `http://localhost:3000`.

## 4. Créer un compte admin

1. Inscris-toi normalement sur `/register`
2. Dans pgAdmin (ou ton client Postgres), ouvre la table `Users`
3. Change manuellement le champ `role` de `"user"` à `"admin"` pour ton compte
4. Reconnecte-toi → le lien "Tableau de bord" apparaît dans la navbar

## 5. Ajouter des produits de test

Une fois connecté en admin, va sur `/admin` et ajoute quelques produits (nom, description, prix, catégorie, image URL, stock).

## 6. Déploiement (pour le portfolio)

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com)
- **Database** → [Render PostgreSQL](https://render.com) ou [Supabase](https://supabase.com) (gratuit)

Pense à changer `baseURL` dans `frontend/src/api/axios.js` une fois déployé.

## Fonctionnalités

- Catalogue avec filtres par catégorie + recherche
- Page produit avec sélection de quantité
- Panier persistant (localStorage)
- Authentification JWT (inscription / connexion)
- Commande avec formulaire de livraison
- Tableau de bord admin (CRUD produits complet)

## Stack technique

React 18, React Router, Context API, Axios, Node.js, Express, PostgreSQL, Sequelize, JWT, bcrypt.
