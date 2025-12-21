import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTriangleExclamation, faCircleExclamation, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {"error" | "info" | "warning" | "success"} type
 */
export function Alert({ type = "info", children, className = "" }) {
    const typeMap = {
        error: {
            class: "alert-error",
            icon: faCircleExclamation,
        },
        info: {
            class: "alert-info",
            icon: faCircleInfo,
        },
        warning: {
            class: "alert-warning",
            icon: faTriangleExclamation,
        },
        success: {
            class: "alert-success",
            icon: faCheckCircle,
        },
        danger: {
            class: "alert-error",
            icon: faCircleExclamation,
        },
    };
    
    const config = typeMap[type] || typeMap.info;
    
    return (
        <div 
            className={`alert ${config.class} shadow-lg animate-slide-down ${className}`} 
            role="alert"
        >
            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={config.icon} className="w-5 h-5" />
                <span>{children}</span>
            </div>
        </div>
    );
}
