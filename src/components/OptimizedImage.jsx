import { useState, useEffect } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver.js";

/**
 * Composant d'image optimisée avec lazy loading
 */
export function OptimizedImage({
    src,
    alt = "",
    className = "",
    placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3C/svg%3E",
    ...props
}) {
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ref, isIntersecting] = useIntersectionObserver();

    // Charger l'image quand elle entre dans le viewport
    useEffect(() => {
        if (isIntersecting && imageSrc === placeholder) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setImageSrc(src);
                setIsLoaded(true);
            };
            img.onerror = () => {
                // En cas d'erreur, garder le placeholder
                console.error(`Erreur de chargement de l'image: ${src}`);
            };
        }
    }, [isIntersecting, src, imageSrc, placeholder]);

    return (
        <img
            ref={ref}
            src={imageSrc}
            alt={alt}
            className={`${className} ${
                isLoaded ? "opacity-100" : "opacity-50"
            } transition-opacity duration-300`}
            loading="lazy"
            {...props}
        />
    );
}
