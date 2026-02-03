import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Analytics } from "@vercel/analytics/react"

// Lazy load components
const Navbar = lazy(() => import("./components/Navbar"));
const Introduction = lazy(() => import("./pages/Introduction"));
const Projects = lazy(() => import("./pages/Projects"));
const Experience = lazy(() => import("./pages/Experience"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const Technologies = lazy(() => import("./pages/Technologies"));
const Contact = lazy(() => import("./pages/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

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

  // Main portfolio page component
  const MainPage = () => (
    <>
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
    </>
  );

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-bg-soft text-red-bright">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-bright mb-4"></div>
          <p className="text-lg font-medium">Cargando...</p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;

