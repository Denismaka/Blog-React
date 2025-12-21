/**
 * @param {"primary" | "secondary" | "danger" | "accent"} variant
 * @returns {JSX.Element}
 */
export function Button({
    variant = "primary",
    className = "",
    disabled,
    children,
    ...props
}) {
    const variantClasses = {
        primary: "btn-gradient-primary text-white border-none",
        secondary: "btn-gradient-secondary text-white border-none",
        danger: "bg-gradient-to-r from-danger-500 to-danger-600 hover:from-danger-600 hover:to-danger-700 text-white border-none shadow-glow",
        accent: "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white border-none",
    };

    const baseClasses = `btn gap-2 font-semibold transition-all duration-300 px-8 py-4 ${
        variantClasses[variant] || variantClasses.primary
    }`;
    const disabledClasses = disabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:scale-105 active:scale-95";
    const combinedClasses =
        `${baseClasses} ${disabledClasses} ${className}`.trim();

    const newProps = {
        ...props,
        className: combinedClasses,
        disabled,
    };

    if (props.href) {
        return (
            <a
                {...newProps}
                className={combinedClasses.replace(
                    "opacity-50 cursor-not-allowed",
                    ""
                )}
            >
                {children}
            </a>
        );
    }
    return <button {...newProps}>{children}</button>;
}
