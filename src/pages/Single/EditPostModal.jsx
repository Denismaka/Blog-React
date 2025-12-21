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
        title: post.title || '',
        body: post.body || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        
        // Simulation d'une requête API
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then((r) => {
                onSave(formData);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    };

    return (
        <Modal onClose={onClose} title="Éditer l'article">
            {error && (
                <Alert type="error" className="mb-4 animate-slide-down">
                    {error.toString()}
                </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                    name="title" 
                    label="Titre" 
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="body"
                    label="Contenu"
                    type="textarea"
                    value={formData.body}
                    onChange={handleChange}
                    required
                />
                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
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
        </Modal>
    );
}
