import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {string} image
 * @param {string} title
 * @param {string} description
 * @param {string} href
 * @param {string} buttonLabel
 * @returns {JSX.Element}
 */
export function Card({ image, title, description, href, buttonLabel }) {
    const showButton = !!(href && buttonLabel);

    return (
        <div className="card-modern hover:scale-105 animate-scale-in group overflow-hidden">
            {image && (
                <figure className="overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img
                        src={image}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        alt={title || ""}
                        loading="lazy"
                    />
                </figure>
            )}
            <div className="p-6 flex flex-col h-full">
                {title && (
                    <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400 line-clamp-2 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors mb-3 px-1">
                        {title}
                    </h2>
                )}
                {description && (
                    <p className="text-neutral-600 dark:text-neutral-300 line-clamp-3 mb-4 flex-grow px-1">
                        {description}
                    </p>
                )}
                {showButton && (
                    <div className="flex justify-end mt-auto pt-2">
                        <Link
                            to={href}
                            className="btn btn-gradient-primary gap-2 text-white border-none px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
                        >
                            {buttonLabel}
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="group-hover/btn:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
