import { sanitizeForm } from "../utils/sanitizeForm";

export const sendContactEmail = async (formData, API_URL) => {
  const cleanData = sanitizeForm(formData);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cleanData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al enviar el mensaje.");
  }

  return response.json();
};
