import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useFetch } from "../hooks/useFetch.js";
import { Spinner } from "../components/Spinner.jsx";
import { Alert } from "../components/Alert.jsx";
import { Card } from "../components/Card.jsx";
import { Button } from "../components/Button.jsx";
import { useToggle } from "../hooks/useToggle.js";
import { Modal } from "../components/Modal.jsx";
import { EditPostModal } from "./Single/EditPostModal.jsx";

export function Single({ postId }) {
    const {
        data: post,
        loading,
        error,
        setData,
    } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    useDocumentTitle(post?.title);
    const [isEditing, toggleEditing] = useToggle(false);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert type="danger">{error.toString()}</Alert>;
    }

    const handleSave = (data) => {
        setData({
            ...post,
            ...data,
        });
        toggleEditing();
    };

    return (
        <article className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {post.title}
            </h1>
            <img
                src={`https://picsum.photos/id/${post.id}/800/600`}
                alt={post.title}
                className="w-full h-auto rounded-xl shadow-lg mb-8 object-cover"
            />
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                    {post.body}
                </p>
            </div>
            {isEditing && (
                <EditPostModal
                    post={post}
                    onClose={toggleEditing}
                    onSave={handleSave}
                />
            )}
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
                <Button variant="secondary" onClick={toggleEditing}>
                    Editer l'article
                </Button>
                <a 
                    href={`#post:${post.id + 1}`}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-colors"
                >
                    → Article suivant
                </a>
            </div>
        </article>
    );
}
