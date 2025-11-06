import validator from "validator";

export const sanitizeBody = (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = validator.escape(req.body[key].trim());
    }
  }
  next();
};
