import { useState } from "react";
import { useToggle } from "../hooks/useToggle.js";
import { activeClassIf } from "../utils/classnames.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHome, 
    faEnvelope, 
    faBars, 
    faXmark,
    faNewspaper,
    faAddressCard
} from "@fortawesome/free-solid-svg-icons";

/**
 * @param {string} page
 */
export function Header({ page }) {
    const [expanded, toggleExpanded] = useToggle(false);

    return (
        <nav className="navbar bg-primary text-primary-content shadow-lg sticky top-0 z-50 animate-slide-down">
            <div className="app-container w-full">
                <div className="flex-1">
                    <a 
                        className="btn btn-ghost normal-case text-xl gap-2 hover:scale-105 transition-transform" 
                        href="#"
                    >
                        <FontAwesomeIcon icon={faNewspaper} className="text-secondary" />
                        <span className="font-bold">MonBlog</span>
                    </a>
                </div>
                <div className="flex-none">
                    <button
                        onClick={toggleExpanded}
                        className="btn btn-square btn-ghost md:hidden"
                        type="button"
                        aria-expanded={expanded}
                        aria-label="Toggle navigation"
                    >
                        <FontAwesomeIcon 
                            icon={expanded ? faXmark : faBars} 
                            className="w-5 h-5 transition-transform"
                        />
                    </button>
                    <ul className={`menu menu-horizontal px-1 gap-2 ${
                        expanded ? "flex flex-col absolute top-full left-0 right-0 bg-primary shadow-lg p-4" : "hidden"
                    } md:flex md:flex-row md:relative md:bg-transparent md:shadow-none md:p-0`}>
                        <li>
                            <a
                                className={activeClassIf(
                                    page === "home",
                                    "gap-2 hover:bg-secondary/20 rounded-lg transition-all hover:scale-105"
                                )}
                                aria-current={page === "home" ? "page" : undefined}
                                href="#"
                            >
                                <FontAwesomeIcon icon={faHome} />
                                Accueil
                            </a>
                        </li>
                        <li>
                            <a
                                className={activeClassIf(
                                    page === "contact",
                                    "gap-2 hover:bg-secondary/20 rounded-lg transition-all hover:scale-105"
                                )}
                                href="#contact"
                            >
                                <FontAwesomeIcon icon={faAddressCard} />
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
