import { Button } from "./Button.jsx";

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
        <div className="card-elevated hover:shadow-xl transition-shadow duration-300">
            {image && (
                <img 
                    src={image} 
                    className="w-full h-48 object-cover" 
                    alt={title || ""} 
                />
            )}
            <div className="p-6">
                {title && (
                    <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {title}
                    </h5>
                )}
                {description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {description}
                    </p>
                )}
                {showButton && (
                    <Button variant="primary" href={href}>
                        {buttonLabel}
                    </Button>
                )}
            </div>
        </div>
    );
}
