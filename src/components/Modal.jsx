import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function Modal({ children, onClose, title }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        onClose?.();
    };

    return createPortal(
        <dialog
            className="modal modal-open animate-scale-in"
            ref={dialogRef}
            onCancel={handleClose}
            onClose={handleClose}
        >
            <div className="modal-box max-w-2xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 border border-neutral-200 dark:border-neutral-700 shadow-2xl animate-scale-in p-8">
                {title && (
                    <h3 className="font-bold text-lg mb-6 text-primary-600 dark:text-primary-400 font-display">
                        {title}
                    </h3>
                )}
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:bg-danger-500 hover:text-white dark:hover:bg-danger-600 transition-colors text-neutral-700 dark:text-neutral-300"
                        onClick={handleClose}
                        aria-label="Fermer"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </form>
                <div className="pt-2">{children}</div>
            </div>
            <form
                method="dialog"
                className="modal-backdrop bg-black/50 dark:bg-black/70 backdrop-blur-sm"
                onClick={handleClose}
            ></form>
        </dialog>,
        document.body
    );
}
