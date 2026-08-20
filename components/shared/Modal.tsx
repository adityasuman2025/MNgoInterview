import { type MouseEvent, type KeyboardEvent, useEffect, useRef, ReactNode, memo } from "react";
import { createPortal } from "react-dom";

interface ModalSubComponentProps {
    children: ReactNode;
    className?: string;
}
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}
function Modal({ isOpen = false, onClose, children, className = "" }: ModalProps) {
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const previousFocusedElement = document.activeElement as HTMLElement | null;

        if (backdropRef.current) backdropRef.current.focus();

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prevOverflow;
            previousFocusedElement?.focus?.();
        };
    }, [isOpen]);

    function handleBackdropClick(e: MouseEvent<HTMLDivElement>) {
        const target = e.target as HTMLElement;
        if (target === backdropRef.current) onClose();
    }

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        const key = e.key;

        if (key === 'Escape') {
            e.preventDefault();
            onClose();
            return;
        } else if (key === "Tab") {
            if (!backdropRef.current) return;

            e.preventDefault();

            const allElements = Array.from(
                backdropRef.current.querySelectorAll<HTMLElement>(
                    `input:not([disabled]), button:not([disabled]), [href], select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])`
                )
            );

            // Filter out elements that are inside hidden containers or not visible
            const focusableElements = allElements.filter(el => !el.closest("[hidden]") && el.offsetParent !== null);

            if (!focusableElements.length) return;

            const activeElement = document.activeElement as HTMLElement;
            const activeElementIdx = focusableElements.indexOf(activeElement);

            if (activeElementIdx < 0) {
                focusableElements[0].focus({ focusVisible: true } as FocusOptions);
                return;
            }

            if (!e.shiftKey) {
                const nextIdx = (activeElementIdx + 1) % focusableElements.length;
                focusableElements[nextIdx].focus({ focusVisible: true } as FocusOptions);
            } else if (e.shiftKey) {
                const prevIdx = activeElementIdx - 1 >= 0 ? activeElementIdx - 1 : focusableElements.length - 1;
                focusableElements[prevIdx].focus({ focusVisible: true } as FocusOptions);
            }
        }
    }

    if (!isOpen) return null;
    return createPortal(
        <div
            ref={backdropRef}
            aria-hidden="true"
            className="outline-none min-h-dvh z-10 w-full fixed top-0 left-0 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-header"
                aria-describedby="modal-body"
                className={`flex flex-col p-4 bg-secondary text-secondary-content rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:w-auto md:min-w-112 max-h-[85dvh] ${className}`}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}

function Header({ children, className = "" }: ModalSubComponentProps) {
    return (
        <header id="modal-header" aria-label="modal header" className={`w-full p-2 ${className}`}>
            {children}
        </header>
    );
}

function Body({ children, className = "" }: ModalSubComponentProps) {
    return (
        <main id="modal-body" aria-label="modal body" className={`w-full p-2 overflow-y-auto flex-1 ${className}`}>
            {children}
        </main>
    );
}

function Footer({ children, className = "" }: ModalSubComponentProps) {
    return (
        <footer id="modal-footer" aria-label="modal footer" className={`w-full p-2 ${className}`}>
            {children}
        </footer>
    );
}

Modal.Header = memo(Header);
Modal.Body = memo(Body);
Modal.Footer = memo(Footer);

export default Modal;