/**
 * @param {"danger" | "info" | "warning"} type
 */
export function Alert({ type = "info", children }) {
    const typeClasses = {
        danger: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
        info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
        warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
    };
    
    return (
        <div 
            className={`border-l-4 p-4 rounded-r-lg ${typeClasses[type]}`} 
            role="alert"
        >
            {children}
        </div>
    );
}
