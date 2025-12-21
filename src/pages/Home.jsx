import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useState, useEffect } from "react";
import { Spinner } from "../components/Spinner.jsx";
import { Alert } from "../components/Alert.jsx";
import { Card } from "../components/Card.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faRocket } from "@fortawesome/free-solid-svg-icons";
import { truncateText } from "../utils/textFormatter.js";
import { articles } from "../data/articles.js";

export function Home() {
    useDocumentTitle("Mon blog - Accueil");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simuler un chargement asynchrone
        setTimeout(() => {
            try {
                const limitedArticles = articles.slice(0, 10);
                setData(limitedArticles);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }, 500);
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <Alert type="error" className="animate-slide-down">
                Erreur lors du chargement des articles : {error.toString()}
            </Alert>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-12 animate-fade-in">
                <FontAwesomeIcon
                    icon={faNewspaper}
                    className="text-6xl text-neutral-300 dark:text-neutral-600 mb-4"
                />
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                    Aucun article disponible
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Revenez plus tard pour découvrir nos nouveaux articles.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="hero mb-12">
                <div className="animate-slide-down">
                    <div className="flex justify-center mb-4">
                        <div className="badge bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-none shadow-glow badge-lg gap-2 px-6 py-3 animate-pulse-slow">
                            <FontAwesomeIcon icon={faRocket} />
                            <span>Nouveautés</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-4 animate-fade-in">
                        <span className="gradient-text gradient-text-dark">
                            Mon Blog
                        </span>
                    </h1>
                    <p
                        className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto animate-fade-in"
                        style={{ animationDelay: "0.2s" }}
                    >
                        Découvrez nos derniers articles et plongez dans un
                        univers d'informations passionnantes
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((post, index) => (
                    <div
                        key={post.id}
                        className="animate-scale-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <Card
                            image={`https://picsum.photos/id/${post.id}/280/180`}
                            title={post.title}
                            description={truncateText(post.body, 120)}
                            href={`#post:${post.id}`}
                            buttonLabel="Lire l'article"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
