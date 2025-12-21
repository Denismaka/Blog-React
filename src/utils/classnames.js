export function activeClassIf (condition, className) {
    if (!condition) {
        return className
    }
    if (!className) {
        return 'bg-secondary text-secondary-content';
    }
    return `${className} bg-secondary text-secondary-content`
}
