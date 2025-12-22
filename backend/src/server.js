// ============================================
// SERVEUR PRINCIPAL
// ============================================
// Point d'entrée de l'application backend
// Configure Express et démarre le serveur

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { errorHandler } from "./utils/errors.js";
import apiRoutes from "./routes/index.js";

// ============================================
// EXPLICATION : Serveur Express
// ============================================
// Express est un framework web minimaliste pour Node.js
// Il permet de créer des APIs REST facilement
//
// Structure :
// 1. Créer une app Express
// 2. Configurer les middlewares (CORS, sécurité, etc.)
// 3. Ajouter les routes
// 4. Démarrer le serveur

// Charger les variables d'environnement depuis .env
dotenv.config();

// Créer l'application Express
const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// ============================================
// MIDDLEWARES GLOBAUX
// ============================================

// Helmet : Sécurise les headers HTTP
// Protège contre certaines vulnérabilités courantes
app.use(helmet());

// CORS : Autorise les requêtes depuis le front-end
// Sans ça, le navigateur bloquerait les requêtes
app.use(
    cors({
        origin: FRONTEND_URL, // URL du front-end React
        credentials: true, // Autoriser les cookies
    })
);

// Morgan : Logger les requêtes HTTP
// Utile pour le debugging (affiche les requêtes dans la console)
app.use(morgan("dev"));

// Rate Limiting : Limite le nombre de requêtes
// Protège contre les attaques DDoS et brute force
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requêtes max
    message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
});
app.use("/api/", limiter);

// Parser JSON : Parse le body des requêtes en JSON
// Permet d'accéder à req.body dans les controllers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROUTES
// ============================================

// Route de base
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Bienvenue sur l'API du Blog React",
        version: "1.0.0",
        endpoints: {
            health: "/api/health",
            articles: "/api/articles",
            auth: "/api/auth",
            contact: "/api/contact",
        },
    });
});

// Routes de l'API
app.use("/api", apiRoutes);

// Route 404 (si aucune route ne correspond)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: "Route non trouvée",
            path: req.path,
        },
    });
});

// ============================================
// GESTION D'ERREURS
// ============================================
// Doit être le dernier middleware
// Capture toutes les erreurs non gérées
app.use(errorHandler);

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

async function startServer() {
    try {
        // Se connecter à la base de données
        await connectDatabase();

        // Démarrer le serveur
        app.listen(PORT, () => {
            console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🚀 Serveur démarré avec succès !                      ║
║                                                          ║
║   📍 URL: http://localhost:${PORT}                          ║
║   🌍 Environnement: ${
                process.env.NODE_ENV || "development"
            }                    ║
║   📊 Health Check: http://localhost:${PORT}/api/health       ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
            `);
        });
    } catch (error) {
        console.error("❌ Erreur lors du démarrage du serveur:", error);
        process.exit(1);
    }
}

// Gestion de l'arrêt propre du serveur
process.on("SIGTERM", async () => {
    console.log("🛑 Arrêt du serveur...");
    await disconnectDatabase();
    process.exit(0);
});

process.on("SIGINT", async () => {
    console.log("🛑 Arrêt du serveur...");
    await disconnectDatabase();
    process.exit(0);
});

// Démarrer le serveur
startServer();
