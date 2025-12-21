import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faPhone,
    faHeart,
    faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import {
    faTwitter,
    faLinkedin,
    faGithub,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer footer-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 border-t border-neutral-200 dark:border-neutral-700 p-10 mt-20 animate-fade-in">
            <div className="app-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <div className="animate-slide-up">
                        <h3 className="footer-title text-primary-600 dark:text-primary-400 font-bold text-lg mb-4 font-display">
                            MonBlog
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-300">
                            Votre source d'inspiration et d'information.
                            Découvrez nos articles et partagez vos idées.
                        </p>
                    </div>

                    <div
                        className="animate-slide-up"
                        style={{ animationDelay: "0.1s" }}
                    >
                        <h3 className="footer-title font-bold text-lg mb-4 text-neutral-900 dark:text-neutral-50">
                            Navigation
                        </h3>
                        <div className="grid grid-flow-col gap-4">
                            <a
                                href="#"
                                className="link link-hover hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-neutral-700 dark:text-neutral-300"
                            >
                                Accueil
                            </a>
                            <a
                                href="#contact"
                                className="link link-hover hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-neutral-700 dark:text-neutral-300"
                            >
                                Contact
                            </a>
                        </div>
                    </div>

                    <div
                        className="animate-slide-up"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <h3 className="footer-title font-bold text-lg mb-4 text-neutral-900 dark:text-neutral-50">
                            Contact
                        </h3>
                        <div className="space-y-2">
                            <a
                                href="mailto:makadenis370@gmail.com"
                                className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-neutral-700 dark:text-neutral-300"
                            >
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>makadenis370@gmail.com</span>
                            </a>
                            <a
                                href="tel:+243818252385"
                                className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-neutral-700 dark:text-neutral-300"
                            >
                                <FontAwesomeIcon icon={faPhone} />
                                <span>+243 818 252 385</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="divider border-neutral-300 dark:border-neutral-600"></div>

                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
                    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                        <span>Fait avec</span>
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="text-danger-500 animate-pulse-slow"
                        />
                        <span>par Denis Maka</span>
                    </div>

                    <div className="flex gap-4">
                        <a
                            href="https://twitter.com/MakaDenis3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-circle btn-ghost hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all hover:scale-110 text-neutral-700 dark:text-neutral-300"
                            aria-label="Twitter"
                        >
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/Denismaka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-circle btn-ghost hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all hover:scale-110 text-neutral-700 dark:text-neutral-300"
                            aria-label="LinkedIn"
                        >
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a
                            href="https://github.com/Denismaka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-circle btn-ghost hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all hover:scale-110 text-neutral-700 dark:text-neutral-300"
                            aria-label="GitHub"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a
                            href="https://www.facebook.com/Denismaka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-circle btn-ghost hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all hover:scale-110 text-neutral-700 dark:text-neutral-300"
                            aria-label="Facebook"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-neutral-500 dark:text-neutral-500 text-sm">
                        © {new Date().getFullYear()} MonBlog. Tous droits
                        réservés.
                    </p>
                </div>
            </div>

            <button
                onClick={scrollToTop}
                className="btn btn-circle btn-gradient-primary fixed bottom-8 right-8 shadow-glow hover:scale-110 transition-transform z-40 animate-bounce-slow text-white border-none"
                aria-label="Retour en haut"
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </footer>
    );
}
