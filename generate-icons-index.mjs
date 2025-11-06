import fs from "fs";
import path from "path";

const iconsDir = path.resolve("src/assets/icons");
const indexPath = path.join(iconsDir, "index.js");

// 🧩 Leer todos los archivos .jsx dentro de la carpeta
const files = fs
  .readdirSync(iconsDir)
  .filter(
    (file) =>
      file.endsWith(".jsx") &&
      file !== "index.jsx" &&
      !file.startsWith("_") // Ignora auxiliares o internos
  );

// 🔤 Ordenar alfabéticamente
files.sort((a, b) => a.localeCompare(b));

// 🧾 Generar las exportaciones
const exports = files
  .map((file) => {
    const baseName = path.basename(file, ".jsx");
    return `export { default as ${baseName} } from "./${baseName}";`;
  })
  .join("\n");

// ✍️ Escribir index.js
fs.writeFileSync(indexPath, exports + "\n");

console.log(`✅ index.js generado con ${files.length} iconos en orden alfabético.`);

// Ejecutar con: npm run generate:icons