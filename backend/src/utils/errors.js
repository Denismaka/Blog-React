// ============================================
// GESTION DES ERREURS
// ============================================
// Ce fichier contient des classes d'erreur personnalisées
// et des fonctions pour gérer les erreurs de manière cohérente

// ============================================
// EXPLICATION : Gestion d'Erreurs
// ============================================
// Au lieu d'utiliser des erreurs génériques, on crée des classes spécifiques
// Cela permet de :
// - Avoir des messages d'erreur cohérents
// - Gérer différents types d'erreurs différemment
// - Faciliter le debugging

// ============================================
// CLASSES D'ERREUR PERSONNALISÉES
// ============================================

/**
 * Erreur personnalisée pour les erreurs de validation
 * Status code: 400 (Bad Request)
 */
export class ValidationError extends Error {
    constructor(message, errors = []) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
        this.errors = errors; // Détails des erreurs de validation
    }
}

/**
 * Erreur personnalisée pour les ressources non trouvées
 * Status code: 404 (Not Found)
 */
export class NotFoundError extends Error {
    constructor(resource = "Ressource") {
        super(`${resource} non trouvé(e)`);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

/**
 * Erreur personnalisée pour les erreurs d'authentification
 * Status code: 401 (Unauthorized)
 */
export class UnauthorizedError extends Error {
    constructor(message = "Non autorisé") {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

/**
 * Erreur personnalisée pour les erreurs d'autorisation
 * Status code: 403 (Forbidden)
 */
export class ForbiddenError extends Error {
    constructor(message = "Accès interdit") {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = 403;
    }
}

/**
 * Erreur personnalisée pour les conflits (ex: email déjà utilisé)
 * Status code: 409 (Conflict)
 */
export class ConflictError extends Error {
    constructor(message = "Conflit") {
        super(message);
        this.name = "ConflictError";
        this.statusCode = 409;
    }
}

// ============================================
// FONCTION DE GESTION D'ERREURS
// ============================================

/**
 * Middleware pour gérer toutes les erreurs
 * S'exécute automatiquement quand une erreur est levée
 *
 * @param {Error} err - L'erreur à gérer
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next
 */
export function errorHandler(err, req, res, next) {
    // Log de l'erreur (pour le debugging)
    console.error("❌ Erreur:", err);

    // Si c'est une de nos erreurs personnalisées
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                message: err.message,
                ...(err.errors && { errors: err.errors }), // Ajouter les détails si présents
            },
        });
    }

    // Erreur Prisma (base de données)
    if (err.code === "P2002") {
        // Erreur de contrainte unique (ex: email déjà utilisé)
        return res.status(409).json({
            success: false,
            error: {
                message: "Cette ressource existe déjà",
            },
        });
    }

    // Erreur Prisma : ressource non trouvée
    if (err.code === "P2025") {
        return res.status(404).json({
            success: false,
            error: {
                message: "Ressource non trouvée",
            },
        });
    }

    // Erreur JWT
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            error: {
                message: "Token invalide",
            },
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            error: {
                message: "Token expiré",
            },
        });
    }

    // Erreur par défaut (500 - Internal Server Error)
    res.status(500).json({
        success: false,
        error: {
            message:
                process.env.NODE_ENV === "development"
                    ? err.message
                    : "Une erreur serveur est survenue",
        },
    });
}

// ============================================
// EXEMPLE D'UTILISATION
// ============================================
//
// // Dans un controller :
// if (!article) {
//     throw new NotFoundError("Article");
// }
//
// // Si validation échoue :
// throw new ValidationError("Données invalides", [
//     { field: "email", message: "Email invalide" }
// ]);
