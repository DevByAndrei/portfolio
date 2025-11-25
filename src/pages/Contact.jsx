import { useState } from "react";
import { motion } from "framer-motion";
import FormInput from "../components/FormInput";
import { validateForm } from "../utils/validateForm";
import { sendContactEmail } from "../services/contactService";
import { Helmet } from "react-helmet-async";

/* Animation variants */
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "Consulta general",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  // API URL now points to Vercel serverless function
  // In development with 'vercel dev', it runs on localhost:3000
  // In production, it uses the relative path which Vercel handles automatically
  const API_URL = "/api/sendEmail";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      await sendContactEmail(formData, API_URL);
      setStatus("sent");
      setFeedback("✅ Mensaje enviado con éxito. ¡Gracias por contactarme!");
      setFormData({
        name: "",
        email: "",
        reason: "Consulta general",
        message: "",
      });

      setTimeout(() => {
        setStatus("idle");
        setFeedback("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setFeedback("⚠️ Error al enviar el mensaje. Intenta nuevamente.");

      setTimeout(() => {
        setStatus("idle");
        setFeedback("");
      }, 3000);
    }
  };

  const isButtonDisabled =
    status === "sending" || status === "sent" || status === "error";

  return (
    <section
      id="contact"
      className="bg-bg-soft text-text-main flex flex-col items-center p-4 sm:p-8 md:pb-16"
    >
      <Helmet>
        <meta
          name="description"
          content="Contáctame para proyectos, colaboraciones u oportunidades laborales. Estoy disponible para nuevas aventuras."
        />
        <meta property="og:title" content="Contacto | Portfolio Andrei" />
        <meta
          property="og:description"
          content="Contáctame para proyectos, colaboraciones u oportunidades laborales. Estoy disponible para nuevas aventuras."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://devbyandrei.vercel.app/contact"
        />
      </Helmet>

      <motion.div
        className="max-w-5xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* section title */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-white mb-4 sm:mb-8 text-left border-b-4 border-red-bright pb-2"
        >
          Contáctame
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10"
        >
          {/* Left: text info */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 flex flex-col justify-center text-left border-l-4 border-red-bright pl-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              ¿Tienes una idea o un proyecto?
            </h3>
            <p className="text-text-muted text-lg mb-6 leading-relaxed">
              Cada proyecto es una oportunidad para crear algo único. Estoy
              abierto a{" "}
              <span className="text-red-bright font-semibold">
                nuevas propuestas
              </span>{" "}
              y{" "}
              <span className="text-red-bright font-semibold">
                ofertas laborales
              </span>{" "}
              donde pueda aportar mi experiencia y seguir aprendiendo. Si me
              escribes, te responderé{" "}
              <span className="text-red-bright font-semibold">
                lo antes posible.
              </span>
            </p>

            <p className="text-text-muted mb-8">
              Completa el formulario o escríbeme directamente a{" "}
              <a
                href="mailto:devbyandrei@gmail.com"
                className="text-red-bright hover:underline"
              >
                devbyandrei@gmail.com
              </a>
            </p>
            {/* Animated image or GIF */}
            <motion.div
              className="relative w-full flex justify-center mt-6"
              initial={{ opacity: 0, y: 30, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="assets/images/contact/avion-papel.webp"
                alt="Avión de papel"
                className="w-56 sm:w-64 md:w-72 object-contain drop-shadow-[0_4px_12px_rgba(255,0,0,0.3)] select-none"
                loading="lazy"
                draggable="false"
              />
            </motion.div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 flex flex-col justify-between"
          >
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              variants={containerVariants}
            >
              {/* name input */}
              <motion.div variants={itemVariants}>
                <FormInput
                  id="name"
                  label="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  name="name"
                  placeholder="Tu nombre"
                />
              </motion.div>

              {/* email input */}
              <motion.div variants={itemVariants}>
                <FormInput
                  id="email"
                  label="Correo electrónico"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  name="email"
                  placeholder="tucorreo@ejemplo.com"
                />
              </motion.div>

              {/* reason select */}
              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="reason"
                  className="text-sm font-semibold mb-2 text-white"
                >
                  Motivo del contacto
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-bg-dark text-text-main border border-gray-600 focus:outline-none focus:border-red-bright focus:ring-2 focus:ring-red-bright/30 transition-colors duration-300"
                >
                  <option>Consulta general</option>
                  <option>Propuesta de trabajo</option>
                  <option>Colaboración</option>
                  <option>Otro</option>
                </select>
              </motion.div>

              {/* message textarea */}
              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold mb-2 text-white"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={`p-3 rounded-lg bg-bg-dark text-text-main border ${errors.message ? "border-red-bright" : "border-gray-600"
                    } focus:outline-none focus:border-red-bright focus:ring-2 focus:ring-red-bright/30 transition-colors duration-300 resize-none`}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-red-400 mt-1">
                    {errors.message}
                  </p>
                )}
              </motion.div>

              {/* submit + feedback */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3"
              >
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`bg-red-bright text-white py-3 px-6 rounded-lg font-semibold transition-colors w-fit ${isButtonDisabled
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-red-600"
                    }`}
                >
                  {status === "sending"
                    ? "Enviando..."
                    : status === "sent"
                      ? "¡Enviado!"
                      : status === "error"
                        ? "Error al enviar"
                        : "Enviar mensaje"}
                </button>

                <p
                  aria-live="polite"
                  className={`text-sm transition-all duration-300 ${status === "error"
                      ? "text-red-400"
                      : status === "sent"
                        ? "text-green-400"
                        : "text-transparent"
                    }`}
                >
                  {feedback}
                </p>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
