import { GitHubIcon, LinkedinIcon } from "../assets/icons";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MdOutlineFileDownload } from "react-icons/md";

/*
  AboutMe page
  - Simple presentational component that shows a short bio, education and CTA links.
  - Uses react-helmet-async to set page meta for SEO/social previews.
  - Uses framer-motion for entrance animations (viewport-aware).
  - Icons are imported from a central icons module.
*/
export default function AboutMe() {
  return (
    <section
      id="about"
      className="bg-bg-soft text-text-main flex flex-col p-4 pt-10 sm:p-8 sm:pt-16"
    >
      {/* Page metadata for SEO / social sharing */}
      <Helmet>
        <meta
          name="description"
          content="Soy Andrei, Junior Full-stack Developer con experiencia en Java, React y TailwindCSS. Descubre mi formación y habilidades técnicas."
        />
        <meta property="og:title" content="Sobre mí | Portfolio Andrei" />
        <meta
          property="og:description"
          content="Soy Andrei, Junior Full-stack Developer con experiencia en Java, React y TailwindCSS. Descubre mi formación y habilidades técnicas."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devbyandrei.vercel.app/about" />
      </Helmet>

      <div className="mx-auto max-w-5xl">
        {/* Section title with entrance animation */}
        <motion.h2
          className="text-white text-4xl font-bold text-left mb-4 sm:mb-8 border-b-4 border-red-bright pb-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }} /* animate once when 10% visible */
        >
          Sobre mí
        </motion.h2>

        {/* Main content container with stagger-like appearance (single block here) */}
        <motion.div
          className="text-text-muted text-base sm:text-lg leading-relaxed space-y-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Short introduction paragraph */}
          <p>
            Soy un{" "}
            <span className="text-red-bright font-semibold">
              Full-Stack Developer Junior
            </span>{" "}
            con una sólida base técnica, galardonado con el{" "}
            <span className="text-white font-semibold">
              Premio CEU Ángel Herrera al Mejor Alumno
            </span>
            . Me apasiona crear soluciones integrales que combinen un diseño atractivo con un rendimiento excepcional.
          </p>

          {/* Tech stack / current focus */}
          <p>
            Tengo experiencia en el desarrollo frontend moderno utilizando{" "}
            <span className="text-white font-semibold">
              Svelte y Tailwind
            </span>
            , y conocimientos sólidos de backend orientados a{" "}
            <span className="text-white font-semibold">
              Java
            </span>
            . Actualmente, sigo formándome y aprendiendo{" "}
            <span className="text-white font-semibold">
              React y Spring Boot
            </span>
            . Mi enfoque técnico siempre prioriza las buenas prácticas, la experiencia de usuario (UX/UI) y la mejora continua del código.
          </p>

          {/* Team / soft skills */}
          <p>
            A nivel personal y profesional, destaco por mi adaptabilidad y proactividad. Mi experiencia internacional (
            <span className="text-white font-semibold">
              Erasmus+
            </span>
            ) en un entorno multicultural me ha permitido desarrollar una gran capacidad de resolución de problemas y comunicación efectiva, valores que aplico trabajando resolutivamente en equipo.
          </p>

          {/* CTA: open to opportunities */}
          <p>
            Si buscas a alguien comprometido, con ganas de aprender y aportar
            valor desde el primer día, no dudes en contactarme. Estoy preparado para
            afrontar nuevos desafíos y contribuir al éxito de tu equipo o
            proyecto.
          </p>

          {/* Education block */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h3 className="text-white text-2xl font-semibold mb-3">Formación</h3>

            <ul className="text-text-muted list-disc list-inside leading-relaxed">
              <li>
                <span className="font-semibold text-white">
                  Grado Superior en Desarrollo de Aplicaciones Multiplataforma
                  (DAM)
                </span>{" "}
                — Nota media: <span className="font-semibold">9.64/10</span> |{" "}
                <span className="italic">Premio CEU Ángel Herrera al Mejor Alumno</span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Grado Medio en Sistemas Microinformáticos y Redes (SMR)
                </span>{" "}
                — Nota media: <span className="font-semibold">9.73/10</span>
              </li>
            </ul>
          </motion.div>

          {/* Actions: download CV and social links */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Downloadable CV - use native download attribute */}
            <motion.a
              href="/assets/docs/CV_ANDREI_ES_PUBLIC.pdf"
              download
              className="btn-gradient"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <MdOutlineFileDownload className="text-xl" />
                Descargar CV
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            </motion.a>

            {/* Social links - accessible anchors with aria-label */}
            <div className="flex gap-6 text-2xl text-white">
              <motion.a
                href="https://www.linkedin.com/in/devbyandrei/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar mi perfil de LinkedIn"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <LinkedinIcon
                  className="w-8 h-8 text-white hover:text-red-bright transition-colors"
                  aria-hidden="true"
                />
              </motion.a>

              <motion.a
                href="https://github.com/DevByAndrei"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar mi perfil de GitHub"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <GitHubIcon
                  className="w-8 h-8 text-white hover:text-red-bright transition-colors"
                  aria-hidden="true"
                />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
