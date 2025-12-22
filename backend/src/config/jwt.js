// ============================================
// CONFIGURATION JWT (JSON Web Tokens)
// ============================================
// JWT est un système d'authentification sans session
// Un token contient des informations cryptées sur l'utilisateur

import jwt from "jsonwebtoken";

// ============================================
// EXPLICATION : JWT
// ============================================
// JWT permet de créer des tokens qui contiennent des informations
// Ces tokens sont signés avec un secret pour éviter la falsification
//
// Structure d'un JWT :
// - Header : Type de token et algorithme
// - Payload : Données (ex: userId, email)
// - Signature : Vérification de l'authenticité
//
// Avantages :
// - Stateless (pas besoin de stocker les sessions)
// - Scalable (fonctionne avec plusieurs serveurs)
// - Portable (peut être utilisé sur mobile, web, etc.)

// ============================================
// CONFIGURATION
// ============================================

// Secrets pour signer les tokens (à garder SECRET !)
const JWT_SECRET = process.env.JWT_SECRET || "changez_moi_en_production";
const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET || "changez_moi_aussi";

// Durée de vie des tokens (en secondes)
const JWT_EXPIRE = parseInt(process.env.JWT_EXPIRE) || 3600; // 1 heure
const JWT_REFRESH_EXPIRE = parseInt(process.env.JWT_REFRESH_EXPIRE) || 604800; // 7 jours

// ============================================
// FONCTIONS DE GÉNÉRATION DE TOKENS
// ============================================

/**
 * Génère un token d'accès (Access Token)
 * Utilisé pour authentifier les requêtes API
 * Durée de vie courte (1 heure)
 *
 * @param {Object} payload - Données à inclure dans le token (userId, email, role)
 * @returns {String} Token JWT
 */
export function generateAccessToken(payload) {
    return jwt.sign(
        payload, // Données à encoder
        JWT_SECRET, // Secret pour signer
        { expiresIn: JWT_EXPIRE } // Durée de vie
    );
}

/**
 * Génère un token de rafraîchissement (Refresh Token)
 * Utilisé pour obtenir un nouveau token d'accès
 * Durée de vie longue (7 jours)
 *
 * @param {Object} payload - Données à inclure
 * @returns {String} Refresh token JWT
 */
export function generateRefreshToken(payload) {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRE,
    });
}

/**
 * Vérifie et décode un token d'accès
 *
 * @param {String} token - Token à vérifier
 * @returns {Object} Données décodées (payload)
 * @throws {Error} Si le token est invalide ou expiré
 */
export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error("Token invalide ou expiré");
    }
}

/**
 * Vérifie et décode un refresh token
 *
 * @param {String} token - Refresh token à vérifier
 * @returns {Object} Données décodées
 * @throws {Error} Si le token est invalide ou expiré
 */
export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        throw new Error("Refresh token invalide ou expiré");
    }
}

// ============================================
// EXEMPLE D'UTILISATION
// ============================================
//
// // Générer un token
// const token = generateAccessToken({ userId: "123", email: "user@example.com" });
//
// // Vérifier un token
// const decoded = verifyAccessToken(token);
// console.log(decoded.userId); // "123"
//
// // Dans une requête HTTP, envoyer le token dans le header :
// // Authorization: Bearer <token>
