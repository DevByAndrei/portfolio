import './styles/index.css'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </HelmetProvider>
  </StrictMode>
);
