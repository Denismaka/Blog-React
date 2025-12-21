import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useFetch } from "../hooks/useFetch.js";
import { Spinner } from "../components/Spinner.jsx";
import { Alert } from "../components/Alert.jsx";
import { Card } from "../components/Card.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faRocket } from "@fortawesome/free-solid-svg-icons";
import { truncateText } from "../utils/textFormatter.js";

export function Home() {
    useDocumentTitle("Mon blog - Accueil");
    const { data, loading, error } = useFetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );

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
                <FontAwesomeIcon icon={faNewspaper} className="text-6xl text-base-content/30 mb-4" />
                <h2 className="text-2xl font-bold text-base-content mb-2">Aucun article disponible</h2>
                <p className="text-base-content/70">Revenez plus tard pour découvrir nos nouveaux articles.</p>
            </div>
        );
    }

    return (
        <>
            <div className="hero mb-12">
                <div className="animate-slide-down">
                    <div className="flex justify-center mb-4">
                        <div className="badge badge-primary badge-lg gap-2 animate-pulse-slow">
                            <FontAwesomeIcon icon={faRocket} />
                            <span>Nouveautés</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 animate-fade-in">
                        Mon Blog
                    </h1>
                    <p className="text-xl text-base-content/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Découvrez nos derniers articles et plongez dans un univers d'informations passionnantes
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
