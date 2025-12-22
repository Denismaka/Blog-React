// ============================================
// SERVICE ARTICLES
// ============================================
// Contient la logique métier pour les articles
// Sépare la logique métier de la logique de route

import prisma from "../config/database.js";
import { NotFoundError, ConflictError } from "../utils/errors.js";
import { generateSlug } from "../utils/helpers.js";

// ============================================
// EXPLICATION : Services
// ============================================
// Les services contiennent la logique métier complexe
// Ils sont réutilisables et testables indépendamment
//
// Avantages :
// - Séparation des responsabilités
// - Code réutilisable
// - Facile à tester
// - Logique métier centralisée

/**
 * Récupère tous les articles avec pagination
 *
 * @param {Object} options - Options de pagination et filtres
 * @param {Number} options.page - Numéro de page (défaut: 1)
 * @param {Number} options.limit - Nombre d'articles par page (défaut: 10)
 * @param {Boolean} options.published - Filtrer par statut publié (défaut: true)
 * @returns {Object} Articles et métadonnées de pagination
 */
export async function getAllArticles(options = {}) {
    const { page = 1, limit = 10, published = true, authorId = null } = options;

    // Calculer le skip (nombre d'articles à sauter)
    const skip = (page - 1) * limit;

    // Construire les filtres
    const where = {};
    if (published !== undefined) {
        where.published = published;
    }
    if (authorId) {
        where.authorId = authorId;
    }

    // Récupérer les articles et le total
    const [articles, total] = await Promise.all([
        prisma.article.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
        }),
        prisma.article.count({ where }),
    ]);

    // Calculer les métadonnées de pagination
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
        articles,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage,
            hasPrevPage,
        },
    };
}

/**
 * Récupère un article par son ID
 *
 * @param {String} id - ID de l'article
 * @returns {Object} Article avec auteur et catégories
 * @throws {NotFoundError} Si l'article n'existe pas
 */
export async function getArticleById(id) {
    const article = await prisma.article.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            categories: {
                include: {
                    category: true,
                },
            },
        },
    });

    if (!article) {
        throw new NotFoundError("Article");
    }

    return article;
}

/**
 * Récupère un article par son slug
 *
 * @param {String} slug - Slug de l'article
 * @returns {Object} Article
 * @throws {NotFoundError} Si l'article n'existe pas
 */
export async function getArticleBySlug(slug) {
    const article = await prisma.article.findUnique({
        where: { slug },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            categories: {
                include: {
                    category: true,
                },
            },
        },
    });

    if (!article) {
        throw new NotFoundError("Article");
    }

    return article;
}

/**
 * Crée un nouvel article
 *
 * @param {Object} data - Données de l'article
 * @param {String} data.title - Titre
 * @param {String} data.body - Contenu
 * @param {String} data.authorId - ID de l'auteur
 * @param {String} [data.imageUrl] - URL de l'image
 * @param {String} [data.excerpt] - Résumé
 * @param {Boolean} [data.published] - Publié ou brouillon
 * @returns {Object} Article créé
 */
export async function createArticle(data) {
    const {
        title,
        body,
        authorId,
        imageUrl,
        excerpt,
        published = false,
    } = data;

    // Générer un slug unique à partir du titre
    let slug = generateSlug(title);
    let slugExists = true;
    let counter = 1;

    // Vérifier que le slug est unique, sinon ajouter un numéro
    while (slugExists) {
        const existing = await prisma.article.findUnique({
            where: { slug },
        });

        if (!existing) {
            slugExists = false;
        } else {
            slug = `${generateSlug(title)}-${counter}`;
            counter++;
        }
    }

    // Créer l'article
    const article = await prisma.article.create({
        data: {
            title,
            slug,
            body,
            excerpt: excerpt || body.substring(0, 200) + "...",
            imageUrl,
            published,
            publishedAt: published ? new Date() : null,
            authorId,
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return article;
}

/**
 * Met à jour un article
 *
 * @param {String} id - ID de l'article
 * @param {Object} data - Données à mettre à jour
 * @returns {Object} Article mis à jour
 * @throws {NotFoundError} Si l'article n'existe pas
 */
export async function updateArticle(id, data) {
    // Vérifier que l'article existe
    const existing = await prisma.article.findUnique({
        where: { id },
    });

    if (!existing) {
        throw new NotFoundError("Article");
    }

    // Si le titre change, régénérer le slug
    const updateData = { ...data };
    if (data.title && data.title !== existing.title) {
        let slug = generateSlug(data.title);
        let slugExists = true;
        let counter = 1;

        while (slugExists) {
            const existingSlug = await prisma.article.findUnique({
                where: { slug },
            });

            if (!existingSlug || existingSlug.id === id) {
                slugExists = false;
            } else {
                slug = `${generateSlug(data.title)}-${counter}`;
                counter++;
            }
        }

        updateData.slug = slug;
    }

    // Si l'article est publié pour la première fois
    if (data.published && !existing.published) {
        updateData.publishedAt = new Date();
    }

    // Mettre à jour l'article
    const article = await prisma.article.update({
        where: { id },
        data: updateData,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return article;
}

/**
 * Supprime un article
 *
 * @param {String} id - ID de l'article
 * @throws {NotFoundError} Si l'article n'existe pas
 */
export async function deleteArticle(id) {
    const article = await prisma.article.findUnique({
        where: { id },
    });

    if (!article) {
        throw new NotFoundError("Article");
    }

    await prisma.article.delete({
        where: { id },
    });
}
