export function activeClassIf (condition, className) {
    if (!condition) {
        return className
    }
    if (!className) {
        return 'bg-purple-800';
    }
    return `${className} bg-purple-800`
}
