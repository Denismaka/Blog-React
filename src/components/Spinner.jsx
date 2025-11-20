export function Spinner() {
    return (
        <div className="flex justify-center items-center py-12" role="status">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
