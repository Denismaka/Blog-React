// ============================================
// SERVICE CONTACT
// ============================================
// Gère les messages de contact

import prisma from "../config/database.js";
import { NotFoundError } from "../utils/errors.js";

/**
 * Crée un nouveau message de contact
 *
 * @param {Object} data - Données du message
 * @param {String} data.name - Nom de l'expéditeur
 * @param {String} data.email - Email
 * @param {String} data.message - Message
 * @returns {Object} Message créé
 */
export async function createContactMessage(data) {
    const { name, email, message } = data;

    const contactMessage = await prisma.contactMessage.create({
        data: {
            name,
            email,
            message,
        },
    });

    return contactMessage;
}

/**
 * Récupère tous les messages de contact
 *
 * @param {Object} options - Options de pagination
 * @returns {Object} Messages et pagination
 */
export async function getAllContactMessages(options = {}) {
    const { page = 1, limit = 20, read = null } = options;
    const skip = (page - 1) * limit;

    const where = {};
    if (read !== null) {
        where.read = read;
    }

    const [messages, total] = await Promise.all([
        prisma.contactMessage.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma.contactMessage.count({ where }),
    ]);

    return {
        messages,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}

/**
 * Marque un message comme lu
 *
 * @param {String} id - ID du message
 * @returns {Object} Message mis à jour
 * @throws {NotFoundError} Si le message n'existe pas
 */
export async function markMessageAsRead(id) {
    const message = await prisma.contactMessage.findUnique({
        where: { id },
    });

    if (!message) {
        throw new NotFoundError("Message");
    }

    return await prisma.contactMessage.update({
        where: { id },
        data: { read: true },
    });
}
