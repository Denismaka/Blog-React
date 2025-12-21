export function Spinner({ size = "lg" }) {
    const sizeMap = {
        sm: "loading-sm",
        md: "loading-md",
        lg: "loading-lg",
    };

    return (
        <div
            className="flex flex-col justify-center items-center py-12 gap-4 animate-fade-in"
            role="status"
            aria-label="Chargement en cours"
        >
            <div
                className={`loading loading-spinner ${sizeMap[size]} text-primary-600 dark:text-primary-400`}
            ></div>
            <span className="text-neutral-600 dark:text-neutral-400 text-sm animate-pulse">
                Chargement...
            </span>
        </div>
    );
}
