import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useFetch } from "../hooks/useFetch.js";
import { Spinner } from "../components/Spinner.jsx";
import { Alert } from "../components/Alert.jsx";
import { Card } from "../components/Card.jsx";

export function Home() {
    useDocumentTitle("Mon blog");
    const { data, loading, error } = useFetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert type="danger">{error.toString()}</Alert>;
    }

    return (
        <>
            <div className="hero mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Mon Blog
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Découvrez nos derniers articles
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((post) => (
                    <Card
                        key={post.id}
                        image={`https://picsum.photos/id/${post.id}/280/180`}
                        title={post.title}
                        description={post.body}
                        href={`#post:${post.id}`}
                        buttonLabel="Voir l'article"
                    />
                ))}
            </div>
        </>
    );
}
