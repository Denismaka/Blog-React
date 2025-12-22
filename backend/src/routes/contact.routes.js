// ============================================
// ROUTES CONTACT
// ============================================

import express from "express";
import * as contactController from "../controllers/contactController.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
    validateContact,
    validatePagination,
} from "../middleware/validation.middleware.js";

const router = express.Router();

// Route publique
router.post("/", validateContact, contactController.createContactMessage);

// Routes protégées (admin seulement)
router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    validatePagination,
    contactController.getAllContactMessages
);
router.put(
    "/:id/read",
    authenticate,
    authorize("ADMIN"),
    contactController.markMessageAsRead
);

export default router;
