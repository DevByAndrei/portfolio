import { useState, useEffect } from "react";
import { animateScroll } from "react-scroll";

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    "Inicio",
    "Sobre mí",
    "Tecnologías",
    "Proyectos",
    "Experiencia",
    "Contacto",
  ];
  const sectionIds = [
    "home",
    "about",
    "technologies",
    "projects",
    "experience",
    "contact",
  ];

  const OFFSET = 64;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleCloseMenu = () => setIsMenuOpen(false);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - OFFSET;
      animateScroll.scrollTo(top, { duration: 700, smooth: "easeInOutQuad" });
    }
    handleCloseMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + OFFSET + 10;
      let current = "home";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {" "}
      <nav
        aria-label="Primary navigation"
        className="bg-bg-soft/80 backdrop-blur-md text-text-main px-4 sm:px-8 py-4 fixed w-full top-0 z-50 transition-all duration-300"
      >
        {" "}
        <div className="flex justify-between items-center w-full max-w-5xl mx-auto">
          <button
            onClick={() => handleScrollTo("home")}
            className="text-xl sm:text-2xl font-bold tracking-wide text-white focus:outline-none"
          >
            devbyandrei{" "}
          </button>

          <ul className="hidden lg:flex gap-8 text-lg items-center list-none m-0 p-0">
            {menuItems.map((item, index) => (
              <li key={item}>
                <button
                  onClick={() => handleScrollTo(sectionIds[index])}
                  className={`transition-colors duration-200 cursor-pointer bg-transparent border-0 ${
                    activeSection === sectionIds[index]
                      ? "text-red-bright font-semibold"
                      : "text-white hover:text-red-bright"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-7 h-6 justify-center items-center z-50"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>
      <nav
        aria-label="Mobile menu"
        className={`lg:hidden fixed inset-0 bg-bg-soft/90 backdrop-blur-md text-text-main z-40 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8 text-center list-none m-0 p-0">
          {menuItems.map((item, index) => (
            <li key={item}>
              <button
                onClick={() => handleScrollTo(sectionIds[index])}
                className={`text-2xl font-semibold cursor-pointer bg-transparent border-0 transition-colors duration-200 ${
                  activeSection === sectionIds[index]
                    ? "text-red-bright"
                    : "text-white hover:text-red-bright"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
