import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { makeManifestPlugin } from "./vite-plugin-make-manifest";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), makeManifestPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        background: path.resolve(__dirname, "src/background.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
