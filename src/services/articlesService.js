import { articles } from "../data/articles.js";

/**
 * Service pour gérer les articles
 * Simule des appels API asynchrones
 */

// Simuler un délai réseau
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const articlesService = {
    /**
     * Récupère tous les articles
     * @param {number} limit - Nombre d'articles à retourner
     * @returns {Promise<Array>}
     */
    async getAll(limit = 10) {
        await delay();
        return Promise.resolve(articles.slice(0, limit));
    },

    /**
     * Récupère un article par son ID
     * @param {number} id - ID de l'article
     * @returns {Promise<Object|null>}
     */
    async getById(id) {
        await delay();
        const article = articles.find((a) => a.id === parseInt(id));
        if (!article) {
            throw new Error(`Article avec l'ID ${id} introuvable`);
        }
        return Promise.resolve(article);
    },

    /**
     * Met à jour un article
     * @param {number} id - ID de l'article
     * @param {Object} data - Données à mettre à jour
     * @returns {Promise<Object>}
     */
    async update(id, data) {
        await delay(800);
        const article = articles.find((a) => a.id === parseInt(id));
        if (!article) {
            throw new Error(`Article avec l'ID ${id} introuvable`);
        }
        const updated = { ...article, ...data };
        // Dans un vrai projet, on ferait un appel API ici
        return Promise.resolve(updated);
    },
};

