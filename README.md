# Portfolio - devbyandrei

Proyecto: portafolio personal construido con React + Vite. Interfaz con TailwindCSS; animaciones con Framer Motion y GSAP (ScrollSmoother). Backend mínimo en Express para el reenvío de formularios mediante Resend.

## Resumen técnico
- Framework: React (Vite)
- Estilos: TailwindCSS (+ CSS personalizado en src/styles)
- Animaciones: Framer Motion, GSAP (ScrollSmoother, ScrollTrigger)
- Bundler/Dev: Vite
- Backend: Node.js + Express (server.js) — API mínima para reenviar formularios de contacto vía Resend

## Estructura del proyecto (alto nivel)
- src/
  - pages/ — componentes de página React: Introduction, AboutMe, Technologies, Projects, Experience, Contact
  - components/ — UI reutilizable: Navbar, Footer, ProjectCard, Modal, FormInput, etc.
  - assets/ — imágenes, fuentes y componentes SVG de iconos (src/assets/icons)
  - styles/ — CSS global y declaraciones de fuentes (fonts.css, index.css)
  - gsap/ — helpers e inicialización para ScrollSmoother
  - utils/ — utilidades (emailTemplate, validateForm, etc.)
  - services/ — servicios cliente (contactService)
- server.js — backend Express (endpoint de envío de correo, middleware, rate limiting)
- package.json — dependencias y scripts
- README.md, .gitignore, LICENSE (opcional)

## Archivos / módulos destacados
- src/App.jsx — inicialización de GSAP ScrollSmoother y composición principal de páginas
- src/pages/*.jsx — componentes de página con meta tags (react-helmet-async)
- src/components/ProjectCard.jsx — tarjeta de proyecto con modal; gestiona truncado de texto y pausa de autoplay del Swiper
- src/components/Modal.jsx — modal montado en portal con bloqueo de scroll de fondo (compatible con ScrollSmoother)
- src/styles/fonts.css — declaraciones @font-face (Poppins) — solo para archivos presentes para evitar 404s
- src/styles/index.css — estilos base, variables de tema, componentes personalizados (botones, ajustes de swiper, scrollbars)
- src/assets/icons/ — componentes React SVG usados en la UI
- src/utils/emailTemplate.js — plantilla HTML usada por el backend para enviar correos
- server.js — rutas Express, sanitización, rate limiting, integración con Resend y fallback de servicio estático en producción

## API pública (técnica)
- POST /api/sendEmail
  - Propósito: recibir payload del formulario de contacto y reenviarlo vía Resend
  - Protecciones: sanitización de entrada, validación básica, rate limiting (configurado)
  - Campos esperados (técnico): name, email, reason, message

## Recursos y fuentes
- Fuentes: familia Poppins (se declaran solo los archivos presentes en src/assets/fonts)
- Iconos: componentes SVG en src/assets/icons (usados como componentes React)
- Imágenes: almacenadas en src/assets/images

## Notas de compilación / despliegue (técnico)
- server.js contiene lógica para servir archivos estáticos del frontend en producción (fallback SPA) cuando `dist` está disponible.
- La instancia de ScrollSmoother se expone en window._smoother para componentes que necesiten pausar/restaurar el comportamiento de scroll.
- El backend referencia variables de entorno para secretos (por ejemplo, RESEND_API_KEY); aquí no se incluyen instrucciones de uso ni claves.

## Varios
- Accesibilidad: las páginas incluyen meta tags y atributos ARIA básicos donde aplica.
- Registro: morgan se usa para logging de peticiones; la configuración de producción escribe logs de nivel error en un directorio `logs`.
- Seguridad: se aplica helmet y se realiza sanitización básica de entradas en las peticiones entrantes.