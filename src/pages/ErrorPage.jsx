import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";

/*
  Error page (404)
  - Displays when users navigate to non-existent routes
  - Matches portfolio design: dark theme, red accents, Framer Motion animations
  - Includes animated error icon and CTA button to return home
*/
export default function ErrorPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
        // Scroll to top when returning home
        setTimeout(() => window.scrollTo(0, 0), 100);
    };

    return (
        <section
            className="bg-bg-soft min-h-screen flex items-center justify-center px-6 sm:px-8"
        >
            {/* SEO meta tags */}
            <Helmet>
                <title>404 - Página No Encontrada | Andrei</title>
                <meta
                    name="description"
                    content="La página que buscas no existe. Vuelve al inicio para explorar mi portfolio."
                />
            </Helmet>

            {/* Error content container */}
            <motion.div
                className="flex flex-col items-center justify-center gap-6 max-w-2xl text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Animated error icon */}
                <motion.div
                    className="relative"
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 100,
                    }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-full bg-red-bright/20 blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <BiError className="relative w-32 h-32 sm:w-40 sm:h-40 text-red-bright" />
                </motion.div>

                {/* 404 Error code */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <h1 className="text-white text-7xl sm:text-9xl font-extrabold tracking-tight">
                        404
                    </h1>
                </motion.div>

                {/* Error message */}
                <motion.div
                    className="flex flex-col gap-3"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <h2 className="text-text-main text-2xl sm:text-3xl font-bold">
                        ¡Oops! Página no encontrada
                    </h2>
                    <p className="text-text-muted text-base sm:text-lg max-w-md mx-auto">
                        Parece que la página que buscas no existe o ha sido movida. No te
                        preocupes, puedes volver al inicio para explorar mi portfolio.
                    </p>
                </motion.div>

                {/* CTA Button - Return to home */}
                <motion.button
                    onClick={handleGoHome}
                    className="btn-gradient mt-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <IoHomeOutline className="text-xl" />
                        Volver al Inicio
                    </span>
                </motion.button>

                {/* Decorative animated dots */}
                <motion.div
                    className="flex gap-2 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-red-bright"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
