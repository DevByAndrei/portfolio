import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

/*
Modal component

* Creates a portal-mounted dialog.
* Locks background interaction/scroll while open.
* ScrollSmoother logic removed.
  */
export default function Modal({ children, onClose }) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    // Store current scroll position
    scrollYRef.current = window.scrollY;

    // Lock the body scroll
    Object.assign(document.body.style, {
      overflow: "hidden",
      position: "fixed",
      top: `-${scrollYRef.current}px`,
      width: "100%",
      touchAction: "none",
    });

    // Cleanup: restore scroll position and body styles
    return () => {
      Object.assign(document.body.style, {
        overflow: "",
        position: "",
        top: "",
        width: "",
        touchAction: "",
      });
      window.scrollTo(0, scrollYRef.current);
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-dark border border-gray-700 rounded-2xl p-6 w-[90%] sm:w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl relative"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}{" "}
      </div>{" "}
    </div>,
    document.body
  );
}
