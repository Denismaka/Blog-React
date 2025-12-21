import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { SkipLink } from "./components/SkipLink.jsx";
import { ArticlesSkeleton } from "./components/Skeleton.jsx";
import { Spinner } from "./components/Spinner.jsx";

// Lazy loading des pages pour le code splitting
const Home = lazy(() => import("./pages/Home.jsx").then((module) => ({ default: module.Home })));
const Contact = lazy(() => import("./pages/Contact.jsx").then((module) => ({ default: module.Contact })));
const Single = lazy(() => import("./pages/Single.jsx").then((module) => ({ default: module.Single })));
const NotFound = lazy(() => import("./pages/NotFound.jsx").then((module) => ({ default: module.NotFound })));

function App() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
            <SkipLink />
            <Header currentPath={currentPath} />
            <main id="main-content" className="app-container py-6 flex-1 page-transition" tabIndex={-1}>
                <ErrorBoundary>
                    <Suspense fallback={<ArticlesSkeleton />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/post/:id" element={<Single />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    );
}

export default App;
