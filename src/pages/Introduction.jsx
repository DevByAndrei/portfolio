import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { GitHubIcon, LinkedinIcon } from "../assets/icons";
import { MdOutlineFileDownload } from "react-icons/md";
import TextType from "../components/animations/TextType";

/*
  Introduction page
  - Hero section for the homepage: short intro, animated role text, socials and CV CTA.
  - Uses framer-motion for simple entrance/hover animations.
  - Responsive: stacks on small screens, two-column layout on medium+ screens.
*/
export default function Introduction() {
  return (
    <section
      id="home"
      className="bg-bg-soft min-h-[calc(100vh-64px)] flex items-center justify-center px-6 sm:px-8 pt-32"
    >
      {/* SEO / social meta tags */}
      <Helmet>
        <title>Andrei | Full-Stack Developer</title>
        <meta
          name="description"
          content="Hola, soy Andrei, Junior Full-stack Developer. Bienvenido a mi portfolio, descubre mis proyectos y habilidades."
        />
        <meta property="og:title" content="Inicio | Portfolio Andrei" />
        <meta
          property="og:description"
          content="Hola, soy Andrei, Junior Full-stack Developer. Bienvenido a mi portfolio, descubre mis proyectos y habilidades."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devbyandrei.vercel.app/" />
      </Helmet>

      {/* Two-column responsive layout: text (left) + image (right) */}
      <motion.div
        className="
          flex flex-col-reverse md:flex-row
          items-center justify-between
          gap-6
          w-full max-w-5xl
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left column: headline, animated subtitle, description, CTAs */}
        <motion.div
          className="
            flex flex-col gap-4
            w-full md:w-1/2
            text-center md:text-left
          "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1
            className="
              text-white
              text-3xl sm:text-5xl
              font-extrabold leading-tight
            "
          >
            Hola, soy <span className="text-red-bright">Andrei</span>
          </h1>

          {/* Animated roles / typing effect */}
          <h2
            className="
              text-text-main
              text-xl sm:text-3xl
              font-semibold
            "
          >
            <TextType
              text={[
                "Front-end Developer </>",
                "Back-end Developer </>",
                "Full-stack Developer </>",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="_"
            />
          </h2>

          <p
            className="
              text-text-muted
              text-base sm:text-lg
              mx-auto md:mx-0
            "
          >
            Aprender es querer entender cómo funciona el mundo y mejorarlo con
            código.
          </p>

          {/* CTAs: social icons and CV download */}
          <motion.div
            className="
              flex flex-col md:flex-row
              justify-center md:justify-start
              items-center
              gap-4 md:gap-6
              mt-2
            "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div
              className="
                flex items-center 
                justify-center md:justify-start
                gap-6
              "
            >
              {/* Social links: LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/devbyandrei/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar mi perfil de LinkedIn"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <LinkedinIcon
                  className="w-8 h-8 text-white hover:text-red-bright transition-colors"
                  aria-hidden="true"
                />
              </motion.a>

              {/* Social links: GitHub */}
              <motion.a
                href="https://github.com/DevByAndrei"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar mi perfil de GitHub"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <GitHubIcon
                  className="w-8 h-8 text-white hover:text-red-bright transition-colors"
                  aria-hidden="true"
                />
              </motion.a>
            </div>

            {/* Downloadable CV button */}
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
          </motion.div>
        </motion.div>

        {/* Right column: profile image with hover/scale effect */}
        <motion.div
          className="
            flex 
            items-center justify-center
            w-full md:w-1/2
          "
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="
              relative
              w-56 h-56 sm:w-72 sm:h-72 md:w-[450px] md:h-[450px]
              overflow-hidden rounded-full
              border-4 border-red-bright
              shadow-2xl
            "
            whileHover={{ scale: 1.03, borderColor: "#ef4444" }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <img
              src="assets/images/profile/andrei.webp"
              alt="Foto de Andrei"
              className="object-cover w-full h-full"
              draggable="false"
              fetchpriority="high"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
