// ============================================
// CONTROLLER ARTICLES
// ============================================
// Gère les requêtes HTTP liées aux articles
// Les controllers appellent les services pour la logique métier

import * as articlesService from "../services/articlesService.js";

// ============================================
// EXPLICATION : Controllers
// ============================================
// Les controllers sont la couche qui reçoit les requêtes HTTP
// Ils :
// - Reçoivent les données de la requête (req.body, req.params)
// - Appellent les services pour la logique métier
// - Renvoient les réponses HTTP (res.json)
//
// Structure typique :
// 1. Extraire les données de la requête
// 2. Appeler le service approprié
// 3. Retourner la réponse

/**
 * GET /api/articles
 * Récupère tous les articles avec pagination
 */
export async function getAllArticles(req, res, next) {
    try {
        const { page, limit, published, authorId } = req.query;

        const result = await articlesService.getAllArticles({
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined,
            published:
                published !== undefined ? published === "true" : undefined,
            authorId,
        });

        res.json({
            success: true,
            data: result.articles,
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/articles/:id
 * Récupère un article par son ID
 */
export async function getArticleById(req, res, next) {
    try {
        const { id } = req.params;
        const article = await articlesService.getArticleById(id);

        res.json({
            success: true,
            data: article,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/articles/slug/:slug
 * Récupère un article par son slug (pour SEO)
 */
export async function getArticleBySlug(req, res, next) {
    try {
        const { slug } = req.params;
        const article = await articlesService.getArticleBySlug(slug);

        res.json({
            success: true,
            data: article,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * POST /api/articles
 * Crée un nouvel article (authentification requise)
 */
export async function createArticle(req, res, next) {
    try {
        // req.user est ajouté par le middleware authenticate
        const authorId = req.user.id;

        const article = await articlesService.createArticle({
            ...req.body,
            authorId,
        });

        res.status(201).json({
            success: true,
            data: article,
            message: "Article créé avec succès",
        });
    } catch (error) {
        next(error);
    }
}

/**
 * PUT /api/articles/:id
 * Met à jour un article (authentification requise)
 */
export async function updateArticle(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Vérifier que l'utilisateur est l'auteur ou un admin
        const article = await articlesService.getArticleById(id);
        if (article.authorId !== userId && req.user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                error: {
                    message: "Vous n'avez pas le droit de modifier cet article",
                },
            });
        }

        const updatedArticle = await articlesService.updateArticle(
            id,
            req.body
        );

        res.json({
            success: true,
            data: updatedArticle,
            message: "Article mis à jour avec succès",
        });
    } catch (error) {
        next(error);
    }
}

/**
 * DELETE /api/articles/:id
 * Supprime un article (authentification requise)
 */
export async function deleteArticle(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Vérifier que l'utilisateur est l'auteur ou un admin
        const article = await articlesService.getArticleById(id);
        if (article.authorId !== userId && req.user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                error: {
                    message:
                        "Vous n'avez pas le droit de supprimer cet article",
                },
            });
        }

        await articlesService.deleteArticle(id);

        res.json({
            success: true,
            message: "Article supprimé avec succès",
        });
    } catch (error) {
        next(error);
    }
}
