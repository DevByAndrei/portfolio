// File: Express API to receive contact form submissions and forward them via Resend

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Resend } from "resend";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import validator from "validator";
import { fileURLToPath } from "url";
import { emailTemplate } from "./src/utils/emailTemplate.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* Resolve __dirname for ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Middleware setup */
// Allow cross-origin requests (public portfolio API)
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Apply secure HTTP headers; allow cross-origin resources where needed
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Simple sanitization for incoming string fields to reduce injection risk
app.use((req, res, next) => {
  if (req.method === "POST" && req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = validator.escape(req.body[key].trim());
      }
    }
  }
  next();
});

/* Request logging */
// Verbose logs in development, minimal/error logs in production
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  const logDirectory = path.join(__dirname, "logs");
  if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);
  const logStream = fs.createWriteStream(path.join(logDirectory, "access.log"), { flags: "a" });

  app.use(
    morgan("combined", {
      stream: logStream,
      // Only persist error-level requests to log file
      skip: (req, res) => res.statusCode < 400,
    })
  );
}

/* Rate limiting */
// Throttle submissions to prevent abuse (3 requests per minute per IP)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: { error: "Has enviado demasiados mensajes. Inténtalo más tarde." },
});
app.use("/api/sendEmail", limiter);

/* Email client initialization */
const resend = new Resend(process.env.RESEND_API_KEY);

/* Helper: map contact reason to an emoji for email subject */
const reasonIcons = {
  "Consulta general": "💬",
  "Propuesta de trabajo": "💼",
  "Colaboración": "🤝",
  "Otro": "📩",
};

/* API: receive contact form and forward via Resend */
app.post("/api/sendEmail", async (req, res) => {
  try {
    const name = req.body.name || "";
    const email = validator.normalizeEmail(req.body.email || "");
    const reason = req.body.reason || "Propuesta de trabajo";
    const message = req.body.message || "";

    // Basic validation with clear HTTP 400 responses for client errors
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "El correo electrónico no es válido." });
    }
    if (name.length < 2) {
      return res.status(400).json({ error: "El nombre debe tener al menos 2 letras." });
    }
    if (message.length < 10) {
      return res.status(400).json({ error: "El mensaje debe tener al menos 10 caracteres." });
    }

    const icon = reasonIcons[reason] || "💬";

    // Send email via Resend SDK
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "devbyandrei@gmail.com",
      subject: `${icon} ${reason} — ${name}`,
      html: emailTemplate({ name, email, reason, message, icon }),
    });

    // Dev-only log for successful sends
    if (process.env.NODE_ENV !== "production") {
      console.log(`📨 Email sent from ${name} <${email}>`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    // Log error details in non-production environments for debugging
    if (process.env.NODE_ENV !== "production") {
      console.error("Error sending email:", error);
    }
    return res.status(500).json({ error: "Error al enviar el correo." });
  }
});

/* Serve frontend build in production if available */
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "dist");
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));

    // For non-API routes, serve index.html (SPA fallback)
    app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
  } else {
    console.warn("Dist folder not found. Run `npm run build` before deploying to production.");
  }
}

/* Start server */
app.listen(PORT, () => {
  const mode = process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEVELOPMENT";
  console.log(`Server running in ${mode} mode — http://localhost:${PORT}`);
});
