import { useIntersectionObserver } from "../hooks/useIntersectionObserver.js";

/**
 * Composant qui révèle son contenu au scroll
 */
export function ScrollReveal({
    children,
    className = "",
    animation = "fade-in",
    delay = 0,
}) {
    const [ref, , hasIntersected] = useIntersectionObserver();

    return (
        <div
            ref={ref}
            className={`${className} ${
                hasIntersected
                    ? `animate-${animation} opacity-100`
                    : "opacity-0"
            } transition-opacity duration-700`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

