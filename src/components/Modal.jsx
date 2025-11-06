import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

/*
  Modal component
  - Creates a portal-mounted dialog.
  - Locks background interaction/scroll while open.
  - Supports an optional global ScrollSmoother instance (window._smoother).
*/
export default function Modal({ children, onClose }) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    const smoother = window._smoother;
    const hasSmoother = Boolean(smoother);

    // Save current scroll position so we can restore it on unmount
    if (hasSmoother) {
      // Using a ScrollSmoother instance:
      // 1) store its current scrollTop
      // 2) pause the smoother to prevent internal updates
      // 3) visually lock the smoother wrapper/content to avoid interaction
      scrollYRef.current = smoother.scrollTop();
      smoother.paused(true);

      try {
        smoother.wrapper.style.overflow = "hidden";
        smoother.content.style.pointerEvents = "none";
        smoother.content.style.filter = "blur(4px) brightness(0.6)";
        smoother.content.style.transition = "filter 0.3s ease";
      } catch (_) {
        // Defensive: ignore DOM mutation errors if structure is different
      }
    } else {
      // Fallback for no smoother:
      // 1) store window scrollY
      // 2) lock document body by fixing its position and disabling overflow
      scrollYRef.current = window.scrollY;
      Object.assign(document.body.style, {
        overflow: "hidden",
        position: "fixed",
        top: `-${scrollYRef.current}px`,
        width: "100%",
        touchAction: "none",
      });
    }

    // Cleanup: restore smoother or body styles and the previous scroll position
    return () => {
      if (hasSmoother) {
        try {
          smoother.paused(false);
          // Restore the smoother scroll position without animation
          requestAnimationFrame(() => {
            smoother.scrollTo(scrollYRef.current, false);
          });

          smoother.wrapper.style.overflow = "";
          smoother.content.style.pointerEvents = "";
          smoother.content.style.filter = "";
          smoother.content.style.transition = "";
        } catch (_) {
          // Defensive: ignore if smoother DOM changed
        }
      } else {
        // Restore body styles and scroll to previous position
        Object.assign(document.body.style, {
          overflow: "",
          position: "",
          top: "",
          width: "",
          touchAction: "",
        });
        window.scrollTo(0, scrollYRef.current);
      }
    };
  }, []);

  // Modal markup:
  // - clicking backdrop triggers onClose
  // - clicking inner container stops propagation
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
        {children}
      </div>
    </div>,
    document.body
  );
}
