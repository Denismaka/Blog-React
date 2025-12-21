import { useHashNavigation } from "./hooks/useHashNavigation.js";
import { Home } from "./pages/Home.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Single } from "./pages/Single.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { Alert } from "./components/Alert.jsx";

function App() {
    const { page, param } = useHashNavigation();
    const pageContent = getPageContent(page, param);

    return (
        <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
            <Header page={page} />
            <main className="app-container py-6 flex-1 page-transition">
                <ErrorBoundary FallbackComponent={PageError}>
                    {pageContent}
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    );
}

function PageError({ error }) {
    return <Alert type="danger">{error.toString()}</Alert>;
}

function getPageContent(page, param) {
    if (page === "home") {
        return <Home />;
    }
    if (page === "contact") {
        return <Contact />;
    }
    if (page === "post") {
        return <Single postId={param} />;
    }
    return <NotFound page={page} />;
}

export default App;
