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
            <div className="modal-box max-w-2xl animate-scale-in">
                {title && (
                    <h3 className="font-bold text-lg mb-4 text-primary">{title}</h3>
                )}
                <form method="dialog">
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-error hover:text-error-content transition-colors"
                        onClick={handleClose}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </form>
                <div className="py-4">
                    {children}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={handleClose}>
                <button>close</button>
            </form>
        </dialog>,
        document.body
    );
}
