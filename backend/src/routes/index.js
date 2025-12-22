// ============================================
// ROUTES PRINCIPALES
// ============================================
// Centralise toutes les routes de l'API

import express from "express";
import articlesRoutes from "./articles.routes.js";
import authRoutes from "./auth.routes.js";
import contactRoutes from "./contact.routes.js";

const router = express.Router();

// Route de santé (health check)
router.get("/health", (req, res) => {
    res.json({
        success: true,
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

// Routes de l'API
router.use("/articles", articlesRoutes);
router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);

export default router;

