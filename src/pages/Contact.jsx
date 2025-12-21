import { useState } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";
import { Alert } from "../components/Alert.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faEnvelope, 
    faPaperPlane,
    faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

export function Contact() {
    useDocumentTitle("Contact - Mon Blog");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Le nom est requis';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Le message est requis';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Le message doit contenir au moins 10 caractères';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        // Simulation d'envoi (remplacer par un vrai appel API)
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            
            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="hero mb-8">
                <div className="flex justify-center mb-4">
                    <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-20">
                            <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-slide-down">
                    Contactez-nous
                </h1>
                <p className="text-lg text-base-content/70 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    Nous serions ravis d'avoir de vos nouvelles. N'hésitez pas à nous écrire !
                </p>
            </div>
            
            {isSuccess && (
                <Alert type="success" className="mb-6 animate-slide-down">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </Alert>
            )}
            
            <div className="card bg-base-100 shadow-2xl animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <div className="card-body p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input 
                            name="name" 
                            label="Nom complet" 
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            required
                        />
                        <Input 
                            name="email" 
                            label="Adresse email" 
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />
                        <Input
                            name="message"
                            label="Votre message"
                            type="textarea"
                            value={formData.message}
                            onChange={handleChange}
                            error={errors.message}
                            required
                        />
                        <div className="card-actions justify-end pt-4">
                            <Button 
                                type="submit" 
                                variant="primary" 
                                disabled={isSubmitting}
                                className="gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        Envoyer le message
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
