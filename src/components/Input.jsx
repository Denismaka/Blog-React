import { useId } from "react";

export function Input({ type, label, className = "", ...props }) {
    const id = useId();
    const InputComponent = type === "textarea" ? "textarea" : "input";
    const baseInputClasses = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors";
    const textareaClasses = type === "textarea" ? "min-h-[120px] resize-y" : "";
    
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                </label>
            )}
            <InputComponent 
                className={`${baseInputClasses} ${textareaClasses} ${className}`.trim()} 
                id={id} 
                {...props} 
            />
        </div>
    );
}
