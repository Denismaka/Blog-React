// ============================================
// CONFIGURATION DE LA BASE DE DONNÉES
// ============================================
// Ce fichier configure la connexion à PostgreSQL via Prisma

import { PrismaClient } from "@prisma/client";

// ============================================
// EXPLICATION : PrismaClient
// ============================================
// PrismaClient est un client qui permet d'interagir avec la base de données
// Il est généré automatiquement à partir du fichier schema.prisma
// Il fournit des méthodes pour créer, lire, modifier, supprimer des données

// Créer une instance unique de PrismaClient
// Le pattern singleton évite de créer plusieurs connexions
const prisma = new PrismaClient({
    // Options de logging (utile en développement)
    log:
        process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
});

// ============================================
// GESTION DE LA CONNEXION
// ============================================

// Fonction pour se connecter à la base de données
export async function connectDatabase() {
    try {
        // Tester la connexion
        await prisma.$connect();
        console.log("✅ Connexion à la base de données réussie");
        return prisma;
    } catch (error) {
        console.error("❌ Erreur de connexion à la base de données:", error);
        throw error;
    }
}

// Fonction pour déconnecter proprement
export async function disconnectDatabase() {
    try {
        await prisma.$disconnect();
        console.log("✅ Déconnexion de la base de données réussie");
    } catch (error) {
        console.error("❌ Erreur de déconnexion:", error);
        throw error;
    }
}

// Export du client Prisma pour l'utiliser dans les autres fichiers
export default prisma;
