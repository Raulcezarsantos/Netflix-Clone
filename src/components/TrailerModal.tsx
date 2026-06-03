import { X } from "lucide-react";
import { useEffect } from "react";

interface TrailerModalProps {
    open: boolean;
    youtubeKey: string | null;
    title: string;
    onClose: () => void;
}

export function TrailerModal({ open, youtubeKey, title, onClose }: TrailerModalProps) {
    useEffect(() => {
        if (!open) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    return (
        <div className="modal-backdrop" role="presentation" onClick={onClose}>
            <div
                className="modal-panel"
                role="dialog"
                aria-modal="true"
                aria-label={`Trailer de ${title}`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="modal-head">
                    <div>
                        <p className="eyebrow">Trailer</p>
                        <h2>{title}</h2>
                    </div>
                    <button className="icon-button" type="button" onClick={onClose} aria-label="Fechar trailer">
                        <X size={18} />
                    </button>
                </div>

                {youtubeKey ? (
                    <div className="trailer-frame">
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`}
                            title={`Trailer de ${title}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <div className="modal-empty">
                        <p>Nao foi encontrado trailer disponivel para este titulo.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
