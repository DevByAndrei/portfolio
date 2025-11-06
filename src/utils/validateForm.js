export const validateForm = (formData) => {
  const errors = {};
  const name = formData.name?.trim() || "";
  const email = formData.email?.trim() || "";
  const message = formData.message?.trim() || "";

  if (!name) errors.name = "El nombre es obligatorio.";
  else if (name.length < 2) errors.name = "El nombre debe tener al menos 2 letras.";
  else if (/[^a-zA-ZÀ-ÿ\s'-]/.test(name)) errors.name = "El nombre contiene caracteres inválidos.";

  if (!email) errors.email = "El correo es obligatorio.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Introduce un correo electrónico válido.";

  if (!message) errors.message = "El mensaje es obligatorio.";
  else if (message.length < 10) errors.message = "El mensaje debe tener al menos 10 caracteres.";

  return errors;
};
