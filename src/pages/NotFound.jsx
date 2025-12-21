import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faExclamationTriangle,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/Button.jsx";

export function NotFound({ page }) {
    return (
        <div className="text-center py-16 animate-fade-in">
            <div className="mb-8 animate-bounce-slow">
                <div className="text-9xl font-bold text-primary-600 dark:text-primary-400 opacity-20 font-display">
                    404
                </div>
            </div>

            <div
                className="mb-6 animate-scale-in"
                style={{ animationDelay: "0.2s" }}
            >
                <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-6xl text-warning-500 dark:text-warning-400 mb-4"
                />
            </div>

            <h1
                className="text-4xl md:text-5xl font-bold font-display mb-4 animate-slide-down"
                style={{ animationDelay: "0.3s" }}
            >
                <span className="gradient-text gradient-text-dark">
                    Page introuvable
                </span>
            </h1>

            <p
                className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto animate-fade-in"
                style={{ animationDelay: "0.4s" }}
            >
                Désolé, la page demandée "{page || "cette page"}" n'existe pas
                ou a été déplacée.
            </p>

            <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
                style={{ animationDelay: "0.5s" }}
            >
                <a href="#">
                    <Button variant="primary" className="gap-2">
                        <FontAwesomeIcon icon={faHome} />
                        Retour à l'accueil
                    </Button>
                </a>
                <button
                    onClick={() => window.history.back()}
                    className="btn btn-outline border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 gap-2 transition-all px-8 py-4"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Page précédente
                </button>
            </div>
        </div>
    );
}
