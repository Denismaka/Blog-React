import { Component } from "react";
import { Alert } from "./Alert.jsx";
import { Button } from "./Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faRefresh } from "@fortawesome/free-solid-svg-icons";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback(this.state.error, this.handleReset);
            }

            return (
                <div className="min-h-[400px] flex items-center justify-center p-6">
                    <div className="max-w-md w-full space-y-4">
                        <Alert type="error" className="animate-slide-down">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">
                                        Une erreur s'est produite
                                    </h3>
                                    <p className="text-sm">
                                        {this.state.error?.message ||
                                            "Une erreur inattendue s'est produite"}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="primary"
                                        onClick={this.handleReset}
                                        className="gap-2"
                                    >
                                        <FontAwesomeIcon icon={faRefresh} />
                                        Réessayer
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        href="/"
                                        className="gap-2"
                                    >
                                        <FontAwesomeIcon icon={faHome} />
                                        Retour à l'accueil
                                    </Button>
                                </div>
                            </div>
                        </Alert>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

