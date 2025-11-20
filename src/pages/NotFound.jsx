export function NotFound({ page }) {
    return (
        <div className="text-center py-16">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Page introuvable
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                La page demandée "{page}" n'existe pas
            </p>
            <a 
                href="#"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
                Retour à l'accueil
            </a>
        </div>
    );
}
