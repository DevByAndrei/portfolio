import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

export default function ProjectCard({ project, swiperRef }) {
  // Destructure project data (keeps original names and defaults)
  const {
    title,
    description,
    image,
    techs = [],
    github,
    live,
    status,
  } = project;

  // Local UI state
  const [isOpen, setIsOpen] = useState(false); // modal open state
  const [truncated, setTruncated] = useState(false); // whether description is truncated in card
  const textRef = useRef(null); // ref used to detect truncation

  // On mount / description change: detect if the text overflows the container
  useEffect(() => {
    const el = textRef.current;
    if (el) setTruncated(el.scrollHeight > el.clientHeight);
  }, [description]);

  // When modal opens: stop carousel autoplay and attach ESC handler; restore on close
  useEffect(() => {
    if (!isOpen) return;

    // Pause swiper autoplay while modal is open (if available)
    swiperRef?.current?.autoplay?.stop();

    // Close modal on Escape key
    const esc = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", esc);

    // Cleanup: resume autoplay and remove handler
    return () => {
      swiperRef?.current?.autoplay?.start();
      window.removeEventListener("keydown", esc);
    };
  }, [isOpen, swiperRef]);

  return (
    <>
      {/* Card container */}
      <div className="bg-bg-dark border border-gray-700 rounded-2xl w-[280px] sm:w-[350px] h-[680px] flex flex-col overflow-hidden shadow-lg hover:shadow-red-bright/30 transition-all">
        {/* Image header */}
        <div className="relative h-56">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            draggable="false"
          />
          {/* Status badge (conditional) */}
          {status && (
            <span
              className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-lg backdrop-blur-md ${
                status === "Finalizado"
                  ? "bg-green-600/30 text-green-300"
                  : status === "En desarrollo"
                  ? "bg-yellow-600/30 text-yellow-300"
                  : "bg-gray-600/30 text-gray-300"
              }`}
            >
              {status}
            </span>
          )}
        </div>

        {/* Card content: title, short description, tech badges and actions */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <div className="flex flex-col gap-2">
            {/* Title */}
            <h3 className="text-2xl font-semibold text-white line-clamp-1">
              {title}
            </h3>

            {/* Truncated description with ref used to detect overflow */}
            <p
              ref={textRef}
              className="text-text-muted text-sm leading-relaxed line-clamp-6"
            >
              {description}
            </p>

            {/* "Read more" shows if text was truncated */}
            {truncated && (
              <button
                onClick={() => setIsOpen(true)}
                className="text-red-bright text-sm font-semibold hover:underline mt-1 self-start"
              >
                Leer más →
              </button>
            )}

            {/* Tech badges (if any) */}
            {techs.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {techs.map(({ name, icon }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center w-14 text-center"
                  >
                    <div className="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity">
                      {icon}
                    </div>
                    <span className="text-[10px] text-gray-400 leading-tight break-words mt-1">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons / links */}
          <div className="flex gap-3 mt-5">
            {/* GitHub link or placeholder when private */}
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient"
              >
                <span className="relative z-10">Ver código</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            ) : (
              <span className="text-sm text-gray-500 italic">
                Código privado
              </span>
            )}

            {/* Live demo link or placeholder when not available */}
            {live ? (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient"
              >
                <span className="relative z-10">Ver demo</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            ) : (
              <span className="text-sm text-gray-500 italic">
                Demo no disponible
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal: shows full description and actions when opened */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>

          {/* Modal content: title + full description + close CTA */}
          <h3 className="text-2xl font-semibold text-red-bright mb-4">
            {title}
          </h3>
          <p className="text-text-muted leading-relaxed whitespace-pre-line">
            {description}
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 bg-red-bright text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
          >
            Cerrar
          </button>
        </Modal>
      )}
    </>
  );
}
