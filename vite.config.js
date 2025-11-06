import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

// [https://vite.dev/config/](https://vite.dev/config/)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "[http://localhost:5000](http://localhost:5000)",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          swiper: ["swiper"],
        },
      },
    },
    assetsInlineLimit: 4096,
    minify: "esbuild",
  },
});
