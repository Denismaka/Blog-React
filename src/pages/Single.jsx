import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useFetch } from "../hooks/useFetch.js";
import { Spinner } from "../components/Spinner.jsx";
import { Alert } from "../components/Alert.jsx";
import { Button } from "../components/Button.jsx";
import { useToggle } from "../hooks/useToggle.js";
import { Modal } from "../components/Modal.jsx";
import { EditPostModal } from "./Single/EditPostModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faArrowLeft, 
    faArrowRight, 
    faEdit, 
    faCalendar,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import { cleanArticleText } from "../utils/textFormatter.js";

export function Single({ postId }) {
    const {
        data: post,
        loading,
        error,
        setData,
    } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    useDocumentTitle(post?.title || "Article");
    const [isEditing, toggleEditing] = useToggle(false);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <Alert type="error" className="animate-slide-down">
                Erreur lors du chargement de l'article : {error.toString()}
            </Alert>
        );
    }

    if (!post) {
        return (
            <Alert type="warning" className="animate-slide-down">
                Article introuvable
            </Alert>
        );
    }

    const handleSave = (data) => {
        setData({
            ...post,
            ...data,
        });
        toggleEditing();
    };

    const nextPostId = parseInt(postId) + 1;
    const prevPostId = parseInt(postId) - 1;

    return (
        <article className="max-w-4xl mx-auto animate-fade-in">
            {/* Bouton retour */}
            <div className="mb-6 animate-slide-down">
                <a 
                    href="#" 
                    className="btn btn-ghost gap-2 hover:btn-primary transition-all"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Retour à l'accueil
                </a>
            </div>

            {/* En-tête de l'article */}
            <div className="mb-6 animate-slide-down" style={{ animationDelay: '0.1s' }}>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="badge badge-primary gap-2">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>Publié récemment</span>
                    </div>
                    <div className="badge badge-secondary gap-2">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Auteur #{post.userId || 1}</span>
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                    {post.title}
                </h1>
            </div>

            {/* Image */}
            <div className="mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <img
                    src={`https://picsum.photos/id/${post.id}/800/600`}
                    alt={post.title}
                    className="w-full h-auto rounded-2xl shadow-2xl object-cover hover:scale-[1.02] transition-transform duration-500"
                />
            </div>

            {/* Contenu */}
            <div className="prose prose-lg max-w-none mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="bg-base-100 p-6 rounded-2xl shadow-lg">
                    <p className="text-base-content leading-relaxed text-lg whitespace-pre-line">
                        {cleanArticleText(post.body)}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex gap-4">
                    <Button variant="secondary" onClick={toggleEditing} className="gap-2">
                        <FontAwesomeIcon icon={faEdit} />
                        Éditer l'article
                    </Button>
                </div>
                <div className="flex gap-4">
                    {prevPostId > 0 && (
                        <a 
                            href={`#post:${prevPostId}`}
                            className="btn btn-ghost gap-2 hover:btn-primary transition-all"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Précédent
                        </a>
                    )}
                    <a 
                        href={`#post:${nextPostId}`}
                        className="btn btn-primary gap-2 hover:scale-105 transition-all"
                    >
                        Suivant
                        <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                </div>
            </div>

            {isEditing && (
                <EditPostModal
                    post={post}
                    onClose={toggleEditing}
                    onSave={handleSave}
                />
            )}
        </article>
    );
}
