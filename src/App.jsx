import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Navbar from "./components/Navbar";
import Introduction from "./pages/Introduction";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import AboutMe from "./pages/AboutMe";
import Technologies from "./pages/Technologies";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

// Initialize GSAP scroll plugins
gsap.registerPlugin(ScrollTrigger);

/*
Main App component

Removes ScrollSmoother

Handles scroll restoration and cleanup

Renders main page sections in order
*/
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
    </div>
  );
}

export default App;
