import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";
import { Alert } from "../components/Alert.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faPaperPlane,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Le nom est requis";
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email invalide";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Le message est requis";
        } else if (formData.message.trim().length < 10) {
            newErrors.message =
                "Le message doit contenir au moins 10 caractères";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
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
            setFormData({ name: "", email: "", message: "" });

            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        }, 1500);
    };

    return (
        <>
            <Helmet>
                <title>Contact - Mon Blog</title>
                <meta
                    name="description"
                    content="Contactez-nous pour toute question ou suggestion concernant notre blog"
                />
            </Helmet>
            <div className="max-w-2xl mx-auto animate-fade-in">
                <div className="hero mb-8">
                <div className="flex justify-center mb-4">
                    <div className="avatar placeholder">
                        <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full w-20 shadow-glow">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-3xl"
                            />
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 animate-slide-down">
                    <span className="gradient-text gradient-text-dark">
                        Contactez-nous
                    </span>
                </h1>
                <p
                    className="text-lg text-neutral-600 dark:text-neutral-300 animate-fade-in"
                    style={{ animationDelay: "0.2s" }}
                >
                    Nous serions ravis d'avoir de vos nouvelles. N'hésitez pas à
                    nous écrire !
                </p>
            </div>

            {isSuccess && (
                <Alert type="success" className="mb-6 animate-slide-down">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    Message envoyé avec succès ! Nous vous répondrons dans les
                    plus brefs délais.
                </Alert>
            )}

            <div
                className="card-modern animate-scale-in"
                style={{ animationDelay: "0.3s" }}
            >
                <div className="p-8">
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
        </>
    );
}
