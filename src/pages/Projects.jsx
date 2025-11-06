import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { Helmet } from "react-helmet-async";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  DartIcon,
  FlutterIcon,
  JavaIcon,
  PostgreIcon,
  ReactIcon,
  SpringIcon,
  TailwindIcon,
} from "../assets/icons";

// Animation variants used by framer-motion
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const titleVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const swiperVariant = {
  hidden: { opacity: 0, filter: "blur(10px)", scale: 0.98 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Projects() {
  // store Swiper instance to interact with it if needed (e.g. control from child)
  const swiperRef = useRef(null);

  // Static projects data
  const projects = [
    {
      title: "SmartFridge",
      description:
        "Sistema de gestión de inventario con CRUD completo y control de caducidades. Genera recetas mediante IA según el stock disponible y actualiza automáticamente las cantidades al realizar una receta. Base de datos en local, a futuro se planea migrar a la nube, como Firebase. ",
      image: "assets/images/projects/smart-fridge.webp",
      techs: [
        { name: "SpringBoot", icon: <SpringIcon className="w-8 h-8" /> },
        { name: "PostgreSQL", icon: <PostgreIcon className="w-8 h-8" /> },
        { name: "Flutter", icon: <FlutterIcon className="w-8 h-8" /> },
        { name: "Dart", icon: <DartIcon className="w-8 h-8" /> },
      ],
      github: "https://github.com/DevByAndrei/smart_fridge",
      live: null,
      status: "Finalizado",
    },
    {
      title: "Portfolio Personal",
      description:
        "Portfolio personal el cual estás visitando ahora mismo, muestra información sobre mi, mis habilidades y proyectos como desarrollador full-stack.",
      image: "assets/images/projects/portfolio.webp",
      techs: [
        { name: "React", icon: <ReactIcon className="w-8 h-8" /> },
        { name: "Tailwind", icon: <TailwindIcon className="w-8 h-8" /> },
      ],
      github: "https://github.com/devbyandrei/portfolio",
      live: "https://devbyandrei.vercel.app",
      status: "Finalizado",
    },
    {
      title: "PortScanner",
      description:
        "Herramienta de escaneo de puertos desarrollada en Java. Permite identificar puertos abiertos en una dirección IP específica, proporcionando información esencial para evaluaciones de seguridad y auditorías de red. ",
      image: "assets/images/projects/port-scanner.webp",
      techs: [{ name: "Java", icon: <JavaIcon className="w-8 h-8" /> }],
      github: null,
      live: null,
      status: "En desarrollo",
    },
  ];

  // explicit duplication kept for a smoother filled carousel (intended behaviour)
  const allProjects = [...projects, ...projects];

  return (
    <section id="projects" className="bg-bg-soft text-text-main flex flex-col items-center p-4 sm:p-8">
      <Helmet>
        <meta
          name="description"
          content="Descubre mis proyectos recientes con tecnologías modernas: Flutter, Dart, Spring Boot, PostgreSQL, React, TailwindCSS y más."
        />
        <meta property="og:title" content="Proyectos | Portfolio Andrei" />
        <meta
          property="og:description"
          content="Descubre mis proyectos recientes con tecnologías modernas: Flutter, Dart, Spring Boot, PostgreSQL, React, TailwindCSS y más."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devbyandrei.vercel.app/projects" />
      </Helmet>

      <motion.div
        className="max-w-5xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 variants={titleVariant} className="text-white text-4xl font-bold mb-4 sm:mb-8 text-left border-b-4 border-red-bright pb-2">
          Proyectos
        </motion.h2>

        <motion.div variants={swiperVariant}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            spaceBetween={20}
            coverflowEffect={{
              rotate: 40,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full max-w-5xl pb-12"
          >
            {allProjects.map((project, i) => (
              <SwiperSlide key={`${project.title}-${i}`} className="max-w-[280px] sm:max-w-[350px] my-2 cursor-pointer">
                <ProjectCard project={project} swiperRef={swiperRef} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </motion.div>
    </section>
  );
}
