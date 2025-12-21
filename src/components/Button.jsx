/**
 * @param {"primary" | "secondary" | "danger" | "accent"} variant
 * @returns {JSX.Element}
 */
export function Button({ variant = "primary", className = "", disabled, children, ...props }) {
    const variantMap = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        danger: "btn-error",
        accent: "btn-accent",
    };
    
    const baseClasses = `btn ${variantMap[variant]} gap-2`;
    const disabledClasses = disabled ? "btn-disabled" : "hover:scale-105 active:scale-95";
    const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`.trim();
    
    const newProps = {
        ...props,
        className: combinedClasses,
        disabled,
    };
    
    if (props.href) {
        return (
            <a {...newProps} className={combinedClasses.replace("btn-disabled", "")}>
                {children}
            </a>
        );
    }
    return <button {...newProps}>{children}</button>;
}
