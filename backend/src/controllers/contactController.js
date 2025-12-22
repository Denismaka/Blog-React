// ============================================
// CONTROLLER CONTACT
// ============================================
// Gère les messages de contact

import * as contactService from "../services/contactService.js";

/**
 * POST /api/contact
 * Crée un nouveau message de contact
 */
export async function createContactMessage(req, res, next) {
    try {
        const message = await contactService.createContactMessage(req.body);

        res.status(201).json({
            success: true,
            data: message,
            message: "Message envoyé avec succès",
        });
    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/contact
 * Récupère tous les messages (admin seulement)
 */
export async function getAllContactMessages(req, res, next) {
    try {
        const { page, limit, read } = req.query;

        const result = await contactService.getAllContactMessages({
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined,
            read: read !== undefined ? read === "true" : undefined,
        });

        res.json({
            success: true,
            data: result.messages,
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * PUT /api/contact/:id/read
 * Marque un message comme lu (admin seulement)
 */
export async function markMessageAsRead(req, res, next) {
    try {
        const { id } = req.params;
        const message = await contactService.markMessageAsRead(id);

        res.json({
            success: true,
            data: message,
            message: "Message marqué comme lu",
        });
    } catch (error) {
        next(error);
    }
}
