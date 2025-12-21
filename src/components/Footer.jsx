import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faEnvelope, 
    faPhone, 
    faHeart,
    faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import { 
    faTwitter, 
    faLinkedin, 
    faGithub, 
    faFacebook 
} from "@fortawesome/free-brands-svg-icons";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer footer-center bg-base-300 text-base-content p-10 mt-20 animate-fade-in">
            <div className="app-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <div className="animate-slide-up">
                        <h3 className="footer-title text-primary font-bold text-lg mb-4">
                            MonBlog
                        </h3>
                        <p className="text-base-content/70">
                            Votre source d'inspiration et d'information. 
                            Découvrez nos articles et partagez vos idées.
                        </p>
                    </div>
                    
                    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="footer-title font-bold text-lg mb-4">Navigation</h3>
                        <div className="grid grid-flow-col gap-4">
                            <a href="#" className="link link-hover hover:text-primary transition-colors">
                                Accueil
                            </a>
                            <a href="#contact" className="link link-hover hover:text-primary transition-colors">
                                Contact
                            </a>
                        </div>
                    </div>
                    
                    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <h3 className="footer-title font-bold text-lg mb-4">Contact</h3>
                        <div className="space-y-2">
                            <a href="mailto:makadenis370@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>makadenis370@gmail.com</span>
                            </a>
                            <a href="tel:+243818252385" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <FontAwesomeIcon icon={faPhone} />
                                <span>+243 818 252 385</span>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="divider"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
                    <div className="flex items-center gap-2 text-base-content/70">
                        <span>Fait avec</span>
                        <FontAwesomeIcon icon={faHeart} className="text-error animate-pulse-slow" />
                        <span>par Denis Maka</span>
                    </div>
                    
                    <div className="flex gap-4">
                        <a 
                            href="https://twitter.com/MakaDenis3" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-circle btn-ghost hover:bg-primary hover:text-primary-content transition-all hover:scale-110"
                            aria-label="Twitter"
                        >
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/Denismaka" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-circle btn-ghost hover:bg-primary hover:text-primary-content transition-all hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a 
                            href="https://github.com/Denismaka" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-circle btn-ghost hover:bg-primary hover:text-primary-content transition-all hover:scale-110"
                            aria-label="GitHub"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a 
                            href="https://www.facebook.com/Denismaka" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-circle btn-ghost hover:bg-primary hover:text-primary-content transition-all hover:scale-110"
                            aria-label="Facebook"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </div>
                
                <div className="mt-4">
                    <p className="text-base-content/50 text-sm">
                        © {new Date().getFullYear()} MonBlog. Tous droits réservés.
                    </p>
                </div>
            </div>
            
            <button
                onClick={scrollToTop}
                className="btn btn-circle btn-primary fixed bottom-8 right-8 shadow-lg hover:scale-110 transition-transform z-40 animate-bounce-slow"
                aria-label="Retour en haut"
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </footer>
    );
}

