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
        <nav className="navbar navbar-expand-lg" style={{background: "linear-gradient(90deg, #fdf4ff 0%, #d946ef 50%, #701a75 100%)"}}>
            <div className="container-fluid">
                <a className="navbar-brand fw-bold text-white" href="#">
                    <FontAwesomeIcon icon={faHome} className="me-2" />
                    MonBlog
                </a>
                <button
                    onClick={toggleExpanded}
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded={expanded}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse ${
                        expanded ? "show" : ""
                    }`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className={activeClassIf(
                                    page === "home",
                                    "nav-link"
                                )}
                                aria-current="page"
                                href="#"
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={activeClassIf(
                                    page === "contact",
                                    "nav-link"
                                )}
                                href="#contact"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
