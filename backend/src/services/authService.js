// ============================================
// SERVICE AUTHENTIFICATION
// ============================================
// Gère l'authentification des utilisateurs

import bcrypt from "bcryptjs";
import prisma from "../config/database.js";
import { generateAccessToken, generateRefreshToken } from "../config/jwt.js";
import { ConflictError, UnauthorizedError } from "../utils/errors.js";

// ============================================
// EXPLICATION : Bcrypt
// ============================================
// Bcrypt est une bibliothèque pour hasher les mots de passe
//
// Pourquoi hasher ?
// - Sécurité : les mots de passe ne sont JAMAIS stockés en clair
// - Protection : même si la DB est compromise, les mots de passe sont protégés
//
// Comment ça marche ?
// 1. L'utilisateur s'inscrit avec un mot de passe
// 2. On hash le mot de passe avec bcrypt
// 3. On stocke le hash dans la DB (jamais le mot de passe en clair)
// 4. À la connexion, on compare le hash avec le mot de passe fourni

/**
 * Inscrit un nouvel utilisateur
 *
 * @param {Object} data - Données d'inscription
 * @param {String} data.email - Email
 * @param {String} data.password - Mot de passe (en clair)
 * @param {String} [data.name] - Nom
 * @returns {Object} Utilisateur créé (sans mot de passe)
 * @throws {ConflictError} Si l'email existe déjà
 */
export async function register(data) {
    const { email, password, name } = data;

    // Vérifier si l'email existe déjà
    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (existing) {
        throw new ConflictError("Cet email est déjà utilisé");
    }

    // Hasher le mot de passe
    // saltRounds = 12 signifie qu'on hash 2^12 fois (4096 fois)
    // Plus c'est élevé, plus c'est sécurisé mais plus c'est lent
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword, // Stocker le hash, JAMAIS le mot de passe en clair
            name,
        },
        select: {
            // Ne pas retourner le mot de passe (même hashé)
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
    });

    return user;
}

/**
 * Connecte un utilisateur
 *
 * @param {Object} credentials - Identifiants
 * @param {String} credentials.email - Email
 * @param {String} credentials.password - Mot de passe
 * @returns {Object} Tokens et informations utilisateur
 * @throws {UnauthorizedError} Si les identifiants sont incorrects
 */
export async function login(credentials) {
    const { email, password } = credentials;

    // Trouver l'utilisateur par email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new UnauthorizedError("Email ou mot de passe incorrect");
    }

    // Vérifier le mot de passe
    // bcrypt.compare compare le mot de passe fourni avec le hash stocké
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new UnauthorizedError("Email ou mot de passe incorrect");
    }

    // Générer les tokens JWT
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Retourner les tokens et les infos utilisateur (sans mot de passe)
    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };
}

/**
 * Récupère les informations d'un utilisateur
 *
 * @param {String} userId - ID de l'utilisateur
 * @returns {Object} Informations utilisateur
 * @throws {NotFoundError} Si l'utilisateur n'existe pas
 */
export async function getUserById(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new NotFoundError("Utilisateur");
    }

    return user;
}
