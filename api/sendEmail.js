// Vercel Serverless Function: Handle contact form submissions via Resend
import { Resend } from "resend";
import validator from "validator";
import { emailTemplate } from "../src/utils/emailTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper: map contact reason to an emoji for email subject
const reasonIcons = {
    "Consulta general": "💬",
    "Propuesta de trabajo": "💼",
    "Colaboración": "🤝",
    "Otro": "📩",
};

// Simple in-memory rate limiting (resets on cold starts)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requests per minute

function checkRateLimit(ip) {
    const now = Date.now();
    const userRequests = rateLimitMap.get(ip) || [];

    // Filter out requests outside the time window
    const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);

    if (recentRequests.length >= RATE_LIMIT_MAX) {
        return false;
    }

    // Add current request
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    return true;
}

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    // CORS headers
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        // Rate limiting
        const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown";
        if (!checkRateLimit(ip)) {
            return res.status(429).json({
                error: "Has enviado demasiados mensajes. Inténtalo más tarde."
            });
        }

        // Sanitize and extract data
        let name = req.body.name || "";
        let email = req.body.email || "";
        let reason = req.body.reason || "Propuesta de trabajo";
        let message = req.body.message || "";

        // Sanitize string fields
        if (typeof name === "string") {
            name = validator.escape(name.trim());
        }
        if (typeof email === "string") {
            email = validator.normalizeEmail(email.trim());
        }
        if (typeof reason === "string") {
            reason = validator.escape(reason.trim());
        }
        if (typeof message === "string") {
            message = validator.escape(message.trim());
        }

        // Validation
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

        // Send email via Resend
        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "devbyandrei@gmail.com",
            subject: `${icon} ${reason} — ${name}`,
            html: emailTemplate({ name, email, reason, message, icon }),
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Error al enviar el correo." });
    }
}
