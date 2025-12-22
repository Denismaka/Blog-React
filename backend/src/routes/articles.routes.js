// ============================================
// ROUTES ARTICLES
// ============================================
// Définit les endpoints pour les articles

import express from "express";
import * as articlesController from "../controllers/articlesController.js";
import { authenticate } from "../middleware/auth.middleware.js";
import {
    validateCreateArticle,
    validateUpdateArticle,
    validateArticleId,
} from "../middleware/validation.middleware.js";

// ============================================
// EXPLICATION : Routes
// ============================================
// Les routes définissent les URLs de votre API
// Chaque route :
// - Associe une URL à un controller
// - Peut avoir des middlewares (auth, validation)
// - Définit la méthode HTTP (GET, POST, PUT, DELETE)
//
// Exemple :
// GET /api/articles → getAllArticles
// POST /api/articles → createArticle (avec auth)

const router = express.Router();

// Routes publiques (pas besoin d'authentification)
router.get("/", articlesController.getAllArticles);
router.get("/:id", validateArticleId, articlesController.getArticleById);
router.get("/slug/:slug", articlesController.getArticleBySlug);

// Routes protégées (authentification requise)
router.post(
    "/",
    authenticate,
    validateCreateArticle,
    articlesController.createArticle
);
router.put(
    "/:id",
    authenticate,
    validateArticleId,
    validateUpdateArticle,
    articlesController.updateArticle
);
router.delete(
    "/:id",
    authenticate,
    validateArticleId,
    articlesController.deleteArticle
);

export default router;
