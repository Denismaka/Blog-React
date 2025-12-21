import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleInfo,
    faTriangleExclamation,
    faCircleExclamation,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

/**
 * @param {"error" | "info" | "warning" | "success" | "danger"} type
 */
export function Alert({ type = "info", children, className = "" }) {
    const typeMap = {
        error: {
            bg: "bg-danger-50 dark:bg-danger-900/20",
            text: "text-danger-800 dark:text-danger-300",
            border: "border-danger-500 dark:border-danger-400",
            icon: faCircleExclamation,
            iconColor: "text-danger-600 dark:text-danger-400",
        },
        info: {
            bg: "bg-primary-50 dark:bg-primary-900/20",
            text: "text-primary-800 dark:text-primary-300",
            border: "border-primary-500 dark:border-primary-400",
            icon: faCircleInfo,
            iconColor: "text-primary-600 dark:text-primary-400",
        },
        warning: {
            bg: "bg-warning-50 dark:bg-warning-900/20",
            text: "text-warning-800 dark:text-warning-300",
            border: "border-warning-500 dark:border-warning-400",
            icon: faTriangleExclamation,
            iconColor: "text-warning-600 dark:text-warning-400",
        },
        success: {
            bg: "bg-success-50 dark:bg-success-900/20",
            text: "text-success-800 dark:text-success-300",
            border: "border-success-500 dark:border-success-400",
            icon: faCheckCircle,
            iconColor: "text-success-600 dark:text-success-400",
        },
        danger: {
            bg: "bg-danger-50 dark:bg-danger-900/20",
            text: "text-danger-800 dark:text-danger-300",
            border: "border-danger-500 dark:border-danger-400",
            icon: faCircleExclamation,
            iconColor: "text-danger-600 dark:text-danger-400",
        },
    };

    const config = typeMap[type] || typeMap.info;

    return (
        <div
            className={`flex items-center gap-3 p-4 rounded-lg border ${config.bg} ${config.border} ${config.text} shadow-lg animate-slide-down ${className}`}
            role="alert"
        >
            <FontAwesomeIcon
                icon={config.icon}
                className={`w-5 h-5 ${config.iconColor}`}
            />
            <span>{children}</span>
        </div>
    );
}
