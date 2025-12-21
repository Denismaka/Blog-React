export function Spinner({ size = "lg" }) {
    const sizeMap = {
        sm: "loading-sm",
        md: "loading-md",
        lg: "loading-lg",
    };
    
    return (
        <div className="flex flex-col justify-center items-center py-12 gap-4 animate-fade-in" role="status">
            <div className={`loading loading-spinner ${sizeMap[size]} text-primary`}></div>
            <span className="text-base-content/60 text-sm animate-pulse">Chargement...</span>
        </div>
    );
}
