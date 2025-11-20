import { useState } from "react";
import { useToggle } from "../hooks/useToggle.js";
import { activeClassIf } from "../utils/classnames.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {string} page
 */
export function Header({ page }) {
    const [expanded, toggleExpanded] = useToggle(false);

    return (
        <nav className="bg-gradient-to-r from-purple-50 via-purple-500 to-purple-900 shadow-lg">
            <div className="app-container">
                <div className="flex items-center justify-between py-4">
                    <a className="flex items-center gap-2 text-white font-bold text-xl hover:text-purple-100 transition-colors" href="#">
                        <FontAwesomeIcon icon={faHome} />
                        MonBlog
                    </a>
                    <button
                        onClick={toggleExpanded}
                        className="md:hidden text-white p-2 hover:bg-purple-800 rounded-lg transition-colors"
                        type="button"
                        aria-expanded={expanded}
                        aria-label="Toggle navigation"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div
                        className={`${
                            expanded ? "block" : "hidden"
                        } md:flex md:items-center md:space-x-1 w-full md:w-auto mt-4 md:mt-0`}
                    >
                        <ul className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                            <li>
                                <a
                                    className={activeClassIf(
                                        page === "home",
                                        "block px-4 py-2 rounded-lg text-white font-medium transition-colors hover:bg-purple-800"
                                    )}
                                    aria-current={page === "home" ? "page" : undefined}
                                    href="#"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    className={activeClassIf(
                                        page === "contact",
                                        "block px-4 py-2 rounded-lg text-white font-medium transition-colors hover:bg-purple-800"
                                    )}
                                    href="#contact"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
