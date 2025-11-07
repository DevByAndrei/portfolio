import { useEffect, Suspense, lazy } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Analytics } from "@vercel/analytics/next"

// Lazy load components
const Navbar = lazy(() => import("./components/Navbar"));
const Introduction = lazy(() => import("./pages/Introduction"));
const Projects = lazy(() => import("./pages/Projects"));
const Experience = lazy(() => import("./pages/Experience"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const Technologies = lazy(() => import("./pages/Technologies"));
const Contact = lazy(() => import("./pages/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Initialize GSAP scroll plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Disable browser's scroll restoration to prevent jumps
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force scroll to top on mount with fallback
    const scrollToTop = () => {
      try {
        window.scrollTo(0, 0);
      } catch {
        setTimeout(() => window.scrollTo(0, 0), 300);
      }
    };

    const timer = setTimeout(scrollToTop, 100);

    // Cleanup: restore scroll behavior
    return () => {
      clearTimeout(timer);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-bg-soft text-red-bright">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-bright mb-4"></div>
          <p className="text-lg font-medium">Cargando...</p>
        </div>
      }
    >
      <div>
        <Navbar />
        <main className="bg-bg-soft transform-gpu">
          <Introduction />
          <AboutMe />
          <Technologies />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </main>
        <Analytics />
      </div>
    </Suspense>
  );
}

export default App;
