// ============================================
// FONCTIONS UTILITAIRES
// ============================================
// Fonctions réutilisables dans tout le projet

/**
 * Génère un slug à partir d'un titre
 * Exemple: "Mon Super Article" → "mon-super-article"
 *
 * @param {String} text - Texte à convertir en slug
 * @returns {String} Slug généré
 */
export function generateSlug(text) {
    return text
        .toLowerCase() // Mettre en minuscules
        .normalize("NFD") // Normaliser les caractères accentués
        .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
        .replace(/[^a-z0-9]+/g, "-") // Remplacer les caractères spéciaux par des tirets
        .replace(/^-+|-+$/g, ""); // Supprimer les tirets en début/fin
}

/**
 * Tronque un texte à une longueur maximale
 *
 * @param {String} text - Texte à tronquer
 * @param {Number} maxLength - Longueur maximale
 * @returns {String} Texte tronqué
 */
export function truncateText(text, maxLength = 150) {
    if (!text || text.length <= maxLength) {
        return text || "";
    }
    return text.substring(0, maxLength).trim() + "...";
}

/**
 * Génère un ID unique (UUID v4 simplifié)
 *
 * @returns {String} ID unique
 */
export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Formate une date au format français
 *
 * @param {Date} date - Date à formater
 * @returns {String} Date formatée
 */
export function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Valide un email
 *
 * @param {String} email - Email à valider
 * @returns {Boolean} True si valide
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Extrait l'ID depuis un slug
 * Exemple: "123-mon-article" → "123"
 *
 * @param {String} slug - Slug avec ID
 * @returns {String} ID extrait
 */
export function extractIdFromSlug(slug) {
    const match = slug.match(/^(\d+)-/);
    return match ? match[1] : null;
}
