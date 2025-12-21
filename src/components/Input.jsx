import { useId } from "react";

export function Input({ type, label, className = "", error, ...props }) {
    const id = useId();
    const InputComponent = type === "textarea" ? "textarea" : "input";
    const baseInputClasses = "input input-bordered w-full focus:input-primary transition-all";
    const textareaClasses = type === "textarea" ? "textarea textarea-bordered min-h-[120px] resize-y focus:textarea-primary" : "";
    const errorClasses = error ? "input-error" : "";
    
    return (
        <div className="form-control w-full mb-4">
            {label && (
                <label htmlFor={id} className="label">
                    <span className="label-text font-semibold">{label}</span>
                </label>
            )}
            <InputComponent 
                className={`${type === "textarea" ? textareaClasses : baseInputClasses} ${errorClasses} ${className}`.trim()} 
                id={id} 
                {...props} 
            />
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
}
