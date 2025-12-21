import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useArticle, useUpdateArticle } from "../hooks/useArticles.js";
import { ArticleSkeleton } from "../components/Skeleton.jsx";
import { Alert } from "../components/Alert.jsx";
import { Button } from "../components/Button.jsx";
import { useToggle } from "../hooks/useToggle.js";
import { EditPostModal } from "./Single/EditPostModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faEdit,
    faCalendar,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { cleanArticleText, truncateText } from "../utils/textFormatter.js";

export function Single() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: post, isLoading, error } = useArticle(id);
    const updateArticle = useUpdateArticle();
    const [isEditing, toggleEditing] = useToggle(false);

    const handleSave = (data) => {
        updateArticle.mutate(
            { id: parseInt(id), data },
            {
                onSuccess: () => {
                    toggleEditing();
                },
            }
        );
    };

    if (isLoading) {
        return <ArticleSkeleton />;
    }

    if (error) {
        return (
            <>
                <Helmet>
                    <title>Article introuvable - Mon Blog</title>
                </Helmet>
                <Alert type="error" className="animate-slide-down">
                    Erreur lors du chargement de l'article : {error.message}
                </Alert>
            </>
        );
    }

    if (!post) {
        return (
            <>
                <Helmet>
                    <title>Article introuvable - Mon Blog</title>
                </Helmet>
                <Alert type="warning" className="animate-slide-down">
                    Article introuvable
                </Alert>
            </>
        );
    }

    const nextPostId = parseInt(id) + 1;
    const prevPostId = parseInt(id) - 1;

    return (
        <>
            <Helmet>
                <title>{post.title} - Mon Blog</title>
                <meta name="description" content={truncateText(post.body, 160)} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={truncateText(post.body, 160)} />
                <meta property="og:type" content="article" />
                {post.image && <meta property="og:image" content={post.image} />}
            </Helmet>
            <article className="max-w-4xl mx-auto animate-fade-in">
                {/* Bouton retour */}
                <div className="mb-6 animate-slide-down">
                    <Link
                        to="/"
                        className="btn btn-ghost gap-2 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all text-neutral-700 dark:text-neutral-300 px-8 py-4"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Retour à l'accueil
                    </Link>
                </div>

            {/* En-tête de l'article */}
            <div
                className="mb-6 animate-slide-down"
                style={{ animationDelay: "0.1s" }}
            >
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="badge bg-gradient-to-r from-primary-500 to-primary-600 text-white border-none gap-2 shadow-glow px-6 py-3">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>Publié récemment</span>
                    </div>
                    <div className="badge bg-gradient-to-r from-secondary-500 to-secondary-600 text-white border-none gap-2 shadow-glow-purple px-6 py-3">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Auteur #{post.userId || 1}</span>
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                    <span className="gradient-text gradient-text-dark">
                        {post.title}
                    </span>
                </h1>
            </div>

            {/* Image */}
            <div
                className="mb-8 animate-scale-in"
                style={{ animationDelay: "0.2s" }}
            >
                <img
                    src={
                        post.image ||
                        `https://picsum.photos/id/${post.id}/800/600`
                    }
                    alt={post.title}
                    className="w-full h-auto rounded-2xl shadow-medium dark:shadow-glow object-cover hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            {/* Contenu */}
            <div
                className="prose prose-lg max-w-none mb-8 animate-fade-in dark:prose-invert"
                style={{ animationDelay: "0.3s" }}
            >
                <div className="card-modern p-6">
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg whitespace-pre-line">
                        {cleanArticleText(post.body)}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div
                className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
            >
                <div className="flex gap-4">
                    <Button
                        variant="secondary"
                        onClick={toggleEditing}
                        className="gap-2"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                        Éditer l'article
                    </Button>
                </div>
                <div className="flex gap-4">
                    {prevPostId > 0 && (
                        <Link
                            to={`/post/${prevPostId}`}
                            className="btn btn-ghost gap-2 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all text-neutral-700 dark:text-neutral-300 px-8 py-4"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Précédent
                        </Link>
                    )}
                    <Link
                        to={`/post/${nextPostId}`}
                        className="btn btn-gradient-primary gap-2 text-white border-none px-8 py-4"
                    >
                        Suivant
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
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
        </>
    );
}
