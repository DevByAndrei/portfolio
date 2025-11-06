import validator from "validator";

export const sanitizeForm = (formData) => {
  const clean = {};

  clean.name = validator.escape(validator.stripLow(formData.name?.trim() || ""));
  clean.email = validator.normalizeEmail(formData.email?.trim() || "") || "";
  clean.reason = validator.escape(validator.stripLow(formData.reason?.trim() || "Consulta general"));
  clean.message = validator.escape(validator.stripLow(formData.message?.trim() || ""));

  return clean;
};
