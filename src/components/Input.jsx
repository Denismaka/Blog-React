import { useId } from "react";

export function Input({ type, label, className = "", error, ...props }) {
    const id = useId();
    const InputComponent = type === "textarea" ? "textarea" : "input";
    const baseInputClasses =
        "w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all";
    const textareaClasses = type === "textarea" ? "min-h-[200px] resize-none" : "";
    const errorClasses = error
        ? "border-danger-500 dark:border-danger-400 focus:ring-danger-500 dark:focus:ring-danger-400"
        : "";

    return (
        <div className="form-control w-full mb-4">
            {label && (
                <label
                    htmlFor={id}
                    className={`label ${
                        type === "textarea" ? "py-2 pb-3" : "py-1"
                    }`}
                >
                    <span className="label-text font-semibold text-neutral-700 dark:text-neutral-300">
                        {label}
                    </span>
                </label>
            )}
            <InputComponent
                className={`${baseInputClasses} ${
                    type === "textarea" ? textareaClasses : ""
                } ${errorClasses} ${className}`.trim()}
                id={id}
                {...props}
            />
            {error && (
                <label className="label py-1">
                    <span className="label-text-alt text-danger-600 dark:text-danger-400">
                        {error}
                    </span>
                </label>
            )}
        </div>
    );
}
