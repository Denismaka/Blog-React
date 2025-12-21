import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faExclamationTriangle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/Button.jsx";

export function NotFound({ page }) {
    return (
        <div className="text-center py-16 animate-fade-in">
            <div className="mb-8 animate-bounce-slow">
                <div className="text-9xl font-bold text-primary opacity-20">404</div>
            </div>
            
            <div className="mb-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <FontAwesomeIcon 
                    icon={faExclamationTriangle} 
                    className="text-6xl text-warning mb-4"
                />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-slide-down" style={{ animationDelay: '0.3s' }}>
                Page introuvable
            </h1>
            
            <p className="text-lg text-base-content/70 mb-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Désolé, la page demandée "{page || 'cette page'}" n'existe pas ou a été déplacée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <a href="#">
                    <Button variant="primary" className="gap-2">
                        <FontAwesomeIcon icon={faHome} />
                        Retour à l'accueil
                    </Button>
                </a>
                <button 
                    onClick={() => window.history.back()}
                    className="btn btn-outline btn-primary gap-2"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Page précédente
                </button>
            </div>
        </div>
    );
}
