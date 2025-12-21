/**
 * Composant Skeleton pour les états de chargement
 */
export function Skeleton({ className = "", variant = "default" }) {
    const variants = {
        default: "h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse",
        text: "h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse",
        title: "h-8 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse",
        avatar: "w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse",
        card: "h-48 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse",
        button: "h-10 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse",
    };

    return <div className={`${variants[variant] || variants.default} ${className}`} />;
}

/**
 * Skeleton pour une carte d'article
 */
export function CardSkeleton() {
    return (
        <div className="card-modern animate-pulse overflow-hidden">
            <div className="h-48 bg-neutral-200 dark:bg-neutral-700" />
            <div className="p-6 space-y-4">
                <Skeleton variant="title" className="w-3/4" />
                <div className="space-y-2">
                    <Skeleton variant="text" className="w-full" />
                    <Skeleton variant="text" className="w-full" />
                    <Skeleton variant="text" className="w-5/6" />
                </div>
                <div className="flex justify-end">
                    <Skeleton variant="button" />
                </div>
            </div>
        </div>
    );
}

/**
 * Skeleton pour la liste d'articles
 */
export function ArticlesSkeleton({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    );
}

/**
 * Skeleton pour un article complet
 */
export function ArticleSkeleton() {
    return (
        <article className="max-w-4xl mx-auto animate-fade-in">
            <div className="space-y-6">
                <div className="space-y-4">
                    <Skeleton variant="title" className="w-3/4 h-12" />
                    <div className="flex gap-4">
                        <Skeleton variant="button" className="w-32" />
                        <Skeleton variant="button" className="w-32" />
                    </div>
                </div>
                <Skeleton variant="card" className="h-96" />
                <div className="space-y-4">
                    <Skeleton variant="text" className="w-full" />
                    <Skeleton variant="text" className="w-full" />
                    <Skeleton variant="text" className="w-full" />
                    <Skeleton variant="text" className="w-5/6" />
                </div>
            </div>
        </article>
    );
}

