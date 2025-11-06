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
        <title>Sobre mí | Portfolio Andrei</title>
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
              Junior Full-stack Developer
            </span>{" "}
            apasionado por la tecnología, el aprendizaje constante y la creación
            de soluciones que combinan buen diseño, funcionalidad y rendimiento.
            Me gusta entender cómo funcionan las cosas, mejorar lo que ya existe
            y experimentar con nuevas ideas hasta dar con algo realmente útil y
            diferente.
          </p>

          {/* Tech stack / current focus */}
          <p>
            Trabajo tanto en Front-end como en Back-end, con experiencia en{" "}
            <span className="text-white font-semibold">
              Java, Svelte, TailwindCSS, Oracle y APIs
            </span>{" "}
            y actualmente profundizo en{" "}
            <span className="text-white font-semibold">Spring Boot y React</span>{" "}
            para ampliar mi stack. Me gusta escribir código limpio, mantener una
            estructura clara y cuidar los pequeños detalles que marcan la
            diferencia en la experiencia de usuario.
          </p>

          {/* Team / soft skills */}
          <p>
            Más allá de lo técnico, disfruto trabajando en equipo, compartiendo
            ideas y buscando soluciones creativas a los retos del día a día.
            Creo que el mejor desarrollo surge de la colaboración, la curiosidad
            y las ganas de hacer las cosas bien. Mi objetivo es seguir creciendo
            como profesional, aportar energía positiva al equipo y participar en
            proyectos que me reten y me ayuden a seguir evolucionando.
          </p>

          {/* CTA: open to opportunities */}
          <p>
            Si buscas a alguien comprometido, con ganas de aprender y aportar
            valor desde el primer día, no dudes en contactarme. Estoy listo para
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
