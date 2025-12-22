// ============================================
// MIDDLEWARE D'AUTHENTIFICATION
// ============================================
// Ce middleware vérifie si l'utilisateur est authentifié
// S'exécute avant les routes protégées

import { verifyAccessToken } from "../config/jwt.js";
import { UnauthorizedError, ForbiddenError } from "../utils/errors.js";
import prisma from "../config/database.js";

// ============================================
// EXPLICATION : Middleware
// ============================================
// Un middleware est une fonction qui s'exécute avant les routes
// Il peut :
// - Vérifier l'authentification
// - Valider les données
// - Logger les requêtes
// - Modifier la requête/réponse
//
// Dans Express, on utilise app.use() ou router.use() pour ajouter un middleware

/**
 * Middleware pour vérifier l'authentification
 * Vérifie si un token JWT valide est présent dans les headers
 *
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next (passe au middleware suivant)
 */
export async function authenticate(req, res, next) {
    try {
        // Récupérer le token depuis le header Authorization
        // Format: "Bearer <token>"
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError(
                "Token manquant. Veuillez vous connecter."
            );
        }

        // Extraire le token (enlever "Bearer ")
        const token = authHeader.substring(7);

        // Vérifier et décoder le token
        const decoded = verifyAccessToken(token);

        // Récupérer l'utilisateur depuis la base de données
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        if (!user) {
            throw new UnauthorizedError("Utilisateur non trouvé");
        }

        // Ajouter l'utilisateur à la requête pour l'utiliser dans les routes
        req.user = user;

        // Passer au middleware suivant
        next();
    } catch (error) {
        // Si erreur, renvoyer une erreur 401
        next(error);
    }
}

/**
 * Middleware pour vérifier si l'utilisateur a un rôle spécifique
 * Exemple: vérifier si l'utilisateur est ADMIN
 *
 * @param {...String} roles - Rôles autorisés
 * @returns {Function} Middleware
 */
export function authorize(...roles) {
    return (req, res, next) => {
        // Vérifier que l'utilisateur est authentifié
        if (!req.user) {
            return next(new UnauthorizedError("Authentification requise"));
        }

        // Vérifier si l'utilisateur a un des rôles autorisés
        if (!roles.includes(req.user.role)) {
            return next(
                new ForbiddenError("Accès interdit. Rôle insuffisant.")
            );
        }

        next();
    };
}

// ============================================
// EXEMPLE D'UTILISATION
// ============================================
//
// // Protéger une route (nécessite authentification)
// router.get("/profile", authenticate, getProfile);
//
// // Protéger une route (nécessite le rôle ADMIN)
// router.delete("/users/:id", authenticate, authorize("ADMIN"), deleteUser);
//
// // Dans le controller, accéder à l'utilisateur :
// function getProfile(req, res) {
//     const userId = req.user.id; // Utilisateur ajouté par le middleware
//     // ...
// }
