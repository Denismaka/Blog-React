import { useToggle } from "../hooks/useToggle.js";
import { activeClassIf } from "../utils/classnames.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBars,
    faXmark,
    faNewspaper,
    faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeToggle } from "./ThemeToggle.jsx";

/**
 * @param {string} page
 */
export function Header({ page }) {
    const [expanded, toggleExpanded] = useToggle(false);

    return (
        <nav className="navbar bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 text-white shadow-lg sticky top-0 z-50 animate-slide-down backdrop-blur-sm">
            <div className="app-container w-full flex items-center justify-between">
                {/* Logo à gauche */}
                <div className="flex items-center">
                    <a
                        className="btn btn-ghost normal-case text-xl gap-2 hover:scale-105 transition-transform text-white hover:bg-white/10 px-4 py-2"
                        href="#"
                    >
                        <FontAwesomeIcon
                            icon={faNewspaper}
                            className="text-secondary-300 dark:text-secondary-400"
                        />
                        <span className="font-bold font-display">MonBlog</span>
                    </a>
                </div>

                {/* Navigation au centre */}
                <div className="flex-1 flex justify-center">
                    <ul className="hidden md:flex md:flex-row md:items-center md:gap-2">
                        <li>
                            <a
                                className={activeClassIf(
                                    page === "home",
                                    "gap-2 hover:bg-white/20 rounded-lg transition-all hover:scale-105 text-white px-4 py-2 flex items-center"
                                )}
                                aria-current={
                                    page === "home" ? "page" : undefined
                                }
                                href="#"
                            >
                                <FontAwesomeIcon icon={faHome} />
                                <span>Accueil</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className={activeClassIf(
                                    page === "contact",
                                    "gap-2 hover:bg-white/20 rounded-lg transition-all hover:scale-105 text-white px-4 py-2 flex items-center"
                                )}
                                href="#contact"
                            >
                                <FontAwesomeIcon icon={faAddressCard} />
                                <span>Contact</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* ThemeToggle à droite */}
                <div className="flex items-center gap-2">
                    {/* Toggle du thème - à droite */}
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>

                    {/* Menu mobile */}
                    <button
                        onClick={toggleExpanded}
                        className="btn btn-square btn-ghost md:hidden text-white hover:bg-white/10"
                        type="button"
                        aria-expanded={expanded}
                        aria-label="Toggle navigation"
                    >
                        <FontAwesomeIcon
                            icon={expanded ? faXmark : faBars}
                            className="w-5 h-5 transition-transform"
                        />
                    </button>

                    {/* Menu mobile déroulant */}
                    {expanded && (
                        <div className="absolute top-full left-0 right-0 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 shadow-lg p-4 backdrop-blur-sm md:hidden">
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <a
                                        className={activeClassIf(
                                            page === "home",
                                            "gap-2 hover:bg-white/20 rounded-lg transition-all text-white px-4 py-2 flex items-center"
                                        )}
                                        aria-current={
                                            page === "home" ? "page" : undefined
                                        }
                                        href="#"
                                        onClick={toggleExpanded}
                                    >
                                        <FontAwesomeIcon icon={faHome} />
                                        <span>Accueil</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className={activeClassIf(
                                            page === "contact",
                                            "gap-2 hover:bg-white/20 rounded-lg transition-all text-white px-4 py-2 flex items-center"
                                        )}
                                        href="#contact"
                                        onClick={toggleExpanded}
                                    >
                                        <FontAwesomeIcon icon={faAddressCard} />
                                        <span>Contact</span>
                                    </a>
                                </li>
                                <li className="pt-2 border-t border-white/20">
                                    <div className="px-4 py-2">
                                        <ThemeToggle />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
