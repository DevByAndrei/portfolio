import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

/*
  Animation variants
  - containerVariants: used to stagger child animations when the container becomes visible
  - itemVariants: simple entrance animation applied to each timeline item
*/
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

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 bg-bg-soft text-text-main flex flex-col items-center justify-center p-4 sm:p-8"
    >
      {/* Page meta: SEO and social preview tags */}
      <Helmet>
        <meta
          name="description"
          content="Mi experiencia laboral y logros en los puestos de trabajo previos."
        />
        <meta property="og:title" content="Experiencia | Portfolio Andrei" />
        <meta
          property="og:description"
          content="Mi experiencia laboral y logros en los puestos de trabajo previos."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://devbyandrei.vercel.app/experience"
        />
      </Helmet>

      <motion.div
        className="max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section title with entrance animation */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-white mb-4 sm:mb-8 border-b-4 border-red-bright pb-2 text-left"
        >
          Experiencia
        </motion.h2>

        {/* Timeline container
            - left vertical line created with border-l
            - each entry is positioned relative to that line
            - bullet is absolutely positioned to align with the line
        */}
        <motion.div
          variants={containerVariants}
          className="relative border-l-2 border-white ml-6"
        >
          {/* Timeline item: ETS Asset Management Factory */}
          <motion.div variants={itemVariants} className="relative pl-10 mb-16">
            {/* Bullet marker for the timeline entry */}
            <span className="absolute -left-[11px] top-2 w-5 h-5 bg-red-bright rounded-full border-2 border-white" />

            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold text-white">
                ETS Asset Management Factory
              </h3>
              <h4 className="text-red-bright font-medium text-lg">
                Frontend Developer
              </h4>
              <p className="text-text-muted text-sm">
                Marzo 2025 – Junio 2025 · Prácticas
              </p>
            </div>

            <ul className="list-disc list-inside text-text-muted mt-3 space-y-1 leading-relaxed">
              <li>
                Implementé diseños de <span className="font-semibold text-white">Framer</span> en <span className="font-semibold text-white">Svelte</span> y <span className="font-semibold text-white">Tailwind</span>, transformando prototipos visuales en interfaces funcionales y de alta fidelidad.
              </li>
              <li>
                Integré y configuré componentes interactivos (carousels, animaciones) mediante librerías de <span className="font-semibold text-white">Svelte</span>.
              </li>
              <li>
                Desarrollé diseños <span className="font-semibold text-white">responsive</span> adaptando interfaces a múltiples dispositivos y resoluciones.
              </li>
              <li>
                Propuse mejoras de <span className="font-semibold text-white">UX/UI</span> ante especificaciones incompletas, reforzando la usabilidad del producto.
              </li>
              <li>
                Colaboré en equipo proponiendo mejoras técnicas y soluciones a bloqueos de desarrollo.
              </li>
            </ul>
          </motion.div>

          {/* Timeline item: Magnetic IT */}
          <motion.div variants={itemVariants} className="relative pl-10">
            <span className="absolute -left-[11px] top-2 w-5 h-5 bg-red-bright rounded-full border-2 border-white" />

            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold text-white">Magnetic IT</h3>
              <h4 className="text-red-bright font-medium text-lg">Help Desk</h4>
              <p className="text-text-muted text-sm">
                Abril 2023 – Julio 2023 · Prácticas Erasmus+
              </p>
            </div>

            <ul className="list-disc list-inside text-text-muted mt-3 space-y-1 leading-relaxed">
              <li>
                Resolví incidencias de <span className="font-semibold text-white">software, hardware y red</span> con alta tasa de resolución en primer contacto.
              </li>
              <li>
                Gestioné el ciclo completo de <span className="font-semibold text-white"> más de 300 tickets</span> (creación, seguimiento y cierre) asegurando la continuidad operativa.
              </li>
              <li>
                Supervisé el estado de <span className="font-semibold text-white">servidores y redes</span>, realizando mantenimiento preventivo y correctivo.
              </li>
              <li>
                Instalé y configuré software corporativo; administré usuarios en <span className="font-semibold text-white">dominio</span> y contraseñas.
              </li>
              <li>
                Asistí en la resolución de problemas críticos garantizando soporte inmediato y satisfacción del cliente.
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
