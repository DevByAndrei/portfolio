import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import Navbar from "./components/Navbar";
import Introduction from "./pages/Introduction";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import AboutMe from "./pages/AboutMe";
import Technologies from "./pages/Technologies";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { smoother } from "./gsap/smoother";

// Initialize GSAP scroll plugins
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

/* 
  Main App component
  - Sets up smooth scrolling with GSAP ScrollSmoother
  - Handles scroll restoration and cleanup
  - Renders main page sections in order
*/
function App() {
  useEffect(() => {
    // Disable browser's scroll restoration to prevent jumps
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Initialize smooth scroll with GSAP
    const s = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: true,
    });

    // Make smoother instance globally available for other components
    window._smoother = s;

    // Force scroll to top on mount with fallback
    const scrollToTop = () => {
      try {
        window.scrollTo(0, 0);
        s.scrollTo(0, true);
      } catch {
        setTimeout(() => window.scrollTo(0, 0), 300);
      }
    };

    const timer = setTimeout(scrollToTop, 100);

    // Cleanup: kill smoother, restore scroll behavior
    return () => {
      clearTimeout(timer);
      s.kill();
      window._smoother = null;
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <Navbar />
      <div id="smooth-content" className="bg-bg-soft transform-gpu">
        <Introduction />
        <AboutMe />
        <Technologies />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
