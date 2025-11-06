import TechCard from "../components/TechCard";
import {
  HtmlIcon,
  CssIcon,
  SvelteIcon,
  JavaIcon,
  OracleIcon,
  PostgreIcon,
  KotlinIcon,
  ReactIcon,
  SpringIcon,
  FlutterIcon,
  DartIcon,
  JSIcon,
  TailwindIcon,
  GitIcon,
  GitHubIcon,
  GitLabIcon,
  VSCodeIcon,
  EclipseIcon,
  NpmIcon,
  PostmanIcon,
  SQLDeveloperIcon,
} from "../assets/icons";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

/* Motion variants
   - containerVariants: staggered reveal for child items
   - itemVariants: entrance animation for each TechCard
*/
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* Tech sections data
   - Each section has a title and an array of { icon: JSXElement, label: string }
   - Icons are imported SVG React components sized via className prop
*/
const techSections = [
  {
    title: "Front-end",
    logos: [
      { icon: <HtmlIcon className="w-12 h-12" />, label: "HTML5" },
      { icon: <CssIcon className="w-12 h-12" />, label: "CSS3" },
      { icon: <JSIcon className="w-12 h-12" />, label: "JavaScript" },
      { icon: <SvelteIcon className="w-12 h-12" />, label: "Svelte" },
      { icon: <TailwindIcon className="w-12 h-12" />, label: "TailwindCSS" },
    ],
  },
  {
    title: "Back-end",
    logos: [
      { icon: <JavaIcon className="w-12 h-12" />, label: "Java" },
      { icon: <OracleIcon className="w-12 h-12" />, label: "Oracle" },
      { icon: <PostgreIcon className="w-12 h-12" />, label: "PostgreSQL" },
      { icon: <KotlinIcon className="w-12 h-12" />, label: "Kotlin" },
    ],
  },
  {
    title: "Aprendiendo",
    logos: [
      { icon: <ReactIcon className="w-12 h-12" />, label: "React" },
      { icon: <SpringIcon className="w-12 h-12" />, label: "SpringBoot" },
      { icon: <FlutterIcon className="w-12 h-12" />, label: "Flutter" },
      { icon: <DartIcon className="w-12 h-12" />, label: "Dart" },
    ],
  },
  {
    title: "Herramientas",
    logos: [
      { icon: <GitIcon className="w-12 h-12" />, label: "Git" },
      { icon: <GitHubIcon className="w-12 h-12" />, label: "GitHub" },
      { icon: <GitLabIcon className="w-12 h-12" />, label: "GitLab" },
      { icon: <VSCodeIcon className="w-12 h-12" />, label: "VSCode" },
      { icon: <EclipseIcon className="w-12 h-12" />, label: "Eclipse" },
      { icon: <NpmIcon className="w-12 h-12" />, label: "npm" },
      { icon: <PostmanIcon className="w-12 h-12" />, label: "Postman" },
      { icon: <SQLDeveloperIcon className="w-12 h-12" />, label: "SQL Developer" },
    ],
  },
];

export default function Technologies() {
  return (
    <section
      id="technologies"
      className="bg-bg-soft text-text-main flex flex-col min-h-screen md:min-h-0 p-4 sm:p-8"
    >
      {/* Page metadata for SEO and social previews */}
      <Helmet>
        <title>Tecnologías | Portfolio Andrei</title>
        <meta
          name="description"
          content="Explora las tecnologías que manejo: Java, React, TailwindCSS, Spring, Flutter, Oracle, PostgreSQL y más."
        />
        <meta property="og:title" content="Tecnologías | Portfolio Andrei" />
        <meta
          property="og:description"
          content="Explora las tecnologías que manejo: Java, React, TailwindCSS, Spring, Flutter, Oracle, PostgreSQL y más."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devbyandrei.vercel.app/technologies" />
      </Helmet>

      {/* Animated container: title + grid of tech sections */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto w-full max-w-5xl"
      >
        <h2 className="text-white text-4xl font-bold text-left mb-4 sm:mb-8 border-b-4 border-red-bright pb-2">
          Tecnologías
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <TechCard title={section.title} logos={section.logos} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
