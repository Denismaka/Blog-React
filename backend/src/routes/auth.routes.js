// ============================================
// ROUTES AUTHENTIFICATION
// ============================================

import express from "express";
import * as authController from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.middleware.js";
import {
    validateRegister,
    validateLogin,
} from "../middleware/validation.middleware.js";

const router = express.Router();

// Routes publiques
router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.post("/refresh", authController.refreshToken);

// Route protégée
router.get("/me", authenticate, authController.getMe);

export default router;

