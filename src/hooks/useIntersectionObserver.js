import { useEffect, useRef, useState } from "react";

/**
 * Hook pour détecter quand un élément entre dans le viewport
 * @param {Object} options - Options pour IntersectionObserver
 * @returns {[React.RefObject, boolean]}
 */
export function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting && !hasIntersected) {
                    setHasIntersected(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "50px",
                ...options,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [options, hasIntersected]);

    return [ref, isIntersecting, hasIntersected];
}
