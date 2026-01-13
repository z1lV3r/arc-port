import * as fs from "fs";
import * as path from "path";
import { pathToFileURL } from "url";
import type { PluginOption } from "vite";
import manifest from "./src/app/infrastructure/config/chrome-manifest.config";

export function makeManifestPlugin(): PluginOption {
  return {
    name: "make-manifest",
    async generateBundle() {
      // 1. Recursive scan for manifest chunks
      const featuresDir = path.resolve(__dirname, "src/features");
      const manifestChunks: string[] = [];

      const findManifests = (dir: string) => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
          const fullPath = path.join(dir, file.name);
          if (file.isDirectory()) {
            findManifests(fullPath);
          } else if (file.name === "chrome-manifest.config.ts") {
            manifestChunks.push(fullPath);
          }
        }
      };

      findManifests(featuresDir);

      // 2. Merge chunks
      const finalManifest = JSON.parse(JSON.stringify(manifest)); // clone

      for (const chunkPath of manifestChunks) {
        try {
          // Attempt dynamic import. Note: This relies on the environment supporting
          // dynamic import of the target file type (TS). If this runs in standard Node
          // without a loader, it might fail on .ts files.
          // Since we are in Vite config context, we hope for the best or use a work-around if it fails.
          const formattedPath = pathToFileURL(chunkPath).href;
          const chunkModule = await import(formattedPath);
          const chunk = chunkModule.default || chunkModule;

          mergeManifests(finalManifest, chunk);
        } catch (e) {
          console.error(`Failed to load manifest chunk at ${chunkPath}:`, e);
          // Fallback or re-throw depending on strictness
        }
      }

      this.emitFile({
        type: "asset",
        fileName: "manifest.json",
        source: JSON.stringify(finalManifest, null, 2),
      });
    },
  };
}

function mergeManifests(target: any, source: any) {
  for (const key in source) {
    if (Array.isArray(source[key])) {
      target[key] = (target[key] || []).concat(source[key]);
      // Deduplicate simple arrays like permissions
      if (key === "permissions") {
        target[key] = [...new Set(target[key])];
      }
    } else if (typeof source[key] === "object" && source[key] !== null) {
      if (!target[key]) {
        target[key] = {};
      }
      mergeManifests(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}
