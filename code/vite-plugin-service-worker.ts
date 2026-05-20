import type { Plugin } from "vite";
import { build } from "vite";
import path from "path";

export function buildServiceWorkerPlugin(): Plugin {
  return {
    name: "build-service-worker",
    apply: "build",
    async closeBundle() {
      await build({
        configFile: false,
        build: {
          lib: {
            entry: path.resolve(__dirname, "src/background.ts"),
            name: "ServiceWorker",
            formats: ["iife"],
            fileName: () => "background.js",
          },
          outDir: "dist",
          emptyOutDir: false,
          rolldownOptions: {
            output: {
              entryFileNames: "background.js",
            },
          },
          minify: false,
        },
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
      });
    },
  };
}
