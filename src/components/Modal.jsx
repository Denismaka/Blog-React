import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        dialogRef.current.showModal();
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        onClose?.();
    };

    return createPortal(
        <dialog
            className="w-[calc(100vw-2rem)] max-w-2xl rounded-xl shadow-2xl p-0 bg-white dark:bg-gray-800 backdrop:bg-black/50"
            ref={dialogRef}
            onCancel={handleClose}
            onClose={handleClose}
        >
            <div className="p-6">
                {children}
            </div>
        </dialog>,
        document.body
    );
}
