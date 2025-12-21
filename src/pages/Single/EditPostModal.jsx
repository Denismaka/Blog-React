import { Modal } from "../../components/Modal.jsx";
import { Button } from "../../components/Button.jsx";
import { Input } from "../../components/Input.jsx";
import { useState } from "react";
import { Alert } from "../../components/Alert.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faXmark } from "@fortawesome/free-solid-svg-icons";

export function EditPostModal({ post, onClose, onSave }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: post.title || "",
        body: post.body || "",
        image: post.image || `https://picsum.photos/id/${post.id}/800/600`,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Simulation d'une sauvegarde
        setTimeout(() => {
            try {
                onSave(formData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }, 800);
    };

    return (
        <Modal onClose={onClose} title="Éditer l'article">
            <div className="space-y-6">
                {error && (
                    <Alert type="error" className="animate-slide-down">
                        {error.toString()}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                        <div>
                            <Input
                                name="title"
                                label="Titre"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Input
                                name="image"
                                label="URL de l'image"
                                type="text"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://exemple.com/image.jpg"
                            />
                        </div>

                        <div>
                            <Input
                                name="body"
                                label="Contenu"
                                type="textarea"
                                value={formData.body}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <Button
                            disabled={loading}
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="gap-2"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                            Annuler
                        </Button>
                        <Button
                            disabled={loading}
                            type="submit"
                            variant="primary"
                            className="gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Sauvegarde...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faSave} />
                                    Sauvegarder
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
