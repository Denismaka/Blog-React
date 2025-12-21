/**
 * Tronque un texte à une longueur maximale
 * @param {string} text - Le texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string}
 */
export function truncateText(text, maxLength = 150) {
    if (!text || text.length <= maxLength) {
        return text || '';
    }
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Formate une date au format français
 * @param {string|Date} date - La date à formater
 * @returns {string}
 */
export function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Capitalise la première lettre d'une chaîne
 * @param {string} str - La chaîne à capitaliser
 * @returns {string}
 */
export function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Nettoie et formate le texte d'un article
 * @param {string} text - Le texte à nettoyer
 * @returns {string}
 */
export function cleanArticleText(text) {
    if (!text) return '';
    // Remplace les \n par des sauts de ligne HTML
    return text.replace(/\n/g, '\n\n');
}

