import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";

export function Contact() {
    useDocumentTitle("Contact");

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implémenter l'envoi du formulaire
        alert("Formulaire de contact à implémenter");
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="hero mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Contactez-nous
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Nous serions ravis d'avoir de vos nouvelles
                </p>
            </div>
            <div className="card-elevated p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        name="name" 
                        label="Nom" 
                        type="text"
                        required
                    />
                    <Input 
                        name="email" 
                        label="Email" 
                        type="email"
                        required
                    />
                    <Input
                        name="message"
                        label="Message"
                        type="textarea"
                        required
                    />
                    <div className="pt-4">
                        <Button type="submit" variant="primary">
                            Envoyer le message
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
