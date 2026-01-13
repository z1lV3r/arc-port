import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { makeManifestPlugin } from "./vite-plugin-make-manifest";
import { buildServiceWorkerPlugin } from "./vite-plugin-service-worker";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    makeManifestPlugin(),
    buildServiceWorkerPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: "src/index.html",
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
      },
    },
    target: "esnext",
  },
});
