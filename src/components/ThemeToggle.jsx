import { useTheme } from "../hooks/useTheme.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

/**
 * Composant pour basculer entre le mode clair et sombre
 * Affiche une icône animée selon le thème actuel
 */
export function ThemeToggle() {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost relative group text-white hover:bg-white/10 px-3 py-2"
            aria-label={`Basculer vers le mode ${isDark ? "clair" : "sombre"}`}
            title={`Mode ${isDark ? "sombre" : "clair"} actif`}
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                {/* Icône soleil (mode clair) */}
                <FontAwesomeIcon
                    icon={faSun}
                    className={`absolute inset-0 w-5 h-5 text-warning-300 dark:text-warning-400 transition-all duration-500 ${
                        isDark
                            ? "opacity-0 rotate-90 scale-0"
                            : "opacity-100 rotate-0 scale-100"
                    }`}
                />
                {/* Icône lune (mode sombre) */}
                <FontAwesomeIcon
                    icon={faMoon}
                    className={`absolute inset-0 w-5 h-5 text-white dark:text-primary-200 transition-all duration-500 ${
                        isDark
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 -rotate-90 scale-0"
                    }`}
                />
            </div>
            {/* Effet de glow au hover */}
            <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
        </button>
    );
}
