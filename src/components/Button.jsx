/**
 * @param {"primary" | "secondary" | "danger"} variant
 * @returns {JSX.Element}
 */
export function Button({ variant = "primary", className = "", disabled, ...props }) {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variantClasses = {
        primary: "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 focus:ring-purple-500 shadow-md hover:shadow-lg",
        secondary: "bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600 focus:ring-purple-400 shadow-md hover:shadow-lg",
        danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-md hover:shadow-lg",
    };
    
    const disabledClasses = disabled 
        ? "opacity-50 cursor-not-allowed" 
        : "transform hover:-translate-y-0.5 active:translate-y-0";
    
    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`.trim();
    
    const newProps = {
        ...props,
        className: combinedClasses,
        disabled,
    };
    
    if (props.href) {
        return <a {...newProps} className={combinedClasses.replace("cursor-not-allowed", "")} />;
    }
    return <button {...newProps} />;
}
