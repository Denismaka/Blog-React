import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour gérer le thème (light/dark mode)
 * Persiste le choix dans localStorage et respecte les préférences système
 * @returns {{ theme: string, toggleTheme: () => void, isDark: boolean }}
 */
export function useTheme() {
    // Fonction pour obtenir le thème initial
    const getInitialTheme = () => {
        // Vérifier localStorage d'abord
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            return storedTheme;
        }
        
        // Sinon, vérifier les préférences système
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        
        return "light";
    };

    const [theme, setTheme] = useState(() => getInitialTheme());
    const isDark = theme === "dark";

    useEffect(() => {
        const root = document.documentElement;
        
        // Appliquer ou retirer la classe 'dark' sur l'élément html
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        
        // Sauvegarder dans localStorage
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Écouter les changements de préférences système (optionnel)
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        
        const handleChange = (e) => {
            // Ne changer que si l'utilisateur n'a pas fait de choix manuel
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? "dark" : "light");
            }
        };
        
        // Écouter les changements
        mediaQuery.addEventListener("change", handleChange);
        
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return { theme, toggleTheme, isDark };
}

