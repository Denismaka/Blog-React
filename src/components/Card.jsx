import { Button } from "./Button.jsx";
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
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in group">
            {image && (
                <figure className="overflow-hidden">
                    <img 
                        src={image} 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt={title || ""} 
                    />
                </figure>
            )}
            <div className="card-body">
                {title && (
                    <h2 className="card-title text-primary line-clamp-2 group-hover:text-secondary transition-colors">
                        {title}
                    </h2>
                )}
                {description && (
                    <p className="text-base-content/70 line-clamp-3">
                        {description}
                    </p>
                )}
                {showButton && (
                    <div className="card-actions justify-end mt-4">
                        <Button variant="primary" href={href} className="group/btn">
                            {buttonLabel}
                            <FontAwesomeIcon 
                                icon={faArrowRight} 
                                className="group-hover/btn:translate-x-1 transition-transform"
                            />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
