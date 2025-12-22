// ============================================
// CONTROLLER AUTHENTIFICATION
// ============================================
// Gère l'inscription, la connexion, et le profil utilisateur

import * as authService from "../services/authService.js";
import { generateAccessToken } from "../config/jwt.js";
import { verifyRefreshToken } from "../config/jwt.js";

/**
 * POST /api/auth/register
 * Inscrit un nouvel utilisateur
 */
export async function register(req, res, next) {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            success: true,
            data: user,
            message: "Inscription réussie",
        });
    } catch (error) {
        next(error);
    }
}

/**
 * POST /api/auth/login
 * Connecte un utilisateur
 */
export async function login(req, res, next) {
    try {
        const result = await authService.login(req.body);

        res.json({
            success: true,
            data: result,
            message: "Connexion réussie",
        });
    } catch (error) {
        next(error);
    }
}

/**
 * POST /api/auth/refresh
 * Rafraîchit le token d'accès avec un refresh token
 */
export async function refreshToken(req, res, next) {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "Refresh token requis",
                },
            });
        }

        // Vérifier le refresh token
        const decoded = verifyRefreshToken(refreshToken);

        // Générer un nouveau token d'accès
        const accessToken = generateAccessToken({
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        });

        res.json({
            success: true,
            data: {
                accessToken,
            },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/auth/me
 * Récupère les informations de l'utilisateur connecté
 */
export async function getMe(req, res, next) {
    try {
        // req.user est ajouté par le middleware authenticate
        const user = await authService.getUserById(req.user.id);

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

