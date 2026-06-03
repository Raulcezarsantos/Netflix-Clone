import { Film, Search } from "lucide-react";
import type { ReactNode } from "react";

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="app-shell">
            <header className="site-header">
                <a className="brand" href="#hero">
                    <span className="brand-mark">
                        <Film size={18} />
                    </span>
                    <span className="brand-copy">
                        <strong>Streaming</strong>
                        <small>Showcase</small>
                    </span>
                </a>

                <nav className="site-nav" aria-label="Navegacao principal">
                    <a href="#hero">Inicio</a>
                    <a href="#catalogo">Catalogo</a>
                    <a href="#curadoria">Curadoria</a>
                </nav>

                <button className="header-action" type="button">
                    <Search size={16} />
                    Explorar
                </button>
            </header>

            <main>{children}</main>
        </div>
    );
}
