// ============================================
// MIDDLEWARE DE VALIDATION
// ============================================
// Valide les données des requêtes avant de les traiter

import { body, param, query, validationResult } from "express-validator";
import { ValidationError } from "../utils/errors.js";

// ============================================
// EXPLICATION : Validation
// ============================================
// La validation vérifie que les données reçues sont correctes :
// - Format correct (email, URL, etc.)
// - Présence des champs obligatoires
// - Types corrects (string, number, etc.)
// - Longueurs minimales/maximales
//
// Pourquoi valider ?
// - Sécurité : éviter les injections
// - Qualité : s'assurer que les données sont correctes
// - UX : messages d'erreur clairs pour l'utilisateur

/**
 * Middleware pour vérifier les résultats de validation
 * S'exécute après les validators
 */
export function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Formater les erreurs
        const formattedErrors = errors.array().map((error) => ({
            field: error.path || error.param,
            message: error.msg,
        }));

        throw new ValidationError("Données invalides", formattedErrors);
    }

    next();
}

// ============================================
// VALIDATORS POUR LES ARTICLES
// ============================================

export const validateCreateArticle = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Le titre est requis")
        .isLength({ min: 3, max: 200 })
        .withMessage("Le titre doit contenir entre 3 et 200 caractères"),

    body("body")
        .trim()
        .notEmpty()
        .withMessage("Le contenu est requis")
        .isLength({ min: 10 })
        .withMessage("Le contenu doit contenir au moins 10 caractères"),

    body("imageUrl")
        .optional()
        .isURL()
        .withMessage("L'URL de l'image doit être valide"),

    body("excerpt")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Le résumé ne peut pas dépasser 500 caractères"),

    handleValidationErrors,
];

export const validateUpdateArticle = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage("Le titre doit contenir entre 3 et 200 caractères"),

    body("body")
        .optional()
        .trim()
        .isLength({ min: 10 })
        .withMessage("Le contenu doit contenir au moins 10 caractères"),

    body("imageUrl")
        .optional()
        .isURL()
        .withMessage("L'URL de l'image doit être valide"),

    handleValidationErrors,
];

export const validateArticleId = [
    param("id").isUUID().withMessage("ID d'article invalide"),
    handleValidationErrors,
];

// ============================================
// VALIDATORS POUR L'AUTHENTIFICATION
// ============================================

export const validateRegister = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("L'email est requis")
        .isEmail()
        .withMessage("Format d'email invalide")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Le mot de passe est requis")
        .isLength({ min: 8 })
        .withMessage("Le mot de passe doit contenir au moins 8 caractères")
        .matches(/[A-Z]/)
        .withMessage("Le mot de passe doit contenir au moins une majuscule")
        .matches(/[a-z]/)
        .withMessage("Le mot de passe doit contenir au moins une minuscule")
        .matches(/[0-9]/)
        .withMessage("Le mot de passe doit contenir au moins un chiffre"),

    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Le nom doit contenir entre 2 et 100 caractères"),

    handleValidationErrors,
];

export const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("L'email est requis")
        .isEmail()
        .withMessage("Format d'email invalide")
        .normalizeEmail(),

    body("password").notEmpty().withMessage("Le mot de passe est requis"),

    handleValidationErrors,
];

// ============================================
// VALIDATORS POUR LE CONTACT
// ============================================

export const validateContact = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Le nom est requis")
        .isLength({ min: 2, max: 100 })
        .withMessage("Le nom doit contenir entre 2 et 100 caractères"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("L'email est requis")
        .isEmail()
        .withMessage("Format d'email invalide")
        .normalizeEmail(),

    body("message")
        .trim()
        .notEmpty()
        .withMessage("Le message est requis")
        .isLength({ min: 10, max: 2000 })
        .withMessage("Le message doit contenir entre 10 et 2000 caractères"),

    handleValidationErrors,
];

// ============================================
// VALIDATORS POUR LA PAGINATION
// ============================================

export const validatePagination = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Le numéro de page doit être un entier positif")
        .toInt(),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("La limite doit être entre 1 et 100")
        .toInt(),

    handleValidationErrors,
];
