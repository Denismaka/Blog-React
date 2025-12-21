import { HelmetProvider } from "react-helmet-async";

/**
 * @param {{ children: React.ReactNode }} props
 */
export function AppHelmetProvider({ children }) {
    return <HelmetProvider>{children}</HelmetProvider>;
}

